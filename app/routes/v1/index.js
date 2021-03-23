import { Router } from 'express';
import authRoute from './auth';
import bankRoute from './Bank';
import { authenticate } from '../../middlewares/auth';

const router = Router();

router.use('/auth', authRoute);
router.use('/banks', authenticate, bankRoute);

export default router;
