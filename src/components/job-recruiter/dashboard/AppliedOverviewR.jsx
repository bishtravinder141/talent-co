import React from "react";
import Skill from "./Skill";
import { TABS } from "../../../pages/job/application/constant";
import ReactStars from "react-rating-stars-component";
import NoDataFound from "../../noDataFound/NoDataFound";

const AppliedOverviewR = ({ candidataData, badgeName }) => {
  return (
    <div className="tab-pane fade show active">
      <div className="applicant-overview">
        {badgeName === TABS.INTERVIEWED ? <h6>Comment</h6> : <h6>Summary</h6>}
        {badgeName === TABS.INTERVIEWED ? (
          <p>
            {candidataData?.interviews &&
            candidataData.interviews[0].comment.length > 0
              ? candidataData?.interviews && candidataData.interviews[0].comment
              : "No data found"}
          </p>
        ) : (
          <p>{candidataData?.professional_overview}</p>
        )}
        {badgeName === TABS.INTERVIEWED && candidataData?.interviews ? (
          <div className="applicant-ratings">
            <h6>Rating</h6>
            {candidataData?.interviews &&
            candidataData.interviews[0].comment.length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <span style={{ minWidth: "150px", marginRight: "12px" }}>
                    Technical Test
                  </span>
                  <ReactStars
                    count={5}
                    value={candidataData.interviews[0].technical_test_rating}
                    size={22}
                    activeColor="#ffd700"
                    edit={false}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <span style={{ minWidth: "150px", marginRight: "12px" }}>
                    Communication
                  </span>
                  <span>
                    <ReactStars
                      count={5}
                      value={candidataData.interviews[0].communication_rating}
                      size={22}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <span style={{ minWidth: "150px", marginRight: "12px" }}>
                    Responsibility
                  </span>
                  <span>
                    <ReactStars
                      count={5}
                      value={candidataData.interviews[0].responsibility_rating}
                      size={22}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </span>
                </div>
              </>
            ) : (
              <NoDataFound />
            )}
          </div>
        ) : (
          <>
            <div className="applicant-exp pb-2">
              <h6>Recent Experience</h6>
              {candidataData?.experiences?.map((experience, index) => {
                return (
                  <div className="profile-field-col" key={index}>
                    <div className="profile-field-icon">
                      <span>
                        <img
                          src="/assets/images/flexis.png"
                          alt="Flexis Logo"
                        />
                      </span>
                    </div>
                    <div className="profile-field-right">
                      <h6>{experience.position}</h6>
                      <p>{experience.job_description}</p>
                      <span>
                        {" "}
                        {experience.start_month} {experience.start_year} {" "}
                        {experience.end_month} {experience.end_year}
                      </span>{" "}
                      |{" "}
                      <span>
                        <a href="mailto:test@example.com">
                          Send email for Vetting
                        </a>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <Skill
              skillsList={candidataData.skills.map((skill) => skill.skill_name)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AppliedOverviewR;
