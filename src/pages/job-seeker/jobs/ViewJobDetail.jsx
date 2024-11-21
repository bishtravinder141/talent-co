import React, { Fragment } from "react";
import "../job-seeker-dashboard.css";
import JobCard from "../../../components/job-seeker/dashboard/JobCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import PageLoader from "../../../components/loader/PageLoader";
import {
  getCandidateJobDetails,
  updateJobStatus,
} from "../../../API/candidateJobs";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import ApplyModal from "../../../components/common/model/ApplyModal";
import { APPLICATION_STATUS } from "../../../constants/Constent";
import { toastMessage } from "../../../utils/toastMessages";
import SuccessModal from "../../../components/common/model/successModal";
import {
  applicationSuccessMessage,
  invalidJobId,
} from "../../../utils/allToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../utils/utils";
import { getSelectedResume } from "../../../API/resumeTemplate";
import { setCoverLetterDetails } from "../../../redux/coverLetterAndResumeSlice";
import AlertModal from "../../../components/common/model/AlertModal";
import ShareModal from "../../../components/common/model/ShareModal";
import ShowRating from "../../../components/common/ShowRating";
const ViewJobDetail = () => {
  const [loader, setLoader] = useState(true);
  const [jobDetails, setJobDetails] = useState({});
  const { id } = useParams();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCoverLatterUpdates, setIsCoverLaterUpdated] = useState({});
  const [showCoverLatterAlertModal, setShowCoverLatterAlertModal] =
    useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const coverLetterAndResume = useSelector(
    (state) => state.coverLetterAndResume
  );

  useEffect(() => {
    getCandidateJobDetails(id)
      .then((res) => {
        setJobDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/job-seeker/jobs");
        toastMessage(invalidJobId);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [id]);

  useEffect(() => {
    if (isEmpty(coverLetterAndResume.coverLetterDetails)) {
      getSelectedResume()
        .then((cover) => {
          if (cover?.data?.data?.cover_letter_details) {
            setIsCoverLaterUpdated(cover.data.data.cover_letter_details);
            dispatch(
              setCoverLetterDetails(cover.data.data.cover_letter_details)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      setIsCoverLaterUpdated(coverLetterAndResume.coverLetterDetails);
    }
  }, []);

  const handleApplyJob = () => {
    if (isEmpty(isCoverLatterUpdates)) {
      setShowCoverLatterAlertModal(true);
    } else {
      toggleModal();
    }
  };

  const toggleModal = () => {
    setShowApplyModal(!showApplyModal);
  };
  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  const handleSaveJob = (jobId) => {
    setLoader(true);
    const payload = {
      job: jobId,
      job_status: APPLICATION_STATUS.saved,
    };
    updateJobStatus(payload)
      .then((res) => {
        setJobDetails({ ...jobDetails, job_saved: true });
        setLoader(false);
        toastMessage(jobSavedMessage, successType);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        toastMessage(err?.response?.data?.message);
      });
  };
  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  return (
    <>
      <main>
        <section className="job-seeker-dashboard-sec py-70">
          <div className="container">
            <div className="row">
              {loader && <PageLoader />}
              <div className="col-12">
                <div className="shadow-box job-details-sec">
                  <div className="openJobsList">
                    <div className="row"> 
                      <div className="col-md-7 col-12">
                        <div className="applicant-info-col">
                          <div className="applicant-thumb">
                            <Link to="/job-seeker/jobs">
                              <img src="/assets/images/back-arrow-fill.svg" />
                            </Link>
                          </div>
                          <div className="applicant-info">
                            <h4>{jobDetails?.title}</h4>
                            <p> 
                              {jobDetails?.created_by?.company_name}
                              <span>
                                {jobDetails?.recruiter_company?.ratings}
                                <ShowRating rating = {jobDetails?.recruiter_company?.ratings}/>
                              </span> 
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-12">
                        <div className="job-apply-btn">
                          <button
                            className="btn-design"
                            onClick={handleApplyJob}
                            disabled={jobDetails?.already_applied}
                          >
                            {jobDetails?.already_applied
                              ? "Already Applied"
                              : "Apply"}
                          </button>
                          {/* <!------------------ Button trigger modal ------------------> */}
                          <button
                            type="button"
                            className="btn-design border-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#"
                            onClick={() => {
                              handleSaveJob(jobDetails?.id);
                            }}
                            disabled={jobDetails?.job_saved}
                          >
                            <img
                              src={
                                jobDetails?.job_saved
                                  ? "/assets/images/marktag-icon.svg"
                                  : "/assets/images/line-mark.svg"
                              }
                            />
                            {jobDetails?.job_saved
                              ? "Already Saved"
                              : "Save Job"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-bottom job-detailbottom">
                      <div className="row align-items-end  py-3">
                        <div className="col-md-7 col-12">
                          <div className="openjob-details">
                            <p>{jobDetails?.location}</p>
                            <p>{jobDetails?.job_type}</p>
                            <p>{`${jobDetails?.salary_currency}${jobDetails?.salary_range_min}-${jobDetails?.salary_currency}${jobDetails?.salary_range_max}`}</p>
                            <p>{jobDetails?.job_role}</p>
                            <p>Experience ({jobDetails?.experience})</p>
                          </div>
                        </div>

                        <div className="col-md-5 col-12">
                          <div className="job-apply-btn">
                            {/* <!------------------ Button trigger modal ------------------> */}
                            <Link
                              to="/job-seeker/jobs"
                              className="btn-design decline-btn"
                            >
                              See more jobs
                            </Link>

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
                                  <img src="/assets/images/dots-icon.svg" />{" "}
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
                                  onClick={toggleShareModal}
                                >
                                  <img src="/assets/images/sharing.svg" />{" "}
                                  Sharing Job
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="jobcompany-desc pt-3">
                      <div className="openJobFlex">
                        <div className="openJobFlexCol border-bottom">
                          <h6>Company Description</h6>
                          <p>{jobDetails?.about_company}</p>

                          <h6>Job Description</h6>
                          <p>{jobDetails?.role_details}</p>

                          {jobDetails?.key_responsibility && (
                            <>
                              {" "}
                              <h6>Key Responsibilities</h6>
                              <p>{jobDetails?.key_responsibility}</p>
                            </>
                          )}

                          {jobDetails?.additional_info && (
                            <>
                              {" "}
                              <h6>Additional Information</h6>
                              <p>{jobDetails?.additional_info}</p>{" "}
                            </>
                          )}
                        </div>

                        <div className="company-reviews py-3">
                          <h6>Company Reviews</h6>
                          <div className="reiviews-col">
                            <NoDataFound />
                          </div>
                          {/* commented for future use */}
                          {/* <div className="reiviews-col">
                          <div className="review-thumb">
                            <img src="/assets/images/user-profile.svg" />
                          </div>
                          <div className="reviews-content">
                            <div className="reviewauthorname">
                              <h5>Phil Rozek</h5>
                              <div className="rating">
                                <img src="/assets/images/rating.svg" />
                              </div>
                            </div>
                            <span>In the last week</span>
                            <p>
                              Proin a tempor velit. Maecenas mattis nisl id
                              aliquet rutrum. Quisque suscipit, sapien in ornare
                              porttitor, mi libero sagittis purus, in porta nunc
                              odio vitae ligula.Proin a tempor velit. Maecenas
                              mattis nisl id aliquet rutrum. Quisque suscipit,
                              sapien in ornare porttitor, mi libero sagittis
                              purus, in porta nunc odio vitae ligula.
                            </p>
                          </div>
                        </div>
                        <div className="reiviews-col">
                          <div className="review-thumb">
                            <img src="/assets/images/user-profile.svg" />
                          </div>
                          <div className="reviews-content">
                            <div className="reviewauthorname">
                              <h5>Phil Rozek</h5>
                              <div className="rating">
                                <img src="/assets/images/rating.svg" />
                              </div>
                            </div>
                            <span>In the last week</span>
                            <p>
                              Proin a tempor velit. Maecenas mattis nisl id
                              aliquet rutrum. Quisque suscipit, sapien in ornare
                              porttitor, mi libero sagittis purus, in porta nunc
                              odio vitae ligula.Proin a tempor velit. Maecenas
                              mattis nisl id aliquet rutrum. Quisque suscipit,
                              sapien in ornare porttitor, mi libero sagittis
                              purus, in porta nunc odio vitae ligula.
                            </p>
                          </div>
                        </div>
                        <div className="reiviews-col">
                          <div className="review-thumb">
                            <img src="/assets/images/user-profile.svg" />
                          </div>
                          <div className="reviews-content">
                            <div className="reviewauthorname">
                              <h5>Phil Rozek</h5>
                              <div className="rating">
                                <img src="/assets/images/rating.svg" />
                              </div>
                            </div>
                            <span>In the last week</span>
                            <p>
                              Proin a tempor velit. Maecenas mattis nisl id
                              aliquet rutrum. Quisque suscipit, sapien in ornare
                              porttitor, mi libero sagittis purus, in porta nunc
                              odio vitae ligula.Proin a tempor velit. Maecenas
                              mattis nisl id aliquet rutrum. Quisque suscipit,
                              sapien in ornare porttitor, mi libero sagittis
                              purus, in porta nunc odio vitae ligula.
                            </p>
                          </div>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="similar-jobs mt-5">
                  <div className="row">
                    <div className="m-2">
                      <h5>Similar jobs</h5>
                    </div>
                    {jobDetails?.similar_jobs?.map((job, i) => (
                      <div className="col-md-6 col-12" key={i}>
                        <JobCard
                          jobDetails={job}
                          headerBadge={false}
                          featured={false}
                          handleSaveJob={handleSaveJob}
                          showDetailJob={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {showApplyModal ? (
        <ApplyModal
          show={showApplyModal}
          toggleModal={toggleModal}
          jobDetail={jobDetails}
          setJobDetails={setJobDetails}
          toggleSuccessModal={toggleSuccessModal}
          coverLetterJson={coverLetterAndResume.coverLetterDetails}
        />
      ) : showSuccessModal ? (
        <SuccessModal
          showModal={showSuccessModal}
          toggleModal={toggleSuccessModal}
          children={applicationSuccessMessage}
        />
      ) : (
        ""
      )}
      {showCoverLatterAlertModal && (
        <AlertModal
          showModal={showCoverLatterAlertModal}
          toggleModal={() => setShowCoverLatterAlertModal(false)}
          prevRoute={`/job-seeker/job-detail/${id}`}
        />
      )}
      {showShareModal && (
        <ShareModal
          showShareModal={showShareModal}
          toggleShareModal={toggleShareModal}
          text="Share Job"
          jobID={id}
        />
      )}
    </>
  );
};

export default ViewJobDetail;
