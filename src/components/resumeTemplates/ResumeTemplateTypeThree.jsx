import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { NO_DATA_MESSAGE } from "../../pages/resume/Constant";

const ResumeTemplateTypeThree = ({ resumeDetails }) => {
  return (
    <>
      <div className="cv-template-section cv-template3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-head mb-0">Overview</h2>
          {/* <button className="main-btn px-5">Download Resume</button> */}
        </div>
        <div className="row">
          <div className="col-md-6 px-0">
            <div className="resume-basic-info text-center">
              <div className="resume-imgbx mx-auto mb-4">
                <img src={"/assets/images/user.png"} className="resume-img" />
              </div>
              <h3 className="resume-name">
                {resumeDetails?.user_details?.first_name}{" "}
                {resumeDetails?.user_details?.last_name}
              </h3>
              {/* <p className="resume-designation">Software Developer</p> */}
            </div>
            <div className="connect-social-media">
              <h3 className="subheading-resume text-center mb-3">Skills</h3>
              {resumeDetails?.skills?.length === 0 ? (
                <span>{NO_DATA_MESSAGE.SKILL}</span>
              ) : (
                <ul className="skills-pill text-center">
                  {resumeDetails?.skills?.map((item, index) => (
                    <li className="skills-item">{item.skill_name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="connect-social-media">
              <h3 className="subheading-resume text-center mb-3">
                Connect With Me
              </h3>
              {resumeDetails?.links?.length === 0 ||
              !resumeDetails?.links.some((link) => !!link.link_url) ? (
                <span>{NO_DATA_MESSAGE.LINKS}</span>
              ) : (
                <ul className="social-media">
                  <li>
                    {resumeDetails?.links?.length > 0 &&
                      resumeDetails.links[0].link_url && (
                        <Link to={`${resumeDetails?.links[0]?.link_url}`}>
                          <img src="/assets/images/website-icon.svg" />
                        </Link>
                      )}
                  </li>
                  <li>
                    {resumeDetails?.links?.length > 1 &&
                      resumeDetails.links[1].link_url && (
                        <Link to={`${resumeDetails?.links[1]?.link_url}`}>
                          <img src="/assets/images/linkedin-icon.svg" />
                        </Link>
                      )}
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="px-0 col-md-6 border-start-grey">
            <div className="about-info px-4">
              <h3 className="subheading-resume mb-4">About Me</h3>
              {/* <h2 className="mainheading-resume">Art Changes Us</h2> */}
              <p className="resume-text">
                {resumeDetails?.professional_overview}
              </p>
            </div>
            <div className="about-info px-4 pt-4">
              <h3 className="subheading-resume mb-4">Experience</h3>
              {resumeDetails?.skills?.length === 0 ? (
                <span>{NO_DATA_MESSAGE.SKILL}</span>
              ) : (
                <div className="exp-wrapper">
                  {resumeDetails?.experiences?.map((item, index) => (
                    <>
                      <p className="exp-year">
                        {moment(index.start_date).format("YYYY")} -{" "}
                        {moment(index.end_date).format("YYYY")} {item.position}{" "}
                        {item.company_name}
                        {/* 2018 - 2023 Software Developer Google */}
                      </p>
                      <ul className="exp-role">
                        <li className="resume-text">
                          Collaborated with cross-functional teams to design,
                          develop, and deploy software solutions.
                        </li>
                        <li className="resume-text">
                          Collaborated with cross-functional teams to design,
                          develop, and deploy software solutions.
                        </li>
                        <li className="resume-text">
                          Collaborated with cross-functional teams to design,
                          develop, and deploy software solutions.
                        </li>
                      </ul>
                    </>
                  ))}
                </div>
              )}
              <h3 className="subheading-resume mb-4">Education</h3>
              {resumeDetails?.qualifications?.length === 0 ? (
                <span>{NO_DATA_MESSAGE.EDUCATION}</span>
              ) : (
                resumeDetails?.qualifications?.map((item, index) => (
                  <div className="exp-wrapper" key={index}>
                    <p className="exp-year">
                      {item.graduation_year} {item.qualification}
                    </p>
                    <ul className="exp-role">
                      <li className="resume-text">{item.university}</li>
                      <li className="resume-text">
                        {item.activities_and_societies}
                      </li>
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeTemplateTypeThree;
