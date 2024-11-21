import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { candidateApplyJob } from "../../../API/candidateJobs";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../errorMsg/ErrorMessage";
import SubmitButton from "../../button/SubmitButton";
import { toastMessage } from "../../../utils/toastMessages";
import {
  applicationSuccessMessage,
  failureMessage,
  invalidDocument,
  successType,
} from "../../../utils/allToastMessage";
import { APPLICATION_STATUS } from "../../../constants/Constent";
import ViewCoverLetter from "../../../pages/coverLetter/ViewCoverLetter";
import { getSelectedResume } from "../../../API/resumeTemplate";
import CoverLetterTemplateOne from "../../CoverLetterTemplates/CoverLetterTemplateOne";
import PageLoader from "../../loader/PageLoader";

const ApplyModal = ({
  show,
  toggleModal,
  jobDetail,
  setJobDetails,
  toggleSuccessModal,
  coverLetterJson,
}) => {
  const [buttonLoader, setButtonLoader] = useState(false);
  const [file, setFile] = useState({});
  const [fileSubmittedError, setFileSubmittedError] = useState(false);
  const [invalidDocumentError, setinvalidDocumentError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [coverLetterDetails, setCoverLetterDetails] = useState({});
  const [allowApplicationSend, setAllowApplicationSend] = useState(true);
  useEffect(() => {
    getSelectedResume()
      .then((resume) => {
        setCoverLetterDetails(resume?.data?.data);
        // const selectedTemplated = state?.coverLetterType
        //   ? state?.coverLetterType
        //   : resume?.data?.data?.coverLetterDetails
        //   ? resume?.data?.data?.coverLetterDetails
        //   : "cl-template1";
        // setSelectedResume(selectedTemplated);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const handleFileChange = (e) => {
    const file = e?.target?.files[0];
    if (!file?.name.match(/\.(pdf|doc|docx)$/)) {
      setinvalidDocumentError(true);
      setFile({});
    } else {
      setFile(file);
      setFileSubmittedError(false);
      setinvalidDocumentError(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setButtonLoader(true);
    const payload = {
      job: jobDetail?.id,
      application_data: data?.application_data,
      application_status: APPLICATION_STATUS.applied,
      // add_resume: file,
      candidate_cover_letter_json: coverLetterJson,
    };
    //  if(file.name){
    candidateApplyJob(payload)
      .then((res) => {
        setJobDetails({ ...jobDetail, already_applied: true });
        setButtonLoader(false);
        toggleModal();
        toggleSuccessModal();
      })
      .catch((err) => {
        setJobDetails({ ...jobDetail, already_applied: false });
        toastMessage(err?.response?.data?.message);
        setButtonLoader(false);
        toggleModal();
      });
    // }
    // else{
    //   setFileSubmittedError(true);
    //   setButtonLoader(false);
    // }
  };
  const getEditCoverletterValue = (value) => {
    setAllowApplicationSend(value);
  };
  return (
    <>
      <ModalWrapper showModal={show} title={"Apply"} toggleModal={toggleModal}>
        <div className="modal-body">
          <div className="openJobsList p-0">
            <div className="row">
              <div className="col-md-7 col-12">
                <div className="applicant-info-col">
                  <div className="applicant-thumb thumb-icon">
                    <img
                      src="/assets/images/yearExp-icon.svg"
                      alt="Year of Experience Icon"
                    />
                  </div>
                  <div className="applicant-info">
                    <h6>{jobDetail?.title}</h6>
                    <p>
                      {jobDetail?.created_by?.company_name}{" "}
                      <span>
                        4.5 <i className="fas fa-star"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-12">
                <div className="job-post-time">Posted 5 mins ago</div>
              </div>
            </div>

            <div className="openjob-details border-bottom py-3">
              <p>{jobDetail?.location}</p>
              <p>{jobDetail?.job_type}</p>
              <p>{`${jobDetail?.salary_currency}${jobDetail?.salary_range_min}-${jobDetail?.salary_currency}${jobDetail?.salary_range_max}`}</p>
              <p>{jobDetail?.job_role}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <h6>Your Application</h6>
                <p>
                  Your resume will be displayed on your profile. Write your
                  information. Let them know why you are a good fit.
                </p>
                <div className="fieldset">
                  <textarea
                    placeholder="Enter your comment here"
                    className="form-control message-field"
                    {...register("application_data", {
                      required: "This field is required",
                    })}
                  ></textarea>
                  <span className="characters-sets">3000 characters</span>
                  {errors?.application_data && (
                    <ErrorMessage msg={errors.application_data.message} />
                  )}
                  {/* <div className="attachResume">
                      <label className="btn btn-light w-25 btn-sm text-dark mr-2">
                        Attach Resume
                        <input
                          type="file"
                          className="visually-hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                     {(fileSubmittedError && !invalidDocumentError)?<span><ErrorMessage id={1} msg="Resume not attached"/></span>: <span> {file.name}</span>}
                     {(invalidDocumentError) && <ErrorMessage msg={invalidDocument}/>}
                    </div> */}
                </div>

                {/* <div className="coverLetter">
                  <CoverLetterTemplateOne
                    coverLetterDetails={coverLetterDetails}
                    setLoader={setLoader}
                    isApplyModal={true}
                    getEditCoverletterValue={getEditCoverletterValue}
                  />
                </div> */}
                <div className="cover-section mt-5">
                  <div className="d-md-flex justify-content-between align-items-center create-wrapper">
                    <h2 className="section-heading-main mb-md-0 mb-3">
                      Cover Letter
                    </h2>
                  </div>
                  {loader && <PageLoader />}
                  <section className="overview-cv"></section>
                  {/* {selectedResume === "cl-template1" && ( */}
                  <CoverLetterTemplateOne
                    coverLetterDetails={coverLetterDetails}
                    setLoader={setLoader}
                    isApplyModal={true}
                    getEditCoverletterValue={getEditCoverletterValue}
                  />
                  {/* )} */}
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="popupBtn">
                  <button
                    type="button"
                    className="btn-design border-btn"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <SubmitButton
                    type="submit"
                    contentText="Send Application"
                    onClickCallBack={onSubmit}
                    loader={buttonLoader}
                    disabled={buttonLoader || !allowApplicationSend}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ApplyModal;
