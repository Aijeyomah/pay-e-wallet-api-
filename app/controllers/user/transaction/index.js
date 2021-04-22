import { WithdrawalModel } from '../../../models';
import DepositModel from '../../../models/user.deposit.account';
import {
  getAllBanks,
  constants,
  ApiError,
  verifyBankAccount,
  genericErrors,
} from '../../../utils';
import { successResponse, errorResponse, compareHash } from '../../../utils/helpers';

const {
  BANK_DATA,
  ERROR_FETCHING_BANK_DETAILS,
  ERROR_VERIFYING_BANK_ACCOUNT,
  SUCCESSFULLY_VERIFIED_BANK_DETAILS,
  SUCCESSFULLY_SAVED_ACCOUNT_NUMBER,
  SUCCESSFULLY_CONNECTED_CARD,
  ERROR_SAVING_ACCOUNT_NUMBER,
  ERROR_CONNECTING_CARD,
} = constants;

/**
 * Fetch all available banks.
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param { Function } next - Calls the next handler.
 * @returns { JSON } A JSON response with bank names and code.
 * @memberof bankController
 */
const fetchAllBanks = async(req, res, next) => {
  try {
    const { data } = await getAllBanks();
    const result = data.map(async(bank) => {
      const { name, code } = await bank;
      return { name, code };
    });

    const banksData = await Promise.all(result);
    return successResponse(res, {
      status: 201,
      message: BANK_DATA,
      data: banksData,
    });
  } catch (e) {
    logger.error(e);
    next(new ApiError({ message: ERROR_FETCHING_BANK_DETAILS, errors: e.message }));
  }
};

/**
 * verify user banka account
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param { Function } next - Calls the next handler.
 * @returns { JSON } A JSON response paystack success response or error.
 * @memberof bankController
 */
const verifyBankAccountDetails = async(req, res, next) => {
  try {
    const { code, account_number } = req.body;
    const data = await verifyBankAccount(code, account_number);
    if (data) {
      return successResponse(res, {
        status: 201,
        message: SUCCESSFULLY_VERIFIED_BANK_DETAILS,
        data,
      });
    }
    return errorResponse(req, res, genericErrors.errorVerifyingAccount);
  } catch (e) {
    logger.error(e);
    next(new ApiError({ message: ERROR_VERIFYING_BANK_ACCOUNT, errors: e.message }));
  }
};

/**
 * confirm  user bank account details.
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param { Function } next - Calls the next handler.
 * @returns { JSON } A JSON response .
 * @memberof bankController
 */
const confirmAccountDetails = async(req, res, next) => {
  try {
    const { user, body, data } = req;
    const { recipient_code, bank_name } = data;
    const isAuthenticatedUser = compareHash(
      body.password,
      user.password,
      user.salt,
    );
    if (!isAuthenticatedUser) {
      return errorResponse(req, res, genericErrors.invalidPasswordMatch);
    }
    const bank = await new WithdrawalModel({
      ...body,
      recipient_code,
      bank_name,
      user_id: user.id,
    });
    await bank.saveUser();
    successResponse(res, { message: SUCCESSFULLY_SAVED_ACCOUNT_NUMBER });
  } catch (e) {
    logger.error(e);
    next(new ApiError({ message: ERROR_SAVING_ACCOUNT_NUMBER, errors: e.message }));
  }
};

/**
 * connect a user's card to the payment gateway.
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param { Function } next - Calls the next handler.
 * @returns { JSON } A JSON response .
 * @memberof bankController
 */
const connectCard = async(req, res, next) => {
  try {
    const { data, params, cardData } = req;
    const { id: user_id } = data;
    const { reference } = params;
    const card = new DepositModel({ ...cardData, reference, user_id });
    const cardDetails = await card.save();
    successResponse(res, { message: SUCCESSFULLY_CONNECTED_CARD, data: cardDetails });
  } catch (e) {
    logger.error(e);
    next(new ApiError({ message: ERROR_CONNECTING_CARD, errors: e.message }));
  }
};

export {
  fetchAllBanks, verifyBankAccountDetails, confirmAccountDetails, connectCard,
};
