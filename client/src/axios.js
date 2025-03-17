import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: api_url,
  withCredentials: true 
});
