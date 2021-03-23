import axios from 'axios';
import config from '../../config/env';

const baseUrl = 'https://api.paystack.co';
const getAllBanks = async() => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/bank`,
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
  };
  const { data } = await axios(options);
  return data;
};

export { getAllBanks };
