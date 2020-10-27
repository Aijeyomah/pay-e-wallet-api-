export default {
  SUCCESS_RESPONSE: 'Request was successfully processed',
  ACCESS_REVOKED: 'Your access has been revoked',
  EMAIL_CONFLICT: 'A user with your email already exists',
  DB_ERROR: 'A database error occurred, either in redis or postgres',
  CREATE_USER_SUCCESSFULLY: 'user created successfully',
  CREATE_USER_FAILED: 'Error registering user',
  LOGIN_USER_SUCCESSFULLY: 'Successfully logged in user',
  NOT_FOUND_API: 'Oops, You have reached a dead end',
  INVALID_PERMISSION:
    'Permission denied. Current user does not have the required permission to access this resource.',
  INTERNAL_SERVER_ERROR: 'Oops, something broke on the server!!!',
  INVALID_CREDENTIALS: 'Invalid email/password',
  AUTH_REQUIRED: 'Access denied,a valid access token is required',
};
