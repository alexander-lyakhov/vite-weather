import axios from 'axios';
import { flags } from '@/utils'

axios.defaults.baseURL = 'https://cinema-api-test.y-media.io/v1';

axios.interceptors.request.use(
  (config) => {
    flags.isLoading = true;
    return config;
  },

  (err) => {
    flags.isLoading = false;
  },
);

axios.interceptors.response.use(
  (res) => {
    flags.isLoading = false;
    return res.data?.data
  },
  (err) => {
    flags.isLoading = false;
    console.log('-- AXIOS --', err)
    return Promise.reject(err.response || { statusText: err.message })
  }
);

export default axios;
