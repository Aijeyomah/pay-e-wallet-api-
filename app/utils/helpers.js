import bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import config from '../../config';
// import { genericErrors } from './index';
import {
  constants, DBError, ModuleError, genericErrors,
} from '.';
import db from '../db';

const { SUCCESS_RESPONSE, SUCCESS, FAIL } = constants;
const { serverError } = genericErrors;
const { SECRET } = config;

const successResponse = (
  res,
  { message = SUCCESS_RESPONSE, data, code = 200 },
) => res.status(code).json({
  status: SUCCESS,
  message,
  data,
});

const apiErrLogMessanger = (error, req) => logger.error(
  `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} 
    `,
);

const moduleErrLogMessager = (error) => logger.error(`${error.name} - ${error.status} - ${error.message} - ${error.stack}`);

const errorResponse = (req, res, error) => {
  const aggregateError = { ...serverError, ...error };
  apiErrLogMessanger(aggregateError, req);

  return res.status(aggregateError.status).json({
    status: FAIL,
    message: aggregateError.message,
    errors: aggregateError.errors,
  });
};
const makeError = ({ error, status, errors }, isDBError = true) => {
  let err;
  const { message } = error;
  if (isDBError) {
    err = new DBError({ status, message });
  } else {
    err = new ModuleError({ message, status });
  }
  if (errors) { err.errors = errors; }
  moduleErrLogMessager(err);
  return err;
};
/**
 * @returns - a unique identification number
 */
const generateId = () => uuidV4();

/**
 * @returns - a unique identification number
 */
const generateUniqueId = (prefix) => `${prefix}-${Math.random().toString(10).substr(2, 5)}`;

/** regenerate id if it already exist in the db;
 * @returns - a unique identification number
 */
const regenerateUniqueId = async(prefix, query) => {
  const id = generateUniqueId(prefix);
  const existingId = await db.oneOrNone(query, [ id ]);
  if (!existingId) {
    return id;
  }
  regenerateUniqueId(prefix, query);
};

/**
 * This generates a hash.
 * @param {String} salt - A random string.
 * @param {String} plain - A users' plain password or some sensitive data to be hashed.
 * @memberof Helper
 * @returns {String} - A hexadecimal string which is the hash value of
 *  the plain text passed as the second positional argument.
 */
const generateHash = (salt, plain) => {
  const hash = sha256.hmac.create(salt);
  hash.update(plain);
  return hash.hex();
};

/**
 * This is used for generating a hash and a salt from a user's password.
 * @param {string} password - password to be encrypted.
 * @memberof Helper
 * @returns {Object} - An object containing the hash and salt of a password.
 */
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return {
    salt,
    hash: generateHash(salt, password),
  };
};

/**
 * This checks if a plain text matches a certain hash value by generating
 * a new hash with the salt used to create that hash.
 * @param {string} plain - plain text to be used in the comparison.
 * @param {string} hash - hashed value created with the salt.
 * @param {string} salt - original salt value.
 * @memberof Helper
 * @returns {Boolean} - returns a true or false, depending on the outcome of the comparison.
 */
const compareHash = (plain, hash, salt) => {
  const hashMatch = generateHash(salt, plain);
  return hash === hashMatch;
};

/**
 * Synchronously signs the given payload into a JSON Web Token string.
 * @param {string | number | Buffer | object} payload - payload to sign
 * @param {string | number} expiresIn - Expressed in seconds or a string describing a
 * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 2 hours.
 * @memberof Helper
 * @returns {string} - JWT Token
 */
const generateToken = (payload, expiresIn = '3h') => jwt.sign(payload, SECRET, { expiresIn });

/**
 * This verify the JWT token with the secret with which the token was issued with
 * @param {string} token - JWT Token
 * @memberof Helper
 * @returns {string | number | Buffer | object } - Decoded JWT payload if
 * token is valid or an error message if otherwise.
 */
const verifyToken = (token) => jwt.verify(token, SECRET);

const addTokenToUserData = (user, is_admin = false) => {
  const {
    id, is_active, role, email,
  } = user;
  const token = generateToken({
    id, is_active, role, email, is_admin,
  });
  return {
    id,
    first_name: user.first_name,
    last_name: user.last_name,
    is_active,
    role,
    email,
    token,
  };
};

export {
  successResponse,
  moduleErrLogMessager,
  errorResponse,
  makeError,
  hashPassword,
  generateId,
  compareHash,
  generateToken,
  verifyToken,
  addTokenToUserData,
  regenerateUniqueId,
};
