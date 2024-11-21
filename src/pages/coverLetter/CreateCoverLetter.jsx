import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { COVER_LETTER_TEMPLATES } from "../resume/Constant";

const CreateCoverLetter = () => {
  const navigate = useNavigate();
  const handlePreview = (id) => {
    navigate("/job-seeker/cover-letter", { state: { coverLetterType: id, prevRoute:"/job-seeker/select-cover-letter" } });
  };
  return (
    <section className="view-profile-sec py-60">
      <div className="container">
        <div className="">
          <div className="cv-templates py-4">
            <h6>Cover Letter Templates</h6>
            <div>
              <Link>View Selected Cover Letter</Link>
            </div>
            <div className="cv-templates-slider g-2">
              {COVER_LETTER_TEMPLATES.map((coverLetter, index) => (
                <div className="template-slide-items selected position-relative" key={index}>
                  <span className="selected-ribbon">Selected</span>
                  <img src={`/assets/images/${coverLetter.img}`} />{" "}
                  <div className="hover-over">
                    <span>
                      {/* <img src="../assets/images/edit-icon-white.svg" /> */}
                      <button className="btn-design decline-btn bg-white text-black"
                        onClick={() => handlePreview(coverLetter.templateType)}
                      >
                        Preview
                      </button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCoverLetter;
