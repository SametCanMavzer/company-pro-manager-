import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL'i gerçek API endpointinizle değiştirin
const BASE_URL = 'https://operatorip.tripkolic.com/api';
console.log('API Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cevap interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Hata işleme
    return Promise.reject(error);
  }
);

export default api; 