import React from "react";
import Skill from "./Skill";

function AppliedSkillMatch({candidataData}) {
  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <Skill skillsList={candidataData?.map(skill => skill)} />
    </div>
  );
}

export default AppliedSkillMatch;
