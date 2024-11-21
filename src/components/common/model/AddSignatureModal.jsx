import React, { useState } from "react";
import ErrorMessage from "../../errorMsg/ErrorMessage";
import { Controller, useForm } from "react-hook-form";
import { invalid_image_upload_error } from "../constant";
import SignaturePadModal from "./SignaturePadModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addDigitalSignature,
  getDigitalSignature,
  updateDigitalSignature,
} from "../../../API/candidateProfile";
import PageLoader from "../../loader/PageLoader";
const AddSignatureModal = ({
  showAddSignatureModal,
  toggleAddSignatureModal,
  toggleSignaturePadModal,
  setSignature,
  setLoader,
  signature,
  isEdit,
  isSignatureAdded,
  setIsSignatureAdded,
  selectedFont,
  setSelectedFont,
  loader,
  getSignature,
  setSignatureUrl,
  handleCancel
}) => {
  const [imageUploadError, setImageUploadError] = useState(false);
  const handleFileUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile.name.match(/\.(png|jpeg|jpg)$/)) {
      setImageUploadError(false);
      setSignature({ signatureUpload: imageFile });
      setIsSignatureAdded(true);
    } else {
      setImageUploadError(true);
    }
  };
  const onSubmit = () => {
    //because signature state is object and only one field is stored that's why [0]
    if (Object.values(signature)[0] && !imageUploadError) {
      let payload;
      if (signature?.signatureText) {
        const formData = new FormData();
        formData.append("signature_text", signature?.signatureText);
        formData.append("types", "text");
        formData.append("metadata", JSON.stringify(selectedFont));
        formData.append("signature_file","");
         payload = formData;
      } else if (signature?.signatureFile) {
        const formData = new FormData();
        formData.append("signature_file", signature?.signatureFile);
        formData.append("types","draw");
        formData.append("signature_text",null);
        payload = formData;

      } else {
        const formData = new FormData();
        formData.append("signature_file", signature?.signatureUpload);
        formData.append("types","upload");
        formData.append("signature_text",null);
        payload = formData;
      }
      if (!isEdit) {
        setLoader((prev)=>true) 
        addDigitalSignature(payload)
          .then((res) => {
            setLoader((prev)=>false)
            setSignatureUrl(null);

            getSignature();
            toggleAddSignatureModal();
          })
          .catch((error) =>{ 
            setLoader(false);
            console.log(error);
          });
      } else {
        setLoader((prev)=>true)   
        updateDigitalSignature(payload)
          .then((res) => {
            setSignatureUrl(null);
            toggleAddSignatureModal();
            setLoader((prev)=>false);
            getSignature();
          })
          .catch((error) => {
            console.log(error);
            setLoader((prev)=>false);
          });
      }
    } else {
      setIsSignatureAdded(false);
    }
  };
  return (
    <>
      <div
        class="modal signature-modal overflow-hidden"
        tabindex="-1"
        role="dialog"
        className={`modal ${showAddSignatureModal ? "show" : ""}`}
        style={{ display: showAddSignatureModal ? "block" : "none" }}
        >
        {loader && <PageLoader />}
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="inner-sign-modal">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {`${isEdit ? "Update" : "Add"} Your Signature`}
                </h5>
              </div>
              <form >
                <div className="modal-body">
                  <div className=" name">
                    <h6>Type Your Full name</h6>
                    <p>Enter your full name to generate a </p>
                  </div>
                  <div className=" signature">
                    <h6>Signature</h6>
                    <input
                      type="text"
                      value={
                        signature.signatureText ? signature.signatureText : ""
                      }
                      className="form-control input-icon name-field px-20 py-22 lh-normal font-16 fw-normal"
                      onChange={(e) => {
                        setSignature({ signatureText: e.target.value });
                        setIsSignatureAdded(true);
                      }}
                    />
                  </div>
                  {signature?.signatureText && (
                    <div className="preview">
                      <div className="font d-flex justify-content-between mb-2">
                        <h6>Preview</h6>
                        <div className="selectSection">
                          <span>Font style : </span>
                          <select
                            value={selectedFont}
                            onChange={(e) => {
                              setSelectedFont(e.target.value);
                            }}
                          >
                            <option value="WindSong">WindSong</option>
                            <option value="shadows">Shadows Into Light</option>
                            <option value="GreatVibes">GreatVibes</option>
                            <option value="Zeyada">Zeyada</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <h4
                          className={`${selectedFont} preview-signtext overflow-anywhere`}
                        >
                          {signature.signatureText}
                        </h4>
                      </div>
                    </div>
                  )}
                  <div className="d-flex mt-4 gap-3">
                    <div className="addSignature  rounded w-50">
                      <button
                        className="btn btn-light btn-sm text-dark addsign-btn w-100 d-flex"
                        onClick={toggleSignaturePadModal}
                      >
                        <img src="/assets/images/signature-with-a-pen-1.svg" />
                        <span>
                          <span className="signbtn-head">
                            Draw Your Signature
                          </span>
                          <span className="signbtn-text">
                            Draw Your Signature here using your mouse or
                            trackpad
                          </span>
                        </span>
                      </button>
                      {signature?.signatureFile && <h6>Drawn Signature</h6>}
                    </div>
                    <div className="uploadSignature w-50">
                      <label
                        className="btn btn-light btn-sm text-dark addsign-btn w-100 d-flex"
                        htmlFor="signUpload"
                      >
                        <img src="/assets/images/upload-1.svg" />
                        <span>
                          <span className="signbtn-head">
                            Upload Your Signature
                          </span>
                          <span className="signbtn-text">
                            Upload an image of your handwritten signature here.
                          </span>
                        </span>
                            <input
                              name="signature"
                              type="file"
                              id="signUpload"
                              className="visually-hidden"
                              onChange={handleFileUpload}
                            />
                      </label>
                    </div>
                  </div>
                  {imageUploadError ? (
                    <span className="SignatureError text-danger">
                      <ErrorMessage msg={invalid_image_upload_error} />
                    </span>
                  ) : (
                    <span className="msg">
                      {signature.signatureUpload?.name}{" "}
                    </span>
                  )}
                </div>
                {isSignatureAdded === false && (
                  <ErrorMessage msg="Signature Not added" />
                )}
                <div class="modal-body text-center">
                  <button
                    type="button"
                    className="btn-design border-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="button" class="btn-design" onClick={onSubmit}>
                    {isEdit ? "Update Signature " : "Add Sign"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showAddSignatureModal ? "show" : ""}`}
        style={{ display: showAddSignatureModal ? "block" : "none" }}
      ></div>
    </>
  );
};

export default AddSignatureModal;
