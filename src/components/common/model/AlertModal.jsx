import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AlertModal = ({ showModal, toggleModal,prevRoute }) => {
  const navigate = useNavigate()
  return (
    <div>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        id="skillPopup"
        tabIndex="-1"
        aria-labelledby="skillPopupLabel"
        aria-hidden="true"
        // data-bs-backdrop="static"
        data-ds-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={toggleModal}
            ></button>

            <div className="modal-body">
              <div className="subscriptionpopup">
                <div className="mb-4">
                  You have not completed your cover letter{" "}
                  <br/>
                  <span>
                    please update{" "}
                    <Link
                      className="text-decoration-underline text-primary"
                      to={"/job-seeker/cover-letter"}
                      state={{prevRoute:prevRoute}}
                    >
                      Your cover later first
                    </Link>{" "}
                  </span>{" "}
                </div>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn-design"
                    data-bs-dismiss="modal"
                    onClick={() => navigate("/job-seeker/cover-letter", { state: {prevRoute:prevRoute}  })}
                  >
                    Update Cover Letter
                  </button>
                  <button
                    type="button"
                    className="btn-design decline-btn"
                    data-bs-dismiss="modal"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default AlertModal;
