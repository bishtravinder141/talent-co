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
import AppliedOverviewR from "./AppliedOverviewR";
import { TABS } from "../../../pages/job/application/constant";
import { useNavigate } from "react-router-dom";

const ApplicationCardRecommended = ({
  children,
  showBadge = false,
  badgeName,
  candidataData,
}) => {
  const [selectedTab, setSelectedTab] = useState("Overview");
  const navigate = useNavigate();

  return (
    <div className="applications-details-col border mb-4">
      <div className="applicant-header border-bottom">
        {badgeName === TABS.RECOMMENDED && (
          <div className="applications-tag">Recommended</div>
        )}
        {badgeName === TABS.SHORTLISTED && (
          <div className="applications-tag">
            <img src="/assets/images/shortlist-icon.svg" /> Shortlisted
          </div>
        )}
        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="applicant-info-col">
              <div className="applicant-thumb cursor-pointer" onClick={() =>
                    navigate(
                      `/view-candidate-public-profile/${candidataData?.candidate_details?.id}`
                    )
                  }>
                <img src="/assets/images/user-profile.svg" alt="User Profile" />
              </div>
              <div className="applicant-info">
                <h6
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/view-candidate-public-profile/${candidataData?.candidate_details?.id}`
                    )
                  }
                >
                  {candidataData?.candidate_details?.candidate_name}
                </h6>
                <ul>
                  <li>{candidataData?.candidate_details?.job_title}</li>
                  <li>
                    {" "}
                    {candidataData?.candidate_details?.total_experience
                      ? candidataData?.candidate_details?.total_experience
                      : "Fresher"}
                  </li>
                  <li>
                    {candidataData?.candidate_details?.employment_options
                      ?.length > 0
                      ? candidataData?.candidate_details?.employment_options
                          .map((item) => item.title)
                          .join(" | ")
                      : " "}
                  </li>
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
                Job Title: <strong>{candidataData?.job_title}</strong>
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
                  badgeName === "recommended" && tb === "Cover Letter"
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
          {selectedTab === "Overview" && candidataData?.candidate_details && (
            <AppliedOverviewR
              candidataData={candidataData?.candidate_details}
              badgeName={badgeName}
            />
          )}
          {selectedTab === "CV" && (
            <AppliedCV candidataData={candidataData.candidate_details} />
          )}
          {selectedTab === "Skill Match" && (
            <AppliedSkillMatch candidataData={candidataData.matched_skills} />
          )}
          {selectedTab === "Cover Letter" && (
            <AppliedCoverLetter candidataData={candidataData} />
          )}
        </div>
      </div>
      <>{children}</>
    </div>
  );
};

export default ApplicationCardRecommended;
