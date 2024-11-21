import React, { useEffect, useState } from "react";
import AddSignatureModal from "../../../components/common/model/AddSignatureModal";
import SignaturePadModal from "../../../components/common/model/SignaturePadModal";
import {
  acceptOfferLetter,
  addDigitalSignature,
  getCandidateProfile,
  getDigitalSignature,
  getOfferLetterDetails,
  getProfileData,
  updateDigitalSignature,
} from "../../../API/candidateProfile";
import PageLoader from "../../../components/loader/PageLoader";
import { baseURL, APPLICATION_BASE_URL } from "../../../config/APIConfig";
import { useNavigate, useParams } from "react-router-dom";
import {
  ACCEPTOFFERLETTERMSG,
  SIGNATURE_NOT_ADDED,
  successType,
} from "../../../utils/allToastMessage";
import { toastMessage } from "../../../utils/toastMessages";
import moment from "moment";

const CoverLetter = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const [showAddSignatureModal, setShowAddSignatureModal] = useState(false);
  const [signatureId, setSignatureId] = useState(null);
  const [isAlreadyAccepted,setIsAlreadyAccepted] = useState(false);
  const [showSignaturePadModal, setShowSignaturePadModal] = useState(false);
  const [userProfileData, setUserProfileData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isSignatureAdded, setIsSignatureAdded] = useState();
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFont, setSelectedFont] = useState("WindSong");
  const [offerLetterDetails, setOfferLetterDetails] = useState([]);
  const [hasOfferExpired,setHasOfferExpired] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [signature, setSignature] = useState({
    signatureText: null, // for typed signature
    signatureFile: null, //for signed signature
    signatureUpload: null, //for image upload
  });
  useEffect(() => {
    setLoader(true);
    getProfileData()
      .then((res) => {
        setUserProfileData(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));

    getSignature();
    handleGetOfferLetterDetails();
    //commented for future use
    // getOfferLetterDetails()
    //   .then((res) => {
    //     setOfferLetterDetails(res?.data?.data);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoader(false));
  }, []);

  const toggleAddSignatureModal = () => {
    (!isAlreadyAccepted && !hasOfferExpired)&&setShowAddSignatureModal(!showAddSignatureModal);
  };
  const toggleSignaturePadModal = () => {
    toggleAddSignatureModal();
    setShowSignaturePadModal(!showSignaturePadModal);
  };
  const handleCancel = () => {
    setShowAddSignatureModal(!showAddSignatureModal);
    setSignatureUrl(null);
    setSignature(null);
    getSignature();
  };
  const handleGetOfferLetterDetails = () => {
    setLoader(true);
    getOfferLetterDetails(applicationId)
      .then((res) => {
        if(moment(new Date()).format("MMM Do YY")>moment(res?.data?.data?.offerLetterDetails?.response_date).format("MMM Do YY"))
        {
           setHasOfferExpired(true);
        }
        if(res?.data?.data?.accepted_by_candidate)
        {
          setIsAlreadyAccepted(true);
        }
        setJobTitle(res?.data?.data?.job_title);
        setOfferLetterDetails(res?.data?.data?.offer_letter_details);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const getSignature = () => {
    setLoader(true);
    getDigitalSignature()
      .then((res) => {
        if (
          res?.data?.data?.signature_file ||
          res?.data?.data?.signature_text
        ) {
          setIsEdit(true);
          setLoader(false);
          setSignatureId(res?.data?.data?.id);
        }
        if (res?.data?.data?.metadata) {
          setSelectedFont(res?.data?.data?.metadata);
        }
        if (res?.data?.data?.signature_file) {
          setSignatureUrl(res?.data?.data?.signature_file);
        } else {
          setSignature({ signatureText: res?.data?.data?.signature_text });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  const handleAcceptOfferLetter = () => {
    if (signatureId) {  
      const payload = {
        accepted_by_candidate: true,
        digital_signature: signatureId,
      };
      setLoader(true);
      acceptOfferLetter(applicationId, payload)
        .then(() => {
          toastMessage(ACCEPTOFFERLETTERMSG, successType);
          navigate("/job-seeker/dashboard");
        })
        .catch((err) => console.log(err))
        .finally(() => setLoader(false));
    } else {
      toastMessage(SIGNATURE_NOT_ADDED);
    }
  };
  return (
    <>
      <main>
        {loader && <PageLoader />}
        <section className="job-seeker-dashboard-sec py-70">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="shadow-box coverletter-sec">
                  <h4>Offer Letter</h4>
                  <div className="coverletter-cotnent border-top py-4 mt-4">
                    {/* <p>Dear [Contact],</p> */}
                    <p>
                      Dear{" "}
                      {`${userProfileData?.first_name} ${userProfileData?.last_name}`}
                      ,
                    </p>
                    <p>
                      We were all very excited to meet and get to know you over
                      the past few days. We have been impressed with your
                      background and would like to formally offer you the
                      position of {jobTitle ? jobTitle : "[Job_title]"}.
                    </p>
                    <p>
                      This is a{" "}
                      {offerLetterDetails?.job_type &&
                        offerLetterDetails.job_type}
                      time position You will be reporting to the head of the{" "}
                      {offerLetterDetails?.department_name &&
                        offerLetterDetails?.department_name}{" "}
                      department. [If applicable: Please note that
                      [Company_name] is an at-will employer. That means that
                      either you or [Company_name] are free to end the
                      employment relationship at any time, with or without
                      notice or cause.]
                    </p>
                    <p>
                      We will be offering you an annual gross salary of{" "}
                      {offerLetterDetails?.salary &&
                        ` $${offerLetterDetails?.salary}`}{" "}
                      and{" "}
                      {offerLetterDetails?.bonus_programs &&
                        offerLetterDetails?.bonus_programs}{" "}
                      You will also have{" "}
                      {offerLetterDetails?.company_benefits &&
                        `${offerLetterDetails?.company_benefits} and `}
                      {offerLetterDetails?.paid_vacation &&
                        offerLetterDetails?.paid_vacation}{" "}
                      days of paid vacation per year.
                      {/* [optional: I am attaching a
                      letter with more details about your compensation plan.] */}
                    </p>
                    <p>
                      Your expected starting date is{" "}
                      {offerLetterDetails?.expected_starting_date &&
                        offerLetterDetails?.expected_starting_date}{" "}
                      You will be asked to sign a contract of{" "}
                      {offerLetterDetails?.contract_duration &&
                        offerLetterDetails?.contract_duration}{" "}
                      and{" "}
                      {offerLetterDetails?.agreements &&
                        offerLetterDetails?.agreements}{" "}
                      at the beginning of your employment.
                    </p>
                    <p>
                      We would like to have your response by{" "}
                      {offerLetterDetails?.response_date &&
                        offerLetterDetails?.response_date}{" "}
                      In the meantime, please feel free to contact me{" "}
                      {offerLetterDetails?.manager_name &&
                        ` or ${offerLetterDetails?.manager_name}`}{" "}
                      via email or phone on{" "}
                      {offerLetterDetails?.contact_details &&
                        offerLetterDetails?.contact_details}{" "}
                      , should you have any questions.
                    </p>
                    <p>We are all looking forward to having you on our team.</p>
                    <p>
                      <strong>Best regards,</strong>
                    </p>
                    <p>
                      <strong>
                        {" "}
                        {/* add company or manager name here */}
                        {/* {`${userProfileData?.first_name} ${userProfileData?.last_name}`} */}
                      </strong>
                    </p>
                    <p onClick={toggleAddSignatureModal}>
                      <strong className= {`signature ${(isAlreadyAccepted)&& "notAllowed"}`}>
                        {isEdit
                          ? "Click to Update Signature" 
                          : "Click to Add Signature"}
                      </strong>
                    </p>
                    <p>
                      {signatureUrl ? (
                        <img
                          className="signatureImage"
                          src={`${APPLICATION_BASE_URL}${signatureUrl}`}
                        />
                      ) : (
                        <strong className={`${selectedFont}`}>
                          {signature?.signatureText}
                        </strong>
                      )}  
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4 text-center">                       
                {/* Button trigger modal */}
                <button
                  onClick={handleAcceptOfferLetter}                                   
                  type="button"
                  className= {`btn-design ${(isAlreadyAccepted || hasOfferExpired) && "notAllowed"}`}
                  data-bs-toggle="modal"
                  data-bs-target="#applyPopup"
                  disabled = {isAlreadyAccepted}
                >
                  {(hasOfferExpired)?"offer expired":(isAlreadyAccepted) ? "Already Accepted" : "Accept Offer Letter"}  
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {showAddSignatureModal && (
        <AddSignatureModal
          showAddSignatureModal={showAddSignatureModal}
          toggleAddSignatureModal={toggleAddSignatureModal}
          toggleSignaturePadModal={toggleSignaturePadModal}
          setSignature={setSignature}
          signature={signature}
          setIsSignatureAdded={setIsSignatureAdded}
          isSignatureAdded={isSignatureAdded}
          isEdit={isEdit}
          setSelectedFont={setSelectedFont}
          selectedFont={selectedFont}
          setLoader={setLoader}
          loader={loader}
          getSignature={getSignature}
          setSignatureUrl={setSignatureUrl}
          handleCancel={handleCancel}
        />
      )}
      {showSignaturePadModal && (
        <SignaturePadModal
          showSignaturePadModal={showSignaturePadModal}
          toggleSignaturePadModal={toggleSignaturePadModal}
          setSignature={setSignature}
          signature={signature}
          setIsSignatureAdded={setIsSignatureAdded}
        />
      )}
    </>
  );
};

export default CoverLetter;
