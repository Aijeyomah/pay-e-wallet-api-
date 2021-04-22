import AdminModel from '../../../models/admin';
import {
  successResponse,
  errorResponse,
  hashPassword,
  compareHash,
  addTokenToUserData,
  regenerateUniqueId,
  ApiError, constants, genericErrors,
} from '../../../utils';
import queries from '../../../db/queries/auth';

const { CREATE_USER_SUCCESSFULLY, LOGIN_USER_SUCCESSFULLY, CREATE_USER_FAILED } = constants;
const { getAdminById } = queries;

/**
 * create an admin.
 *
 * @param { Request } req - The request from the endpoint.
 * @param { Response } res - The response returned by the method.
 * @param { Function } next - Calls the next handler.
 * @returns { JSON } A JSON response with the registered admin's details and a JWT.
 * @memberof authController
 */
const createAdmin = async(req, res, next) => {
  try {
    const { password } = req.body;
    req.body.id = await regenerateUniqueId('ST', getAdminById);
    const { hash, salt } = await hashPassword(password);
    req.body.salt = salt;
    req.body.hash = hash;
    const staff = new AdminModel(req.body);
    const data = await staff.save();
    logger.info(`saving Admin-${req.body.id} details in controllers > auth > index.js`);
    return successResponse(res, {
      status: 201,
      message: CREATE_USER_SUCCESSFULLY,
      data,
    });
  } catch (e) {
    next(new ApiError({ message: CREATE_USER_FAILED, errors: e.message }));
  }
};

/**
 * Logs in a user.
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response with the user's details and a JWT.
 * @memberof authController
 */
const login = async(req, res) => {
  const { user, body } = req;
  const isAuthenticatedUser = compareHash(
    body.password,
    user.password,
    user.salt,
  );
  if (!isAuthenticatedUser) {
    return errorResponse(req, res, genericErrors.inValidLogin);
  }
  // if (!user.is_active) {
  // return errorResponse(req, res, genericErrors.accessRevoked);
  // }
  const data = addTokenToUserData(user, true);
  successResponse(res, { data, message: LOGIN_USER_SUCCESSFULLY });
};

export { createAdmin, login };
