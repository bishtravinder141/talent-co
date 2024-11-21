import { APIAxios } from "../config/APIConfig";
import { GET_INTERVIEWS } from "../config/APIUrls";

// Get interview list
export const getInterview = (param) => {
  return APIAxios.get(`${GET_INTERVIEWS}${param}`);
};
