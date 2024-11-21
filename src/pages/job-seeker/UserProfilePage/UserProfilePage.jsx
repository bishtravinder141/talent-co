import React, { useState } from "react";
import UserProfile from "../../userProfile/UserProfile";
import JobSeekerDashboardLayout from "../../../layouts/job-seeker/JobSeekerDashboardLayout";
import "../job-seeker-dashboard.css";

const UserProfilePage = () => {
  const [profilePercentage,setProfilePercentage] = useState(0);
  return (
    <>
      <JobSeekerDashboardLayout
        header={"Profile"}
        showSearchBar={false}
        profilePercentage = {profilePercentage}
      >
          <UserProfile setProfilePercentage={setProfilePercentage} />
      </JobSeekerDashboardLayout>
    </>
  );
};

export default UserProfilePage;
