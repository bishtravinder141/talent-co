import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RESUME_TEMPLATES } from "./Constant";
import { getSelectedResume } from "../../API/resumeTemplate";
import PageLoader from "../../components/loader/PageLoader";

const CreateResume = () => {
  const navigate = useNavigate();
  const [selectedResume, setSelectedResume] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getSelectedResume()
      .then((resume) => {
        setSelectedResume(resume?.data?.data?.resume_template);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const handlePreview = (id) => {
    navigate("/job-seeker/resume", { state: { resumeType: id } });
  };

  return (
    <section className="view-profile-sec py-60">
      <div className="container">
        <div className="">
          <div className="cv-templates py-4">
            <h6>CV Templates</h6>
            {loader && <PageLoader />}
            <div className="cv-templates-slider d-flex g-2">
              {RESUME_TEMPLATES.map((temp) => (
                <div
                  className={`${
                    selectedResume === temp.templateType ? "selected" : ""
                  } template-slide-items position-relative`}
                >
                  {selectedResume === temp.templateType && (
                    <span className="selected-ribbon">Selected</span>
                  )}
                  <img src={`/assets/images/${temp.img}`} />{" "}
                  <div className="hover-over">
                    <button
                      className="btn-design decline-btn bg-white text-black"
                      onClick={() => handlePreview(temp.templateType)}
                    >
                      Preview
                    </button>
                    {/* <span onClick={() => selectResume("cv-template1")}>
                      <img src="../assets/images/edit-icon-white.svg" />
                      <span>Edit</span>
                    </span> */}
                  </div>
                </div>
              ))}
              {/* <div className="template-slide-items">
                <img src="/assets/images/cv2.jpg" />{" "}
                <div className="hover-over">
                  <span onClick={() => selectResume("cv-template2")}>
                    <img src="/assets/images/edit-icon-white.svg" />
                    <span>Edit</span>
                  </span>
                </div>
              </div>
              <div className="template-slide-items">
                <img src="/assets/images/cv3.jpg" />{" "}
                <div className="hover-over">
                  <span onClick={() => selectResume("cv-template3")}>
                    <img src="/assets/images/edit-icon-white.svg" />
                    <span>Edit</span>
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateResume;
