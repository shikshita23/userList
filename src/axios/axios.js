import axios from "axios";
import { BASE_URL } from "../constants/constant";

const axiosNoAuth = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
  });

export default axiosNoAuth;