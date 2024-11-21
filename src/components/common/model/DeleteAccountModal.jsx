import React from "react";

const DeleteAccountModal = ({ toggleModal, showDeleteModal,handleConfirmDelete,text = "Are you sure you want to delete your account "}) => {

  return (
    <>
      <div
        class="modal"
        tabindex="-1"
        role="dialog"
        className={`modal ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
      >
        <div class="modal-dialog modal-dialog-centered" >
          <div class="modal-content">   
              <h3 class="text-center font-weight-light">
               {text}
              </h3>
            
            <div class="modal-body text-center">
              <button
                type="button"
                className="btn-design border-btn"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn-design"
                data-dismiss="modal"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
      ></div>
    </>
  );
};

export default DeleteAccountModal;
