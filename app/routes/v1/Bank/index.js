import { Router } from 'express';
import {
  fetchAllBanks, confirmAccountDetails, verifyBankAccountDetails, connectCard,
} from '../../../controllers/user/transaction';
import { checkIfAccountNumberIsInUse, getUserTransferRecipient, verifyPaymentTransaction } from '../../../middlewares/user/transaction';
import { loginEmailValidator } from '../../../middlewares/auth';

const router = Router();

router.get(
  '/all',
  fetchAllBanks,
);

router.post(
  '/verify-details',
  checkIfAccountNumberIsInUse,
  verifyBankAccountDetails,
);

router.post(
  '/confirm-details',
  loginEmailValidator,
  checkIfAccountNumberIsInUse,
  getUserTransferRecipient,
  confirmAccountDetails,
);

router.post(
  '/connect-card/:reference',
  verifyPaymentTransaction,
  connectCard,
);

export default router;
