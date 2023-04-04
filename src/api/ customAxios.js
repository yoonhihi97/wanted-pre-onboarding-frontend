import axios from "axios";
import { API_URL } from "constants";

const customAxios = axios.create({
  baseURL: `${API_URL}`,
});

customAxios.interceptors.request.use(
  async (config) => {
    config.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default customAxios;
