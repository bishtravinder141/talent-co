import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  changeResumeTemplate,
  getSelectedResume,
} from "../../API/resumeTemplate";
import { useDispatch, useSelector } from "react-redux";
import { setCoverLetterDetails } from "../../redux/coverLetterAndResumeSlice";
import { isEmpty } from "../../utils/utils";
import ErrorMessage from "../errorMsg/ErrorMessage";

const CoverLetterTemplateOne = ({
  coverLetterDetails,
  setLoader,
  isApplyModal = false,
  getEditCoverletterValue,
}) => {
  const [editCoverLetter, setEditCoverLetter] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const coverLetterAndResume = useSelector(
    (state) => state.coverLetterAndResume
  );

  const [coverLetterText, setCoverLetterText] = useState({
    educationDetails: "XYZ University",
    extracurricularActivities:
      "I was also a Captain of the Hockey team that won more games than any team in the past twelve years.",
  });

  useState(() => {
    if (isEmpty(coverLetterAndResume.coverLetterDetails)) {
      getSelectedResume()
        .then((cover) => {
          if (cover?.data?.data?.cover_letter_details) {
            setCoverLetterText(cover.data.data.cover_letter_details);
            dispatch(
              setCoverLetterDetails(cover.data.data.cover_letter_details)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      setCoverLetterText(coverLetterAndResume.coverLetterDetails);
    }
  }, []);
  const handleSaveCoverLetter = () => {
    if (editCoverLetter) {
      if (coverLetterText.educationDetails.length === 0) {
        setShowError(true);
      } else {
        setEditCoverLetter(!editCoverLetter);
        //this is for getting edit cover letter state in apply modal
        if (isApplyModal) {
          getEditCoverletterValue(editCoverLetter);
        }
        setLoader(true);
        const payload = {
          cover_letter_details: {
            ...coverLetterText,
          },
        };
        changeResumeTemplate(payload)
          .then((res) => {
            dispatch(
              setCoverLetterDetails(res?.data?.data?.cover_letter_details)
            );
            setLoader(false);
          })
          .catch((err) => {
            console.log(err);
            setLoader(false);
          });
      }
    } else {
      setEditCoverLetter(!editCoverLetter);
      //this is for getting edit cover letter state in apply modal
      if (isApplyModal) {
        getEditCoverletterValue(editCoverLetter);
      }
      // setCoverLetterText({
      //   educationDetails: "",
      //   extracurricularActivities: "",
      // });
    }
  };

  return (
    <div>
      {!isApplyModal && (
        <div className="cover-letter-details">
          <div>
            <h3 className="resume-name">
              {coverLetterDetails?.user_details?.first_name}{" "}
              {coverLetterDetails?.user_details?.last_name}
            </h3>
          </div>
          <div>
            <ul className="personal-details">
              <li>{coverLetterDetails?.user_details?.email}</li>
              <li>
                <span>
                  Number-{coverLetterDetails?.user_details?.phone_number}
                </span>
              </li>
              <li>
                {coverLetterDetails?.links?.length > 0 &&
                  coverLetterDetails.links[0].link_url &&
                  coverLetterDetails.links[0].link_url}
              </li>
              <li>
                {coverLetterDetails?.links?.length > 1 &&
                  coverLetterDetails.links[1].link_url &&
                  coverLetterDetails.links[1].link_url}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="text-end mb-5">
        <span
          onClick={() => handleSaveCoverLetter()}
          className="d-inline-block edit-link cursor-pointer"
        >
          <img
            src={`/assets/images/${
              editCoverLetter ? "checked" : "edit-icon"
            }.svg`}
          />
        </span>
      </div>
      {showError && (
        <div>
          <ErrorMessage msg={"College name is required"} />
        </div>
      )}
      <div className="cover-letter-wrapper">
        <p>
          Dear [Hiring Manager or Company], <br />
          It is with great pleasure that I am applying for the [Professional
          Sales] position at [Company].
          <br />
          <br /> As a recent graduate of [{" "}
          <input
            className={`${
              editCoverLetter ? "cover-field active-field" : "cover-field"
            }`}
            value={coverLetterText.educationDetails}
            onChange={(e) => {
              setCoverLetterText({
                ...coverLetterText,
                educationDetails: e.target.value,
              });
              setShowError(false);
            }}
            readOnly={!editCoverLetter}
          />{" "}
          ], not only did I maintain excellent grades, but [
          <input
            className={`${
              editCoverLetter ? "cover-field active-field" : "cover-field"
            }`}
            value={coverLetterText.extracurricularActivities}
            onChange={(e) =>
              setCoverLetterText({
                ...coverLetterText,
                extracurricularActivities: e.target.value,
              })
            }
            readOnly={!editCoverLetter}
          />
          ] <br />
          <br /> My background has required me to be a strong manager of my time
          to balance school and athletics, which I am confident, will be a
          quality that will be important in this position. My years of working
          in a team environment, my strong competitive nature, as well as my
          success in leadership, are also qualities that I bring to my career.{" "}
          <br />
          <br />
          My goal is to join a company where there is growth potential, so I am
          sure I can fulfill that need of yours. My personality and competitive
          nature have made me realize that my skills will be beneficial in
          dealing with clients in [sales]. <br />
          <br /> I am extremely passionate about the work in this profession and
          would be ecstatic to share my skills and experiences with your
          exceptional team. I appreciate your time and consideration and look
          forward to speaking with you soon. <br />
          <br />
          Sincerely, <br /> {coverLetterDetails?.user_details?.first_name}{" "}
          {coverLetterDetails?.user_details?.last_name}
        </p>
      </div>
    </div>
  );
};

export default CoverLetterTemplateOne;
