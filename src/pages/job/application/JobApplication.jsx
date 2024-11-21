import React, { useEffect } from "react";
import Header from "../../../components/job-recruiter/dashboard/Header";
import {
  DEBOUNCE_SEARCH_TIMER,
  JOB_APPLICATION_HEADER,
  MODALS_NAME,
  ORDER_BY_OPTIONS,
  TABS,
} from "./constant";
import SideFilters from "../../../components/job-recruiter/dashboard/SideFilters";
import ApplicationCardRecommended from "../../../components/job-recruiter/dashboard/ApplicationCardRecommended";
import Pagination from "../../../components/pagination/Pagination";
import { useState } from "react";
import {
  APPLICATION_STATUS,
  JOB_APPLICATION_PER_PAGE,
  JOB_PER_PAGE,
} from "../../../constants/Constent";
import "../style.css";
import ApplicationModals from "../../../components/job-recruiter/dashboard/applicationsModal/ApplicationModals";
import { APPLICATION_MODAL_NAMES } from "../../../components/job-recruiter/constant/constant";
import FilterTabs from "../../../components/common/FilterTabs";
import { Fragment } from "react";
import HiredAndContractTable from "../../../components/job-recruiter/dashboard/HiredAndContractTable";
import {
  deleteHiredJobApplication,
  getCountOfAllJobs,
  getHiredJobApplications,
  getJobApplications,
  getRecommendedJobs,
  shortListCandidateApi,
} from "../../../API/recruiterJobApplication";
import { buildQueryFromSelectedFilters } from "../../../utils/utils";
import PageLoader from "../../../components/loader/PageLoader";
import { toast } from "react-toastify";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import { Link } from "react-router-dom";
import {
  getRecruiterFilterList,
  getTimeZoneListing,
} from "../../../API/masterApiData";
import moment from "moment";
import DropdownField from "../../../components/inputFields/DropdownField";
import { useOnlyStringWithSingleSpace } from "../../../hooks/customHooks";
import { setTimeZonList } from "../../../redux/masterDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { chatRoomWIthSpecificUser } from "../../../API/candidateJobs";
import { useNavigate } from "react-router";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";

const JobApplication = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [applicationModal, setShowApplicationModal] = useState({
    show: false,
    modalTitle: "",
    modalName: "",
    id: null,
  });
  const [selectedTab, setSelectedTab] = useState(TABS.RECOMMENDED);
  const [applicationsData, setApplicationData] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [loader, setLoader] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState({
    keywords: [],
    custom_search: "",
    job_type: [],
    job_location: [],
    skills: [],
    employment_type: [],
    rating: [],
    salaryRange: {
      salary_amount_currency: "",
      range: "",
      salary_amount_type: "",
      salary_amount_max: "",
      salary_amount_min: "",
    },
  });
  const [jobApplicationsCount, setJobApplicationCount] = useState({});
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [filterList, setFilterList] = useState([]);
  const [orderBy, setOrderBy] = useState("-created_at");
  const dispatch = useDispatch();
  const timeZone = useSelector((state) => state?.masterAPIData?.timeZone);
  const navigate = useNavigate();

  useEffect(() => {
    setApplicationData([]);

    const redirectedTab = localStorage.getItem("redirectedTab");
    let tempSelectedTab = redirectedTab ? redirectedTab : selectedTab;
    setSelectedTab((prev) => tempSelectedTab);
    localStorage.removeItem("redirectedTab");

    setLoader(true);
    if (tempSelectedTab === TABS.RECOMMENDED) {
      getRecommendedJobApplication();
    } else {
      getApplications();
    }
  }, [selectedFilter, selectedTab, currentPage, orderBy]);
  useEffect(() => {
    getJobCount();
    getFiltersListData();
  }, []);

  useEffect(() => {
    if (!timeZone?.length > 0) {
      getTimeZoneListing()
        .then((res) => {
          dispatch(setTimeZonList(res?.data?.data?.timezones));
        })
        .catch((err) => {
          console.log(err, "error in time zone API");
        });
    }
  }, []);

  // Commented for future use
  // useEffect(() => {
  //   setLoader(true)
  //   Promise.all([
  //     getRecruiterFilterList().then((res) => {
  //       setFilterList(res.data.data);
  //     }),
  //     getCountOfAllJobs().then((res) => {
  //       setJobApplicationCount(res.data.data);
  //     }),
  //   ])
  //     .then(() => {})
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoader(false);
  //     });
  // }, []);

  const getFiltersListData = () => {
    getRecruiterFilterList()
      .then((res) => {
        setFilterList(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error in filter API");
      });
  };
  const getRecommendedJobApplication = () => {
    setLoader(true);
    let temSelectedFilter = { ...selectedFilter };
    if (selectedFilter.rating?.length > 0) {
      temSelectedFilter.rating = [Math.max(...selectedFilter.rating)];
    }
    let query = buildQueryFromSelectedFilters(temSelectedFilter);
    query =
      query.length > 0
        ? `${query}&page=${currentPage.page}`
        : `page=${currentPage.page}&${`page_size=${
            selectedTab === TABS.CONTRACT || selectedTab === TABS.HIRED
              ? JOB_PER_PAGE
              : JOB_APPLICATION_PER_PAGE
          }`}`;

    getRecommendedJobs(`${query}`)
      .then((res) => {
        setTotalPage(res.data.data.count);
        setApplicationData(
          res?.data?.data?.results ? res.data.data.results : []
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getJobCount = () => {
    getCountOfAllJobs()
      .then((res) => {
        setJobApplicationCount(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const getApplications = () => {
    setLoader(true);
    let temSelectedFilter = { ...selectedFilter };
    if (selectedFilter.rating?.length > 0) {
      temSelectedFilter.rating = [Math.max(...selectedFilter.rating)];
    }
    let query = buildQueryFromSelectedFilters(temSelectedFilter);
    query =
      query.length > 0
        ? `?status=${selectedTab}&${query}&page=${
            currentPage.page
          }&${`page_size=${
            selectedTab === TABS.CONTRACT || selectedTab === TABS.HIRED
              ? JOB_PER_PAGE
              : JOB_APPLICATION_PER_PAGE
          }`}&order_by=${orderBy}`
        : `?status=${selectedTab}&page=${currentPage.page}&${`page_size=${
            selectedTab === TABS.CONTRACT || selectedTab === TABS.HIRED
              ? JOB_PER_PAGE
              : JOB_APPLICATION_PER_PAGE
          }`}&order_by=${orderBy}`;
    if (selectedTab === TABS.HIRED) {
      getHiredJobApplications(query)
        .then((res) => {
          setTotalPage(res.data.data.count);
          setApplicationData(
            res?.data?.data?.results ? res.data.data.results : []
          );
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      getJobApplications(query)
        .then((res) => {
          setTotalPage(res.data.data.count);
          setApplicationData(
            res?.data?.data?.results ? res.data.data.results : []
          );
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };

  const toggleApplicationModal = (modalName, interviewScheduleDetails) => {
    if (modalName === APPLICATION_MODAL_NAMES.INVITE_SUCCESS_MODAL) {
      setShowApplicationModal({
        show: true,
        modalTitle: TABS.APPLIED,
        modalName: APPLICATION_MODAL_NAMES.INVITE_SUCCESS_MODAL,
        id: null,
      });
    } else if (modalName === MODALS_NAME.invitation) {
      setShowApplicationModal({
        show: true,
        modalTitle: (
          <>
            {moment(interviewScheduleDetails?.start_date).format("dddd")},
            {moment(interviewScheduleDetails?.start_date).format("MMMM d")} at{" "}
            {moment(interviewScheduleDetails?.start_time, "HH:mm").format(
              "h:mm A"
            )}
            -
            {moment(interviewScheduleDetails?.end_time, "HH:mm").format(
              "h:mm A"
            )}{" "}
            sent to <strong>{interviewScheduleDetails?.candidate_name} </strong>
          </>
        ),
        modalName: MODALS_NAME.invitation,
        id: null,
      });
    } else {
      setShowApplicationModal({
        show: false,
        modalTitle: "",
        modalName: "",
        id: null,
      });
    }
  };

  const afterSuccessfullyChangedJobStatus = (modalName, payload) => {
    toggleApplicationModal(modalName, payload);
    getJobCount();
    if (selectedTab === TABS.RECOMMENDED) {
      getRecommendedJobApplication();
    } else {
      getApplications();
    }
  };

  // Shortlist job applications
  const handleShortListCandidate = (application_id) => {
    const payload = { application_status: APPLICATION_STATUS.shortlisted };

    shortListCandidateApi(application_id, payload)
      .then((res) => {
        if (res?.data?.status === "success") {
          setShowApplicationModal({
            show: true,
            modalName: APPLICATION_MODAL_NAMES.INVITE_SUCCESS_MODAL,
            modalTitle: TABS.SHORTLISTED,
          });
          getApplications();
          getJobCount();
        }
      })
      .catch((error) => {
        if (typeof error?.response?.data?.message === "string") {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const deleteHiredJob = (id, cb) => {
    deleteHiredJobApplication(id)
      .then((res) => {
        cb();
        toast.success("Application deleted successfully");
        getApplications();
        getJobCount();
      })
      .catch((err) => {
        cb();
        const erroMessage = err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something went wrong! please try again";
        toast.error(erroMessage);
      });
  };

  const createChatRoom = (userId) => {
    setLoader(true);
    chatRoomWIthSpecificUser(userId)
      .then((res) => {
        setLoader(false);
        localStorage.setItem("roomId", res.data?.data?.results?.room_name);
        navigate("/job-recruiter/messages");
        console.log(res);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  // commented for future use
  // const handleSearchInJobApplication = (searchValue) => {
  //   // if (applicationsData?.length === 0 && searchText.length === 0) {
  //   if (!useOnlyStringWithSingleSpace(searchValue)) {
  //     return;
  //   }
  //   if (applicationsData?.length === 0 && searchByTalentName.length === 0) {
  //     return;
  //   }
  //   if (searchValue.length === 0 && searchByTalentName.length === 0) {
  //     return;
  //   }
  //   setSearchByTalentName(searchValue);
  //   clearTimeout(talentNameSearchTimer);
  //   if (searchByTalentName.length === 0 && searchValue.length === 0) {
  //     return;
  //   }
  //   const timer = setTimeout(() => {
  //     setCurrentPage({ page: 1 });
  //   }, DEBOUNCE_SEARCH_TIMER);
  //   setTalentNameSearchTimer(timer);
  // };

  return (
    <>
      <JobRecruiterDashboardLayout
        header={"Applications"}
        subTitle={
          "Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at "
        }
        showSearchBar={false}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        applicationsData={applicationsData}
        filterList={filterList}
        isApplication = {true}
      >
        <div className="business-dashboard">
          <div className="dashboard-main-panel">
            {/* <Header title={"Applications"} /> */}
            <div className="dashboard-panel-content">
              {/* dashboard Head For Mobile */}
              <div className="top_left font-weight-bold for-mobile">
                <h3>Applications</h3>
              </div>
              {/* dashboard Head For Mobile */}

              <div className="dashboard-application">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {JOB_APPLICATION_HEADER.map((link, i) => (
                    <Fragment key={i}>
                      <FilterTabs
                        title={link.title}
                        active={selectedTab === link.type}
                        handleClickTab={() => {
                          // Commented for future use
                          // setSearchByTalentName("");
                          setSelectedTab(link.type);
                        }}
                        showCount={link.count}
                        count={
                          jobApplicationsCount[link.type]
                            ? jobApplicationsCount[link.type]
                            : 0
                        }
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
                    {loader && <PageLoader />}
                    {selectedTab !== TABS.RECOMMENDED && (
                      <div>
                        <div className="row align-items-center">
                          {/* commented for future use */}
                          {/* <div className="col-md-6">
                          <div className="fieldset custom-search">
                            <input
                              type="text"
                              className="form-control input-icon search-field rounded-5"
                              placeholder="Enter Talent Name"
                              onChange={(e) =>
                                handleSearchInJobApplication(e.target.value)
                              }
                              value={searchByTalentName}
                            />
                            <span className="input-field-icon">
                              <img
                                src="/assets/images/search-icon.svg"
                                alt="Search Icon"
                              />
                            </span>
                          </div>
                        </div> */}
                          <div className="col-md-12">
                            <div className="d-flex justify-content-end">
                              <div className="fieldset custom-search">
                                <DropdownField
                                  option={ORDER_BY_OPTIONS}
                                  handleOnChange={(value) => setOrderBy(value)}
                                  smallDropdown={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="applications-tabs-col align-items-start">
                      {/* Side filter section. */}
                      {/* <SideFilters
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        applicationsData={applicationsData}
                        filterList={filterList}
                      /> */}
                      {/* Application Card. */}
                      <div className="applications-details-sec">
                        {selectedTab === TABS.CONTRACT ||
                        selectedTab === TABS.HIRED ? (
                          <HiredAndContractTable
                            selectedTab={selectedTab}
                            applicationData={applicationsData}
                            deleteHiredJob={deleteHiredJob}
                          />
                        ) : (
                          <>
                            {applicationsData.length > 0 ? (
                              applicationsData?.map((candidataData, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <ApplicationCardRecommended
                                      badgeName={selectedTab}
                                      candidataData={candidataData}
                                    >
                                      {" "}
                                      {selectedTab === TABS.RECOMMENDED && (
                                        <div className="applicant-footer border-top py-2">
                                          <span
                                            // to="/job-recruiter/messages"
                                            onClick={() =>
                                              createChatRoom(
                                                candidataData?.candidate_details
                                                  .id
                                              )
                                            }
                                            className="btn-design border-btn"
                                          >
                                            Message
                                          </span>
                                          <button
                                            type="button"
                                            className="btn-design"
                                            onClick={() => {
                                              setSelectedUserIndex(index);
                                              setShowApplicationModal({
                                                show: true,
                                                modalName:
                                                  APPLICATION_MODAL_NAMES.INVITE_MODAL,
                                                modalTitle: "Invite to Apply",
                                                id: candidataData.application_id,
                                              });
                                            }}
                                          >
                                            Invite to Apply
                                          </button>
                                        </div>
                                      )}
                                      {selectedTab === TABS.APPLIED && (
                                        <div className="applicant-footer border-top py-2">
                                          <button
                                            type="button"
                                            className="btn-design border-btn"
                                            onClick={() => {
                                              handleShortListCandidate(
                                                candidataData.application_id
                                              );
                                            }}
                                          >
                                            <img src="/assets/images/shortlist-icon.svg" />{" "}
                                            Shortlist
                                          </button>
                                          <button
                                            type="button"
                                            className="btn-design"
                                            onClick={() => {
                                              setSelectedUserIndex(index);
                                              setShowApplicationModal({
                                                show: true,
                                                modalName:
                                                  APPLICATION_MODAL_NAMES.HIRE_MODAL,
                                                modalTitle: "Hire Talent",
                                                id: candidataData.application_id,
                                              });
                                            }}
                                          >
                                            Hire
                                          </button>
                                          <button
                                            type="button"
                                            className="btn-design decline-btn"
                                            onClick={() =>
                                              setShowApplicationModal({
                                                show: true,
                                                modalName:
                                                  APPLICATION_MODAL_NAMES.DECLINED_MODAL,
                                                modalTitle: "Declined Talent",
                                                id: candidataData.application_id,
                                              })
                                            }
                                          >
                                            Decline
                                          </button>
                                        </div>
                                      )}
                                      {selectedTab === TABS.SHORTLISTED && (
                                        <div className="applicant-footer border-top py-2">
                                          <button
                                            type="button"
                                            className="btn-design  border-btn"
                                            onClick={() => {
                                              setSelectedUserIndex(index);
                                              setShowApplicationModal({
                                                show: true,
                                                modalName:
                                                  APPLICATION_MODAL_NAMES.HIRE_MODAL,
                                                modalTitle: "Hire Talent",
                                                id: candidataData.application_id,
                                              });
                                            }}
                                          >
                                            Hire
                                          </button>
                                          <button
                                            type="button"
                                            className="btn-design"
                                            disabled={
                                              candidataData.interview_scheduled
                                            }
                                            onClick={() => {
                                              setSelectedUserIndex(index);
                                              setShowApplicationModal({
                                                show: true,
                                                modalName:
                                                  APPLICATION_MODAL_NAMES.INTERVIEW_SCHEDULE_MODAL,
                                                modalTitle:
                                                  "Schedule Interview",
                                                id: candidataData.application_id,
                                              });
                                            }}
                                          >
                                            {candidataData.interview_scheduled
                                              ? "Interview Scheduled"
                                              : "Schedule Interview"}
                                          </button>
                                          <button
                                            type="button"
                                            className="btn-design decline-btn"
                                            onClick={() =>
                                              setShowApplicationModal({
                                                show: true,
                                                modalName:
                                                  APPLICATION_MODAL_NAMES.DECLINED_MODAL,
                                                modalTitle: "Declined Talent",
                                                id: candidataData.application_id,
                                              })
                                            }
                                          >
                                            Decline
                                          </button>
                                        </div>
                                      )}
                                      {selectedTab === TABS.INTERVIEWED && (
                                        <div className="applicant-footer border-top py-2">
                                          <button
                                            type="button"
                                            className="btn-design"
                                            onClick={() => {
                                              setSelectedUserIndex(index);
                                              setShowApplicationModal({
                                                show: true,
                                                modalName:
                                                  APPLICATION_MODAL_NAMES.HIRE_MODAL,
                                                modalTitle: "Hire Talent",
                                                id: candidataData.application_id,
                                              });
                                            }}
                                          >
                                            Hire
                                          </button>
                                          <button
                                            type="button"
                                            className="btn-design border-btn"
                                            onClick={() => {
                                              setSelectedUserIndex(index);
                                              setShowApplicationModal({
                                                show: true,
                                                modalName:
                                                  APPLICATION_MODAL_NAMES.DECLINED_MODAL,
                                                modalTitle: "Declined Talent",
                                                id: candidataData.application_id,
                                              });
                                            }}
                                          >
                                            Reject
                                          </button>
                                        </div>
                                      )}
                                    </ApplicationCardRecommended>
                                  </React.Fragment>
                                );
                              })
                            ) : (
                              <NoDataFound />
                            )}
                          </>
                        )}
                        {selectedTab === TABS.CONTRACT ||
                        selectedTab === TABS.HIRED
                          ? totalPage > JOB_PER_PAGE
                          : totalPage > JOB_APPLICATION_PER_PAGE && (
                              <Pagination
                                onPageChange={onPageChange}
                                totalPage={totalPage}
                                jobPerPage={
                                  selectedTab === TABS.CONTRACT ||
                                  selectedTab === TABS.HIRED
                                    ? JOB_PER_PAGE
                                    : JOB_APPLICATION_PER_PAGE
                                }
                              />
                            )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {applicationModal.show && (
          <ApplicationModals
            modalDetails={applicationModal}
            toggleModal={toggleApplicationModal}
            afterSuccessfullyChangedStatus={afterSuccessfullyChangedJobStatus}
            candidataData={applicationsData[selectedUserIndex]}
          />
        )}
      </JobRecruiterDashboardLayout>
    </>
  );
};

export default JobApplication;
