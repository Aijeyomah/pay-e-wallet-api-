import axios from 'axios';
import config from '../../config/env';

const baseUrl = 'https://api.paystack.co';

const getAllBanks = async() => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/bank`,
  };
  const { data } = await axios(options);
  return data;
};

const verifyBankAccount = async(bankCode, accountNumber) => {
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      headers: {
        authorization: `Bearer ${config.PAYSTACK_API_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    };
    const data = await axios(options);
    return data.data;
  } catch (e) {

  }
};

export { getAllBanks, verifyBankAccount };
