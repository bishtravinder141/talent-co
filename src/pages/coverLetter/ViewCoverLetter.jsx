import React, { useEffect, useState } from "react";
import { getSelectedResume } from "../../API/resumeTemplate";
import { Link, useLocation } from "react-router-dom";
import PageLoader from "../../components/loader/PageLoader";
import CoverLetterTemplateOne from "../../components/CoverLetterTemplates/CoverLetterTemplateOne";

const ViewCoverLetter = () => {
  // const [selectedResume, setSelectedResume] = useState();
  const [loader, setLoader] = useState(true);
  const [coverLetterDetails, setCoverLetterDetails] = useState({});
  const location = useLocation();
  useEffect(() => {
    getSelectedResume()
      .then((resume) => {
        setCoverLetterDetails(resume?.data?.data);
        // const selectedTemplated = state?.coverLetterType
        //   ? state?.coverLetterType
        //   : resume?.data?.data?.coverLetterDetails
        //   ? resume?.data?.data?.coverLetterDetails
        //   : "cl-template1";
        // setSelectedResume(selectedTemplated);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  return (
    <section className="view-profile-sec py-60">
      <div className="container">
        <div className="job-listing-details w-100">
          <div>
            {" "}
            <div className="back-arrow-heading d-flex font-weight-bold align-items-center">
              <Link to={location?.state?.prevRoute ? location.state?.prevRoute :"/job-seeker/dashboard"}>
                <img src="/assets/images/back-arrow.svg" alt="Back" />
              </Link>
              <h3>Go Back</h3>
            </div>
          </div>
          <div className="cover-section mt-5">
            <div className="d-md-flex justify-content-between align-items-center create-wrapper">
              <h2 className="section-heading-main mb-md-0 mb-3">
                Cover Letter
              </h2>
            </div>
            {loader && <PageLoader />}
            <section className="overview-cv">
            </section>
            {/* {selectedResume === "cl-template1" && ( */}
              <CoverLetterTemplateOne coverLetterDetails={coverLetterDetails} setLoader={setLoader} />
            {/* )} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewCoverLetter;
