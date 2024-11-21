import React from "react";

const SuccessModal = ({ showModal, toggleModal, children,isPaymentSuccessModal = false }) => {
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
                <img src="/assets/images/sucess-icon.svg" />
                {children}
              {(!isPaymentSuccessModal) && <h4>Successfully</h4>}
                <button
                  type="button"
                  className="btn-design"
                  data-bs-dismiss="modal"
                  onClick={toggleModal}
                >
                  {(!isPaymentSuccessModal)?"Continue":"Go Back"}
                </button>
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

export default SuccessModal;
