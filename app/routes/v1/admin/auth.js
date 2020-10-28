import { Router } from "express";
import { checkIfUserExist, validateCreateUserProfile } from '../../../middlewares/auth/basic';
import { } from '../../../utils/helpers';
import { signUp } from '../../../controllers/auth/index';


const router = Router();
router.post(
  "/signup",
  validateCreateUserProfile,
  checkIfUserExist,
  signUp
);


export default router;
