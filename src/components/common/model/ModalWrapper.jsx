const ModalWrapper = ({
  showModal,
  toggleModal,
  title,
  ifCloseButtonNeeded = true,
  modalSize = "lg",
  children,
}) => {
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
        <div className={`modal-dialog modal-dialog-centered modal-${modalSize}`}>
          <div className="modal-content">
            {ifCloseButtonNeeded && (
              <>
                {" "}
                <div className="modal-header">
                  <h4 className="modal-title" id="skillPopupLabel">
                    {title}
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleModal}
                  ></button>
                </div>
              </>
            )}

            {children}
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

export default ModalWrapper;
