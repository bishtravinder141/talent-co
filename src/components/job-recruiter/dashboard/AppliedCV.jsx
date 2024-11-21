import React from "react";
import NoDataFound from "../../noDataFound/NoDataFound";

function AppliedCV(candidataData) {
  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <div className="applicant-cv">
        <div className="applicantcvInfo">
          <div className="cv-thumb">
            <img src="/assets/images/demo-user.png" alt="CV Thumbnail" />
          </div>
          <div className="cv-name">
            <h6>{candidataData.candidataData.candidate_name}</h6>
            <p>
              {candidataData?.candidataData?.phone_number}
              {candidataData?.candidataData?.email && (
                <> | {candidataData?.candidataData?.email} </>
              )}{" "}
              {candidataData?.candidataData?.job_locations.length > 0 && (
                <>| {candidataData?.candidataData?.job_locations[0].location}</>
              )}
            </p>
          </div>
        </div>

        <div className="applicant-exp">
          <h6>Experience</h6>
          {candidataData?.candidataData?.experiences.length ? (
            candidataData?.candidataData?.experiences.map(
              (experience, index) => {
                return (
                  <div key={index} className="exp_list">
                    <p>
                      <strong>
                        {experience?.company_name}{" "}
                        {experience?.location && `| ${experience?.location}`}
                      </strong>
                    </p>
                    <p>
                      {experience?.position} | {experience?.start_month}-
                      {experience?.start_year} - {experience?.end_month}-
                      {experience.end_year}
                    </p>
                    <p>Add responsibilities and accomplishments</p>
                  </div>
                );
              }
            )
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className="applicant-skills">
          <h6>Skills</h6>
          <div className="exp_list">
            <p>
              {candidataData.candidataData.skills?.length ? (
                candidataData.candidataData.skills
                  .map((skill) => skill.skill_name)
                  .join(", ")
              ) : (
                <NoDataFound />
              )}
            </p>
          </div>
        </div>
        <div className="applicant-education">
          <h6>Education</h6>

          {(candidataData.candidataData.qualifications?.length) ? (candidataData.candidataData.qualifications.map((edu, index) => {
            return (
              <div key={index} className="exp_list">
                <p>{edu.university} | Add location</p>
                <p>
                  {edu.qualification} | {edu.graduation_year}
                </p>
                <p>List academic achievements</p>
              </div>
            );
          })):<NoDataFound/>}
        </div>
      </div>
    </div>
  );
}

export default AppliedCV;
