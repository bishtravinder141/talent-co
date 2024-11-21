import { APIAxios, FormAxios } from "../config/APIConfig";
import {
  CANDIDATE_PROFILE,
  GET_COUNTRY_NAME,
  GET_COMPANY_PROFILE,
  GET_SECTOR_NAME,
  GET_MARKET_NAME,
  CREATE_COMPANY_PROFILE,
  GET_PROFILE,
  CHANGE_PASSWORD,
  EMPLOYMENT_OPTIONS,
  DIGITALSIGN,
} from "../config/APIUrls";

export const getCandidateProfile = () => {
  return APIAxios.get(CANDIDATE_PROFILE);
};

export const createCandidateProfile = (payload) => {
  return APIAxios.post(CANDIDATE_PROFILE, payload);
};

export const updateCandidateProfile = (payload) => {
  return APIAxios.patch(CANDIDATE_PROFILE, payload);
};

export const getCountryName = () => {
  return APIAxios.get(GET_COUNTRY_NAME);
};

export const getCityName = (searchText) => {
  return APIAxios.get(`${GET_COUNTRY_NAME}&'city='${searchText}`);
};

export const getCompanyProfile = () => {
  return APIAxios.get(GET_COMPANY_PROFILE);
};

export const getSectorData = () => {
  return APIAxios.get(GET_SECTOR_NAME);
};

export const getMarketData = () => {
  return APIAxios.get(GET_MARKET_NAME);
};

export const createCompanyProfile = (payload) => {
  return APIAxios.post(CREATE_COMPANY_PROFILE, payload);
};

export const uploadCompanyLogo = (payload) => {
  return FormAxios.patch(CREATE_COMPANY_PROFILE, payload);
};

export const getProfileData = () => {
  return APIAxios.get(GET_PROFILE);
};

export const changePassword = (payload) => {
  return APIAxios.patch(CHANGE_PASSWORD,payload);
}

// exployment options
export const getEmploymentOptions = () =>{
  return APIAxios.get(EMPLOYMENT_OPTIONS);
}

//get digital signature
export const getDigitalSignature = () =>{
  return APIAxios.get(DIGITALSIGN);
}

//post digital signature
export const addDigitalSignature = (payload) =>{
  return FormAxios.post(DIGITALSIGN,payload);
}

//update digital signature
export const updateDigitalSignature = (payload) =>{
  return FormAxios.patch(DIGITALSIGN,payload);
}
  
//delete digital signature
export const deleteDigitalSignature = () =>{
  return APIAxios.delete(DIGITALSIGN);
}

// get offer letter details
export const getOfferLetterDetails = (applicationId) => {
 return APIAxios.get(`/candidate/cover-letter-details/${applicationId}/`);
}

//accept offer lettter
export const acceptOfferLetter = (applicationId,payload) => {
  return APIAxios.patch(`candidate/cover-letter-details/${applicationId}/`,payload)

}