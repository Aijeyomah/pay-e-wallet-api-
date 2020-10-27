import { genericErrors, constants, ApiError } from "../../utils";
import { errorResponse, verifyToken } from '../../utils/helpers';


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
}

export { authenticate };