import axios from 'axios';
import { getAllBanks, constants, ApiError } from '../../../utils';
import { successResponse } from '../../../utils/helpers';

const { BANK_DATA, ERROR_FETCHING_BANK_DETAILS } = constants;
const fetchAllBanks = async(req, res) => {
  try {
    const { data } = await getAllBanks();
    const result = data.map(async(bank) => {
      const banks = await bank.name;
      return banks;
    });

    const banksName = await Promise.all(result);
    return successResponse(res, {
      status: 201,
      message: BANK_DATA,
      data: banksName,
    });
  } catch (e) {
    logger.error(e);
    next(new ApiError({ message: ERROR_FETCHING_BANK_DETAILS, errors: e.message }));
  }
};
export { fetchAllBanks };
