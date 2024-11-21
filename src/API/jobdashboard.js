import { APIAxios } from "../config/APIConfig";
import { GET_JOB_LIST, GET_JOB_LIST_WITH_COUNT } from "../config/APIUrls";

export const getJobList = (param) => {
  return APIAxios.get(`${GET_JOB_LIST}${param}`);
};

export const getJobListWithJobCount = (param) => {
  return APIAxios.get(`${GET_JOB_LIST_WITH_COUNT}${param}`);
};

export const updateJob = (param, payload) => {
  return APIAxios.patch(`${GET_JOB_LIST}${param}/`, payload);
};
