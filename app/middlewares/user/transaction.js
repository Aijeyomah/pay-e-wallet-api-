import { genericErrors } from '../../utils';
import { errorResponse, moduleErrLogMessager } from '../../utils/helpers';
import { getWalletAccountByAccountNumber } from '../../services/user';
import { transferRecipient, verifyTransaction, chargeAuth } from '../../services/user/transaction';

/**
 * check if account number is in use
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Function} next - A call to the next handler
 * @returns { JSON } A JSON response with the user's details and a JWT.
 * @memberof transactionMiddleware
 */
export const checkIfAccountNumberIsInUse = async(req, res, next) => {
  try {
    const { account_number } = req.body;
    const data = await getWalletAccountByAccountNumber(account_number);
    if (data) {
      return errorResponse(req, res, genericErrors.accountNumberConflict);
    }
    next();
  } catch (e) {
    logger.error(e);
    moduleErrLogMessager(e);
    return errorResponse(req, res, genericErrors.accountNumberConflict);
  }
};

/**
 * verify payment transaction
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Function} next - A call to the next handler
 * @returns { JSON } A error response an error or an object containing the user's details
 * @memberof transactionMiddleware
 */
export const verifyPaymentTransaction = async(req, res, next) => {
  try {
    const { reference } = req.params;
    const bankDetails = await verifyTransaction(reference);
    if (bankDetails.status && bankDetails.data.status !== 'success') {
      return errorResponse(req, res, genericErrors.paystackError(bankDetails.data.gateway_response));
    }
    const {
      id, customer_code, email, first_name, last_name,
    } = bankDetails.data.customer;
    const {
      authorization_code, last4, card_type, signature, exp_month, exp_year,
    } = bankDetails.data.authorization;
    const fullName = `${first_name} ${last_name}`;
    const expiryDate = `${exp_month}/${exp_year.slice(-2)}`;
    const details = {
      id, customer_code, email, fullName, authorization_code, last4, card_type, signature, expiryDate,
    };
    req.cardData = details;
    next();
  } catch (e) {
    moduleErrLogMessager(e);
  }
};

/**
 * get user transfer recipient code
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Function} next - A call to the next handler
 * @returns { JSON } A JSON response with the user's details and a JWT.
 * @memberof transactionMiddleware
 */
export const getUserTransferRecipient = async(req, res, next) => {
  try {
    const { account_name, account_number, bank_code } = req.body;
    const result = await transferRecipient(account_number, bank_code);
    if (result.status) {
      const { recipient_code, details: { bank_name } } = result.data;
      const userData = {
        account_number,
        bank_code,
        recipient_code,
        bank_name,
        account_name,
      };
      req.data = userData;
      return next();
    }
    return errorResponse(req, res, genericErrors.paystackError(result.data.gateway_response));
  } catch (e) {
    moduleErrLogMessager(e);
    next(e);
  }
};

/**
 * charge Authorization
 *
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Function} next - A call to the next handler
 * @returns { JSON } A JSON response with the user's details and a JWT.
 * @memberof transactionMiddleware
 */
export const chargeAuthorization = async(req, res, next) => {
  try {
    const { amount, email, authorization_code } = req.body;
    const data = await chargeAuth({ amount, email, authorization_code });
    if (data.data.status && data.data.data.status !== 'success') {
      return errorResponse(req, res, genericErrors.paystackError(data.data.gateway_response));
    }
    req.data = data;
    next();
  } catch (e) {
    moduleErrLogMessager(e);
    next(e);
  }
};
