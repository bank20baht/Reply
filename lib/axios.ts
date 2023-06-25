import axios from 'axios';
const BASE_URL = 'http://172.22.104.228:8000/api';

export default axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});
