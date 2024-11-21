import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { APPLICATION_BASE_URL } from "../../../config/APIConfig";

const ShareModal = ({
  showShareModal,
  toggleShareModal,
  text,
  jobID,
}) => {
  const shareJobUrl = `${APPLICATION_BASE_URL}/job-seeker/job-detail/${jobID}`
  return (
    <>
      <div
        class="modal"
        tabindex="-1"
        role="dialog"
        className={`modal ${showShareModal ? "show" : ""}`}
        style={{ display: showShareModal ? "block" : "none" }}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="skillPopupLabel">
                {text}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleShareModal}
              ></button>
            </div>

            <div class="modal-body text-center shareButtonsContainer d-flex justify-content-center gap-3">
              {/* {
                    shareButtons?.map((curElem)=>(
                      <curElem.button>
                        <curElem.icon size={32} round = {true}/>
                      </curElem.button>
                    ))
                } */}
              <TwitterShareButton url={shareJobUrl}  >
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <FacebookShareButton url={shareJobUrl} >
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <LinkedinShareButton url={shareJobUrl}>
                <LinkedinIcon size={32} round={true} /> 
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showShareModal ? "show" : ""}`}
        style={{ display: showShareModal ? "block" : "none" }}
      ></div>
    </>
  );
};

export default ShareModal;
