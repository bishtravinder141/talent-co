import axios from "axios";
import { REFRESH_TOKEN } from "./APIUrls";
export const baseURL = `${process.env.VITE_APP_BASE_URL}`;
const refreshToken = localStorage.getItem("refresh_token");
export const APPLICATION_BASE_URL = process.env.VITE_APP_BASE_WEBSITE_URL
export const goolgeMapApi = process.env.VITE_GOOGLE_MAP_API


const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
});

const APIAxios = axios.create({
  baseURL: baseURL,
});

APIAxios.interceptors.request.use((config) => {
  let token = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "Token";
  config.headers["content-type"] = "application/json";
  config.headers["Authorization"] = token;

  return config;
});


APIAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      authAxios
        .post(REFRESH_TOKEN, refreshToken)
        .then((res) => {
          localStorage.setItem("token", res.data.data.access);
          localStorage.setItem("refresh_token", res.data.data.refresh);
          const { config: oldRequest } = error;
          // retrigger old request
          authAxios
            .request({ ...oldRequest })
            .then((res) => {
              return res;
            })
            .catch((err) => {
              return err;
            });
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          persistStore(reduxStore).purge();
          window.location.href = "/";
        });
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const FormAxios = axios.create({
  baseURL: baseURL,
});
FormAxios.interceptors.request.use((config) => {
  let token = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "Token";
  config.headers["content-type"] = "multipart/form-data";
  config.headers["Authorization"] = token;

  return config;
});

export { APIAxios, authAxios, FormAxios };
