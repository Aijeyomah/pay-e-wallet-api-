import authRoute from '../admin/auth';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoute);

export default router;
