import UserModel from '../../../models/user';
import { successResponse, hashPassword, regenerateUniqueId } from '../../../utils/helpers';
import { ApiError, constants, genericErrors } from '../../../utils';
import queries from '../../../db/queries/auth';

const { CREATE_USER_SUCCESSFULLY, CREATE_ADMIN_FAILED } = constants;
const { getUserById } = queries;
const userSignUp = async(req, res, next) => {
  try {
    const { password } = req.body;
    req.body.id = await regenerateUniqueId('USR', getUserById);
    const { hash, salt } = await hashPassword(password);
    req.body.salt = salt;
    req.body.hash = hash;
    const staff = new UserModel(req.body);
    const data = await staff.save();
    logger.info(`saving user-${req.body.id} details in controllers > auth > index.js`);
    return successResponse(res, {
      status: 201,
      message: CREATE_USER_SUCCESSFULLY,
      data,
    });
  } catch (e) {
    logger.error(e);
    next(new ApiError({ message: CREATE_ADMIN_FAILED, errors: e.message }));
  }
};

export { userSignUp };
