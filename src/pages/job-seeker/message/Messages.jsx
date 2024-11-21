import React from "react";
import JobSeekerDashboardLayout from "../../../layouts/job-seeker/JobSeekerDashboardLayout";
import "../job-seeker-dashboard.css";
import MessageSection from "../../../components/common/MessageSection";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";

const Messages = () => {
  return (
    <JobSeekerDashboardLayout header={"Messages"} showSearchBar={false}>
      <div class="reduce-navbar">
        <MessageSection />
      </div>
   </JobSeekerDashboardLayout>
  );
};

export default Messages;
