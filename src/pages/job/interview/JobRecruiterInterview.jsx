import "../style.css";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
// Components
import Pagination from "../../../components/pagination/Pagination";
import Header from "../../../components/job-recruiter/dashboard/Header";
import InterviewSection from "../../../components/common/InterviewSection";
import ModalWrapper from "../../../components/common/model/ModalWrapper";
import RatingInput from "../../../components/job/interview/RatingInput";
// Api
import {
  postInterviewRating,
  rescheduleCandidateInterviewApi,
} from "../../../API/recruiterJobApplication";
import { getInterview } from "../../../API/recruiterInterview";
// Constants
import { JOB_PER_PAGE } from "../../../constants/Constent";
import ApplicationModals from "../../../components/job-recruiter/dashboard/applicationsModal/ApplicationModals";
import { getJobTitles, getTimeZoneListing } from "../../../API/masterApiData";
import {
  setJobTitlesList,
  setTimeZonList,
} from "../../../redux/masterDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { MODALS_NAME } from "../application/constant";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";

const JobRecruiterInterview = () => {
  const [loader, setLoader] = useState(true);
  const [interviewList, setInterviewList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [RatingModalData, setRatingModalData] = useState(null);
  const [applicationModal, setShowApplicationModal] = useState({
    show: false,
    modalTitle: "",
    modalName: "",
  });
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [orderBy, setOrderBy] = useState("-day_and_date");

  const [date, setDate] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "week").format("YYYY-MM-DD"),
  });
  const [filter, setFilter] = useState({
    timePeriod: "week",
    position: "",
  });
  const [modalDetails, setModalDetail] = useState({
    show: false,
    title: "Rate Candidates",
    index: null,
  });

  const [ratings, setRatings] = useState({
    technical_test_rating: 3,
    communication_rating: 3,
    responsibility_rating: 3,
    comment: "",
  });

  const dispatch = useDispatch();
  const timeZone = useSelector((state) => state?.masterAPIData?.timeZone);
  const jobTitles = useSelector((state) => state?.masterAPIData?.jobTitles);

  useEffect(() => {
    if (jobTitles.length > 0) {
      setLoader(true);
      let param = `?start_date=${date.startDate}&end_date=${
        date.endDate
        // }&job_title=${filter.position ? filter.position : jobTitles[0]}`;
      }&job_title=${
        filter.position === "All" ? "" : filter?.position
      }`;
      
      getInterviewListData(param);
    }
  }, [currentPage, jobTitles]);
// }, [currentPage, jobTitles, orderBy]);


  useEffect(() => {
    if (!timeZone?.length > 0) {
      getTimeZoneListing()
        .then((res) => {
          dispatch(setTimeZonList(res?.data?.data?.timezones));
        })
        .catch((err) => {
          setLoader(false);
          console.log(err, "error in time zone API");
        });
    }
    // if (!jobTitles?.length > 0) {
    getJobTitles()
      .then((res) => {
        dispatch(setJobTitlesList(res?.data?.data));
        // setFilter({ ...filter, position: res?.data?.data[0] });
        // dispatch(setJobTitlesList(["All",...res?.data?.data]));
        setFilter({ ...filter, position: "All" });
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, "error in time zone API");
      });
    // } else {
    //   // setFilter({ ...filter, position: jobTitles[0] });
    //   setFilter({ ...filter, position:"All" });

    // }
  }, []);

  const getInterviewListData = (param) => {
    getInterview(param)
      .then((res) => {
        setInterviewList(res?.data?.data?.results);
        setTotalPage(res?.data?.data?.count);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };

  const onFilterChange = (name, value) => {
    console.log("first");
    console.log(filter[name], "filtername");
    console.log(value, "val");
    if (filter[name] !== value) {
      console.log("filter changed", value);
      setFilter({ ...filter, [name]: value });
      setCurrentPage({ page: 1 });
    }
  };

  const onDateChange = () => {
    setCurrentPage({ page: 1 });
  };

  const toggleModal = (index) => {
    setModalDetail({
      show: !modalDetails.show,
      title: "Rate Candidates",
      index: index,
    });
  };

  const handleRatingChange = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  const toggleApplicationModal = (modalName, interviewScheduleDetails) => {
    if (modalName === MODALS_NAME.invitation) {
      setCurrentPage({ page: 1 });
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
      });
    } else if (modalName === MODALS_NAME.cancelled) {
      setCurrentPage({ page: 1 });
      setShowApplicationModal({
        show: false,
        modalTitle: "",
        modalName: "",
      });
    } else {
      setShowApplicationModal({
        show: false,
        modalTitle: "",
        modalName: "",
      });
    }
  };

  const onRatingSubmit = async () => {
    try {
      const final = { ...ratings };
      final.interview = RatingModalData.id;
      const response = await postInterviewRating(final);
      if (response.status === 201) {
        setCurrentPage({ page: 1 });
        toast.success("Successfully submitted");
        toggleModal();
        const tempInterviewList = [...interviewList];
        tempInterviewList[modalDetails.index].rated = true;
        setInterviewList([...tempInterviewList]);
      } else {
        toast.error();
        ("something went wrong");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCompleteInterview = (id) => {
    setLoader(true);
    rescheduleCandidateInterviewApi(id, {
      interview_status: "Completed",
    })
      .then((res) => {
        setLoader(false);
        setCurrentPage({ page: 1 });
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, "completed interview");
      });
  };

  return (
    <>
      <JobRecruiterDashboardLayout
        header={"Interviews"}
        subTitle={
          "Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at "
        }
        showSearchBar={false}
      >
        <div className="business-dashboard">
          <div className="dashboard-main-panel">
            {/* <Header title={"Interviews"} /> */}
            <div className="dashboard-panel-content">
              {/* dashboard Head For Mobile */}
              <div className="top_left font-weight-bold for-mobile">
                <h3>Interviews</h3>
              </div>
              <div className="interviewsList-sec">
                <InterviewSection
                  loader={loader}
                  // isRecruiter={true}
                  interviewList={interviewList}
                  // setOrderBy={setOrderBy}
                  filter={filter}
                  onFilterChange={onFilterChange}
                  date={date}
                  setDate={setDate}
                  onDateChange={onDateChange}
                  toggleModal={toggleModal}
                  setRatingModalData={setRatingModalData}
                  setLoader={setLoader}
                  setShowApplicationModal={setShowApplicationModal}
                  setSelectedUserIndex={setSelectedUserIndex}
                  handleCompleteInterview={handleCompleteInterview}
                />
                <div className="mt-4">
                  {totalPage > JOB_PER_PAGE && (
                    <Pagination
                      pageData={interviewList}
                      onPageChange={onPageChange}
                      totalPage={totalPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalDetails.show && (
          <ModalWrapper
            showModal={modalDetails.show}
            title={modalDetails.title}
            toggleModal={toggleModal}
          >
            <div className="modal-body">
              <div className="applicant-info-col">
                <div className="applicant-thumb">
                  <img src="/assets/images/user-profile.svg" />
                </div>
                <div className="applicant-info">
                  <h6>{RatingModalData?.candidate_details?.candidate_name}</h6>
                  <ul>
                    <li>{RatingModalData?.job_title}</li>
                    <li>
                      {RatingModalData?.candidate_details?.total_experience}
                    </li>
                    <li>{RatingModalData?.candidate_details?.job_type}</li>
                    {/* not getting from backend yet*/}
                    <li>Remote</li>
                  </ul>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 pb-3">
                  <label>Rating</label>

                  <RatingInput
                    name="technical_test_rating"
                    values={[0, 1, 2, 3, 4, 5]}
                    selectedValue={ratings.technical_test_rating}
                    skillName="Technical Test"
                    handleRatingChange={handleRatingChange}
                  />

                  <RatingInput
                    name="communication_rating"
                    values={[0, 1, 2, 3, 4, 5]}
                    selectedValue={ratings.communication_rating}
                    skillName="Cummunication"
                    handleRatingChange={handleRatingChange}
                  />

                  <RatingInput
                    name="responsibility_rating"
                    values={[0, 1, 2, 3, 4, 5]}
                    selectedValue={ratings.responsibility_rating}
                    skillName="Responsibility"
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <div className="col-12">
                  <label>Write Your invitation below</label>
                  <div className="fieldset">
                    <textarea
                      placeholder="Enter your comment here"
                      className="form-control message-field"
                      name="comment"
                      value={ratings.remark}
                      onChange={(event) =>
                        handleRatingChange(
                          event.target.name,
                          event.target.value
                        )
                      }
                    ></textarea>
                    <span className="characters-sets">300 characters</span>
                  </div>
                </div>

                <div className="col-12 mt-1">
                  <div className="popupBtn">
                    <button
                      type="button"
                      className="btn-design border-btn"
                      data-bs-dismiss="modal"
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-design"
                      onClick={onRatingSubmit}
                      data-bs-target="#ratingsuccessPopup"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                    >
                      Rate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ModalWrapper>
        )}
        {applicationModal.show && (
          <ApplicationModals
            modalDetails={applicationModal}
            toggleModal={toggleApplicationModal}
            candidataData={interviewList[selectedUserIndex]}
            afterSuccessfullyChangedStatus={toggleApplicationModal}
            rescheduleInterviewModal={true}
          />
        )}
      </JobRecruiterDashboardLayout>
    </>
  );
};

export default JobRecruiterInterview;
