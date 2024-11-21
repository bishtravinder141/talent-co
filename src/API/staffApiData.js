import { APIAxios, FormAxios, authAxios } from "../config/APIConfig";
import { GET_STAFF_LIST,CREATE_STAFF,DELETE_STAFF,EDIT_STAFF,CREATE_STAFF_IMG } from "../config/StaffApiUrls";


export const getStaffList = (query) => {
    return APIAxios.get(`${GET_STAFF_LIST}?${query}`);
  };

  export const createstaffData = (payload) => {
    return APIAxios.post(CREATE_STAFF, payload);
  };

  export const deleteStaffData = (staffId) => {
    return APIAxios.delete(`${DELETE_STAFF}${staffId}/`);
  };
  export const editStaffData= (id,payload) => {
    return APIAxios.patch(`${EDIT_STAFF}${id}/`,payload)
  }
  export const createStaffImg=(id,payload)=>{
    return FormAxios.patch(`${CREATE_STAFF_IMG}${id}/`,payload)
  }