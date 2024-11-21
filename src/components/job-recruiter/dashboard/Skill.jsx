import React from "react";
import NoDataFound from "../../noDataFound/NoDataFound";

const Skill = ({ skillsList }) => {
  return (
    <div className="applicant-skills pb-4">
      <h6>Skills</h6>
      <ul>
        {skillsList?.length > 0 ? (
          skillsList?.map((data, index) => {
            return <li className="btn-design border-btn btn-small" key={index}>{data}</li>;
          })
        ) : (
          <NoDataFound />
        )}
      </ul>
    </div>
  );
};

export default Skill;
