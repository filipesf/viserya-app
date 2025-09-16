import axios from 'axios';
import { AUTHORIZATION_KEY } from '@viserya/config/constants';

// Helper function to get the base URL dynamically
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/`;
  } else {
    return `https://${process.env.HOST || 'viserya-app.vercel.app'}/api/`;
  }
};

// Create the axios instance with dynamic baseURL
export const viseryaApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    AUTHORIZATION_KEY: AUTHORIZATION_KEY,
  },
});
