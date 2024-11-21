import { useSelector } from "react-redux";
//PERMISSIONS

const HAS_JOB_EDIT_PERMISSION = ["staff_editor", "staff_maintainer", "staff_admin", "Recruiter"];
export const HAS_JOB_CREATE_PERMISSION = [
  "staff_editor",
  "staff_maintainer",
  "staff_admin",
  "Recruiter",
];
const HAS_JOB_DELETE_PERMISSION = [
  "staff_editor",
  "staff_maintainer",
  "staff_admin",
  "Recruiter",
];
const HAS_STAFF_ACCESS = ["staff_admin", "Recruiter"];
const HAS_SUBSCRIPTIONPLANS_ACCESS = ["staff_admin", "Recruiter", "staff_maintainer"];
const HAS_UPDATE_PROFILE_ACCESS = ["Recruiter"];
// PERMISSIONS

// PERMISSION HANDLERS
//job handlers
export const isAllowedToAddJob = () => {
  const role = localStorage.getItem("selectedRole");
  return HAS_JOB_CREATE_PERMISSION.includes(role);
};

export const isAllowedToEditJob = () => {
  const role = localStorage.getItem("selectedRole");
  return HAS_JOB_EDIT_PERMISSION.includes(role);
};

export const isAllowedToDeleteJob = () => {
  const role = localStorage.getItem("selectedRole");
  return HAS_JOB_DELETE_PERMISSION.includes(role);
};

//staff handler
export const isAllowedStaffAccess = () => {
  const role = localStorage.getItem("selectedRole");
  return HAS_STAFF_ACCESS.includes(role);
};

//subscription plan handler
export const isAllowedSubscriptionPlansAccess = () => {
  const role = localStorage.getItem("selectedRole");
  return HAS_SUBSCRIPTIONPLANS_ACCESS.includes(role);
};

export const isAllowedToEditProfile = () => {
  const role = localStorage.getItem("selectedRole");
  return HAS_UPDATE_PROFILE_ACCESS.includes(role);
};

//error messages
export const CREATE_JOB_ERROR_MESSAGE =
  "You do not have permission to  create a job ";
export const EDIT_JOB_ERROR_MESSAGE =
  "You do not have permission to  edit a job ";
export const DELETE_JOB_ERROR_MESSAGE =
  "You do not have permission to deactivate a job";
export const SAVE_DRAFT_JOB_ERROR =
  "You do not have permission to save a job as draft";
export const PUBLISH_JOB_ERROR = "You do not have permission to publish a job ";
export const UPDATE_PROFILE_ERROR =
  "You do not have permission to edit profile";
