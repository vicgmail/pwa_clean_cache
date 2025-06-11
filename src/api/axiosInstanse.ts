import axios from 'axios';

import { API_VERSION_SERVER } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_VERSION_SERVER,
  timeout: 30000,
  withCredentials: false,
});

export default axiosInstance;
