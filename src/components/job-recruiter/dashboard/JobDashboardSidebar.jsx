import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import JobIconSvg from "../../svgs/JobIconSvg";
import InterviewIcon from "../../svgs/InterviewIcon";
import MessageIconSvg from "../../svgs/MessageIconSvg";
import CompanyProfileIconSvg from "../../svgs/CompanyProfileIconSvg";
import SettingIconSvg from "../../svgs/SettingIconSvg";
import LogoutIconSvg from "../../svgs/LogoutIconSvg";
import ApplicationIconSvg from "../../svgs/ApplicationIconSvg";
import DashboardIconSvg from "../../svgs/DashboardIconSvg";
import persistStore from "redux-persist/es/persistStore";
import { reduxStore } from "../../../redux/store";  
import { logout } from "../../../API/masterApiData";
import { getCompanyProfile } from "../../../API/candidateProfile";

const JobDashboardSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const refreshToken = localStorage.getItem("refresh_token");

  const handleLogout = () => {
    //commented for future use
    // const payload = {
    //   refresh_token:refreshToken
    // }
    // logout(payload)
    // .then((res)=>{
    //   localStorage.clear();
    //   persistStore(reduxStore).purge();
    //   toast.success("Logout Successfully");
    //   window.location.href= "/login";
    //   navigate("/login");
    // })
    // .catch((err)=>console.log(err))
    localStorage.clear();
    persistStore(reduxStore).purge();
    toast.success("Logout Successfully");
    // window.location.href = "/login";
    navigate("/login");
  };
  return (
    <>
      <div className="business-dashboard">
        <div className="dashboard-sidebar">
          <div className="logo">
            <Link to={"/job-recruiter/dashboard"}>
              <img src="/assets/images/logo.svg" />
            </Link>
          </div>
          <div className="close_icon">
            <div className="menu_icon">
              <span></span>
            </div>
          </div>
          <div className="for-mobile">
            <div className="panel_list_thumbs">
              <img src="assets/images/thumb1.png" />
              <img src="assets/images/thumb2.png" />
              <img src="assets/images/thumb3.png" />
              <div className="thumbplus">+8</div>
            </div>
          </div>

          <div className="dashboard-nav">
            <ul className="nav">
              <li
                className={`${
                  pathname === "/job-recruiter/dashboard" ? "active" : ""
                }`}
              >
                <Link to={"/job-recruiter/dashboard"}>
                  <DashboardIconSvg />
                  Dashboards
                </Link>
              </li>

              <li
                className={`${
                  pathname === "/job-recruiter/job-dashboard" ? "active" : ""
                }`}
              >
                <Link to="/job-recruiter/job-dashboard">
                  <JobIconSvg />
                  Jobs
                </Link>
              </li>

              <li
                className={`${
                  pathname === "/job-recruiter/application" ? "active" : ""
                }`}
              >
                <Link to="/job-recruiter/application">
                  <ApplicationIconSvg />
                  Applications
                </Link>
              </li>

              <li
                className={`${
                  pathname === "/job-recruiter/staff" ? "active" : ""
                }`}
              >
                <Link to="/job-recruiter/staff">
                  <ApplicationIconSvg />
                  Staff
                </Link>
              </li>

              <li
                className={`${
                  pathname === "/job-recruiter/interviews" ? "active" : ""
                }`}
              >
                <Link to="/job-recruiter/interviews">
                  <InterviewIcon />
                  Interviews
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/job-recruiter/messages" ? "active" : ""
                }`}
              >
                <Link to="/job-recruiter/messages">
                  <MessageIconSvg />
                  Messaging
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/job-recruiter/complete-company-profile"
                    ? "active"
                    : ""
                }`}
              >
                <Link to="/job-recruiter/complete-company-profile">
                  <CompanyProfileIconSvg />
                  Company Profile
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/job-recruiter/dashboard-setting"
                    ? "active"
                    : ""
                }`}
              >
                <Link to="/job-recruiter/dashboard-setting">
                  <SettingIconSvg />
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div className="dashboard-logout">
            <span onClick={handleLogout}>
              <LogoutIconSvg />
              Logout
            </span>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default JobDashboardSidebar;
