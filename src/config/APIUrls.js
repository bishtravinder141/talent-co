export const LOGIN = "/accounts/token/";
export const REFRESH_TOKEN = "accounts/token/refresh";
// export const REGISTER = "/users/register/"
export const REGISTER = {
  createOtp: "accounts/register/create-user-otp/",
  verifyOtp: "accounts/register/verify-user-otp/",
  resendOtp: "accounts/register/resend-user-otp/",
};

export const FORGOT_PASSWORD = "accounts/forgot-password/";
export const RESET_PASSWORD = "/accounts/forgot-password/reset-password/";
export const RESET_PASSWORD_VERIFY_OTP =
  "/accounts/forgot-password/verify-otp/";
export const CONTACT_US = "/admin/public/contact-us/";
export const SELECT_CANDIDATE_PROFILE = "/candidate/candidate-profile-create/";
export const SELECT_RECRUITER_PROFILE = "/candidate/recruiter-profile-create/";
export const GET_ROLES = "/accounts/roles/";
export const UPDATE_ROLES = "/accounts/manage-user-role/";

// job-seeker profile
export const CANDIDATE_PROFILE = "candidate/candidate-profile/";
export const GET_COUNTRY_NAME = "/admin/countries/";
export const GET_CITY_NAME_AS_PER_COUNTRY =
  "candidate/candidate-profile-create/";

// Job-seeker recommended job
export const JOB_SEEKER_RECOMMENDED_JOB = "/candidate/recommended-jobs";
export const JOB_SEEKER_JOB_DETAIL = "/candidate/candidate-jobs-detail/";

// Job-seeker apply for job
export const JOB_SEEKER_APPLY_FOR_JOB = "/candidate/applied-job/";


// Job-Seeker saved and rejected job
export const JOB_SEEKER_SAVED_REJECTED_JOB = "/candidate/job-status/";
// Job-Seeker applied job
export const JOB_SEEKER_APPLIED__JOB = "/candidate/applied-job/";

// Job-seeker top companies and jobs name with counts list
// export const JOB_SEEKER_COMPANIES_JOBS_LIST = "candidate/companies-count/";
export const JOB_SEEKER_TOP_COMPANIES = "/candidate/top-companies/";
export const JOB_SEEKER_TOP_JOBS = "/candidate/top-jobs/";


// Job-seeker interview list
export const JOB_SEEKER_INTERVIEW_LIST = "candidate/candidate-interview/";

// company-profile
export const GET_COMPANY_PROFILE = "recruiters/profile";
export const GET_SECTOR_NAME = "admin/sectors/";
export const GET_MARKET_NAME = "admin/markets/";
export const CREATE_COMPANY_PROFILE = "recruiters/profile/";

export const GET_PROFILE = "accounts/profile/";

// job
export const GET_MASTER_JOB_API = "/admin/recruiter-job-master/";
export const JOB_API_ENDPOINT = "/recruiters/jobs/";

//Jobs-filter-listing
export const GET_FILTERS_LIST = "/candidate/recommended-jobs-filters/";

// Job recruiter
export const POST_INTERVIEW_RATING = "/recruiters/interview-rating/";

// job-dashboard
export const GET_JOB_LIST = "/recruiters/jobs";

// job-list-in-dashboard
export const GET_JOB_LIST_WITH_COUNT = "/recruiters/dashboard-job-list";

// Get recommended job application
export const GET_RECOMMENDED_JOB = "/recruiters/recommended-job-applicants/";

// Get job application
export const GET_JOB_APPLICATION = "/recruiters/job-application-list/";

// Get hired job list
export const GET_HIRED_JOB_LIST = "/recruiters/hired-candidate/"

// Get interview list
export const GET_INTERVIEWS = "/recruiters/schedule-interview/";

// Send invitations for apply
export const SEND_INVITATIONS_FOR_APPLY = "/recruiters/application-invitation/";

// Shortlist appllied candidate
export const SHORT_LIST_CANDIDATE = "/recruiters/job-application-status/";

// Sheduled candidate interview 
export const SCHEDULE_CANDIDATE_INTERVIEW = "/recruiters/schedule-interview/";

// Hire candidate for apply
export const HIRE_CANDIDATE = "/recruiters/hire-job-candidate/";

// Declined candidate for job application
export const DECLINE_CANDIDATE = "/recruiters/reject-candidate/";

// Pricing and Plan
// export const GET_SUBSCRIPTION_PLAN_LIST =
//   "/subscription/plans/";

export const GET_SUBSCRIPTION_PLAN_LIST =
  "subscription/user-plans/";

// Get count of all job application
export const GET_ALL_JOB_COUNT = "/recruiters/job-candidates-count/";

// Delete hired job application
export const DELETE_HIRED_JOB_APPLICATION = "/recruiters/hired-candidate/";

// Get and update settings
export const GET_UPDATE_SETTINGS = "/admin/admin-settings/";

// change password 
export const CHANGE_PASSWORD = "/accounts/change-password/";

// delete account
export const DELETE_ACCOUNT="/accounts/profile/";
// export const DELETE_ACCOUNT="/accounts/profile/delete-user/";

// exployment options
export const EMPLOYMENT_OPTIONS = "admin/employement-options/";

// job alert settings
export const JOB_ALERT_SETTINGS = "candidate/job-alert-settings/";

//get chatroom api
export const CHAT_ROOMS = "chat/chatrooms/";

// recruiter dashboard api
export const RECRUITER_DASHBOARD = "recruiters/recruiter-dashboard/";

// logout
export const LOGOUT_USER = "/accounts/logout/";

//chat websocket base url
 export const CHATBASEURL = "wss://talentco-api.mydevtest.in/ws/chat";

 //notification websocket base url
 export const NOTIFICATIONBASEURL = "wss://talentco-api.mydevtest.in/ws/notification";

 // get subscription plan features
 export const PLANFEATURES = "/subscription/compared-plan-features/"; 

 //get digital signature
 export const DIGITALSIGN = "/candidate/digital-signature/";

 //get upcoming interviews
 export const UPCOMINGINTERVIEWS = "/recruiters/upcoming-interviews/";

 //upgrade subscription
 export const UPGRADESUBSCRIPTION = "subscription/upgrade-subscription/";

 // marketplace training courses
 export const MARKETPLACETRAININGCOURSES = "admin/market-place/training-courses/";
 
 //marketplace articles
 export const MARKETPLACEARTICLES = "admin/market-place/articles/";
 
 //similar jobs
 export const SIMILARJOBS = "/recruiters/similar-jobs-dashboard/";

 //candidate accept offer letter
//  export const ACCEPTOFFERLETTER = "candidate/cover-letter-details/31/"