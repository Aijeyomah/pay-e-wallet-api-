import { constants, ApiError, genericErrors } from '../../utils';
import { errorResponse } from '../../utils/helpers';

export const adminAccessValidator = (req, res, next) => (req.data.role === 'super' ? next() : errorResponse(req, res, genericErrors.unAuthorized));

/* eslint-disable */
export const roleAccessValidator = (roles, position = 'role') => (req, res, next) => {
  roles.includes(req.data[position]) ?
    next() :
    errorResponse(req, res, new ApiError({
      status: 403,
      message: constants.ROLE_NOT_SUFFICIENT,
    }));
};
