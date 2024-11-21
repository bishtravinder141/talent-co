import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCandidateProfile,
  getProfileData,
} from "../../API/candidateProfile";
import { APPLICATION_BASE_URL } from "../../config/APIConfig";
import PageLoader from "../../components/loader/PageLoader";
import { getCandidatePublicProfile } from "../../API/publicApi";
import { toastMessage } from "../../utils/toastMessages";
import { INVALID_USER } from "../../utils/allToastMessage";
import { chatRoomWIthSpecificUser } from "../../API/candidateJobs";
import generatePDF from "react-to-pdf";
import ButtonLoader from "../../components/loader/ButtonLoader";

const ViewProfileDetail = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isPublicProfile = pathname.includes("/view-candidate-public-profile");
  const contentRef = useRef(null);

  useEffect(() => {
    if (isPublicProfile) {
      getCandidatePublicProfile(id)
        .then((res) => {
          const resPonseData = res?.data?.data;
          setProfileDetails({ ...profileDetails, ...resPonseData });
          setUserProfile(resPonseData?.user_details);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            toastMessage(INVALID_USER);
            navigate("/job-recruiter/application");
          }
          console.log(err.response.status === 404);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      getCandidateProfile()
        .then((res) => {
          const resPonseData = res?.data?.data;
          setProfileDetails({ ...profileDetails, ...resPonseData });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!isPublicProfile) {
      getProfileData()
        .then((res) => {
          const responseData = res?.data?.data;
          setUserProfile({
            first_name: responseData?.first_name,
            last_name: responseData?.last_name,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleMessageToCandidate = () => {
    chatRoomWIthSpecificUser(id)
      .then((res) => {
        setLoader(false);
        localStorage.setItem("roomId", res.data?.data?.results?.room_name);
        navigate("/job-recruiter/messages");
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  return (
    <>
      {loader && <PageLoader />}
      <div className="view-profile-sec py-60" ref={contentRef}>
        <div className="container">
          <div className="pb-4">
            <div className="row">
              <div className="col-12 pb-5">
                <div className="back-arrow-heading d-flex font-weight-bold align-items-center mt-4">
                  <Link
                    to={
                      isPublicProfile
                        ? "/job-recruiter/application"
                        : "/job-seeker/user-profile-page"
                    }
                  >
                    <img src="/assets/images/back-arrow.svg" alt="Back" />
                  </Link>
                  <h3>View Public Profile</h3>
                </div>
              </div>
              <div></div>
              <div className="col-md-7 col-12">
                <div className="view-profile-items">
                  <div className="profile_image">
                    <img
                      src={`${
                        profileDetails?.profile_picture
                          ? `${APPLICATION_BASE_URL}${profileDetails.profile_picture}`
                          : "/assets/images/demo-user.png"
                      }`}
                    />
                  </div>

                  <div className="profileInfo">
                    <h4>
                      {userProfile?.first_name && userProfile?.first_name}{" "}
                      {userProfile?.last_name && userProfile?.last_name}
                    </h4>
                    <div className="userDesgInfo">
                      <span className="user-desg">Accountant</span>
                      <span className="label-type">
                        {profileDetails?.status}
                      </span>
                      <span className="user-social">
                        {profileDetails?.links?.length > 0 &&
                          profileDetails.links[0].link_url && (
                            <Link to={`${profileDetails?.links[0]?.link_url}`}>
                              <img src="/assets/images/website-icon.svg" />
                            </Link>
                          )}
                        {profileDetails?.links?.length > 1 &&
                          profileDetails.links[1].link_url && (
                            <Link to={`${profileDetails?.links[1]?.link_url}`}>
                              <img src="/assets/images/linkedin-icon.svg" />
                            </Link>
                          )}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="profile_desc">
                  {profileDetails?.professional_overview}
                </p>

                <div className="user-other-info">
                  {profileDetails?.job_locations?.length > 0 && (
                    <div className="otherInfo_items">
                      <span>Location</span>
                      <h6>{profileDetails?.job_locations[0]?.location}</h6>
                    </div>
                  )}
                  {profileDetails?.job_type && (
                    <div className="otherInfo_items">
                      <span>Job Type</span>
                      <h6>
                        {profileDetails?.job_type === "Full-Time"
                          ? "Full-time"
                          : "Part-time"}
                      </h6>
                    </div>
                  )}
                  {profileDetails?.employment_options?.length > 0 && (
                    <div className="otherInfo_items">
                      <span>Employment Options</span>
                      <h6>
                        {profileDetails?.employment_options
                          .map((item) => item.title)
                          .join(" , ")}
                      </h6>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-5 col-12">
                <div className="complete-profile-right text-end">
                  {!isPublicProfile && (
                    <Link
                      to={"/job-seeker/resume"}
                      className="btn-design btn-small border-btn me-2  "
                    >
                      View CV
                    </Link>
                  )}
                  {isPublicProfile && (
                    <span
                      onClick={handleMessageToCandidate}
                      className="btn-design btn-small cursor-pointer"
                    >
                      Message
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-form">
          <div className="container">
            <div className="row">
              {/* Experience */}
              <div className="col-12 pb-5">
                <div className="profile-field shadow-box">
                  <h6>Experience</h6>
                  {/* Experience Items */}
                  {profileDetails?.experiences?.length > 0 ? (
                    profileDetails?.experiences?.map((user) => {
                      return (
                        <>
                          <div
                            key={user.id + user.company_name}
                            className="profile-field-col"
                          >
                            <div className="profile-field-icon">
                              <span>
                                <img
                                  src="/assets/images/brifcase.svg"
                                  alt="Briefcase"
                                />
                              </span>
                            </div>

                            <div className="profile-field-right">
                              <h6>{user.position}</h6>
                              <span className="text-grey">
                                {user.start_month} Dec 2022 - Present
                              </span>
                              <p className="text-grey fw-bold">
                                {user.company_name}
                              </p>
                              <p>{user.description}</p>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </div>
              </div>
              {/* Education */}
              <div className="col-12 pb-5">
                <div className="profile-field shadow-box">
                  <h6>Education</h6>
                  {/* Education Items */}
                  {profileDetails?.qualifications?.length > 0 ? (
                    profileDetails?.qualifications.map((edu, index) => {
                      return (
                        <>
                          <div key={edu.id} className="profile-field-col">
                            <div className="profile-field-icon">
                              <span>
                                <img
                                  src="/assets/images/edu-cap.svg"
                                  alt="Education Cap"
                                />
                              </span>
                            </div>
                            <div className="profile-field-right">
                              <h6>{edu.university}</h6>
                              <span className="text-grey">
                                {edu.graduation_year}
                              </span>
                              <p className="text-grey fw-bold">
                                {edu.qualification}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="col-12 pb-5">
                <div className="profile-field shadow-box">
                  <h6>Skills</h6>
                  <div className="auto-flex">
                    {/* Skill Items */}

                    {profileDetails?.skills?.length > 0 ? (
                      profileDetails.skills.map((skill) => {
                        return (
                          <div key={skill.id} className="skill-profile-col">
                            <div className="skill-profile-icon">
                              <span>
                                <img
                                  src="/assets/images/marktag-icon.svg"
                                  alt="Skill Icon"
                                />
                              </span>
                            </div>
                            <div className="skill-profile-content">
                              <h6>{skill.skill_name}</h6>
                              <p>{skill.level}</p>
                              <p>{skill.description}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div>No Data Found</div>
                    )}
                  </div>
                </div>
              </div>
              {/* Language */}
              <div className="col-12 pb-3">
                <div className="profile-field shadow-box">
                  <h6>Language</h6>
                  <div className="auto-flex">
                    {/* Language Items */}
                    {profileDetails?.languages?.length > 0 ? (
                      profileDetails?.languages.map((lang, index) => {
                        return (
                          <>
                            <div className="language-profile-col">
                              <div className="skill-profile-icon">
                                <span>EN</span>
                              </div>
                              <div className="skill-profile-content">
                                <h6>{lang.language}</h6>
                                <p>{lang.level}</p>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div>No Data Found</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Export Profile Button */}
      <div className="col-12 text-center mb-4">
        <div className="fieldset d-flex justify-content-center">
          <button
            className={`${buttonLoader ? "btn-on-loading" : "btn-design"}`}
            onClick={async () => {
              setButtonLoader((prev) => true);
              await generatePDF(contentRef, { filename: "profile.pdf" });
              setButtonLoader((prev) => false);
            }}
          >
            Export Profile to PDF
            {buttonLoader && <ButtonLoader />}
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewProfileDetail;
