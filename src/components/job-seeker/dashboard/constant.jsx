import DashboardIconSvg from "../../svgs/DashboardIconSvg";
import JobIconSvg from "../../svgs/JobIconSvg";
import InterviewIcon from "../../svgs/InterviewIcon";
import MessageIconSvg from "../../svgs/MessageIconSvg";
import CompanyProfileIconSvg from "../../svgs/CompanyProfileIconSvg";
import SettingIconSvg from "../../svgs/SettingIconSvg";
import MarketPlaceIconSvg from "../../svgs/MarketPlaceIconSvg";
import ApplicationIconSvg from "../../svgs/ApplicationIconSvg";
import StaffIconSvg from "../../svgs/StaffIconSvg";
export const JOBS = [
  {
    companyName: "ESG Analyst",
    location: "Seek Australia",
    companyLocation: "Sydney, NSW",
    empType: "Sustainability Reporting ( Banking)",
    salary: "$1,600-$1,800 USD",
    jobType: "Full-time",
    description:
      "Job description. Dfhhhafdsa f hfaofhasfh. Fhasodfhosaf fhaofdhsaodf fhoadfhadosfh fhoadfhosf fhasofhsdaof h fdhgohfdos f fhasdofhsdofhsf",
  },
];

//job seeker sidebar options
export const CANDIDATESIDEBAROPTIONS = [
  {
    pathName: "/job-seeker/dashboard",
    title: "Dashboards",
    icon: <DashboardIconSvg />,
  },
  {
    pathName: "/job-seeker/jobs",
    title: "Jobs",
    icon: <JobIconSvg />,
  },
  {
    pathName: "/job-seeker/interviews",
    title: "Interviews",
    icon: <InterviewIcon />,
  },
  {
    pathName: "/job-seeker/messages",
    title: "Messaging",
    icon: <MessageIconSvg />,
  },
  {
    pathName: "/job-seeker/user-profile-page",
    title: "Profile",
    icon: <CompanyProfileIconSvg />,
  },
  {
    pathName: "/job-seeker/setting",
    title: "Settings",
    icon: <SettingIconSvg />,
  },
  {
    pathName: "/job-seeker/marketplace",
    title: "Marketplace",
    icon: <MarketPlaceIconSvg />,
  },
];

//job recruiter sidebar options
export const RECRUITERSIDEBAROPTIONS = [
  {
    pathName: "/job-recruiter/dashboard",
    title: "Dashboards",
    icon: <DashboardIconSvg />,
  },
  {
    pathName: "/job-recruiter/job-dashboard",
    title: "Jobs",
    icon: <JobIconSvg />,
  },
  {
    pathName: "/job-recruiter/application",
    title: "Applications",
    icon: <ApplicationIconSvg />,
  },
  {
    pathName: "/job-recruiter/staff",
    title: "Staff",
    icon: <StaffIconSvg />,
  },
  {
    pathName: "/job-recruiter/interviews",
    title: "Interviews",
    icon: <InterviewIcon />,
  },
  {
    pathName: "/job-recruiter/messages",
    title: "Messaging",
    icon: <MessageIconSvg />,
  },
  {
    pathName: "/job-recruiter/complete-company-profile",
    // title: "Company Profile",
    title: "Profile",
    icon: <CompanyProfileIconSvg />,
  },
  {
    pathName: "/job-recruiter/dashboard-setting",
    title: "Settings",
    icon: <SettingIconSvg />,
  },
];
