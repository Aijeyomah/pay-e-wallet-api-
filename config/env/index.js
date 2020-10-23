import rootPath from 'app-root-path';
import development from './development';
import test from './test';

const {
  E_WALLET_PORT: PORT,
  E_WALLET_POSTGRES_NODE_ENV: NODE_ENV,
  E_WALLET_SECRET: SECRET,
} = process.env;

const currentEnv = {
  development,
  test,
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  PORT,
  SECRET,
  rootPath,
};
