import UserModel from "../../models/admin";
import { successResponse,errorResponse,hashPassword,compareHash,addTokenToUserData, regenerateUniqueId} from "../../utils/helpers";
import genericErrors from "../../utils/error/generic";
import { ApiError, constants } from "../../utils";
import { fetchAdminById } from '../../services/admin'
import queries from '../../db/queries/auth'
import { loggers } from "winston";

const { CREATE_USER_SUCCESSFULLY, LOGIN_USER_SUCCESSFULLY , CREATE_ADMIN_FAILED} = constants;
const { getAdminById } = queries;
const signUp = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.id = await regenerateUniqueId('ST', getAdminById);
    const { hash, salt } = await hashPassword(password);
    req.body.salt = salt;
    req.body.hash = hash;
    const staff = new UserModel(req.body);
    const data = await staff.save();
    logger.info(`saving Admin-${req.body.id} details in controllers > auth > index.js`)
    return successResponse(res, {
      status: 201 ,
      message: CREATE_USER_SUCCESSFULLY,
      data: data
    });
  } catch (e) {
    logger.error(`error saving user in controllers > auth > index.js`)
   next(new ApiError({message: CREATE_ADMIN_FAILED, errors: e.message }));
  }
};

const login = async (req, res) => {
  const { user, body } = req;
  const isAuthenticatedUser = compareHash(
    body.password,
    user.password,
    user.salt
  );
  if (!isAuthenticatedUser) {
    return errorResponse(req, res, genericErrors.inValidLogin);
  }
  if (!user.is_active)
    return errorResponse(req, res, genericErrors.accessRevoked);
  const data = addTokenToUserData(user, true);
  successResponse(res, { data, message: LOGIN_USER_SUCCESSFULLY });
};

export { signUp , login };
