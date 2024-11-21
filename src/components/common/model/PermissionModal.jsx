import React from "react";

const PermissionModal = ({ showModal, toggleModal, text }) => {
  return (
    <div>
      {" "}
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
            {/* <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={toggleModal}
            ></button> */}

            <div className="modal-body">
              <div className="subscriptionpopup">
                <img src="/assets/images/warning-icon.svg" />
                <div className="mb-4">
                  <h5>{text}</h5>
                </div>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn-design"
                    data-bs-dismiss="modal"
                    onClick={toggleModal}
                  >
                    ok
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

export default PermissionModal;
