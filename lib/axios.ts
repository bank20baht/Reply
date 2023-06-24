import axios from 'axios';
const BASE_URL = 'http://192.168.0.100:8000/api';

export default axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});
