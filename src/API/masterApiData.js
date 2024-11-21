import { list } from "postcss";
import { APIAxios, authAxios } from "../config/APIConfig";
import { GET_FILTERS_LIST, LOGOUT_USER } from "../config/APIUrls";
import {
  DELETE_NOTIFICATION,
  GET_ALL_NOTIFICATION,
  GET_JOB_TITLE_LISTING,
  GET_LANGUAGES,
  GET_RECRUITER_FILTERS_LIST,
  GET_SALARY_CURRENCY,
  GET_SKILL_LIST,
  GET_TIME_ZONE_LIST,
  GET_UNREAD_MESSAGE,
  UPDATE_NOTIFICATION_STATUS,
} from "../config/MasterAPIUrls";

// Get filters pre field list data
export const getFilterItems = () => {
  return APIAxios.get(`${GET_FILTERS_LIST}`);
};

// Get Filter list data for recruiter side
export const getRecruiterFilterList = () => {
  return APIAxios.get(`${GET_RECRUITER_FILTERS_LIST}`);
};

// Get time-zone data
export const getTimeZoneListing = () => {
  return APIAxios.get(GET_TIME_ZONE_LIST);
};

// Get job-title listing
export const getJobTitles = () => {
  return APIAxios.get(GET_JOB_TITLE_LISTING);
};

// Logout user
export const logout = (payload) => {
  return APIAxios.post(LOGOUT_USER, payload);
};

//Get Languages
export const getMasterLanguages = () => {
  return APIAxios.get(GET_LANGUAGES);
};

// get currency list
export const getSalaryCurrency = () => {
  return APIAxios.get(GET_SALARY_CURRENCY);
};

// get Skills list
export const getAllSkills = () => {
  return APIAxios.get(GET_SKILL_LIST);
};

// get all notifications
export const getAllNotification = (query) =>{
  return APIAxios.get(`${GET_ALL_NOTIFICATION}?${query}`);
}

// get all unread notification
export const getAllUnreadNotification = () =>{
  return APIAxios.get(GET_UNREAD_MESSAGE)
}

// Update the notification status
export const updateNotificationStatus = (id,payload) =>{
  return APIAxios.patch(`${UPDATE_NOTIFICATION_STATUS}${id}/`, payload)
}

//delete notification
export const deleteNotification = (id) => {
  return APIAxios.delete(`${DELETE_NOTIFICATION}${id}/`)
}