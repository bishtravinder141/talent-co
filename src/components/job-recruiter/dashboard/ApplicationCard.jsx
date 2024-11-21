import React from "react";
import AppliedOverview from "./AppliedOverview";
import AppliedCV from "./AppliedCV";
import AppliedSkillMatch from "./AppliedSkillMatch";
import Pagination from "../../pagination/Pagination";
import AppliedCoverLetter from "./AppliedCoverLetter";
import { APPLICATION_CARD_TABS } from "../constant/constant";
import { useState } from "react";
import { Fragment } from "react";
import FilterTabs from "../../common/FilterTabs";
import { useEffect } from "react";

const ApplicationCard = ({
  children,
  showBadge = false,
  badgeName,
  applicationsData,
}) => {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return applicationsData.map((candidataData, index) => {
    return (
      <div key={index} className="applications-details-col border mb-4">
        <div className="applicant-header border-bottom">
          {showBadge && <div className="applications-tag">Recommended</div>}
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="applicant-info-col">
                <div className="applicant-thumb">
                  <img
                    src="/assets/images/user-profile.svg"
                    alt="User Profile"
                  />
                </div>
                <div className="applicant-info">
                  <h6>James</h6>
                  <ul>
                    <li>Web Developer</li>
                    <li>2 years of experience</li>
                    <li>Full-time</li>
                    <li>Remote</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="applicant-social-title">
                <a href="#">
                  <img
                    src="/assets/images/linkedin-icon.svg"
                    alt="LinkedIn Icon"
                  />
                </a>
                <p>
                  Job Title: <strong>Full Stack Developer</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="applicant-body">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {APPLICATION_CARD_TABS.map((tb, i) => (
              <Fragment key={i}>
                <FilterTabs
                  title={
                    badgeName === "Recommended" && tb === "Cover Letter"
                      ? false
                      : tb
                  }
                  active={selectedTab === tb}
                  handleClickTab={() => setSelectedTab(tb)}
                />{" "}
              </Fragment>
            ))}
          </ul>
          <div className="tab-content">
            {selectedTab === "Overview" && (
              <AppliedOverview candidataData={candidataData} />
            )}
            {selectedTab === "CV" && <AppliedCV candidataData={candidataData} />}
            {selectedTab === "Skill Match" && <AppliedSkillMatch candidataData={candidataData} />}
            {selectedTab === "Cover Letter" && <AppliedCoverLetter candidataData={candidataData} />}
          </div>
        </div>
        <>{children}</>
      </div>
    );
  });
};

export default ApplicationCard;
