export const USER_ROLE = {
  seeker: "Candidate",
  recruiter: "Recruiter",
  staff: ["staff_admin", "staff_maintainer", "staff_editor", "staff_viewer"],
};

export const APPLICATION_STATUS = {
  shortlisted: "shortlisted",
  applied: "applied",
  saved: "saved",
};

export const JOB_PER_PAGE = 15;
export const JOB_APPLICATION_PER_PAGE = 10;
export const CANDIDATE_JOB__PER_PAGE = 15;
export const RECRUITER_DASHBOARD_JOBS_PER_PAGE = 5;
export const UPCOMING_INTERVIEWS_PER_PAGE = 4;
export const TEXT_AREA_MAX_LENGTH = 5000;
export const TOTAL_STAR_RATING = 5;
// Payments card detail
export const PAYMENT_CARDS_DETAILS = [
  {
    name: "Stripe",
    icon: "stripe",
    cardNumber: "**** **** **** 5643",
  },
  {
    name: "Apple Pay",
    icon: "apple-pay",
    cardNumber: "**** **** **** 2313",
  },
];

export const STAFF_ROLE = [
  { key: "staff_admin", value: "Admin" },
  { key: "staff_maintainer", value: "Maintainer" },
  { key: "staff_editor", value: "Editor" },
  { key: "staff_viewer", value: "Viewer" },
];
export const COMPLETE_YOUR_PROFILE_MESSAGE = "Your profile is not completed please complete your profile"
