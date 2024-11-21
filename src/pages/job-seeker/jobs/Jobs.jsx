import React from "react";
import JobSeekerDashboardLayout from "../../../layouts/job-seeker/JobSeekerDashboardLayout";
import FilterTabs from "../../../components/common/FilterTabs";
import { Fragment } from "react";
import { useState } from "react";
import { tabData, topCompaniesData, topJobListData } from "../constant";
import "../job-seeker-dashboard.css";
import JobCard from "../../../components/job-seeker/dashboard/JobCard";
import { JOBS } from "../../../components/job-seeker/dashboard/constant";
import { useEffect } from "react";
import {
  chatRoomWIthSpecificRecruiter,
  getCandidateAppliedJobs,
  getCandidateRecommendedJobs,
  getCandidateSavedRejectedJobs,
  getCompaniesListWithJobs,
  getTopCompaniesList,
  getTopJobsList,
  updateJobStatus,
} from "../../../API/candidateJobs";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import PageLoader from "../../../components/loader/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyAndJobList,
  setTopCompaniesList,
  setTopJobsList,
} from "../../../redux/jobSeekerSlice";
import {
  APPLICATION_STATUS,
  CANDIDATE_JOB__PER_PAGE,
} from "../../../constants/Constent";
import Pagination from "../../../components/pagination/Pagination";
import {
  alreadySaved,
  jobSavedMessage,
  successType,
} from "../../../utils/allToastMessage";
import { toastMessage } from "../../../utils/toastMessages";
import { useNavigate } from "react-router";
import { APPLICATION_BASE_URL } from "../../../config/APIConfig";
import UpdatedDropDown from "../../../components/inputFields/UpdatedDropDown";
import DropdownField from "../../../components/inputFields/DropdownField";
import { JOBS_ORDER_BY_OPTIONS } from "../../job/application/constant";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [jobList, setJobList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [topCompaniesList, setTopCompaniesList] = useState([]);
  const [topJobsList, setTopJobsList] = useState([]);
  const [searchText, setSearchText] = useState({
    job_title_text: "",
    country_city: "",
  });
  const [orderBy, setOrderBy] = useState("-created_at");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setLoader(true);
    let query = `order_by=${orderBy}&page=${currentPage.page}&page_size=${CANDIDATE_JOB__PER_PAGE}&search_keyword=${searchText.job_title_text}&search_location=${searchText.country_city}`;
    if (activeTab === "recommended") {
      getCandidateRecommendedJobs(query)
        .then((res) => {
          setJobList(res?.data?.data?.results);
          setTotalPage(res?.data?.data?.count);
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err, "error in recommended job");
        });
    } else if (activeTab === "saved" || activeTab === "rejected") {
      query = `status=${activeTab}&${query}`;
      getCandidateSavedRejectedJobs(query)
        .then((res) => {
          setJobList(res?.data?.data?.results);
          setTotalPage(res?.data?.data?.count);
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err, "error in recommended job");
        });
    } else {
      query = `search_keyword=${searchText.job_title_text}&search_location=${searchText.country_city}`;
      getCandidateAppliedJobs(query)
        .then((res) => {
          setJobList(res?.data?.data?.results);
          setTotalPage(res?.data?.data?.count);
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err, "error in recommended job");
        });
    }

    getTopCompaniesList()
      .then((res) => {
        // dispatch(setTopCompaniesList(res.data.data));
        setTopCompaniesList(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, "error in recommended job");
      });
    getTopJobsList()
      .then((res) => {
        setTopJobsList(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, "error in recommended job");
      });
  }, [currentPage, orderBy]);

  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };

  const onTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage({ page: 1 });
  };
  const handleSaveJob = (jobId) => {
    setLoader(true);
    const payload = {
      job: jobId,
      job_status: APPLICATION_STATUS.saved,
    };
    updateJobStatus(payload)
      .then((res) => {
        const index = jobList.findIndex((curJob) => curJob.id === jobId);
        const tempJobList = [...jobList];
        tempJobList[index].job_saved = true;
        setJobList(tempJobList);
        setLoader(false);
        toastMessage(jobSavedMessage, successType);
        setIsSaved(true);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        toastMessage(err?.response?.data?.message);
      });
  };

  const createChatRoom = (userId) => {
    setLoader(true);
    chatRoomWIthSpecificRecruiter(userId)
      .then((res) => {
        setLoader(false);
        localStorage.setItem("roomId", res.data?.data?.results?.room_name);
        navigate("/job-seeker/messages");
        console.log(res);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  const handleOnSearchChange = (searchedTextValue, name) => {
    // const {name, value} = e.target
    setSearchText({
      ...searchText,
      [name]: searchedTextValue,
    });
  };

  const handleSubmitSearch = () => {
    setCurrentPage({ page: 1 });
  };

  return (
    <JobSeekerDashboardLayout
      header={"My Jobs Board"}
      subTitle={"Connecting Opportunities: Your Ultimate Jobs Hub "}
      showSearchBar={true}
      handleOnchange={handleOnSearchChange}
      searchText={searchText}
      handleSubmitSearch={handleSubmitSearch}
    >
      <div className="job-listing-details">
        {loader && <PageLoader />}
        <div className="dashboard-application">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {tabData.map((tbData, i) => (
              <Fragment key={i}>
                <FilterTabs
                  title={tbData.label}
                  active={activeTab === tbData.id}
                  handleClickTab={() => onTabChange(tbData.id)}
                />{" "}
              </Fragment>
            ))}
          </ul>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="recommended"
              role="tabpanel"
              aria-labelledby="recommended-tab"
            >
              <div className="jobsSortByfilter">
                <div className="col-md-12">
                  <div className="d-flex justify-content-end">
                    <div className="fieldset custom-search">
                      <DropdownField
                        option={JOBS_ORDER_BY_OPTIONS}
                        handleOnChange={(value) => setOrderBy(value)}
                        smallDropdown={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="jobTabscol-flex">
                <div
                  className={`jobsTabs-col ${
                    activeTab === "applied" || activeTab === "rejected"
                      ? "full-width"
                      : ""
                  }`}
                >
                  <h4>Jobs</h4>
                  {jobList.length > 0 ? (
                    jobList.map((job, i) => (
                      <Fragment key={i}>
                        <JobCard
                          handleSaveJob={handleSaveJob}
                          jobDetails={job}
                          badgeName={
                            activeTab === "recommended"
                              ? "Recommended"
                              : activeTab === "applied"
                              ? "Interviewed"
                              : "Saved Jobs"
                          }
                          showDetailJob={activeTab !== "rejected"}
                          headerBadge={activeTab !== "rejected"}
                          featured={false}
                          activeTab={activeTab}
                          createChatRoom={createChatRoom}
                        />
                      </Fragment>
                    ))
                  ) : (
                    <NoDataFound />
                  )}

                  {totalPage > CANDIDATE_JOB__PER_PAGE && (
                    <Pagination
                      onPageChange={onPageChange}
                      totalPage={totalPage}
                      jobPerPage={CANDIDATE_JOB__PER_PAGE}
                    />
                  )}
                  {/* <div className="col-12 text-center">
                    <button type="button" className="btn-design">
                      Load More
                    </button>
                  </div> */}
                </div>

                {(activeTab === "recommended" || activeTab === "saved") && (
                  <div className="jobBoardSidebar">
                    <h5>Top Organisations in your category</h5>

                    <div className="shadow-box mt-2 mb-4">
                      {topCompaniesList?.length > 0 ? (
                        topCompaniesList.map((topCom, i) => (
                          <div className="skill-profile-col" key={i}>
                            <div className="skill-profile-icon">
                              <span>
                                <img
                                  src={
                                    topCom?.banner_img
                                      ? `${APPLICATION_BASE_URL}${topCom?.logo}`
                                      : "../assets/images/view-tags.svg"
                                  }
                                />
                              </span>
                            </div>
                            <div className="skill-profile-content">
                              <h6>{topCom.company_name}</h6>
                              <p>{topCom.location}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <NoDataFound />
                      )}
                    </div>

                    <h5>Top Job List</h5>
                    <div className="shadow-box mt-2 mb-4">
                      <div className="savejobsidebar">
                        <ul>
                          {topJobsList?.length > 0 ? (
                            topJobsList.map((jobLst, i) => (
                              <li key={i}>
                                {jobLst.title} <span>{jobLst.count} Jobs </span>
                              </li>
                            ))
                          ) : (
                            <NoDataFound />
                          )}
                        </ul>
                      </div>
                    </div>

                    <h5>Advertisement</h5>
                    <div className="advertise mt-2">
                      <NoDataFound />
                    </div>
                    {/* commented for future use */}
                    {/* <div className="advertise mt-2">
                      <img src="/assets/images/advertise.png" />
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </JobSeekerDashboardLayout>
  );
};

export default Jobs;
