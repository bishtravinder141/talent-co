import { APIAxios } from "../config/APIConfig";
import { MARKETPLACEARTICLES, MARKETPLACETRAININGCOURSES } from "../config/APIUrls";
import { ADD_RESUME } from "../config/ResumeCV";

// add resume list
export const changeResumeTemplate = (payload) => {
  return APIAxios.patch(ADD_RESUME, payload);
};

// Get Resume
export const getSelectedResume = () => {
  return APIAxios.get(ADD_RESUME);
};

//marketplace get training courses
export const getMarketplaceTrainingCourses = () =>{
  return APIAxios.get(MARKETPLACETRAININGCOURSES);
}

//marketplace get articles
export const getArticles = () => {
  return APIAxios.get(MARKETPLACEARTICLES);

}