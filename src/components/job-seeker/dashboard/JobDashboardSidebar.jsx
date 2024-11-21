import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { persistStore } from "redux-persist";
import { reduxStore } from "../../../redux/store";
import { logout } from "../../../API/masterApiData";
import LogoutIconSvg from "../../svgs/LogoutIconSvg";
import { CANDIDATESIDEBAROPTIONS, RECRUITERSIDEBAROPTIONS } from "./constant";
import { isAllowedStaffAccess } from "../../../pages/job/staffManagement";
import SideFilters from "../../job-recruiter/dashboard/SideFilters";

const JobDashboardSidebar = ({ setToggleSideNav, isApplication = false, selectedFilter,
  setSelectedFilter,
  applicationsData,
  filterList }) => {
  const role = localStorage.getItem("selectedRole");
  const sidebarOptions =
    role === "Candidate"
      ? [...CANDIDATESIDEBAROPTIONS]
      : isAllowedStaffAccess()
        ? [...RECRUITERSIDEBAROPTIONS]
        : [...RECRUITERSIDEBAROPTIONS].filter((curElem) => curElem.title !== "Staff");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const refreshToken = localStorage.getItem("refresh_token");
  const handleLogout = () => {
    //commented for future use
    // const payload = {
    //   refresh_token: refreshToken,
    // };
    // logout(payload)
    //   .then((res) => {
    //     localStorage.clear();
    //     persistStore(reduxStore).purge();
    //     toast.success("Logout Successfully");
    //     window.location.href = "/login";
    //     navigate("/login");
    //   })
    //   .catch((err) => console.log(err));
    localStorage.clear();
    persistStore(reduxStore).purge();
    toast.success("Logout Successfully");
    // window.location.href = "/login";
    navigate("/login");
  };
  return (
    <>
    <div>
      <div className="dashboard-navbar-col mb-4">
        <div className="job-seeker-inner-sidebar">
          <div
            className="toggle-nav-icon"
            onClick={() => setToggleSideNav((prev) => !prev)}
          >
            <img src="../assets/images/nav-icon.svg" />
          </div>
          <div className="job-seeker-dashboard-nav">
            <ul className="nav">
              {sidebarOptions?.map(({ pathName, icon, title }, idx) => (
                <li key={idx} className={pathname === pathName ? "active" : ""}>
                  <Link to={pathName}>
                    {icon}
                    {title}
                  </Link>
                </li>
              ))}
              <li className="logout">
                <a onClick={handleLogout} className="cursor-pointer">
                  <LogoutIconSvg />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isApplication && (
        <SideFilters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          applicationsData={applicationsData}
          filterList={filterList}
        />
      )}
      </div>
    </>

  );
};

export default JobDashboardSidebar;
