import axios from 'axios';

// Auto-detect API URL based on environment
const BASE_URL = import.meta.env.VITE_API_URL || '';

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response interceptor for error handling
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getSchemes = (params) => API.get('/schemes', { params });
export const getScheme = (id) => API.get(`/schemes/${id}`);
export const checkEligibility = (data) => API.post('/schemes/check-eligibility', data);
export const createScheme = (data) => API.post('/schemes', data);
export const updateScheme = (id, data) => API.put(`/schemes/${id}`, data);
export const deleteScheme = (id) => API.delete(`/schemes/${id}`);