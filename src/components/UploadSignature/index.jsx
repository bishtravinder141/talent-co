import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import SignatureCanvas from "react-signature-canvas";
  
// yarn add react-modal
// yarn add react-signature-canvas

const SignatureUploader = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [drawingModalIsOpen, setDrawingModalIsOpen] = useState(false);
  const sigCanvasRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const formData = useRef(new FormData());

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Set signatue data to FormData
    if (signatureImage) {
      formData.current.append("signatureImage", signatureImage);
      sendSignatureData(formData.current);
    }
    setModalIsOpen(false);
  };

  // handle send signature data to api
  const sendSignatureData = (formData) => {
    console.log("Sending signature data as FormData:", formData);
  };

  const openDrawingModal = () => {
    setDrawingModalIsOpen(true);
    setIsDrawing(true);
  };

  const closeDrawingModal = () => {
    setDrawingModalIsOpen(false);
    setIsDrawing(false);
  };

  const clearSignature = () => {
    sigCanvasRef.current.clear();
  };

  const saveSignature = () => {
    const signatureData = sigCanvasRef.current.toDataURL();
    setSignatureImage(signatureData);
    closeDrawingModal();
  };

  const uploadSignature = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignatureImage(e.target.result);
        closeUploadModal();
      };
      reader.readAsDataURL(file);
    }
  };

  const closeUploadModal = () => {
    closeDrawingModal();
  };

  return (
    <div>
      <button onClick={openModal}>Upload Signature</button> 
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Signature Upload Modal"
      >
        <h2>Upload Your Signature</h2>
        <button onClick={closeModal}>Close Modal</button>
        {isDrawing && (
          <div>
            <h3>Your Drawn Signature:</h3>
            <SignatureCanvas
              ref={sigCanvasRef}
              canvasProps={{ width: 400, height: 200, className: "sig-canvas" }}
            />
            <div>
              <button onClick={clearSignature}>Clear</button>
              <button onClick={saveSignature}>Done</button>
            </div>
          </div>
        )}
        {!isDrawing && (
          <div>
            <h3>Your Uploaded Signature:</h3>
            {signatureImage && (
              <img src={signatureImage} alt="User Signature" />
            )}
            <label>
              Upload Your Signature
              <input type="file" accept="image/*" onChange={uploadSignature} />
            </label>
          </div>
        )}
        <button onClick={openDrawingModal}>Draw Your Signature</button>
      </Modal>
    </div>
  );
};

export default SignatureUploader;
