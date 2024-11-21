import React from "react";
import InterviewTopBar from "./InterviewTopBar";
import PageLoader from "../../components/loader/PageLoader";
import NoDataFound from "../noDataFound/NoDataFound";
import moment from "moment/moment";
import {
  INTERVIEW_SECTION_ACTIONS,
  INTERVIEW_SECTION_ACTIONS_BUTTONS,
} from "./constant";
import { useNavigate } from "react-router-dom";
import { APPLICATION_MODAL_NAMES } from "../job-recruiter/constant/constant";
import { rescheduleCandidateInterviewApi } from "../../API/recruiterJobApplication";

const InterviewSection = ({
  seekerPage = false,
  // isRecruiter = false,
  loader,
  interviewList,
  filter,
  onFilterChange,
  date,
  setDate,
  onDateChange,
  toggleModal,
  setRatingModalData,
  setShowApplicationModal,
  setSelectedUserIndex,
  createChatRoom,
  handleCompleteInterview,
  // setOrderBy,
  checkTest,
}) => {
  // console.log({ interviewList });
  const navigate = useNavigate();

  const handleInterviewActions = (actionName, details, index) => {
    if (actionName === INTERVIEW_SECTION_ACTIONS_BUTTONS.rate) {
      setRatingModalData(details);
      toggleModal(index);
    } else if (actionName === INTERVIEW_SECTION_ACTIONS_BUTTONS.goToTalent) {
      navigate("/job-recruiter/application");
    } else if (actionName === INTERVIEW_SECTION_ACTIONS_BUTTONS.reschedule) {
      setSelectedUserIndex(index);
      setShowApplicationModal({
        show: true,
        modalName: APPLICATION_MODAL_NAMES.INTERVIEW_SCHEDULE_MODAL,
        modalTitle: "Schedule Interview",
        id: details.application_id,
      });
    } else if (actionName === INTERVIEW_SECTION_ACTIONS_BUTTONS.cancel) {
      setShowApplicationModal({
        show: true,
        modalName: APPLICATION_MODAL_NAMES.DECLINED_MODAL,
        modalTitle: "Declined Talent",
        id: details.id,
      });
    } else if (actionName === INTERVIEW_SECTION_ACTIONS_BUTTONS.complete) {
      handleCompleteInterview(details.id);
    } else {
      createChatRoom(details.job);
      // navigate("/job-seeker/messages");
    }
  };

  const isTimeOver = (day_and_date, end_time) => {
    const combinedDateTime = `${day_and_date.split("T")[0]}T${end_time}`;
    return moment().isAfter(combinedDateTime);
  };

  return (
    <div className={`${seekerPage ? "reduce-navbar" : ""}`}>
      <div className="interviewsList-sec">
        <InterviewTopBar
          filter={filter}
          onFilterChange={onFilterChange}
          date={date}
          // isRecruiter = {isRecruiter}
          setDate={setDate}
          onDateChange={onDateChange}
          seekerPage={seekerPage}
          // setOrderBy={setOrderBy}
        />
        {loader && <PageLoader />}
        <div className="global-table table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Time &amp; Date</th>
                <th>{seekerPage ? "Company" : "Name"}</th>
                <th style={{ width: "35%", minWidth: "200px" }}>Job</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviewList?.length > 0 ? (
                interviewList.map((interview, index) => (
                  <tr key={index}>
                    <td>
                      <p>
                        {moment(interview.start_time, "HH:mm:ss").format("h a")}{" "}
                        - {moment(interview.end_time, "HH:mm:ss").format("h a")}
                      </p>
                      <p>
                        {moment(interview.day_and_date).format("D MMMM YYYY")}
                      </p>
                    </td>
                    <td>
                      {seekerPage ? interview.company_name : interview.name}
                    </td>
                    <td>{interview.job_title}</td>
                    <td>{interview.interview_status}</td>
                    <td className="text-end">
                      <div className="action-flex">
                        {!seekerPage &&
                          (interview.interview_status !==
                            INTERVIEW_SECTION_ACTIONS.completed ||
                            !interview.rated_by_recruiter) && (
                            <button
                              type="button"
                              className="btn-design btn-small border-btn"
                              disabled={seekerPage}
                              onClick={() =>
                                handleInterviewActions(
                                  interview.interview_status ===
                                    INTERVIEW_SECTION_ACTIONS.completed
                                    ? INTERVIEW_SECTION_ACTIONS_BUTTONS.goToTalent
                                    : INTERVIEW_SECTION_ACTIONS_BUTTONS.reschedule,
                                  interview,
                                  index
                                )
                              }
                            >
                              {interview.interview_status ===
                              INTERVIEW_SECTION_ACTIONS.completed
                                ? INTERVIEW_SECTION_ACTIONS_BUTTONS.goToTalent
                                : INTERVIEW_SECTION_ACTIONS_BUTTONS.reschedule}
                            </button>
                          )}
                        {interview.interview_status !==
                          INTERVIEW_SECTION_ACTIONS.cancelled && (
                          <button
                            type="button"
                            className="btn-design btn-small"
                            onClick={() =>
                              handleInterviewActions(
                                seekerPage
                                  ? "Message"
                                  : interview.interview_status ===
                                    INTERVIEW_SECTION_ACTIONS.completed
                                  ? !interview.rated_by_recruiter
                                    ? INTERVIEW_SECTION_ACTIONS_BUTTONS.rate
                                    : INTERVIEW_SECTION_ACTIONS_BUTTONS.goToTalent
                                  : (interview.interview_status ===
                                      INTERVIEW_SECTION_ACTIONS.upcoming ||
                                      interview.interview_status ===
                                        INTERVIEW_SECTION_ACTIONS.reschedule) &&
                                    isTimeOver(
                                      interview.day_and_date,
                                      interview.end_time
                                    )
                                  ? INTERVIEW_SECTION_ACTIONS_BUTTONS.complete
                                  : INTERVIEW_SECTION_ACTIONS_BUTTONS.cancel,
                                interview,
                                index
                              )
                            }
                          >
                            {seekerPage
                              ? "Message"
                              : interview.interview_status ===
                                INTERVIEW_SECTION_ACTIONS.completed
                              ? !interview.rated_by_recruiter
                                ? INTERVIEW_SECTION_ACTIONS_BUTTONS.rate
                                : INTERVIEW_SECTION_ACTIONS_BUTTONS.goToTalent
                              : (interview.interview_status ===
                                  INTERVIEW_SECTION_ACTIONS.upcoming ||
                                  interview.interview_status ===
                                    INTERVIEW_SECTION_ACTIONS.reschedule) &&
                                isTimeOver(
                                  interview.day_and_date,
                                  interview.end_time
                                )
                              ? INTERVIEW_SECTION_ACTIONS_BUTTONS.complete
                              : INTERVIEW_SECTION_ACTIONS_BUTTONS.cancel}

                            {/* {seekerPage
                            ? "Message"
                            : interview.interview_status ===
                              INTERVIEW_SECTION_ACTIONS.isOver
                            ? !interview.rated
                              ? INTERVIEW_SECTION_ACTIONS_BUTTONS.rate
                              : INTERVIEW_SECTION_ACTIONS_BUTTONS.goToTalent
                            : INTERVIEW_SECTION_ACTIONS_BUTTONS.cancel} */}
                          </button>
                        )}
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
  );
};

export default InterviewSection;
