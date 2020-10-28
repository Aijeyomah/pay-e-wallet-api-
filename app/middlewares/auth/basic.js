import { genericErrors, constants, ApiError } from "../../utils";
import { errorResponse, moduleErrLogMessager, verifyToken } from "../../utils/helpers";
import { fechUserByEmail } from '../../services/user';
import { signUpSchema } from "../../validations/index";


const { STAFF_EMAIL_EXIST_VERIFICATION_FAIL } = constants;
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

const checkIfUserExist = async (req, res, next) => {
  try {
    const user = await fechUserByEmail(req.body.email);
    if (user) {
      return errorResponse(req, res, genericErrors.emailConflict);
    }
    next();
  } catch (error) {
    error.status = STAFF_EMAIL_EXIST_VERIFICATION_FAIL;
    moduleErrLogMessager(error);
    return errorResponse(req, res, genericErrors.verificationError);
  }
};

const validateCreateUserProfile = async(req, res, next) => {
  try {
      await signUpSchema.validateAsync(req.body);
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
  const StaffLoginEmailvalidator = async(req, res, next) => {
    try {
      const userDetail = await fechUserByEmail(req.body.email);
      if (!userDetail) {
        return errorResponse(req, res, genericErrors.inValidLogin);
      }
      req.user = userDetail;
      next();
    } catch (e) {
      e.status = constants.STAFF_EMAIL_EXIST_VERIFICATION_FAIL;
      moduleErrLogMessager(e);
      return errorResponse(req, res, genericErrors.verificationError);
    }
  }


export {
  authenticate,
  checkIfUserExist,
  validateCreateUserProfile,
  StaffLoginEmailvalidator
};
