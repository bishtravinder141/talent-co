import React, { useEffect, useState } from "react";
import JobDashboardSidebar from "../../components/job-seeker/dashboard/JobDashboardSidebar";
import { Link, useLocation } from "react-router-dom";
import UpdateGoogleLocation from "../../components/GoogleLocation/UpdateGoogleLocation";
import { getCompanyProfile } from "../../API/candidateProfile";
// import JobDashboardSidebar from "../../components/job-recruiter/dashboard/JobDashboardSidebar";
import { toast } from "react-toastify";
import { COMPLETE_YOUR_PROFILE_MESSAGE } from "../../constants/Constent";
import SideFilters from "../../components/job-recruiter/dashboard/SideFilters";

const JobRecruiterDashboardLayout = ({
  children,
  header,
  subTitle,
  showSearchBar = false,
  profilePercentage,
  searchText,
  handleOnchange,
  handleSubmitSearch,
  showSidebar = true,
  isApplication = false,
  selectedFilter,
  setSelectedFilter,
  applicationsData,
  filterList,
}) => {
  const [toggleSideNav, setToggleSideNav] = useState(false);
  const { pathname } = useLocation();
  return (
    <main>
      <section className="inner-banner position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{header}</h2>
              {pathname === "/job-recruiter/complete-company-profile" && (
                <div className="complete-profile-right text-left">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${profilePercentage}%` }}
                      aria-valuenow={`${profilePercentage}`}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p>
                    <span>{profilePercentage}%</span> of your profile is
                    complete
                  </p>
                </div>
              )}
              <p>{subTitle}</p>
              {showSearchBar && (
                <form className="banner-job-search findjob">
                  <div className="fieldset d-flex">
                    <input
                      type="text"
                      name="job_title_text"
                      value={searchText.job_title_text}
                      onChange={(e) => handleSearchJob(e.target.value)}
                      placeholder="Job Title or keyword"
                      className="jobTitle"
                    />
                    <UpdateGoogleLocation
                      afterSelectLocation={handleSearchJob}
                      placeholder="Job Title or keyword"
                      styleClass="countryCity"
                      hideIcon={true}
                      onlySearch={true}
                    />
                    {/* <input
                      type="text"
                      name="country_city"
                      value={searchText.country_city}
                      onChange={(e) => handleSearchJob(e)}
                      placeholder="Add Country or City"
                      className="countryCity"
                    /> */}
                    <button
                      type="button"
                      className="btn-design"
                      onClick={handleSubmitSearch}
                    >
                      Find Jobs
                    </button>
                  </div>
                </form>
              )}
            </div>
            {/* {pathname === "/job-recruiter/setting" && (
              <>
                <div className="create-resume-wrapper d-flex justify-content-end gap-3">
                  <div>
                    <Link className="btn-design decline-btn bg-white text-black" to={"/job-seeker/resume"}>View Resume</Link>
                  </div>
                  <div>
                    <Link className="btn-design decline-btn bg-white text-black" to={"/job-seeker/cover-letter"} state={{prevRoute:"/job-seeker/setting"}}>View Cover Letter</Link>
                  </div>
                </div>
              </>
            )} */}
          </div>
        </div>
      </section>
      <section
        className={`job-seeker-dashboard-sec py-70 ${toggleSideNav ? "collapse-nav" : ""
          }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="job-seeker-dashboard-cols">
                {showSidebar && (
                  <JobDashboardSidebar
                    setToggleSideNav={setToggleSideNav}
                    role="recruiter"
                    isApplication={isApplication}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    applicationsData={applicationsData}
                    filterList={filterList}
                  />
                )}
                {/* {isApplication && (
                      <SideFilters
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        applicationsData={applicationsData}
                        filterList={filterList}
                      />
                    )} */}
                {/* <div class={(!showSidebar) ? "reduced-navbar" : "reduce-navbar"}> */}
                <div class={`${(!showSidebar) ? "reduced-navbar" : "reduce-navbar"} ${(isApplication) && "application-active"}`}>

                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default JobRecruiterDashboardLayout;
