import React from "react";
import Skill from "./Skill";

const AppliedOverview = ({candidataData}) => {
  return (
    <div className="tab-pane fade show active">
      <div className="applicant-overview">
        <h6>Summary</h6>
        <p>
          {candidataData?.professional_overview}
          {/* Fusce ut lacinia enim. Pellentesque porta posuere dolor non varius.
          Mauris ultrices, nisi vitae lacinia posuere, lectus purus eleifend
          tellus, et convallis ligula metus ut sapien. Sed a maximus orci.
          Vestibulum vulputate venenatis mi non fermentum. Sed semper metus ut
          finibus rhoncus. Phasellus eleifend vulputate mauris, sit amet viverra
          est malesuada tincidunt. Duis id nunc tincidunt, porta velit sed,
          finibus ligula. */}
        </p>
        <div className="applicant-exp pb-2">
          <h6>Recent Experience</h6>
          <div className="profile-field-col">
            <div className="profile-field-icon">
              <span>
                <img src="/assets/images/flexis.png" alt="Flexis Logo" />
              </span>
            </div>
            <div className="profile-field-right">
              <h6>Senior Project Manager</h6>
              <p>Flexis</p>
              <span>Dec 2022 - Present</span> |{" "}
              <span>
                <a href="mailto:test@example.com">Send email for Vetting</a>
              </span>
            </div>
          </div>
          <div className="profile-field-col">
            <div className="profile-field-icon">
              <span>
                <img src="/assets/images/amazon.png" alt="Amazon Logo" />
              </span>
            </div>
            <div className="profile-field-right">
              <h6>Project Manager</h6>
              <p>Amazon</p>
              <span>Jun 2015 - Jun 2017 - 2 yrs - 1mos</span> |{" "}
              <span>
                <a href="mailto:test@example.com">Send email for Vetting</a>
              </span>
            </div>
          </div>
        </div>
        <Skill skillsList={[]} />
      </div>
    </div>
  );
};

export default AppliedOverview;
