import React from "react";
import ErrorMessage from "../errorMsg/ErrorMessage";

const TextArea = ({
  error,
  placeholder = "Enter your comment here",
  validation,
}) => {
  return (
    <>
      <textarea
        placeholder={placeholder}
        className="form-control message-field"
        {...validation}
      ></textarea>
      {error && <ErrorMessage msg={error} />}
    </>
  );
};

export default TextArea;
