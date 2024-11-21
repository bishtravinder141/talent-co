import React, { useRef } from "react";
import SignaturePad from "react-signature-canvas";
const SignaturePadModal = ({
  showSignaturePadModal,
  toggleSignaturePadModal,
  setSignature,
  validation,
  setIsSignatureAdded
}) => {
  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = (e) => {
    e.preventDefault();
    const signatureUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    fetch(signatureUrl)
    .then((res)=>res.blob())
    .then((blob)=>{
      const file  = new File([blob],"signature_file",{type:blob.type})
      setSignature({signatureFile:file})
      setIsSignatureAdded(true);
    })
      toggleSignaturePadModal();
  };
  return (
    <>
      <div
        tabindex="-1"
        role="dialog"
        className={`modal ${showSignaturePadModal ? "show" : ""}`}
        style={{ display: showSignaturePadModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <form onSubmit={save}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="skillPopupLabel">
                Add Your Signature Here
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleSignaturePadModal}
              ></button>
            </div>
            <div className="modal-body">
              <SignaturePad
                ref={sigCanvas}
                {...validation}
                canvasProps={{
                  width: 400,
                  height: 200,
                  className: "sig-canvas",
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-design border-btn"
                data-dismiss="modal"
                onClick={clear}
              >
                Clear
              </button>
              <button type="submit" className="btn-design">
                Save changes
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showSignaturePadModal ? "show" : ""}`}
        style={{ display: showSignaturePadModal ? "block" : "none" }}
      ></div>
    </>
  );
};

export default SignaturePadModal;

