// src/api/axiosPrivate.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
