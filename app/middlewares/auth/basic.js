import { genericErrors, constants, ApiError } from "../../utils";
import { errorResponse, moduleErrLogMessager, verifyToken } from "../../utils/helpers";
import { fetchAdminByEmail } from '../../services/admin';
import { getUserByEmail, getUserByUserByPhoneNumber } from '../../services/user';
import { signUpAdminSchema, createUserSchema , loginSchema} from "../../validations";
import { loggers } from "winston";


const { EMAIL_EXIST_VERIFICATION_FAIL, PHONE_NUMBER_CONFLICT } = constants;
/**
 * Checks for token in the authorization and x-access-token header properties.
 * @private
 * @param {object} authorization - The headers object
 * @memberof AuthMiddleware
 * @returns {string | null} - Returns the Token or Null
 */
const checkAuthorizationToken = (authorization) => {
  let bearerToken = null;
  if (authorization) {
    const token = authorization.split(" ")[1];
    bearerToken = token || authorization;
  }
  return bearerToken;
};

/**
 * Aggregates a search for the access token in a number of places.
 * @private
 * @param {Request} req - The express request object.
 * @memberof AuthMiddleware
 * @returns {string | null} - Returns the Token or Null
 */
const checkToken = (req) => {
  const {
    headers: { authorization },
  } = req;
  const bearerToken = checkAuthorizationToken(authorization);
  return (
    bearerToken ||
    req.headers["x-access-token"] ||
    req.headers.token ||
    req.body.token
  );
};

const authenticate = (req, res, next) => {
  const token = checkToken(req);
  if (!token) {
    return errorResponse(req, res, genericErrors.authRequired);
  }
  try {
    const decoded = verifyToken(token);
    req.data = decoded;
    next();
  } catch (err) {
    errorResponse(req, res, genericErrors.authRequired);
  }
};

const checkIfPhoneNumberExist = async(req, res, next) => {
  try {
    const { phone_number } = req.body;
    const user = await getUserByUserByPhoneNumber(phone_number);
    if (user) {
      return errorResponse(req, res, genericErrors.phoneNumberConflict);
    }
    next();
  } catch (e) {
     e.status = PHONE_NUMBER_CONFLICT();
    moduleErrLogMessager(e);
    return errorResponse(req, res, genericErrors.phoneNumberConflict);
  }
  }

const checkIfUserExist = async (req, res, next) => {
  try {
    let user;
    const { email } = req.body;
    if (req.body.role) {
      user = await fetchAdminByEmail(req.body.email);
    } else {
     user = await getUserByEmail(email);
    }
    if (user) {
      return errorResponse(req, res, genericErrors.emailConflict);
    }
    next();
  } catch (error) {
    error.status = EMAIL_EXIST_VERIFICATION_FAIL;
    moduleErrLogMessager(error);
    return errorResponse(req, res, genericErrors.verificationError);
  }
};

const validateCreateAdminProfile = async(req, res, next) => {
  try {
      await signUpAdminSchema.validateAsync(req.body);
      next();
    } catch (e) {
      const apiError = new ApiError({
        message: e.details[0].message,
        status: 400
      });
      errorResponse(req, res, apiError);
    }
};

const validateUserSignUpProfile = async(req, res, next) => {
  try {
      await createUserSchema.validateAsync(req.body);
      next();
    } catch (e) {
      const apiError = new ApiError({
        message: e.details[0].message,
        status: 400
      });
      errorResponse(req, res, apiError);
    }
};

const validateLoginSchema = async(req, res, next) => {
  try {
      await loginSchema.validateAsync(req.body);
      next();
    } catch (e) {
      const apiError = new ApiError({
        message: e.details[0].message,
        status: 400
      });
      errorResponse(req, res, apiError);
    }
};
/**
   * Validates staff's login credentials, with emphasis on the
   * existence of a user with the provided email address.
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof StaffLoginEmailvalidator
   *
   */
  const loginEmailValidator = async(req, res, next) => {
    try {
      const { email, userType } = req.body;
      let getDetails;
      getDetails = userType === 'Admin' ? fetchAdminByEmail : userType === 'Client' ? getUserByEmail : null;
      const details = await getDetails(email);
      if (!details) {
        logger.error('User not found in in method : loginEmailValidator in middlewares > auth > basic.js')
        return errorResponse(req, res, genericErrors.inValidLogin);
      }
      req.user = details;
      next();
    } catch (e) {
        logger.error(e);
        e.status = `${e} in method : loginEmailValidator in middlewares > auth > basic.js`
        moduleErrLogMessager(e);
        return errorResponse(req, res, genericErrors.verificationError);
    }
  }


export {
  authenticate,
  checkIfUserExist,
  validateCreateAdminProfile,
  validateUserSignUpProfile,
  loginEmailValidator,
  checkIfPhoneNumberExist,
  validateLoginSchema
};
