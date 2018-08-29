import axios from 'axios';
import StorageUtil from './storage';

const getTokenFromStorage = () => StorageUtil.getToken();

export default axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization: `Bearer ${getTokenFromStorage()}`,
  },
});
