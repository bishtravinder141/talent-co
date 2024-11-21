import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL:`${process.env.VITE_APP_BASE_URL}`,

});

let token = localStorage.getItem("token")
? `Bearer ${localStorage.getItem("token")}`
: "Token";
// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers["content-type"] = "application/json";
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response.data?.message || "Something went wrong";
    console.log(error,"ins")
    toast.error(message);
    return Promise.reject(error);
  }
);

export default instance;