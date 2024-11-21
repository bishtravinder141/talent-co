import { APIAxios, FormAxios } from "../config/APIConfig";
import {
  GET_MASTER_JOB_API,
  JOB_API_ENDPOINT,
  GET_SUBSCRIPTION_PLAN_LIST,
  RECRUITER_DASHBOARD,
  PLANFEATURES,
  UPCOMINGINTERVIEWS,
  UPGRADESUBSCRIPTION
} from "../config/APIUrls";

export const getMasterJobData = () => {
  return APIAxios.get(GET_MASTER_JOB_API);
};

export const createSingleJob = (payload) => {
  return APIAxios.post(JOB_API_ENDPOINT, payload);
};

export const getSingleJobPostData = (id) => {
  return APIAxios.get(`${JOB_API_ENDPOINT}${id}`);
};

export const updateJobById = (payload, id) => {
  return APIAxios.patch(`${JOB_API_ENDPOINT}${id}/`, payload);
};

export const getAllPlansApi = () => {
  return APIAxios.get(GET_SUBSCRIPTION_PLAN_LIST);
}

export const getRecuiterDashboardHeaderData = ()=> {
  return APIAxios.get(RECRUITER_DASHBOARD);
}

export const getPlanFeatures = ()=>{
  return APIAxios.get(PLANFEATURES);
}
//get upcoming interviews
export const getUpcomingInterviews = (query) => {
  //getting page size in query i.e 4
  return APIAxios.get(`${UPCOMINGINTERVIEWS}?${query}`);

}

//upgrade subscription
export const upgradeSubscription = (payload) => {
  return APIAxios.post(UPGRADESUBSCRIPTION,payload);
}