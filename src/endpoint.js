import axios from 'axios';
import { cantankerousEndpoint } from './secrets';

const axiosInstance = axios.create({
  // baseURL: 'http://dev.dragonflyathletics.com:1337/api/dfkey/',
  baseURL: 'https://dragonfly-cors-defeater.herokuapp.com/',
  auth: {
    username: 'yep, anything!',
    password: 'evalpass',
  },
  // 'Access-Control-Allow-Origin': '*',
  headers: {
    common: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Target-URL': 'http://dev.dragonflyathletics.com:1337/api/dfkey/',
    },
  },
});

export default axiosInstance;
