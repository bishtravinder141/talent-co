import { lazy } from "react";
import AboutUs from "../pages/about/AboutUs";
import Policies from "../pages/policies/Policies";
import TermsAndConditions from "../pages/terms-conditions/TermsAndConditions";
import Pricing from "../pages/pricing/Pricing";
import Cotegories from "../pages/categories/Cotegories";
import Job from "../pages/job/Job";
import Blogs from "../pages/blogs/Blogs";
import SingleBlog from "../pages/blogs/SingleBlog";
import LearningCenter from "../pages/learningCenter/LearningCenter";
import ViewCompanyDetail from "../pages/viewProfile/viewCompanyDetail";
import DashboardCreateJob from "../pages/job/DashboardCreateJob";
import SubscriptionPlans from "../pages/subscription-plans/SubscriptionPlans";
import PaymentGateway from "../pages/paymentGateway/PaymentGateway";
import UserProfilePage from "../pages/job-seeker/UserProfilePage/UserProfilePage";
import NotFound from "../NotFound";
import MarketPlace from "../pages/job-seeker/Marketplace/MarketPlace";
import CreateResume from "../pages/resume/CreateResume";
import CreateCoverLetter from "../pages/coverLetter/CreateCoverLetter";
import Resume from "../pages/resume/Resume";
import ViewCoverLetter from "../pages/coverLetter/ViewCoverLetter";
import NotificationDetailPage from "../pages/notification/NotificationDetailPage";
// Import your route components using lazy loading
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const Home = lazy(() => import("../pages/home/Home"));
const UserProfile = lazy(() => import("../pages/userProfile/UserProfile"));
const ViewProfileDetail = lazy(() =>
  import("../pages/viewProfile/ViewProfileDetail")
);
const Dashboard = lazy(() => import("../pages/job-seeker/dashboard/Dashboard"));
const Faq = lazy(() => import("../pages/job-seeker/faq/Faq"));
const ContactUs = lazy(() => import("../pages/job-seeker/contactUs/ContactUs"));
const CompanyProfile = lazy(() => import("../pages/profile/CompanyProfile"));
const ViewJobs = lazy(() => import("../pages/job/viewJobs/ViewJobs"));
const JobRecruiterDashboard = lazy(() =>
  import("../pages/job/dashboard/JobRecruiterDashboard")
);
const JobApplication = lazy(() =>
  import("../pages/job/application/JobApplication")
);
const Staff = lazy(() => import("../pages/job/Staff/Staff"));
const Jobs = lazy(() => import("../pages/job-seeker/jobs/Jobs"));
const ViewJobDetail = lazy(() =>
  import("../pages/job-seeker/jobs/ViewJobDetail")
);
const CoverLetter = lazy(() => import("../pages/job-seeker/jobs/CoverLetter"));
const Interviews = lazy(() =>
  import("../pages/job-seeker/interviews/Interviews")
);
const Messages = lazy(() => import("../pages/job-seeker/message/Messages"));
const JobRecruiterMessages = lazy(() =>
  import("../pages/job/messages/JobRecruiterMessages")
);
const JobRecruiterInterview = lazy(() =>
  import("../pages/job/interview/JobRecruiterInterview")
);
const JobRecruiterSettings = lazy(() =>
  import("../pages/job/settings/JobRecruiterSettings")
);
const JobSeekerSettings = lazy(() =>
  import("../pages/job-seeker/settings/JobSeekerSettings")
);
const AddStaff = lazy(() => import("../pages/job/Staff/AddStaff"));

export const route = [
  {
    path: "/",
    element: <Home />,
    private: false,
  },
  {
    path: "/login",
    element: <Login />,
    private: false,
  },
  {
    path: "/register",
    element: <Register />,
    private: false,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    private: false,
  },
  // {
  //   path: "/reset-password-success",
  //   element: <ResetPasswordSuccess />,
  //   private: false,
  // },
  // footer section
  {
    path: "/about-us",
    element: <AboutUs />,
    // private: false,
  },
  {
    path: "/policies",
    element: <Policies />,
    private: false,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    // private: false,
  },
  {
    path: "/terms-conditions",
    element: <TermsAndConditions />,
    // private: false,
  },
  {
    path: "/pricing",
    element: <Pricing />,
    // private: true,
  },
  {
    path: "/categories",
    element: <Cotegories />,
    private: false,
  },
  {
    path: "/job",
    element: <Job />,
    private: false,
  },
  {
    path: "/blog",
    element: <Blogs />,
    // private: false,
  },
  {
    path: "/single-blog",
    element: <SingleBlog />,
    // private: false,
  },
  {
    path: "/learning-centre",
    element: <LearningCenter />,
    private: false,
  },
  // footer section

  // job-seeker-flow

  // {
  //   path: "/complete-user-profile",
  //   element: <UserProfile />,
  //   private: true,
  //   jobSeeker: true,
  // },
  {
    path: "/job-seeker/user-profile-page",
    element: <UserProfilePage />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/resume",
    element: <Resume />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/select-resume",
    element: <CreateResume />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/cover-letter",
    element: <ViewCoverLetter />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/select-cover-letter",
    element: <CreateCoverLetter />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/view-user-profile",
    element: <ViewProfileDetail />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/dashboard",
    element: <Dashboard />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/jobs",
    element: <Jobs />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/job-detail/:id",
    element: <ViewJobDetail />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/offer-letter/:applicationId",
    element: <CoverLetter />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
  // {
  //   path: "/job-seeker/contact-us",
  //   element: <ContactUs />,
  //   private: true,
  //   jobSeeker: true,
  // },
  {
    path: "/job-seeker/interviews",
    element: <Interviews />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/messages",
    element: <Messages />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/setting",
    element: <JobSeekerSettings />,
    private: true,
    jobSeeker: true,
  },
  {
    path: "/job-seeker/marketplace",
    element: <MarketPlace />,
    private: true,
    jobSeeker: true,
  },

  // job-recruiter-flow

  // {
  //   path: "/complete-company-profile",
  //   element: <CompanyProfile />,
  //   private: true,
  //   jobRecruiter: true,
  // },
  {
    path: "/view-company-profile",
    element: <ViewCompanyDetail />,
    private: true,
    jobRecruiter: true,
  },
  {
    path: "/view-candidate-public-profile/:id",
    element: <ViewProfileDetail />,
    private: true,
    jobRecruiter: true,
  },
  {
    path: "/job-recruiter/job-dashboard",
    element: <ViewJobs />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },
  {
    path: "/job-recruiter/dashboard",
    element: <JobRecruiterDashboard />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },
  {
    path: "/job-recruiter/create-job",
    element: <DashboardCreateJob />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },
  {
    path: "/job-recruiter/edit-job/:id",
    element: <DashboardCreateJob />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },
  {
    path: "/job-recruiter/application",
    element: <JobApplication />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },
  {
    path: "/job-recruiter/staff",
    element: <Staff />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },
  {
    path: "/job-recruiter/staff/add-edit-staff",
    element: <AddStaff />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },

  {
    path: "/job-recruiter/messages",
    element: <JobRecruiterMessages />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },
  {
    path: "/job-recruiter/interviews",
    element: <JobRecruiterInterview />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },

  {
    path: "/job-recruiter/complete-company-profile",
    element: <CompanyProfile />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },
  {
    path: "/job-recruiter/dashboard-setting",
    element: <JobRecruiterSettings />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: true,
  },

  {
    path: "/job-recruiter/all-notification",
    element: <NotificationDetailPage />,
    private: true,
    jobRecruiter: true,
  },
  {
    path: "/job-seeker/all-notification",
    element: <NotificationDetailPage />,
    private: true,
    jobSeeker: true,
  },

  // subscription-plans
  {
    path: "/subscription-plans",
    element: <SubscriptionPlans />,
    private: true,
    jobRecruiter: true,
    jobRecruiterDashboard: false,
  },

  // payment-gateway
  // {
  //   path: "/job-recruiter/payment-gateway",
  //   element: <PaymentGateway />,
  //   private: true,
  //   jobRecruiter: true,
  //   jobRecruiterDashboard: false,
  // },
  {
    path: "*",
    element: <NotFound />,
  },
];
