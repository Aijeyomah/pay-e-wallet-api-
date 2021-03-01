import { loggers } from "winston";
import { constants, ApiError } from "../../utils";
import { errorResponse } from '../../utils/helpers'


export const adminAccessValidator = (req, res, next) => {
    return req.data.role === 'super' ?   next() : errorResponse(req, res, genericErrors.unAuthorized);
};

export const roleAccessValidator = (roles, position = 'role') => {
    return ( req, res, next) => {
        roles.includes(req.data[position]) ?
            next()
            : errorResponse(req, res, new ApiError({
                status: 403,
                message: constants.ROLE_NOT_SUFFICIENT
            }))
      
    };

}

