import { Router } from 'express';
import { fetchAllBanks } from '../../../controllers/user/bank';

const router = Router();

router.get(
  '/all',
  fetchAllBanks,
);
export default router;
