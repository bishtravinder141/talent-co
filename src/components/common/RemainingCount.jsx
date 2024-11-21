import React from "react";

const RemainingCount = ({ typedCharacters, maxLimit = 5000 }) => {

  return (
    <div>
      {typedCharacters ? maxLimit - typedCharacters : maxLimit} characters
    </div>
  );
};

export default RemainingCount;
