import UserModel from "../../models/user";
import {
  successResponse,
  errorResponse,
  hashPassword,
  compareHash,
  addTokenToUserData,
} from "../../utils/helpers";
import genericErrors from "../../utils/error/generic";
import { constants } from "../../utils";

const { CREATE_USER_SUCCESSFULLY, LOGIN_USER_SUCCESSFULLY } = constants;

const signUp = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { hash, salt } = await hashPassword(password);
    req.body.salt = salt;
    req.body.hash = hash;
    const staff = new UserModel(req.body);
    const { id, first_name, last_name, email, role } = await staff.save();
    return successResponse(res, {
      message: CREATE_USER_SUCCESSFULLY,
      data: { id, first_name, last_name, email, role },
      code: 201,
    });
  } catch (e) {
    next(errorResponse(req, res, genericErrors.errorCreatingStaff));
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
