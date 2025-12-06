import axios from "axios";
import { API_BASE_URL } from "./Config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
