import { APIAxios } from "../config/APIConfig";
import { GET_UPDATE_SETTINGS } from "../config/APIUrls";

// Get interview list
export const getSettings = () => {
  return APIAxios.get(GET_UPDATE_SETTINGS);
};

// Update Settings
export const updateSettings = (payload) => {
  return APIAxios.put(GET_UPDATE_SETTINGS, payload);
};
