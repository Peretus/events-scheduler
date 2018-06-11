import axios from 'axios';
import axiosRetry from 'axios-retry';
import { cantankerousEndpoint } from './secrets';

const axiosInstance = axios.create({
  // baseURL: 'http://dev.dragonflyathletics.com:1337/api/dfkey/',
  baseURL: 'https://dragonfly-cors-defeater.herokuapp.com/',
  auth: {
    username: 'yep, anything!',
    password: 'evalpass',
  },
  timeout: 5000,
  // 'Access-Control-Allow-Origin': '*',
  headers: {
    common: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Target-URL': 'http://dev.dragonflyathletics.com:1337/api/dfkey/',
    },
  },
});

axiosRetry(axiosInstance, { retries: 3 });

export default axiosInstance;
