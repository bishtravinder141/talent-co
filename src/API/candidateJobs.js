import { APIAxios, FormAxios } from "../config/APIConfig";
import {  CHAT_ROOMS, DELETE_ACCOUNT, JOB_ALERT_SETTINGS, JOB_SEEKER_APPLIED__JOB, JOB_SEEKER_APPLY_FOR_JOB, JOB_SEEKER_INTERVIEW_LIST, JOB_SEEKER_JOB_DETAIL, JOB_SEEKER_RECOMMENDED_JOB, JOB_SEEKER_SAVED_REJECTED_JOB, JOB_SEEKER_TOP_COMPANIES, JOB_SEEKER_TOP_JOBS } from "../config/APIUrls";

// Get Recommended jobs
export const getCandidateRecommendedJobs = (param) => {
  return APIAxios.get(`${JOB_SEEKER_RECOMMENDED_JOB}?${param}`);
};

// Get details of job
export const getCandidateJobDetails = (id) => {
  return APIAxios.get(`${JOB_SEEKER_JOB_DETAIL}${id}/`);
}

// Candidate apply job
export const candidateApplyJob = (payload) => {
  return APIAxios.post(JOB_SEEKER_APPLY_FOR_JOB, payload);
}

// Get saved and rejected job list
export const getCandidateSavedRejectedJobs = (param)=>{
  return APIAxios.get(`${JOB_SEEKER_SAVED_REJECTED_JOB}?${param}`);
}

// for updating job status
export const updateJobStatus=(payload)=>{
  return APIAxios.post(JOB_SEEKER_SAVED_REJECTED_JOB,payload);
}

// Get applied job list
export const getCandidateAppliedJobs = (param)=>{
  return APIAxios.get(`${JOB_SEEKER_APPLIED__JOB}?${param}`);
}

// Get the list of companies and jobs
export const getCompaniesListWithJobs = () =>{
  return APIAxios.get(JOB_SEEKER_COMPANIES_JOBS_LIST);
}

export const getTopCompaniesList = () =>{
  return APIAxios.get(JOB_SEEKER_TOP_COMPANIES);
}

export const getTopJobsList = () =>{
  return APIAxios.get(JOB_SEEKER_TOP_JOBS);
}

// Get interview list in candidate side
export const getCandidateInterviewList = (param) =>{
  return APIAxios.get(`${JOB_SEEKER_INTERVIEW_LIST}?${param}`);
}
// delete account
export const deleteAccount = () =>{
  return APIAxios.delete(DELETE_ACCOUNT);
}

// get job alert preferences
export const getJobAlertPreferences = () => {
  return APIAxios.get(JOB_ALERT_SETTINGS);
}

// add job Alert Peferences
export const addJobAlertPreferences = (payload) =>{
  return APIAxios.patch(JOB_ALERT_SETTINGS,payload);

}
// get all chatrooms
export const getChatRooms = () =>{
  return APIAxios.get(CHAT_ROOMS);
}
// get selected chat room
export const getSelectedChatRoom = (chatRoomName,page=1, pageSize=100)=>{
  return APIAxios.get(`chat/messages/${chatRoomName}/?page=${page}&page_size=${pageSize}`);
}

// Create chat room with specific partner
export const chatRoomWIthSpecificUser = (userId)=>{
  return APIAxios.get(`recruiters/recruiter-chat-room/${userId}/`);
}
export const chatRoomWIthSpecificRecruiter = (userId)=>{
  return APIAxios.get(`candidate/candidate-chat-room/${userId}/`);
}