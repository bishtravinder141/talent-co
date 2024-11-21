import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ModalWrapper from "../../../common/model/ModalWrapper";
import {
  APPLICATION_MODAL_NAMES,
  DECLINED_REASONS,
} from "../../constant/constant";
import TextArea from "../../../inputFields/TextArea";
import SuccessModal from "../../../common/model/successModal";
import { MODALS_NAME, TABS } from "../../../../pages/job/application/constant";
// import InputFieldDate from "../../../inputFields/inputFieldDate";
import { toast } from "react-toastify";
import {
  declineCandidateProfileApi,
  hireCandidateApi,
  rescheduleCandidateInterviewApi,
  scheduleCandidateInterviewApi,
  sendJobInvitationsApi,
} from "../../../../API/recruiterJobApplication";
import { useSelector } from "react-redux";
import ErrorMessage from "../../../errorMsg/ErrorMessage";
import * as yup from "yup";
import moment from "moment";
import SubmitButton from "../../../button/SubmitButton";
import DropdownField from "../../../inputFields/DropdownField";
import DropDownWithSearch from "../../../inputFields/DropDownWithSearch";
import { convertToReactSelectOptions } from "../../../../utils/utils";
import { useLocation } from "react-router-dom";
import CoverLetterTemplateTwo from "../CoverLetterTemplateTwo";

const ApplicationModals = ({
  modalDetails,
  toggleModal,
  candidataData,
  afterSuccessfullyChangedStatus,
  rescheduleInterviewModal = false,
}) => {
  const [selectReason, setSelectedReason] = useState("Unresponsive");
  const [file, setFile] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const recruiterProfile = useSelector(
    (store) => store?.recruiter?.recruiterProfile
  );
  const timeZone = useSelector((state) => state?.masterAPIData?.timeZone);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const { pathname } = useLocation();
  //may be required in future
  const [offerLetterData, setOfferLetterData] = useState({
    expected_starting_date: "",
    working_days: "",
    salary: "",
    response_date: "",
    contract_duration: "",
    bonus_programs: "",
    department_name: "",
    paid_vacation: "",
    contact_details: "",
    manager_name: "",
    agreements: "",
    company_benefits: "",
    job_type: "",
  });

  // Send interview Request to prefered candidate
  const handleSendInvitation = (data) => {
    setButtonLoader(true);
    const payload = {
      recruiter: recruiterProfile?.profile_id,
      job: candidataData?.job_id,
      message: data.comment,
      candidate: candidataData?.candidate_details?.id,
    };

    if (modalDetails.modalName === APPLICATION_MODAL_NAMES.HIRE_MODAL) {
      const formData = new FormData();
      formData.append("job_application", candidataData?.application_id);
      formData.append("message", data.comment);
      if (file) {
        formData.append("offer_letter", file);
      }
      formData.append("offer_letter_details",JSON.stringify(data))
      hireCandidateApi(formData)
        .then((res) => {
          if (res?.data?.status === "success") {
            afterSuccessfullyChangedStatus(
              APPLICATION_MODAL_NAMES.INVITE_SUCCESS_MODAL
            );
            setButtonLoader(false);
          }
        })
        .catch((error) => {
          if (typeof error?.response?.data?.message === "string") {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong");
          }
          setButtonLoader(false);
          toggleModal();
        });
      return;
    }

    sendJobInvitationsApi(payload)
      .then((res) => {
        if (res?.data?.status === "success") {
          setButtonLoader(false);
          afterSuccessfullyChangedStatus(
            APPLICATION_MODAL_NAMES.INVITE_SUCCESS_MODAL
          );
          // toggleModal(APPLICATION_MODAL_NAMES.INVITE_SUCCESS_MODAL);
        }
      })
      .catch((error) => {
        if (typeof error?.response?.data?.message === "string") {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
        setButtonLoader(false);
        toggleModal();
        return;
      });
  };

  // Schedule interview for Selected candidate
  const handleInterViewSchedule = (data) => {
    setButtonLoader(true);
    const payload = {
      time_zone: data?.timeZone?.value,
      day_and_date: data?.start_date,
      duration_time: data?.duration,
      start_time: moment(data?.start_time, "HH:mm").format("HH:mm:ss"),
      end_time: moment(data?.end_time, "HH:mm").format("HH:mm:ss"),
      interview_status: rescheduleInterviewModal ? "Rescheduled" : "Upcoming",
      candidate_profile: rescheduleInterviewModal
        ? candidataData?.candidate_id
        : candidataData?.candidate_details?.id,
      job: candidataData?.job_id,
      recruiter_message: rescheduleInterviewModal
        ? data.recruiter_message
        : null,
      job_application: candidataData?.application_id,
    };

    const scheduleInterviewApi = rescheduleInterviewModal
      ? rescheduleCandidateInterviewApi(candidataData?.id, payload)
      : scheduleCandidateInterviewApi(payload);
    scheduleInterviewApi
      .then((res) => {
        if (res?.data?.status === "success") {
          payload["candidate_name"] =
            candidataData?.candidate_details?.candidate_name;
          afterSuccessfullyChangedStatus(MODALS_NAME.invitation, payload);
        } else {
          toast.error(res?.data?.message);
        }
        setButtonLoader(false);
      })
      .catch((error) => {
        if (typeof error?.response?.data?.message === "string") {
          toast.error(error.response.data.message);
        } else if (error?.response?.data?.message?.candidate_id) {
          toast.error(error?.response?.data?.message?.candidate_id[0]);
        } else {
          toast.error("Something went wrong");
        }
        setButtonLoader(false);
        toggleModal();
        return;
      });
  };

  // Reject Interview Application
  const handleDeclineTalent = () => {
    setButtonLoader(true);
    const payload = {
      interview_status: "Cancelled",
      recruiter_message: selectReason,
    };

    const cancelInterviewApi =
      pathname === "/job-recruiter/application"
        ? declineCandidateProfileApi({ job_application: modalDetails.id })
        : rescheduleCandidateInterviewApi(modalDetails?.id, payload);

    cancelInterviewApi
      .then((res) => {
        if (res?.data?.status === "success") {
          setButtonLoader(false);
          toast.success(
            pathname === "/job-recruiter/application"
              ? "Candidate decline successfully"
              : "Candidate's interview is cancelled"
          );
          afterSuccessfullyChangedStatus(MODALS_NAME.cancelled);
        }
      })
      .catch((error) => {
        if (typeof error?.response?.data?.message === "string") {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
        setButtonLoader(false);
        toggleModal();
        return;
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleTimeChange = (type, value) => {
    if (type === "start_time") {
      const endTime = watch("end_time");
      if (!endTime) {
        return;
      }
      const end_time = moment(endTime, "HH:mm");
      const start_time = moment(value, "HH:mm");
      if (end_time.isBefore(start_time)) {
        setValue("duration", null);
        return;
      }
      // Calculate the duration
      const durationObj = moment.duration(end_time.diff(start_time));
      // Get hours and minutes from the duration
      const hours = Math.floor(durationObj.asHours());
      const minutes = durationObj.minutes();
      // const hoursDuration = moment.duration(end_time.diff(start_time)).asHours();
      let tempDuration = "";
      if (hours > 0) {
        tempDuration = `${hours} hours`;
      }
      if (minutes > 0) {
        tempDuration =
          tempDuration.length > 0
            ? `${tempDuration} ${minutes} minutes`
            : `${minutes} minutes`;
      }
      setValue("duration", tempDuration);
    } else {
      const startTime = watch("start_time");
      const end_time = moment(value, "HH:mm");
      const start_time = moment(startTime, "HH:mm");
      if (end_time.isBefore(start_time)) {
        setValue("duration", null);
        return;
      }
      // Calculate the duration
      const durationObj = moment.duration(end_time.diff(start_time));
      // Get hours and minutes from the duration
      const hours = Math.floor(durationObj.asHours());
      const minutes = durationObj.minutes();
      // const hoursDuration = moment.duration(end_time.diff(start_time)).asHours();
      let tempDuration = "";
      if (hours > 0) {
        tempDuration = `${hours} hours`;
      }
      if (minutes > 0) {
        tempDuration =
          tempDuration.length > 0
            ? `${tempDuration} ${minutes} minutes`
            : `${minutes} minutes`;
      }
      setValue("duration", tempDuration);
    }
  };

  const handleChange = (type, value) => {
    const start_time = watch("start_time");
    const end_time = watch("end_time");
    if (type === "start_time") {
      if (moment(end_time, "HH:mm").isAfter(moment(value, "HH:mm"))) {
        setError("end_time", {
          type: "manual",
          message: "", // Clear the error message
        });
      } else {
        setError("end_time", {
          type: "manual",
          message: "End time must be greater than start time",
        });
      }
    }
    if (type === "end_time") {
      if (moment(value, "HH:mm").isAfter(moment(start_time, "HH:mm"))) {
        setError("end_time", {
          type: "manual",
          message: "", // Clear the error message
        });
      } else {
        setError("end_time", {
          type: "manual",
          message: "End time must be greater than start time",
        });
      }
    }
  };
  console.log(errors,"errros");
  return (
    <>
      {modalDetails.modalName ===
        APPLICATION_MODAL_NAMES.INVITE_SUCCESS_MODAL ||
      modalDetails.modalName === MODALS_NAME.invitation ? (
        <SuccessModal showModal={modalDetails.show} toggleModal={toggleModal}>
          {modalDetails.modalTitle === TABS.APPLIED && (
            <span>
              The offer was sent to{" "}
              <strong>
                {candidataData?.candidate_details?.candidate_name}
              </strong>
            </span>
          )}
          {modalDetails.modalTitle === TABS.SHORTLISTED && (
            <span>Talent was Shortlisted</span>
          )}
          {modalDetails.modalName === MODALS_NAME.invitation && (
            <span>
              The Invitation for an interview on {modalDetails.modalTitle}{" "}
            </span>
          )}
        </SuccessModal>
      ) : (
        <ModalWrapper
          showModal={modalDetails.show}
          title={modalDetails.modalTitle}
          toggleModal={toggleModal}
        >
          <>
            {(modalDetails.modalName === APPLICATION_MODAL_NAMES.INVITE_MODAL ||
              modalDetails.modalName ===
                APPLICATION_MODAL_NAMES.HIRE_MODAL) && (
              <div className="modal-body">
                <form onSubmit={handleSubmit(handleSendInvitation)}>
                  <div className="row">
                    <div className="col-12">
                      {/* <label>
                        {modalDetails.modalName ===
                        APPLICATION_MODAL_NAMES.INVITE_MODAL
                          ? "Write Your invitation below"
                          : `Please Send a message and include employment contract to ${candidataData?.candidate_details?.candidate_name}`}
                      </label> */}
                      <div className="fieldset">
                        {/* <TextArea
                          error={errors?.comment?.message}
                          validation={register("comment", {
                            required: "Please enter a comment.",
                          })}
                        /> */}
                        <CoverLetterTemplateTwo
                          register={register}
                          errors = {errors}
                          control = {control}
                          candidateData={candidataData}
                          offerLetterData={offerLetterData}
                          setOfferLetterData={setOfferLetterData}
                        />
                        {modalDetails.modalName !==
                          APPLICATION_MODAL_NAMES.INVITE_MODAL && (
                          <>
                            {file ? (
                              <p>{file.name}</p>
                            ) : (
                              <label className="">
                                {/* Attach Offer
                                <input
                                  type="file"
                                  className="visually-hidden"
                                  onChange={handleFileChange}
                                /> */}
                              </label>
                            )}
                          </>
                        )}
                        {/* {errors?.job_type && (
                          <ErrorMessage msg={errors?.job_type?.message} />
                        )} */}
                        <span className="characters-sets">3000 characters</span>
                      </div>
                    </div>

                    <div className="col-12 mt-4">
                      <div className="popupBtn">
                        <button
                          type="button"
                          className="btn-design border-btn"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                        <SubmitButton
                          loader={buttonLoader}
                          contentText={
                            modalDetails.modalName ===
                            APPLICATION_MODAL_NAMES.INVITE_MODAL
                              ? "Send an Invitation"
                              : "Send"
                          }
                          disabled={buttonLoader}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {modalDetails.modalName ===
              APPLICATION_MODAL_NAMES.DECLINED_MODAL && (
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <p>
                      Please select the reason and write a comment. The message
                      with decision will send to talent <strong>James</strong>
                    </p>
                    {DECLINED_REASONS.map((dec, i) => (
                      <div className="fieldset radio-set" key={i}>
                        <input
                          type="radio"
                          name="job-type"
                          onChange={() => setSelectedReason(dec)}
                          checked={selectReason === dec}
                        />
                        <span>{dec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="col-12 mt-4">
                    <div className="popupBtn">
                      <button
                        type="button"
                        className="btn-design border-btn"
                        data-bs-dismiss="modal"
                        onClick={toggleModal}
                      >
                        Cancel
                      </button>
                      <SubmitButton
                        type="button"
                        loader={buttonLoader}
                        contentText={"Declined"}
                        disabled={buttonLoader}
                        onClickCallBack={handleDeclineTalent}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INTERVIEW_SCHEDULE_MODAL */}
            {modalDetails.modalName ===
              APPLICATION_MODAL_NAMES.INTERVIEW_SCHEDULE_MODAL && (
              <div className="modal-body">
                <form onSubmit={handleSubmit(handleInterViewSchedule)}>
                  <div className="row">
                    <div className="col-12">
                      <label>Time Zone</label>
                      <div className="fieldset">
                        <Controller
                          name="timeZone"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Time zone is required" }}
                          render={({ field }) => (
                            <DropDownWithSearch
                              list={convertToReactSelectOptions(timeZone)}
                              selectedValue={
                                watch("timeZone") ? watch("timeZone") : ""
                              }
                              setSelectedValue={(value) =>
                                setValue("timeZone", value)
                              }
                              placeholder={"Search..."}
                              field={"timeZone"}
                              isMulti={false}
                              validation={field}
                            />
                          )}
                        />
                        {errors.timeZone && (
                          <ErrorMessage msg={errors.timeZone.message} />
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <label>Select a Day</label>
                      <div className="fieldset">
                        <Controller
                          name="start_date"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Start date is required" }}
                          render={({ field }) => (
                            <input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                              min={new Date().toISOString().split("T")[0]}
                              type="date"
                              className="form-control"
                            />
                          )}
                        />
                        {errors.start_date && (
                          <ErrorMessage msg={errors.start_date.message} />
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <label>Start With</label>
                      <div className="fieldset">
                        <Controller
                          name="start_time"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Start time is required" }}
                          render={({ field }) => (
                            <input
                              {...field}
                              onChange={(e) => {
                                handleChange("start_time", e.target.value);
                                field.onChange(e);
                              }}
                              onBlur={(e) =>
                                handleTimeChange("start_time", e.target.value)
                              }
                              type="time"
                              className="form-control"
                            />
                          )}
                        />
                        {errors.start_time && (
                          <ErrorMessage msg={errors.start_time.message} />
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <label>End With</label>
                      <div className="fieldset">
                        <Controller
                          name="end_time"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "End time is required",
                            validate: (value) => {
                              const start_time = watch("start_time"); // Assuming you have a 'start_time' field
                              const isValid = yup
                                .string()
                                .test(
                                  "is-less",
                                  "End time must be greater than start time",
                                  (endTime) => endTime > start_time
                                )
                                .isValidSync(value);

                              if (!isValid) {
                                setError("end_time", {
                                  type: "manual",
                                  message:
                                    "End time must be greater than start time",
                                });
                              }

                              return isValid;
                            },
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              onChange={(e) => {
                                handleChange("end_time", e.target.value);
                                field.onChange(e);
                              }}
                              disabled={!watch("start_time")}
                              onBlur={(e) =>
                                handleTimeChange("end_time", e.target.value)
                              }
                              type="time"
                              className="form-control"
                            />
                          )}
                        />
                        {errors.end_time && (
                          <ErrorMessage msg={errors.end_time.message} />
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <label>Duration</label>
                      <div className="fieldset">
                        <input
                          className="form-control"
                          type="text"
                          readOnly
                          disabled
                          {...register("duration")}
                        />
                      </div>
                    </div>

                    {rescheduleInterviewModal && (
                      <div className="col-md-12 col-12">
                        <label>Reschedule Reason</label>
                        <div className="fieldset">
                          <Controller
                            name="recruiter_message"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Reason is required",
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                                type="text"
                                className="form-control"
                              />
                            )}
                          />
                          {errors.recruiter_message && (
                            <ErrorMessage
                              msg={errors.recruiter_message.message}
                            />
                          )}
                        </div>
                      </div>
                    )}
                    <div className="col-12 mt-4">
                      <div className="popupBtn">
                        <button
                          type="button"
                          className="btn-design border-btn"
                          data-bs-dismiss="modal"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                        <SubmitButton
                          loader={buttonLoader}
                          contentText={"Send an Invitation"}
                          disabled={buttonLoader}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </>
        </ModalWrapper>
      )}
    </>
  );
};

export default ApplicationModals;
