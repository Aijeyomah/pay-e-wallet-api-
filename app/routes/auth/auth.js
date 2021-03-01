import { Router } from 'express';
import { checkIfUserExist, checkIfPhoneNumberExist, validateCreateAdminProfile, validateUserSignUpProfile, validateLoginSchema, loginEmailValidator, roleAccessValidator, authenticate } from '../../middlewares/auth';
import { } from '../../utils/helpers';
import { createAdmin, login } from '../../controllers/Admin/auth/index';
import { userSignUp } from '../../controllers/user/auth/index';
import { adminAccessValidator } from '../../middlewares/auth/role';

const router = Router();
router.post(
  '/create-admin',
  authenticate,
  roleAccessValidator(['super_admin']),
  validateCreateAdminProfile,
  checkIfUserExist,
  createAdmin
);

router.post(
  '/register',
  validateUserSignUpProfile,
  checkIfPhoneNumberExist,
  checkIfUserExist,
  userSignUp
);

router.post(
  '/login',
  validateLoginSchema,
  loginEmailValidator,
  login
);

export default router;
