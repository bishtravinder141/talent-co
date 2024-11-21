import React from "react";
import { useSelector } from "react-redux";

function AppliedCoverLetter({ candidataData }) {
  const { companyProfile } = useSelector((state) => state?.recruiter);
  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <div className="applicant-coverLetter">
        <p>Dear {companyProfile?.company_name},</p>
        <p>
          It is with great pleasure that I am applying for the Professional
          Sales position at {companyProfile?.company_name}.{" "}
          {candidataData?.candidate_cover_letter_json?.educationDetails.length >
            0 && (
            <>
              {" "}
              As a recent graduate of{" "}
              {
                candidataData?.candidate_cover_letter_json?.educationDetails
              },{" "}
              {candidataData?.candidate_cover_letter_json
                ?.extracurricularActivities.length > 0 && (
                <>
                  not only did I maintain excellent grades, but{" "}
                  {
                    candidataData?.candidate_cover_letter_json
                      ?.extracurricularActivities
                  }
                </>
              )}
              .{" "}
            </>
          )}
        </p>

        <p>
          My background has required me to be a strong manager of my time to
          balance school and athletics, which I am confident, will be a quality
          that will be important in this position. My years of working in a team
          environment, my strong competitive nature, as well as my success in
          leadership, are also qualities that I bring to my career.
        </p>

        <p>
          My goal is to join a company where there is growth potential, so I am
          sure I can fulfill that need of yours. My personality and competitive
          nature have made me realize that my skills will be beneficial in
          dealing with clients in sales.
        </p>

        <p>
          I am extremely passionate about the work in this profession and would
          be ecstatic to share my skills and experiences with your exceptional
          team. I appreciate your time and consideration and look forward to
          speaking with you soon.
        </p>

        <p>
          Sincerely,
          <br />
          {candidataData?.candidate_details?.candidate_name}
        </p>
      </div>
    </div>
  );
}

export default AppliedCoverLetter;
