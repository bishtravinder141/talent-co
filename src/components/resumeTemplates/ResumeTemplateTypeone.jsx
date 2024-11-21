import React, { useState } from "react";
import { APPLICATION_BASE_URL } from "../../config/APIConfig";
import { Link } from "react-router-dom";
import { NO_DATA_MESSAGE } from "../../pages/resume/Constant";

const ResumeTemplateTypeone = ({ resumeDetails }) => {
  return (
    <div className={"cv-template-section cv-template1"}>
      <div className="row">
        <div className="col-md-4">
          <div className="personal-info">
            <div className="dev-imgbx mb-4">
              <img
                src={`${
                  resumeDetails?.profile_picture
                    ? `${APPLICATION_BASE_URL}${resumeDetails.profile_picture}`
                    : "/assets/images/demo-user.png"
                }`}
              />
              {/* <img src={ resumeDetails.profile_picture ?  : "/assets/images/user.png"} className="dev-img" /> */}
            </div>
            <div className="contact-dev-info">
              <h3 className="cv-heading">Contact</h3>
              <ul className="cv-listing">
                <li className="cv-side-link">
                  <h4 className="cv-subheading">Phone</h4>
                  <p className="cv-text">
                    {resumeDetails?.user_details?.phone_number}
                  </p>
                </li>
                <li className="cv-side-link">
                  <h4 className="cv-subheading">Email</h4>
                  <p className="cv-text">
                    {resumeDetails?.user_details?.email}
                  </p>
                </li>
                {/* <li className="cv-side-link">
                  <h4 className="cv-subheading">Address</h4>
                  <p className="cv-text">{resumeDetails?.address}</p>
                </li> */}
              </ul>
            </div>
            <div className="contact-dev-info">
              <h3 className="cv-heading">Education</h3>
              {resumeDetails?.qualifications?.length === 0 ? (
                <span>{NO_DATA_MESSAGE.EDUCATION}</span>
              ) : (
                <ul className="cv-listing">
                  {resumeDetails?.qualifications?.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <li className="cv-education-link">
                          <p className="cv-text education-year mb-1">
                            {item?.graduation_year}
                          </p>
                          <h4 className="cv-subheading mb-1">
                            {item?.qualification}
                          </h4>
                          <p className="cv-text">{item?.university}</p>
                          {/* <p className="cv-text">{item?.FieldOfStudy?.title}</p> */}
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="contact-dev-info">
              <h3 className="cv-heading">Skills</h3>
              {resumeDetails?.skills?.length === 0 ? (
                <span>{NO_DATA_MESSAGE.SKILL} </span>
              ) : (
                <ul className="cv-listing cv-skills-listing">
                  {resumeDetails?.skills?.map((item, index) => {
                    return (
                      <>
                        <li className="skills-item" key={index}>
                          {item.skill_name}
                        </li>
                      </>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="profession-section">
            <div className="personal-details">
              <h2 className="developer-name">
                <b>
                  {resumeDetails?.user_details?.first_name}{" "}
                  {resumeDetails?.user_details?.last_name}
                </b>
              </h2>
              {/* <h4 className="developer-position">
                {resumeDetails?.developer_detail?.professional_title}
              </h4> */}
              <p className="about-bio-text">
                {resumeDetails?.professional_overview}
              </p>
            </div>
            <div className="connect-details">
              <h2 className="cv-heading cv-dark-text">Connect with me</h2>
              {resumeDetails?.links?.length === 0 ||
              !resumeDetails?.links.some((link) => !!link.link_url) ? (
                <span>{NO_DATA_MESSAGE.LINKS}</span>
              ) : (
                <ul className="connect-listing">
                  <li className="connect-list-item">
                    {resumeDetails.links[0].link_url && (
                      <Link
                      to={`${resumeDetails?.links[0]?.link_url}`}
                      target="__blank"
                      >
                        <img src="/assets/images/website-icon.svg" />
                      </Link>
                    )}
                  </li>
                  <li className="connect-list-item">
                    {resumeDetails?.links?.length > 1 &&
                      resumeDetails.links[1].link_url && (
                        <Link
                        to={`${resumeDetails?.links[1]?.link_url}`}
                        target="__blank"
                        >
                          <img src="/assets/images/linkedin-icon.svg" />
                        </Link>
                      )}
                  </li>
                </ul>
              )}
            </div>
            <div className="experience-detiails">
              <h3 className="cv-heading cv-dark-text">Experience</h3>
              {resumeDetails?.experiences?.length === 0 ? (
                <span>{NO_DATA_MESSAGE.EXPERIENCE}</span>
              ) : (
                <ul className="experience-timeline">
                  {resumeDetails?.experiences?.map((item, index) => {
                    return (
                      <>
                        <li className="exper-timeline-item">
                          <p className="exper-year">{`${item?.start_date?.slice(
                            0,
                            4
                          )}-${
                            item?.end_date
                              ? item?.end_date?.slice(0, 4)
                              : "FullTime"
                          }`}</p>
                          <p className="company-name-text">
                            {item?.company_name}
                            {item?.job_description && (
                              <span>| {item?.job_description}</span>
                            )}
                            {item?.location && <span> | {item?.location}</span>}
                            {item?.employment_type && (
                              <span> | {item?.employment_type}</span>
                            )}
                          </p>
                          <h3 className="cv-subheading cv-dark-text">
                            {item?.position}
                          </h3>
                        </li>
                      </>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateTypeone;
