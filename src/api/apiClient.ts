// src/api/apiClient.ts
import axios, { AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Add request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
