import axios from 'axios';
import axiosRetry from 'axios-retry';
import {
  cantankerousEndpoint,
  username,
  password,
  corsDefeater,
} from './secrets';

const axiosInstance = axios.create({
  baseURL: corsDefeater,
  auth: {
    username,
    password,
  },
  timeout: 5000,
  headers: {
    common: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Target-URL': cantankerousEndpoint,
    },
  },
});

axiosRetry(axiosInstance, { retries: 3 });

export default axiosInstance;
