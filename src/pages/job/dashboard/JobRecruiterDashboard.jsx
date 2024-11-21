import React, { useEffect } from "react";
import "../style.css";
import { useState } from "react";
import {
  getRecuiterDashboardHeaderData,
  getUpcomingInterviews,
} from "../../../API/recruitersApi";
import moment from "moment";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import PageLoader from "../../../components/loader/PageLoader";
import { useNavigate } from "react-router-dom";
import { getJobListWithJobCount } from "../../../API/jobdashboard";
import {
  RECRUITER_DASHBOARD_JOBS_PER_PAGE,
  UPCOMING_INTERVIEWS_PER_PAGE,
} from "../../../constants/Constent";
import ShareModal from "../../../components/common/model/ShareModal";
import Pagination from "../../../components/pagination/Pagination";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";
import {
  CREATE_JOB_ERROR_MESSAGE,
  isAllowedToAddJob,
} from "../staffManagement";
import PermissionModal from "../../../components/common/model/PermissionModal";
import { getSimilarJobs } from "../../../API/recruiterJobApplication";
import DropdownField from "../../../components/inputFields/DropdownField";
import { INTERVIEW_ORDER_BY_OPTIONS } from "../application/constant";
const JobRecruiterDashboard = () => {
  // Commented for future use if user has not purchase any plan till payment integration
  // const [modalDetails, setModalDetail] = useState({
  //   show: true,
  //   title: "Rate Candidates",
  // });
  const [dashboardHeaderData, setDashboardHeaderData] = useState({});
  const [loader, setLoader] = useState();
  const [dashboardJobDetails, setDashboardJobDetails] = useState([]);
  const [date, setDate] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "week").format("YYYY-MM-DD"),
  });
  const [filter, setFilter] = useState({
    timePeriod: "week",
    position: "Web developer",
  });
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [similarJobs, setSimilarJobs] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  // const [orderBy,setOrderBy] = useState("-day_and_date");
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [showShareModal, setShowShareModal] = useState({ show: false, id: "" });
  const [permissionErrorMessage, setPermissionErrorMessage] = useState(null);
  const [totalUpcomingInterviews, setTotalUpcomingInterviews] = useState(0);
  const [currentInterviewPage, setCurrentInterviewPage] = useState({ page: 1 });
  const [showPermissionAccessModal, setShowPermissionAccessModal] =
    useState(false);
  const togglePermissionModal = () => {
    setShowPermissionAccessModal(!showPermissionAccessModal);
  };
  const navigate = useNavigate();
  useEffect(() => {
    setLoader(true);
    const query = `?page=${currentPage.page}&page_size=${RECRUITER_DASHBOARD_JOBS_PER_PAGE}`;
    getJobListWithJobCount(query)
      .then((res) => {
        setLoader(false);
        const onlyTen = res?.data?.data.filter((d, i) => i < 5);
        // setTotalPage(res?.data?.data?.count);
        setDashboardJobDetails(onlyTen);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  useEffect(() => {
    setLoader(true);
    getRecuiterDashboardHeaderData()
      .then((res) => {
        setDashboardHeaderData(res.data.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
    handleGetSimilarJobs();
  }, []);
  useEffect(() => {
    setLoader(true);
    let query = "";
    if (dashboardJobDetails?.length) {
      query = `start_date=${date?.startDate}&end_date=${date?.endDate}&page=${currentInterviewPage.page}&page_size=${UPCOMING_INTERVIEWS_PER_PAGE}`;
      // query = `start_date=${date?.startDate}&end_date=${date?.endDate}&page=${currentInterviewPage.page}&page_size=${UPCOMING_INTERVIEWS_PER_PAGE}&order_by=${orderBy}`;

    }
    getUpcomingInterviews(query)
      .then((res) => {
        setLoader(false);
        setTotalUpcomingInterviews(res?.data?.data?.count);
        setUpcomingInterviews(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [date, currentInterviewPage]);
// }, [date, currentInterviewPage,orderBy]);

  const toggleShareModal = (jobId = "") => {
    setShowShareModal({
      show: !showShareModal.show,
      id: jobId,
    });
  };

  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };
  const handleUpcomingInterviewPageChange = (selectedPage) => {
    setCurrentInterviewPage({ page: selectedPage.selected + 1 });
  };

  const handleNextDate = () => {
    setDate((prev) => {
      return {
        startDate: prev.endDate,
        endDate: moment(prev.endDate)
          .add(1, filter.timePeriod)
          .format("YYYY-MM-DD"),
      };
    });
    // onDateChange();
  };
  const handlePreviousDate = () => {
    setDate((prev) => {
      return {
        startDate: moment(prev.startDate)
          .subtract(1, filter.timePeriod)
          .format("YYYY-MM-DD"),
        endDate: prev.startDate,
      };
    });
    // onDateChange();
  };
  console.log(similarJobs, "sssssss");
  const handleGetSimilarJobs = () => {
    setLoader(true);
    getSimilarJobs()
      .then((res) => setSimilarJobs(res?.data?.data))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handleRedirectToJobs = (selectedTab) => {
    localStorage.setItem("redirectedTab", selectedTab);
    navigate("/job-recruiter/job-dashboard");
  };
  const handleRedirectToApplication = (selectedTab) => {
    navigate("/job-recruiter/application");
    localStorage.setItem("redirectedTab", selectedTab);
  };
  // const sampleData = [
  //   {
  //     id: 49,
  //     actions: ["Reschedule", "Cancel"],
  //     job_title: "Python",
  //     name: "TestUser",
  //     candidate_details: {
  //       user: 7,
  //       id: 1,
  //       candidate_name: "Test User",
  //       professional_overview: null,
  //       is_public: true,
  //       upload_cv: "/media/cv/tets_resume_aRJGyZB.pdf",
  //       cover_letter: null,
  //       total_experience: null,
  //       email: "pardeep@avioxtechnologies.com",
  //       phone_number: "+918437379367",
  //       profile_picture: null,
  //       job_type: "Full Time",
  //       employment_options: [],
  //       status: "Ready for interview",
  //       salary_range: null,
  //       job_id: 2,
  //       job_title: "Python",
  //       qualifications: [],
  //       skills: [],
  //       experiences: [],
  //       job_locations: [],
  //       languages: [],
  //       links: [],
  //       job_preferences: [],
  //     },
  //     created_at: "2024-03-05T09:45:37.569142Z",
  //     updated_at: "2024-03-05T10:19:35.890121Z",
  //     is_active: true,
  //     time_zone: "Africa/Addis_Ababa",
  //     day_and_date: "2023-10-31T03:00:00+03:00",
  //     duration_time: "2 hrs",
  //     start_time: "11:00:00",
  //     end_time: "01:00:00",
  //   },
  // ];
  const handlePostFirstJob = () => {
    if (isAllowedToAddJob()) {
      navigate("/job-recruiter/create-job");
    } else {
      // toastMessage(CREATE_JOB_ERROR_MESSAGE);
      setPermissionErrorMessage(CREATE_JOB_ERROR_MESSAGE);
      togglePermissionModal();
    }
  };
  const sampleData = [
    {
      company_name: "beginner",
      summary:
        "Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at",
      experience: "2 years",
      candidate: "10+",
      shortListed: "20+",
    },
  ];
  return (
    <>
      <JobRecruiterDashboardLayout
        header={"Dashboard"}
        subTitle={
          "Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at "
        }
        showSearchBar={false}
      >
        <div className="dashboard-main-panel">
          {loader && <PageLoader />}
          {/* <Header /> */}
          <div className="dashboard-panel-content">
            <div className="top_left font-weight-bold for-mobile">
              <h3>Dashboard</h3>
              <p>Today, {moment().format("MMMM D, YYYY")}</p>
            </div>
            <div className="row">
              <div className="col-md-4 col-12">
                <div className="card-stats">
                  <div
                    className="job-stats-card-header cursor-pointer"
                    onClick={() => {
                      handleRedirectToJobs("active");
                    }}
                  >
                    <div className="card-icon">
                      <span className="icon-img">
                        <img src="/assets/images/job-open.svg" />
                      </span>
                      <span>Open Jobs</span>
                    </div>
                    <div className="job-count">
                      {dashboardHeaderData.opened_jobs_count
                        ? dashboardHeaderData.opened_jobs_count
                        : 0}{" "}
                    </div>
                  </div>
                  <div className="job-stats-card-footer">
                    <div className="job-percent">
                      Jobs
                      <span>
                        {dashboardHeaderData.active_job_percentage
                          ? dashboardHeaderData.active_job_percentage.toFixed(2)
                          : 0}{" "}
                        %
                      </span>
                    </div>
                    <div className="job-graph">
                      <img src="/assets/images/job-graph1.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card-stats">
                  <div
                    className="job-stats-card-header cursor-pointer"
                    onClick={() => {
                      handleRedirectToJobs("closed");
                    }}
                  >
                    <div className="card-icon">
                      <span className="icon-img">
                        <img src="/assets/images/job-closed.svg" />
                      </span>
                      <span>Closed Jobs</span>
                    </div>
                    <div className="job-count">
                      {dashboardHeaderData.closed_job_count
                        ? dashboardHeaderData.closed_job_count
                        : 0}
                    </div>
                  </div>
                  <div className="job-stats-card-footer">
                    <div className="job-percent">
                      Jobs
                      <span>
                        {dashboardHeaderData.closed_job_count
                          ? dashboardHeaderData.closed_job_count.toFixed(2)
                          : 0}{" "}
                        %
                      </span>
                    </div>
                    <div className="job-graph">
                      <img src="/assets/images/job-graph2.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card-stats">
                  <div
                    className="job-stats-card-header cursor-pointer"
                    onClick={() => {
                      handleRedirectToApplication("shortlisted");
                    }}
                  >
                    <div className="card-icon">
                      <span className="icon-img">
                        <img src="/assets/images/job-shortlisted.svg" />
                      </span>
                      <span>Shortlisted</span>
                    </div>
                    <div className="job-count">
                      {" "}
                      {dashboardHeaderData.shortlisted_job_count
                        ? dashboardHeaderData.shortlisted_job_count
                        : 0}
                    </div>
                  </div>
                  <div className="job-stats-card-footer">
                    <div className="job-percent">
                      Applicants
                      <span>
                        {dashboardHeaderData.shortlisted_job_percentage
                          ? dashboardHeaderData.shortlisted_job_percentage.toFixed(
                              2
                            )
                          : 0}{" "}
                        %
                      </span>
                    </div>
                    <div className="job-graph">
                      <img src="/assets/images/job-graph3.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-first-job">
              <div className="row">
                <div className="col-xxl-9 col-md-8 col-12">
                  {dashboardJobDetails?.length > 0 ? (
                    <div className="global-table table-responsive">
                      <table className="table align-middle">
                        <thead>
                          <tr>
                            <th>Job/Template Title</th>
                            <th>Viewers</th>
                            <th className="text-center">Applicants</th>
                            <th className="text-center">Date posted</th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                        {dashboardJobDetails?.map((curJobData) => {
                          return (
                            <tbody key={curJobData.job_id}>
                              <tr>
                                <td>
                                  <div className="jobTitle">
                                    <span className="strong">
                                      <b>{curJobData?.title}</b>
                                    </span>
                                    <span>{curJobData?.company_name}</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="count">
                                    <p> {curJobData?.viewers}</p>
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div className="count">
                                    <span> {curJobData?.applicants_count}</span>
                                  </div>
                                </td>
                                <td className="text-center">
                                  <span>
                                    {" "}
                                    {curJobData?.created_at
                                      ? moment(curJobData?.created_at).format(
                                          "MMMM DD, YYYY"
                                        )
                                      : "N/A"}
                                  </span>
                                </td>
                                <td className="text-center">
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
                                        onClick={() =>
                                          toggleShareModal(curJobData.job_id)
                                        }
                                      >
                                        <img src="/assets/images/sharing.svg" />{" "}
                                        Sharing Job
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                      {dashboardJobDetails?.length >
                        RECRUITER_DASHBOARD_JOBS_PER_PAGE && (
                        <Pagination
                          jobPerPage={RECRUITER_DASHBOARD_JOBS_PER_PAGE}
                          totalPage={totalPage}
                          onPageChange={onPageChange}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="post-job-col border py-extra">
                      <h5>Post your first Job</h5>
                      <p>Post your first job to find best talents</p>
                      <button
                        // href="/job-recruiter/create-job"
                        aria-label="create-new-job"
                        onClick={handlePostFirstJob}
                        className="btn-design"
                      >
                        Post Job
                      </button>
                    </div>
                  )}
                </div>

                <div className="col-xxl-3 col-md-4 col-12">
                  {dashboardJobDetails?.length > 0 ? (
                    <div className="upcoming-inteviews border">
                      <h5 className="w-100 text-start">Upcoming Interview</h5>
                      <div className="interviewstable-topbar p-0">
                        <div className="row align-items-center">
                          <div className="col-12 d-block">
                            <div className="inteviewTableDateFilter">
                              <ul>
                                <li className="w-100 mb-3">
                                  <p className="m-1 d-flex align-items-center justify-content-between">
                                    <div>
                                      {moment(
                                        date.startDate,
                                        "YYYY-MM-DD"
                                      ).format("MMM D, YYYY")}{" "}
                                      -{" "}
                                      {moment(
                                        date.endDate,
                                        "YYYY-MM-DD"
                                      ).format("MMM D, YYYY")}
                                    </div>
                                    <div>
                                      <button
                                        className="border-0 rounded"
                                        style={{
                                          marginLeft: "7px",
                                          width: "20px",
                                        }}
                                        onClick={handlePreviousDate}
                                        disabled={
                                          date.startDate ===
                                          moment(new Date()).format(
                                            "YYYY-MM-DD"
                                          )
                                        }
                                      >
                                        <i className="fa-solid fa-caret-left"></i>
                                      </button>
                                      <button
                                        className="border-0 rounded"
                                        style={{
                                          marginLeft: "7px",
                                          width: "20px",
                                        }}
                                        onClick={handleNextDate}
                                      >
                                        <i className="fa-solid fa-caret-right"></i>
                                      </button>
                                    </div>
                                    {/* <div className="filter">
                                      <div className="">
                                        <div className="">
                                          <div className="fieldset custom-search">
                                            <DropdownField
                                              option={
                                                INTERVIEW_ORDER_BY_OPTIONS
                                              }
                                              handleOnChange={(value) =>
                                                setOrderBy(value)
                                              }
                                              smallDropdown={true}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                  </p>
                                </li>
                              </ul>
                            </div>
                            <div className="upcomingInterviewList">
                              {upcomingInterviews?.results?.length ? (
                                upcomingInterviews?.results?.map(
                                  (curElem, idx) => (
                                    <div
                                      className="upcomingInterview d-flex gap-3 py-3 px-2"
                                      key={idx}
                                    >
                                      <div className="list-icon">
                                        <b>
                                          {
                                            curElem?.candidate_details
                                              ?.candidate_name[0]
                                          }
                                        </b>
                                      </div>
                                      <div className="d-flex justify-content-between w-100">
                                        <div>
                                          <p className="mb-1 text-name">
                                            {curElem?.name}
                                          </p>
                                          <p className="mb-0 text-pos">
                                            {curElem?.job_title}
                                          </p>
                                        </div>
                                        <div className="d-flex gap-2">
                                          <p className="mb-0 timing-text">
                                            {moment(
                                              curElem?.start_time,
                                              " hh:mm:ss"
                                            ).format("h:mm A")}
                                          </p>
                                          <p className="mb-0 timing-text">
                                            {moment(
                                              curElem?.end_time,
                                              " hh:mm:ss"
                                            ).format("h:mm A")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <NoDataFound msg="No Interviews Scheduled Yet" />
                              )}
                            </div>
                            {totalUpcomingInterviews >
                              UPCOMING_INTERVIEWS_PER_PAGE && (
                              <Pagination
                                jobPerPage={UPCOMING_INTERVIEWS_PER_PAGE}
                                totalPage={totalUpcomingInterviews}
                                onPageChange={handleUpcomingInterviewPageChange}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="upcoming-inteviews border py-extra">
                      <h5>Upcoming Interview</h5>
                      <p>
                        Create your first job to find best talents and then you
                        will see interviews
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* add section here */}
            <div className="global-table table-responsive mt-4">
              {similarJobs?.length ? (
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Job Title</th>
                      <th
                        style={{
                          width: "35%",
                          minWidth: "200px",
                        }}
                      >
                        Summary
                      </th>
                      <th>Experience</th>
                      <th>Candidates</th>
                      <th>Short Listed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {similarJobs.map(
                      (
                        {
                          company_title,
                          company_summary,
                          applicants_shortlisted,
                          job_applicants,
                          experience,
                          title,
                        },
                        index
                      ) => (
                        <tr key={index}>
                          <td className="strong text-capitalize">
                            {company_title}
                          </td>
                          <td>{title}</td>
                          <td>{company_summary}</td>
                          <td>{experience}</td>
                          <td>{job_applicants}</td>
                          <td>{applicants_shortlisted}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <NoDataFound />
              )}
            </div>
            {/* add section here */}
            {!(dashboardJobDetails?.data?.length > 0) && (
              <>
                <div className="training-courses py-50">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h3>E-Learning</h3>
                      <p>
                        Enhancing Education Through Flexible and Engaging Online
                        Learning
                      </p>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="e-learning_col">
                        <div className="e-learning_img ratio ratio-1x1">
                          <img src="/assets/images/e-learning1.jpg" />
                        </div>
                        <div className="e-learning_content">
                          <h5>Nulla mauris nunc,</h5>
                          <p>
                            Fusce rhoncus lectus vel lectus sollicitudin
                            lobortis.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="e-learning_col">
                        <div className="e-learning_img ratio ratio-1x1">
                          <img src="/assets/images/e-learning2.jpg" />
                        </div>
                        <div className="e-learning_content">
                          <h5>Curabitur ac dolor ligula</h5>
                          <p>
                            Fusce rhoncus lectus vel lectus sollicitudin
                            lobortis.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="e-learning_col">
                        <div className="e-learning_img ratio ratio-1x1">
                          <img src="/assets/images/e-learning3.jpg" />
                        </div>
                        <div className="e-learning_content">
                          <h5>Nulla mauris nunc,</h5>
                          <p>
                            Fusce rhoncus lectus vel lectus sollicitudin
                            lobortis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* <div className="dashboard-footer copyright">
              <div className="row">
                <div className="col-md-7 col-12">
                  <p>© 2023 TalentCo. All Rights Reserved.</p>
                </div>
                <div className="col-md-5 col-12">
                  <ul>
                    <li>
                      <a href="contact.html">Contact Us</a>
                    </li>
                    <li>
                      <a href="faq.html">FAQs</a>
                    </li>
                    <li>
                      <a href="about.html">About Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
          {/*---------------- Modal Start ----------------*/}
          {/* <ModalWrapper
        showModal={modalDetails.show}
        title={modalDetails.modalTitle}
        toggleModal={toggleModal}
        modalSize="md"
      >
        <>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="subscriptionpopup">
                  <img src="/assets/images/warning-icon.svg" />
                  <h4>Subscribe to post your jobs</h4>
                  <p>
                    Please choose your subscription plan to create and post jobs
                  </p>
                  <a href="/subscription-plans" className="btn-design">
                    Select a Subscription Plan
                  </a>
                  <button
                    type="button"
                    className="btn-design border-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </ModalWrapper> */}
          {/*---------------- Modal End ----------------*/}
          {/* Share job Modal */}
          {showShareModal.show && (
            <ShareModal
              showShareModal={showShareModal.show}
              toggleShareModal={toggleShareModal}
              text="Share Job"
              jobID={showShareModal.id}
            />
          )}
          {showPermissionAccessModal && (
            <PermissionModal
              showModal={showPermissionAccessModal}
              toggleModal={togglePermissionModal}
              text={permissionErrorMessage}
            />
          )}
        </div>
      </JobRecruiterDashboardLayout>
    </>
  );
};

export default JobRecruiterDashboard;
