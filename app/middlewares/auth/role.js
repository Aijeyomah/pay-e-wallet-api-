import { genericErrors, constants, ApiError } from "../../utils";
import { errorResponse } from '../../utils/helpers'


const roleValidator = (req, res, next) => {
    return req.data.role === 'super' ? next() : errorResponse(req, res, genericErrors.unAuthorized);
};



