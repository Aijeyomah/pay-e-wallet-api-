import ApiError from './api.error';
import constants from '../constants';

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_API,
  AUTH_REQUIRED,
  INVALID_PERMISSION,
  INVALID_CREDENTIALS,
  ACCESS_REVOKED,
  EMAIL_CONFLICT,
  EMAIL_EXIST_VERIFICATION_FAIL_MSG,
  PHONE_NUMBER_CONFLICT,
  INVALID_PASSWORD_MATCH,
  ACCOUNT_NUMBER_CONFLICT,
  INVALID_ACCOUNT_NUMBER,
  ERROR_VERIFYING_BANK_ACCOUNT,
} = constants;

export default {
  serverError: new ApiError({ message: INTERNAL_SERVER_ERROR, status: 500 }),
  notFoundApi: new ApiError({ message: NOT_FOUND_API, status: 404 }),
  unAuthorized: new ApiError({ message: INVALID_PERMISSION, status: 403 }),
  accessRevoked: new ApiError({ message: ACCESS_REVOKED, status: 403 }),
  inValidLogin: new ApiError({ message: INVALID_CREDENTIALS, status: 401 }),
  conflictSignupError: new ApiError({ message: INVALID_CREDENTIALS, status: 409 }),
  authRequired: new ApiError({ message: AUTH_REQUIRED, status: 401 }),
  emailConflict: new ApiError({ status: 409, message: EMAIL_CONFLICT }),
  phoneNumberConflict: new ApiError({ status: 409, message: PHONE_NUMBER_CONFLICT() }),
  verificationError: new ApiError({ message: EMAIL_EXIST_VERIFICATION_FAIL_MSG }),
  invalidPasswordMatch: new ApiError({ status: 401, message: INVALID_PASSWORD_MATCH }),
  accountNumberConflict: new ApiError({ status: 409, message: ACCOUNT_NUMBER_CONFLICT }),
  invalidAccountNumber: new ApiError({ status: 409, message: INVALID_ACCOUNT_NUMBER }),
  errorVerifyingAccount: new ApiError({ status: 401, message: ERROR_VERIFYING_BANK_ACCOUNT }),
  paystackError: (paystackMsg) => new ApiError({ status: 401, message: paystackMsg }),
};
