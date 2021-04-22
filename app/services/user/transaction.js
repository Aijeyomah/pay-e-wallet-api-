import axios from 'axios';
import config from '../../../config/env';
import { moduleErrLogMessager } from '../../utils/helpers';

const baseUrl = 'https://api.paystack.co';
const configData = {
  headers: {
    authorization: `Bearer ${config.PAYSTACK_API_KEY}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache',
  },
};
/**
 * fetch all available banks
 * @returns {object} - all available bank data
 */
export const getAllBanks = async() => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/bank`,
  };
  const { data } = await axios(options);
  return data;
};

/**
 * verify the bank account number against the bank
 * @param {number} bankCode - the bank code
 * @param {number} accountNumber - the customer's account number
 * @returns {JSON} - A JSON response with the user's bank details if successful or an error message
 */
export const verifyBankAccount = async({ bankCode, accountNumber }) => {
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      configData,
    };
    const data = await axios(options);
    return data;
  } catch (e) {
    moduleErrLogMessager(e);
  }
};

/**
 * verify the bank account number against the bank
 * @param {string} payment_ref - a payment reference returned from paystack after initializing payment
 * @returns {JSON} - A JSON response with the user's bank details if successful or an error message
 */
export const verifyTransaction = async(payment_ref) => {
  try {
    const url = `${baseUrl}/transaction/verify/${payment_ref}`;

    const result = await axios.get(url, configData);
    return result.data;
  } catch (e) {
    moduleErrLogMessager(e);
  }
};

/**
* get transfer recipient
* @param {string} account_number - deposit  Account number of the user
* @param {string} bank_code - A code representing the user's bank
* @returns {JSON} - A JSON response with the user's bank details if successful or an error message
 */
export const transferRecipient = async(account_number, bank_code) => {
  try {
    const url = 'https://api.paystack.co/transferrecipient';
    const result = await axios.post(
      url, { account_number, bank_code },
      configData,
    );
    return result.data;
  } catch (e) {
    moduleErrLogMessager(e);
  }
};

/**
  * get transfer recipient
  * @returns {JSON} - A JSON response with the user's bank details if successful or an error message
 */
export const chargeAuth = async({ amount, email, authorization_code }) => {
  try {
    // convert amount fromm naira to kobo
    amount *= 100;
    const url = 'https://api.paystack.co/transferrecipient';
    const result = await axios.post(
      url, { amount, email, authorization_code },
      configData,
    );
    return result.data;
  } catch (e) {
    moduleErrLogMessager(e);
  }
};
