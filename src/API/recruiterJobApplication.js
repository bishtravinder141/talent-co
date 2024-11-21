import { APIAxios, FormAxios, authAxios } from "../config/APIConfig";
import {
  DECLINE_CANDIDATE,
  DELETE_HIRED_JOB_APPLICATION,
  GET_ALL_JOB_COUNT,
  GET_HIRED_JOB_LIST,
  GET_JOB_APPLICATION,
  GET_RECOMMENDED_JOB,
  HIRE_CANDIDATE,
  POST_INTERVIEW_RATING,
  SCHEDULE_CANDIDATE_INTERVIEW,
  SEND_INVITATIONS_FOR_APPLY,
  SHORT_LIST_CANDIDATE,
  SIMILARJOBS,
} from "../config/APIUrls";

// Get recommended jobs application
export const getRecommendedJobs = (param) => {
  return APIAxios.get(`${GET_RECOMMENDED_JOB}?${param}`);
};

// Get jobs filtred job data
export const getFilteredJobData = (param) => {
  return APIAxios.get(`${GET_RECOMMENDED_JOB}?${param}`);
};

// Get All job application
export const getJobApplications = (param) => {
  return APIAxios.get(`${GET_JOB_APPLICATION}${param}`);
};

// Get hired job application
export const getHiredJobApplications = (param) => {
  return APIAxios.get(`${GET_HIRED_JOB_LIST}${param}`);
};

// Post candidate interview rating
export const postInterviewRating = (payload) => {
  return APIAxios.post(POST_INTERVIEW_RATING, payload);
};

// Send invitations for apply api
export const sendJobInvitationsApi = (payload) => {
  return APIAxios.post(SEND_INVITATIONS_FOR_APPLY, payload);
};

// Shortlist appllied candidate api
export const shortListCandidateApi = (param = 1, payload) => {
  return APIAxios.patch(`${SHORT_LIST_CANDIDATE}${param}`, payload);
};

// Scheduled candidate interview api
export const scheduleCandidateInterviewApi = (payload) => {
  return APIAxios.post(SCHEDULE_CANDIDATE_INTERVIEW, payload);
};
// Re-Scheduled candidate interview api
export const rescheduleCandidateInterviewApi = (id, payload) => {
  return APIAxios.patch(`${SCHEDULE_CANDIDATE_INTERVIEW}${id}/`, payload);
};

// Hire candidate for apply api
export const hireCandidateApi = (payload) => {
  return FormAxios.post(HIRE_CANDIDATE, payload);
};

// Declined candidate for job application api
export const declineCandidateProfileApi = (payload) => {
  return APIAxios.post(DECLINE_CANDIDATE, payload);
};

// Get counts of the jobs
export const getCountOfAllJobs = () => {
  return APIAxios.get(`${GET_ALL_JOB_COUNT}`);
};

// Delete hired application
export const deleteHiredJobApplication = (id) => {
  return APIAxios.delete(`${DELETE_HIRED_JOB_APPLICATION}${id}`);
};


//similar jobs
export const getSimilarJobs = () => {
  return APIAxios.get(SIMILARJOBS);
}