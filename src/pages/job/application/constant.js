export const JOB_APPLICATION_HEADER = [
  {
    title: "Recommended",
    type: "recommended",
  },
  { title: "Applied", type: "applied", count: 21 },
  { title: "Shortlisted", type: "shortlisted", count: 21 },
  { title: "Interviewed", type: "interviewed", count: 21 },
  { title: "Hired", type: "hired", count: 21 },
  { title: "Contract", type: "contract" },
];

export const TABS = {
  RECOMMENDED: "recommended",
  APPLIED: "applied",
  SHORTLISTED: "shortlisted",
  INTERVIEWED: "interviewed",
  HIRED: "hired",
  CONTRACT: "contract",
};

export const MODALS_NAME = {
  invitation: "sendInvitation",
  cancelled: "cancelled",
};

export const JOBS_ORDER_BY_OPTIONS = [
  {
    value: "-created_at",
    name: "Newest",
  },
  {
    value: "created_at",
    name: "Oldest",
  },
  {
    value: "salary_range_min",
    name: "Lowest Salary",
  },
  {
    value: "-salary_range_min",
    name: "Highest Salary",
  },
];

export const INTERVIEW_ORDER_BY_OPTIONS = [
  {
    name: "Newest",
    value: "-day_and_date",
  },
  {
    name: "Oldest",
    value: "day_and_date",
  },
];
export const ORDER_BY_OPTIONS = [
  {
    value: "-applied_at",
    name: "Newest",
  },
  {
    value: "applied_at",
    name: "Oldest",
  },
  // {
  //   value: "candidate_asc",
  //   name: "Order by candidate name",
  // },
  // {
  //   value: "title_dsc",
  //   name: "Order by job title",
  // },
];

export const DEBOUNCE_SEARCH_TIMER = 500;
