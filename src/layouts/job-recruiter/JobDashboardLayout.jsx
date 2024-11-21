import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/job-seeker/Footer";
import { USER_ROLE } from "../../constants/Constent";
import JobDashboardSidebar from "../../components/job-recruiter/dashboard/JobDashboardSidebar";
import Header from "../../components/privateHeader/Header";
import { ROLES } from "../../config/authConfig";
import { isAllowedStaffAccess } from "../../pages/job/staffManagement";

const JobDashboardLayout = ({ item }) => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");
  return (
    <>
      {/* {isToken ? (
        USER_ROLE.recruiter === selectedRole ? (
          <JobDashboardSidebar />
        ) : (
          <Navigate to="/job-seeker/dashboard" />
        )s
      ) : (
        <Navigate to="/" />
      )} */}
      {isToken && <Header role={USER_ROLE.recruiter} />}
      {isToken ? (
        USER_ROLE.recruiter === selectedRole ||
        ROLES?.staff?.includes(selectedRole) ? (
         ( item?.path === "/job-recruiter/staff" || item?.path === "/job-recruiter/staff/add-edit-staff") ? (
            isAllowedStaffAccess() ? (
              <Outlet />
            ) : (
              <Navigate to="/job-recruiter/dashboard" />
            )
          ) : (
            <Outlet />
          )
        ) : (
          <Navigate to="/job-recruiter/dashboard" />
        )
      ) : (
        <Navigate to="/" />
      )}
      {isToken && <Footer />}
    </>
  );
};

export default JobDashboardLayout;
