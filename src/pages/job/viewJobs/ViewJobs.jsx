import React, { useEffect, useState } from "react";
import "../style.css";
import Pagination from "../../../components/pagination/Pagination";
import moment from "moment/moment";
import { getJobList, updateJob } from "../../../API/jobdashboard";
import { JOB_PER_PAGE } from "../../../constants/Constent";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import PageLoader from "../../../components/loader/PageLoader";
import JobRecruiterFooter from "../../../components/job-recruiter/dashboard/JobRecruiterFooter";
import Header from "../../../components/job-recruiter/dashboard/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VIEW_JOB_TAB } from "../constant";
import { Fragment } from "react";
import FilterTabs from "../../../components/common/FilterTabs";
import ShareModal from "../../../components/common/model/ShareModal";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";
import {
  CREATE_JOB_ERROR_MESSAGE,
  PUBLISH_JOB_ERROR,
  UPDATE_PROFILE_ERROR,
  isAllowedToAddJob,
} from "../staffManagement";
import { toastMessage } from "../../../utils/toastMessages";
import PermissionModal from "../../../components/common/model/PermissionModal";
import DropdownField from "../../../components/inputFields/DropdownField";
import { JOBS_ORDER_BY_OPTIONS } from "../application/constant";

const ViewJobs = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalpage] = useState(0);
  const [jobsData, setJobsData] = useState([]);
  const [orderBy,setOrderBy] = useState("-created_at")
  const [loader, setLoader] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchTableTimer, setSearchTableTimer] = useState();
  const [showShareModal, setShowShareModal] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [showPermissionAccessModal, setShowPermissionAccessModal] =
    useState(false);
  const [permissionErrorMessage, setPermissionErrorMessage] = useState(null);
  const togglePermissionModal = () => {
    setShowPermissionAccessModal(!showPermissionAccessModal);
  };
  const navigate = useNavigate();

  const toggleShareModal = (jobId) => {
    setJobId(jobId);
    setShowShareModal(!showShareModal);
  };

  useEffect(() => {
    setLoader(true);
    let param;
    //user redirected from dashboard logic
    const redirectedTab = localStorage.getItem("redirectedTab");

    let tempSelectedTab = redirectedTab ? redirectedTab : selectedTab;
    setSelectedTab((prev) => tempSelectedTab);
    localStorage.removeItem("redirectedTab");
    //user redirected from dashboard logic
    if (tempSelectedTab === "all") {
      param = `?page=${currentPage.page}&page_size=${JOB_PER_PAGE}&search=${searchText}&order_by=${orderBy}`;
    } else {
      param = `?page=${currentPage.page}&page_size=${JOB_PER_PAGE}&status=${tempSelectedTab}&search=${searchText}`;
    }
    // const param = `page_size${currentPage.page}`;
    getJobListData(param);
  }, [currentPage,orderBy]);

  const getJobListData = (param) => {
    getJobList(param)
      .then((res) => {
        setJobsData(res?.data?.data?.results);
        setTotalpage(res?.data?.data?.count);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const onTabChange = (tabName) => {
    if (tabName !== selectedTab) {
      setSelectedTab(tabName);
      setCurrentPage({ page: 1 });
    }
  };

  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };

  const publishJob = (id, index) => {
    setLoader(true);
    const param = `/${id}`;
    const payload = {
      status: "active",
    };
    if (isAllowedToAddJob()) {
      updateJob(param, payload)
        .then((res) => {
          const tempJobsData = [...jobsData];
          tempJobsData[index] = res?.data?.data;
          setJobsData([...tempJobsData]);
          setCurrentPage({ page: 1 });
          toast.success("Job Published Successfully");
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            toast.error(err?.response?.data?.message);
          }
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      // toastMessage(PUBLISH_JOB_ERROR);
      setPermissionErrorMessage(PUBLISH_JOB_ERROR);
      togglePermissionModal();
      setLoader(false);
    }
  };

  const handleJobSearch = (searchValue) => {
    if ((!jobsData || jobsData?.length === 0) && searchText.length === 0) {
      return;
    }
    setSearchText(searchValue);
    clearTimeout(searchTableTimer);
    if (searchText.length === 0 && searchValue.length === 0) {
      return;
    }
    const timer = setTimeout(() => {
      setCurrentPage({ page: 1 });
    }, 500);
    setSearchTableTimer(timer);
  };
  const handleCreateNewJob = () => {
    if (isAllowedToAddJob()) {
      navigate("/job-recruiter/create-job");
    } else {
      // toastMessage(CREATE_JOB_ERROR_MESSAGE);
      setPermissionErrorMessage(CREATE_JOB_ERROR_MESSAGE);
      togglePermissionModal();
    }
  };
  return (
    <>
      <JobRecruiterDashboardLayout
        header={" Jobs "}
        subTitle={
          "Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at "
        }
        showSearchBar={false}
      >
        <div className="business-dashboard">
          <div className="dashboard-main-panel ">
            {/* <Header /> */}

            <div className="dashboard-panel-content">
              {/* dashboard Head For Mobile */}
              <div className="top_left font-weight-bold for-mobile">
                <h3>Jobs</h3>
              </div>
              {/* dashboard Head For Mobile */}
              <form className="banner-seach ask-que">
                <input
                  type="text"
                  name=""
                  placeholder="keyword"
                  onChange={(e) => handleJobSearch(e.target.value)}
                />
                <button
                  type="button"
                  // onClick={() => {
                  //   navigate("/job-recruiter/create-job");
                  // }}
                  onClick={handleCreateNewJob}
                  className="btn-design"
                >
                  Create New Job
                </button>
              </form>
              <div className="jobsTabs-sec py-50">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {VIEW_JOB_TAB.map((jobTab, i) => (
                    <Fragment key={i}>
                      <FilterTabs
                        title={jobTab.title}
                        active={selectedTab === jobTab.label}
                        handleClickTab={() => onTabChange(jobTab.label)}
                      />{" "}
                    </Fragment>
                  ))}
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="recruiterJobFilter">
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
                  <div
                    className="tab-pane fade show active"
                    role="tabpanel"
                    aria-labelledby="alljobs-tab"
                  >
                    {loader && <PageLoader />}
                    <div className="global-table table-responsive jobRecruiterTable">
                      <table className="table align-middle">
                        <thead>
                          <tr>
                            <th style={{ width: "35%", minWidth: "200px" }}>
                              Job/Template Title
                            </th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Date Posted</th>
                            <th className="text-end">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobsData.length > 0 ? (
                            jobsData.map((job, index) => (
                              <tr key={job.id}>
                                <td>
                                  <strong>{job.title}</strong>
                                  <p>
                                    {job.job_role} | {job.job_type} |{" "}
                                    {job?.employment_options?.map(
                                      (empType, i) =>
                                        `${empType.title} ${
                                          job?.employment_options[i + 1]
                                            ? "|"
                                            : ""
                                        }`
                                    )}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <span className={`${job?.status}-status`}>
                                    {job?.status}
                                  </span>
                                </td>
                                <td className="text-center">
                                  {job?.created_at
                                    ? moment(job?.created_at).format(
                                        "MMMM DD, YYYY"
                                      )
                                    : "N/A"}
                                </td>
                                <td className="text-end">
                                  <div className="action-flex">
                                    {job?.status === "draft" && (
                                      <span
                                        className="btn-design btn-small border-btn edit-btn"
                                        onClick={() =>
                                          publishJob(job.id, index)
                                        }
                                      >
                                        Publish Job
                                      </span>
                                    )}
                                    {job?.status !== "draft" && (
                                      <Link
                                        to={`/job-recruiter/edit-job/${job.id}`}
                                        state={job?.status === "closed" && job}
                                        className="btn-design btn-small edit-btn"
                                      >
                                        {job?.status === "closed"
                                          ? "Duplicate Job"
                                          : "Edit Job"}
                                      </Link>
                                    )}
                                    {/* On click 3 dot more option */}
                                    <div className="dropdown list_edit_panel">
                                      <button
                                        className="btn  dropdown-toggle"
                                        type="button"
                                        id="dropdownMenu2"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        <span>
                                          <i className="fas fa-ellipsis-v"></i>
                                        </span>
                                      </button>
                                      <div
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                      >
                                        <a
                                          href="view_panel_detail.html"
                                          className="dropdown-item"
                                          type="button"
                                        >
                                          <img src="/assets/images/referral.svg" />{" "}
                                          Referral Job
                                        </a>
                                        <button
                                          className="dropdown-item"
                                          type="button"
                                          onClick={() => {
                                            toggleShareModal(job?.id);
                                          }}
                                        >
                                          <img src="/assets/images/sharing.svg" />{" "}
                                          Sharing Job
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <NoDataFound />
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {totalPage > JOB_PER_PAGE && (
                <Pagination
                  pageData={jobsData}
                  onPageChange={onPageChange}
                  totalPage={totalPage}
                />
              )}
              {/* <JobRecruiterFooter /> */}
            </div>
          </div>
        </div>
        {showShareModal && (
          <ShareModal
            showShareModal={showShareModal}
            toggleShareModal={toggleShareModal}
            text="Share Job"
            jobID={jobId}
          />
        )}
        {showPermissionAccessModal && (
          <PermissionModal
            showModal={showPermissionAccessModal}
            toggleModal={togglePermissionModal}
            text={permissionErrorMessage}
          />
        )}
      </JobRecruiterDashboardLayout>
    </>
  );
};

export default ViewJobs;
