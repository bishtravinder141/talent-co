import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import generatePDF from "react-to-pdf";
import "./resume.css";
import PageLoader from "../../components/loader/PageLoader";
import {
  changeResumeTemplate,
  getSelectedResume,
} from "../../API/resumeTemplate";
import ResumeTemplateTypeone from "../../components/resumeTemplates/ResumeTemplateTypeone";
import ResumeTemplateTypeTwo from "../../components/resumeTemplates/ResumeTemplateTypeTwo";
import ResumeTemplateTypeThree from "../../components/resumeTemplates/ResumeTemplateTypeThree";
import ButtonLoader from "../../components/loader/ButtonLoader";
const Resume = () => {
  const [selectedResume, setSelectedResume] = useState();
  const [loader, setLoader] = useState(true);
  const [resumeDetails, setResumeDetails] = useState({});
  const [resumeType, setResumeType] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const { state } = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
    getSelectedResume()
      .then((resume) => {
        setResumeDetails(resume?.data?.data);
        const selectedTemplated = state?.resumeType
          ? state?.resumeType
          : resume?.data?.data?.resume_template
          ? resume?.data?.data?.resume_template
          : "cv-template1";
        setResumeType(resume?.data?.data?.resume_template);
        setSelectedResume(selectedTemplated);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const isSelectedResume = () => {
    const tempSelectedResume = !state?.resumeType
      ? "Selected Templates"
      : state?.resumeType === resumeType
      ? "Selected Templates"
      : "Select Template";
    return tempSelectedResume;
  };

  const handleSelectTemplate = () => {
    setLoader(true);
    const payload = { resume_template: selectedResume };
    changeResumeTemplate(payload)
      .then((res) => {
        setResumeType(res?.data?.data?.resume_template);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <>
      <section className="view-profile-sec py-60">
        <div className="container">
          <div className="job-listing-details w-100">
            <div>
              {" "}
              <div className="back-arrow-heading d-flex font-weight-bold align-items-center mb-4">
                <Link to={"/job-seeker/dashboard"}>
                  <img src="/assets/images/back-arrow.svg" alt="Back" />
                </Link>
                <h3>Go Back</h3>
              </div>
            </div>
            <div className="cover-section mt-5">
              <div className="d-md-flex justify-content-between align-items-center create-wrapper">
                <h2 className="section-heading-main mb-md-0 mb-3">Resume</h2>
                <div>
                  <button
                    className="btn-design"
                    disabled={isSelectedResume() === "Selected Templates"}
                    onClick={handleSelectTemplate}
                  >
                    {isSelectedResume()}
                  </button>
                  <Link
                    className="btn-design decline-btn"
                    to={"/job-seeker/select-resume"}
                  >
                    Change Templates
                  </Link>
                  <Link
                    className="btn-design border-btn"
                    to={"/job-seeker/user-profile-page"}
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <section className="overview-cv">
                {loader && <PageLoader />}
              </section>
              <div ref={contentRef}>
                {selectedResume === "cv-template1" && (
                  <ResumeTemplateTypeone resumeDetails={resumeDetails} />
                )}
                {selectedResume === "cv-template2" && (
                  <ResumeTemplateTypeTwo resumeDetails={resumeDetails} />
                )}
                {selectedResume === "cv-template3" && (
                  <ResumeTemplateTypeThree resumeDetails={resumeDetails} />
                )}
              </div>
            </div>
          </div>
          <div className="col-12 text-center">
            <div className="fieldset d-flex justify-content-center">
              <button
                className={`${buttonLoader ? "btn-on-loading" : "btn-design"}`}
                onClick={async () => {
                  setButtonLoader((prev) => true);
                  await generatePDF(contentRef, { filename: "Resume.pdf" });
                  setButtonLoader((prev) => false);
                }}
              >
                Export Resume to PDF
                {buttonLoader && <ButtonLoader />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Resume;
