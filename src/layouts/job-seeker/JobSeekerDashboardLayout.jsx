import React, { useState } from "react";
import JobDashboardSidebar from "../../components/job-seeker/dashboard/JobDashboardSidebar";
import { Link, useLocation } from "react-router-dom";
import UpdateGoogleLocation from "../../components/GoogleLocation/UpdateGoogleLocation";
import SideFilters from "../../components/job-recruiter/dashboard/SideFilters";

const JobSeekerDashboardLayout = ({
  children,
  header,
  subTitle,
  showSearchBar = true,
  profilePercentage,
  searchText,
  handleOnchange,
  handleSubmitSearch,
  jobList,
  dashboardType,
  selectedFilter,
  setSelectedFilter,
  filterList,
  isSideFilterRequired = false
}) => {
  const [toggleSideNav, setToggleSideNav] = useState(false);
  const { pathname } = useLocation();

  const handleSearchJob = (value) => {
    if (typeof value === "object") {
      handleOnchange(value.location, "country_city");
    } else {
      handleOnchange(value, "job_title_text");
    }
  };

  return (
    <main>
      <section className="inner-banner position-relative w-100 ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{header}</h2>
              {pathname === "/job-seeker/user-profile-page" && (
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
                  <div
                    className="fieldset d-md-flex"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmitSearch();
                      }
                    }}
                  >
                    <div className="d-flex align-items-center w-100 mb-md-0 mb-2">
                      <input
                        type="text"
                        name="job_title_text"
                        value={searchText.job_title_text}
                        onChange={(e) => handleSearchJob(e.target.value)}
                        placeholder="Job Title or keyword"
                        className="jobTitle mb-0"
                      />
                      <UpdateGoogleLocation
                        afterSelectLocation={handleSearchJob}
                        // placeholder="Location"
                        placeholder="Add Country or City"
                        styleClass="countryCity"
                        hideIcon={true}
                        onlySearch={true}
                      />
                    </div>
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
            {pathname === "/job-seeker/setting" && (
              <>
                <div className="create-resume-wrapper d-flex justify-content-end gap-3">
                  <div>
                    <Link
                      className="btn-design decline-btn bg-white text-black"
                      to={"/job-seeker/resume"}
                    >
                      View Resume
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="btn-design decline-btn bg-white text-black"
                      to={"/job-seeker/cover-letter"}
                      state={{ prevRoute: "/job-seeker/setting" }}
                    >
                      View Cover Letter
                    </Link>
                  </div>
                </div>
              </>
            )}
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
                <JobDashboardSidebar
                  setToggleSideNav={setToggleSideNav}
                  role="Candidate"
                  isApplication={isSideFilterRequired}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  applicationsData={jobList}
                  filterList={filterList}
                />
                {children}
              </div>
              {/* {isSideFilterRequired && (
                <SideFilters
                  applicationsData={jobList}
                  dashboardType="seeker"
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  filterList={filterList}
                />
              )} */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default JobSeekerDashboardLayout;
