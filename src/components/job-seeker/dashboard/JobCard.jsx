import { useLocation, useNavigate, Link } from "react-router-dom";
import { calculateTimeAgo } from "../../../utils/utils";
import { useState } from "react";
import ShareModal from "../../common/model/ShareModal";

const JobCard = ({
  jobDetails,
  headerBadge = false,
  badgeName,
  showDetailJob = false,
  featured = true,
  handleSaveJob,
  activeTab,
  createChatRoom,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showShareModal, setShowShareModal] = useState(false);
  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };
  return (
    <>
      <div className="openJobsList border">
        {headerBadge && <div className="applications-tag">{badgeName}</div>}
        <div className="row">
          <div className="col-md-7 col-12">
            <div className="applicant-info-col">
              <div className="applicant-thumb thumb-icon">
                <img src="/assets/images/yearExp-icon.svg" />
              </div>
              <div className="applicant-info">
                <h6>{jobDetails?.title}</h6>
                {/* <p>{jobDetails?.location}</p> */}
                <p>{jobDetails?.created_by?.company_name && jobDetails?.created_by?.company_name }</p>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12">
            {jobDetails?.featured && pathname === "/job-seeker/dashboard" && (
              <div className="featuedTag">
                <img src="../assets/images/featured-icon.svg" /> Featured
              </div>
            )}
            <div className="job-post-time">{`Posted ${calculateTimeAgo(
              jobDetails.created_at
            )}`}</div>
            <div className="text-end">
              {jobDetails?.employment_options?.length > 0
                ? jobDetails.employment_options
                    .map((item) => item.title)
                    .join(" | ")
                : " "}{" "}
            </div>
          </div>
        </div>

        <div className="openjob-details border-bottom py-3">
          {/* <p>{jobDetails?.location}</p> */}
          <p className="fw-1000">{jobDetails?.job_type}</p>
          <p>{`${jobDetails?.salary_currency}${jobDetails?.salary_range_min}-${jobDetails?.salary_currency}${jobDetails?.salary_range_max} Per annum`}</p>
          <p>{jobDetails?.job_role}</p>
          <p>Experience: {jobDetails?.experience}</p>
          {/* {jobDetails?.employment_options?.length > 0
            ? jobDetails.employment_options
                .map((item) => item.title)
                .join(" | ")
            : " "}{" "} */}
        </div>

        <div className="openjob-desc pt-3">
          <div className="openJobFlex d-flex">
            <div className="openJobFlexCol">
              <p className="f-12">{jobDetails?.role_details}</p>  
            </div>

            <div className="sideIconsList">
              {showDetailJob && (
                <button
                  className="btn dropdown-toggle"
                  onClick={() =>
                    navigate(`/job-seeker/job-detail/${jobDetails?.id}`)
                  }
                >
                  <span>
                    <img src="/assets/images/eye-icon.svg" />{" "}
                  </span>
                </button>
              )}
              <button
                className="btn dropdown-toggle"
                onClick={() => {
                  handleSaveJob(jobDetails?.id);
                }}
                disabled={jobDetails?.job_saved || activeTab === "saved"}
              >
                <span>
                  {jobDetails?.job_saved || activeTab === "saved" ? (
                    <img src="/assets/images/marktag-icon.svg" />
                  ) : (
                    <img src="/assets/images/line-mark.svg" />
                  )}{" "}
                </span>
              </button>
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
                    <img src="/assets/images/referral.svg" /> Referral Job
                  </a>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={toggleShareModal}
                  >
                    <img src="/assets/images/sharing.svg" /> Sharing Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {badgeName === "Interviewed" && (
          <div className="applicant-footer border-top mt-3 py-2">
            <Link to="/job-seeker/interviews" className="btn-design border-btn">
              See Interview Details
            </Link>
            {/* <!------------------ Button trigger modal ------------------> */}
            <span
              className="btn-design"
              onClick={() => createChatRoom(jobDetails?.id)}
            >
              Messages
            </span>
          </div>
        )}
      </div>
      {showShareModal && (
        <ShareModal
          showShareModal={showShareModal}
          toggleShareModal={toggleShareModal}
          text="Share Job"
          jobID={jobDetails?.id}
        />
      )}
    </>
  );
};

export default JobCard;
