import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { NO_DATA_MESSAGE } from "../../pages/resume/Constant";
import { APPLICATION_BASE_URL } from "../../config/APIConfig";

const ResumeTemplateTypeTwo = ({ resumeDetails }) => {
  return (
    <div className="cv-template-section cv-template2">
      <div className="row">
        <div className="col-md-12">
          <div className="personal-info d-flex justify-content-between align-items-center">
            <div className="personal-details px-4 w-100">
              <h2 className="developer-name">
                <b>{resumeDetails?.user_details?.first_name}</b>{" "}
                {resumeDetails.user_details?.last_name}
              </h2>
              {/* <h4 className="developer-position">Frontend Developer</h4> */}
              <p className="about-bio-text">
                {resumeDetails.professional_overview}
              </p>
            </div>
            <div className="dev-imgbx flex-none">
              <img
                src={`${
                  resumeDetails?.profile_picture
                    ? `${APPLICATION_BASE_URL}${resumeDetails.profile_picture}`
                    : "/assets/images/demo-user.png"
                }`}
              />
            </div>
          </div>
          <div className="contact-dev-info contact-information py-4 ">
            <h3 className="cv-heading text-center mb-4 border-0">Contact</h3>
            <ul className="cv-listing d-flex justify-content-around">
              <li className="cv-side-link">
                <h4 className="cv-subheading">Phone</h4>
                <p className="cv-text">
                  {resumeDetails?.user_details?.phone_number}
                </p>
              </li>
              <li className="cv-side-link">
                <h4 className="cv-subheading">Email</h4>
                <p className="cv-text">{resumeDetails?.user_details?.email}</p>
              </li>
              {/* <li className="cv-side-link">
                <h4 className="cv-subheading">Address</h4>
                <p className="cv-text">123 Anywhere St.. Any City</p>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="py-5">
            <div className="mb-4">
              <div className="contact-dev-info ps-0">
                <h3 className="cv-heading">Education</h3>
                {resumeDetails?.qualifications?.length === 0 ? (
                  <span>{NO_DATA_MESSAGE.EDUCATION}</span>
                ) : (
                  <ul className="cv-listing education-listing">
                    {resumeDetails.qualifications?.map((item, index) => (
                      <li className="cv-education-link">
                        <p className="cv-text education-year mb-1">
                          {item.graduation_year}
                        </p>
                        <h4 className="cv-subheading mb-1">
                          {item.qualification}
                        </h4>
                        <p className="cv-text">{item.university}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="profession-section">
              <div className="experience-detiails ps-0">
                <h3 className="cv-heading cv-dark-text">Experience</h3>
                {resumeDetails?.experiences?.length === 0 ? (
                  <span>{NO_DATA_MESSAGE.EXPERIENCE} </span>
                ) : (
                  <ul className="exper-listing">
                    {resumeDetails?.experiences?.map((item, index) => (
                      <li className="exper-item">
                        <h3 className="cv-subheading cv-dark-text">
                          {item.position}
                        </h3>
                        <p className="company-name-text">
                          {item.company_name} | <span>{item.location}</span>
                        </p>
                        <p className="exper-year">
                          {moment(item.start_date).format("YYYY")} -{" "}
                          {moment(item.end_date).format("YYYY")}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="py-5">
            <div className="contact-dev-info ps-4">
              <h3 className="cv-heading">Skills</h3>
              {resumeDetails?.skills?.length === 0 ? (
                <span>{NO_DATA_MESSAGE.SKILL}</span>
              ) : (
                <ul className="cv-listing cv-skills-listing">
                  {resumeDetails?.skills?.map((item, index) => (
                    <li className="skills-item">{item.skill_name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="connect-details ps-4">
              <h2 className="cv-heading mb-4 cv-dark-text">Connect with me</h2>
              {resumeDetails?.links?.length === 0 ||
              !resumeDetails?.links.some((link) => !!link.link_url) ? (
                <span>{NO_DATA_MESSAGE.LINKS}</span>
              ) : (
                <ul className="connect-listing">
                  <li className="connect-list-item">
                    {resumeDetails.links[0].link_url && (
                      <Link
                      // to={`${resumeDetails?.links[0]?.link_url}`}
                      // target="__blank"
                      >
                        <img src="/assets/images/website-icon.svg" />
                      </Link>
                    )}
                  </li>
                  <li className="connect-list-item">
                    {resumeDetails?.links?.length > 1 &&
                      resumeDetails.links[1].link_url && (
                        <Link
                        // to={`${resumeDetails?.links[1]?.link_url}`}
                        // target="__blank"
                        >
                          <img src="/assets/images/linkedin-icon.svg" />
                        </Link>
                      )}
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateTypeTwo;
