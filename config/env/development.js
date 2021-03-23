import 'dotenv/config';

export default {
  DATABASE_URL: process.env.E_WALLET_POSTGRES_DEV_URL,
  PAYSTACK_API_KEY: process.env.E_WALLET_PAYSTACK_API_KEY,
};
