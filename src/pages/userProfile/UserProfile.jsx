import { Fragment, useEffect, useState } from "react";
import NumberField from "../../components/inputFields/NumberField";
import NameInputText from "../../components/inputFields/InputFieldText";
import userIcon from "../../assets/images/user.svg";
import emailIcon from "../../assets/images/email.svg";
import ProfilePageTopSection from "../../components/profileDetails/ProfilePageTopSection";
import ExperienceModal from "../../components/profileDetails/ExperienceModal";
import ListContainer from "../../components/profileDetails/ListContainer";
import AddSkillsModal from "../../components/profileDetails/AddSkillsModal";
import AddEditQualificationModal from "../../components/profileDetails/AddEditQualificationModal";
import DropdownField from "../../components/inputFields/DropdownField";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../../components/errorMsg/ErrorMessage";
import { EMAIL_REGEX } from "../../config/regexForValidation";
import PageLoader from "../../components/loader/PageLoader";
import { baseURL, APPLICATION_BASE_URL } from "../../config/APIConfig";
import {
  createCandidateProfile,
  getCandidateProfile,
  getCityName,
  getCountryName,
  getEmploymentOptions,
  getProfileData,
  updateCandidateProfile,
} from "../../API/candidateProfile";
import { TEXT_AREA_MAX_LENGTH, USER_ROLE } from "../../constants/Constent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import GoogleLocation from "../../components/GoogleLocation";
import { useLocation } from "react-router-dom";
import {
  industryTypePreferences,
  jobRolePreferences,
  jobType,
  languagepreferences,
  levels,
  salaryRanges,
} from "./Constant";
import { getAllSkills } from "../../API/masterApiData";
import UpdateGoogleLocation from "../../components/GoogleLocation/UpdateGoogleLocation";
import {
  MOBILE_NO_MAX_ERROR_MSG,
  MOBILE_NO_MIN_ERROR_MSG,
} from "../../utils/ErrorMessages";
import phoneIcon from "../../assets/images/phone-icon.svg";
import RemainingCount from "../../components/common/RemainingCount";

const UserProfile = ({ setProfilePercentage }) => {
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);

  const [showQualificationModal, setShowQualificationModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    experiences: [],
    skills: [],
    qualifications: [],
    job_preferences: [
      {
        industry_type: "",
        job_role: "",
        job_experience: "",
      },
    ],
    job_type: "",
    job_locations: [],
    languages: [],
    salary_range: "",
    status: "Ready for interview",
    employment_options: [],
    is_public: false,
    links: [],
  });
  const [newPreferences, setNewPreferences] = useState([
    {
      industry_type: "",
      job_role: "",
      job_experience: "",
    },
  ]);
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] = useState({ show: false, data: {} });
  const [selectedLanguage, setSelectedLanguage] = useState([
    { language: "Select Language", level: "Select Level" },
  ]);

  const [getApiHaveData, setGetDataHaveData] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileImg, setProfileImg] = useState();
  const [csvdata, setCsvdata] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedFilename, setUploadedFileName] = useState(null);
  const [employmentOptions, setEmploymentOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getEmploymentOptions().then((res) => {
      setEmploymentOption(res?.data?.data);
    });
    getCandidateProfile()
      .then((res) => {
        if (res?.data?.data?.job_preferences?.length > 0) {
          setNewPreferences(res?.data?.data?.job_preferences);
        }
        setUserId(res?.data?.data?.id);
        setValue("overview", res?.data?.data?.professional_overview);
        setValue(
          "websiteLinks",
          res?.data?.data?.links ? res?.data?.data?.links[0]?.link_url : ""
        );
        setValue(
          "linkedinLinks",
          res?.data?.data?.links?.length > 0
            ? res?.data?.data?.links[1]?.link_url
            : ""
        );
        setProfileDetails(res?.data?.data);
        setSelectedOption(() =>
          res?.data?.data.employment_options.map((curntVal) => curntVal.title)
        );
        setGetDataHaveData(true);
        getProfileDetails();
        setProfilePercentage(res?.data?.data?.profile_percentage);
      })
      .catch((err) => {
        console.log(err);
        getProfileDetails();
        setGetDataHaveData(false);
      })
      .finally(() => {
        setLoader(false);
      });

    getAllSkills()
      .then((skill) => {
        if (skill?.data?.data.length > 0) {
          const tempUniqueSkillList = [
            ...new Set(skill?.data?.data.map((item) => item.toLowerCase())),
          ];
          const tempSkill = tempUniqueSkillList.map((sk) => ({
            label: sk,
            value: sk,
          }));
          setSkillList([...tempSkill]);
        }
      })
      .catch((error) => {
        console.error("getAllSkills", error.message);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const getProfileDetails = () => {
    getProfileData()
      .then((res) => {
        const responseData = res?.data?.data;
        if (responseData.phone_number) {
          setValue("phone_no", responseData.phone_number.slice(1));
        }
        setValue("first_name", responseData.first_name);
        setValue("last_name", responseData.last_name);
        setValue("email", responseData.email);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const toggleExperienceModal = () => {
    setShowExperienceModal(!showExperienceModal);
    setEditModalData({ show: false, data: {} });
  };

  const toggleSkillModal = () => {
    setShowSkillModal(!showSkillModal);
    setEditModalData({ show: false, data: {} });
  };

  const toggleQualificationModal = () => {
    setShowQualificationModal(!showQualificationModal);
    setEditModalData({ show: false, data: {} });
  };

  const handleEmploymetType = (empOpt) => {
    const tempEmploymentType = [
      ...(profileDetails?.employment_options
        ? profileDetails?.employment_options
        : []),
    ];
    const tempSelectedOption = [...selectedOption];
    const index = tempEmploymentType.findIndex((curElem) => {
      return curElem.id === empOpt.id;
    });
    if (index === -1) {
      tempEmploymentType.push(empOpt);
      tempSelectedOption.push(empOpt.title);
    } else {
      tempEmploymentType.splice(index, 1);
      tempSelectedOption.splice(index, 1);
    }
    setProfileDetails({
      ...profileDetails,
      employment_options: [...tempEmploymentType],
    });
    setSelectedOption([...tempSelectedOption]);
  };

  const onSubmit = (data) => {
    let payload = JSON.parse(JSON.stringify(profileDetails));
    payload["links"] = [
      {
        link_name: "GitHub",
        link_url: watch("websiteLinks"),
      },
      {
        link_name: "LinkedIn",
        link_url: watch("linkedinLinks"),
      },
    ];

    if (watch("phone_no")) {
      payload["phone_no"] = watch("phone_no");
    }
    if (newPreferences.length > 0) {
      payload.job_preferences = newPreferences;
    }

    payload["professional_overview"] = watch("overview");
    if (selectedLanguage.length > 0) {
      payload.languages = selectedLanguage.filter(
        (item) =>
          item.language !== "Select Language" && item.level !== "Select Level"
      );
    }
    if (payload.employment_options.length > 0) {
      payload.employment_options = payload.employment_options.map(
        (emp) => emp.id
      );
    }
    delete payload.profile_picture;
    delete payload.uplaod_cv;
    payload = {
      ...payload,
      phone_no: `+${payload?.phone_no}`,
      user_details: {
        ...payload?.user_details,
        email: data?.email,
      },
    };
    // Need to remove once backend will fix
    // payload.cover_letter_details = "/asdf.jpg";
    // payload.cover_letter_file = "/asdf.jpg";
    // payload.cover_letter_template = "/asdf.jpg";
    // payload.resume_template = "/asdf.jpg";
    // Need to remove once backend will fix

    setLoader(true);
    if (getApiHaveData) {
      updateCandidateProfile(payload)
        .then((res) => {
          if (profileImg || csvdata) {
            uploadImageAPI(res?.data?.data?.id);
          } else {
            toast.success("Profile Updated Successfully");
            navigate("/view-user-profile");
          }
          // setTimeout(() => {
          //   toast.success("Profile Updated Successfully");
          //   navigate("/view-user-profile");
          // }, 2000);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      createCandidateProfile(payload)
        .then((res) => {
          setGetDataHaveData(true);
          if (profileImg || csvdata) {
            uploadImageAPI(res?.data?.data?.id);
          }
          toast.success("Profile Created Successfully");
          navigate("/view-user-profile");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const handleEditModal = (data, qualification, index) => {
    setEditModalData({ show: true, data, index });
    if (qualification) {
      setShowQualificationModal(true);
    } else {
      setShowExperienceModal(true);
    }
  };

  const handleEditSkillModal = (data, index) => {
    setEditModalData({ show: true, data, index });
    setShowSkillModal(true);
  };

  const addLanguageAndLabel = () => {
    const index = selectedLanguage?.findIndex(
      (curElem) =>
        curElem?.language === "Select Language" ||
        curElem?.level === "Select Level"
    );
    if (index < 0) {
      setSelectedLanguage((prevItems) => [
        ...prevItems,
        { language: "Select Language", level: "Select Level" },
      ]);
    }
  };

  const removeLanguageAndLabel = (index) => {
    const temp = [...selectedLanguage];
    temp.splice(index, 1);
    setSelectedLanguage(temp);
  };

  const handleAddRole = () => {
    const index = newPreferences?.findIndex(
      (curElem) =>
        curElem?.industry_type === "" ||
        curElem?.job_role === "" ||
        curElem?.job_experience === ""
    );
    if (index < 0) {
      setNewPreferences((prev) => [
        ...prev,
        { industry_type: "", job_role: "", job_experience: "" },
      ]);
    }
  };

  const handleRemoveRole = (index) => {
    const temp = [...newPreferences];
    temp.splice(index, 1);
    setNewPreferences(temp);
  };
  const handleRoleChange = (type, index, value) => {
    const tempArr = [...newPreferences];
    tempArr[index][type] = value;
    setNewPreferences(tempArr);
  };

  const handleLanguageChange = (index, language) => {
    const updatedItems = [...selectedLanguage];
    updatedItems[index].language = language;
    setSelectedLanguage(updatedItems);
  };

  const handleLabelChange = (index, level) => {
    const updatedItems = [...selectedLanguage];
    updatedItems[index].level = level;
    setSelectedLanguage(updatedItems);
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      toast.error("Please upload vaild format image(jpg,jpeg,png)");
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };

        reader.readAsDataURL(file);
      }
      // setProfileImg(URL.createObjectURL(e.target.files[0]));
      setProfileImg(e.target.files[0]);
    }
  };

  const handleCSVfileUpload = (e) => {
    const file = e?.target?.files[0];
    if (!file.name.match(/\.(pdf|doc|docx)$/)) {
      toast.error("Please upload vaild format image(pdf.doc,docx)");
    } else {
      setUploadedFileName(file.name);
      setCsvdata(e.target.files[0]);
    }
  };

  // useEffect(() => {
  //   if (profileImg && csvdata) {
  //     uploadImageAPI();
  //   }
  // }, [profileImg, csvdata]);

  const uploadImageAPI = (userId) => {
    const formData = new FormData();
    if (profileImg) {
      formData.append("profile_picture", profileImg);
    }
    if (csvdata) {
      formData.append("uplaod_cv", csvdata);
    }
    // formData.append("uplaod_cv", csvdata);
    let token = localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : "Token";

    if (profileImg || csvdata) {
      fetch(`${baseURL}/candidate/candidate-profile-update/${userId}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Profile Updated Successfully");
          navigate("/view-user-profile");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleAddLocation = (location) => {
    if (location) {
      setProfileDetails({
        ...profileDetails,
        job_locations: [
          ...profileDetails.job_locations,
          {
            location: location.location,
            longitude: location.long,
            latitude: location.lat,
          },
        ],
      });
    }
  };

  const handleRemoveLocation = (name) => {
    setProfileDetails({
      ...profileDetails,
      job_locations: profileDetails.job_locations.filter(
        (loc) => loc.location !== name.location
      ),
    });
  };

  const beforeSubmitForm = async () => {
    await trigger();
    handleSubmit(onSubmit)();
  };

  const preventSubmitFunction = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {loader && <PageLoader />}
      <section
        className={`${
          pathname === "/job-seeker/user-profile-page"
            ? "reduce-navbar"
            : "complete-profile-sec py-60"
        }`}
      >
        {pathname !== "/job-seeker/user-profile-page" && (
          <ProfilePageTopSection
            profileDetails={profileDetails}
            role={USER_ROLE.seeker}
            subTitle={"Fill in your details to speed up your job search"}
          />
        )}
        <div className="profile-form">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <form onSubmit={preventSubmitFunction}>
                  <div className="fieldset-heading">
                    <h6>Personal Details</h6>
                    <p>Provide your details to get contacted</p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12 pb-3">
                        <div className="fieldset">
                          <div className="expert_profile_image">
                            <div className="profile_avtar">
                              <div className="upload_file_btn">
                                <input
                                  type="file"
                                  onChange={(event) =>
                                    handleProfileImage(event)
                                  }
                                />
                              </div>
                              <img
                                id="companyLogo"
                                src={`${
                                  imagePreview
                                    ? imagePreview
                                    : profileDetails?.profile_picture
                                    ? `${APPLICATION_BASE_URL}${profileDetails?.profile_picture}`
                                    : "/assets/images/img-placeholder.png"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-12">
                        <NameInputText
                          error={errors?.first_name?.message}
                          placeholder={"First Name"}
                          icon={userIcon}
                          validation={register("first_name", {
                            // required: "First Name is required.",
                          })}
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <NameInputText
                          error={errors?.last_name?.message}
                          placeholder={"Last Name"}
                          icon={userIcon}
                          validation={register("last_name", {
                            // required: "Last Name is required.",
                          })}
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <NameInputText
                          error={errors?.email?.message}
                          placeholder={"Your Email"}
                          icon={emailIcon}
                          validation={register("email", {
                            // required: "Email is required.",
                            pattern: {
                              value: EMAIL_REGEX,
                              message: "Please enter a valid email",
                            },
                          })}
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        {/* <NumberField
                          error={errors?.phone_no?.message}
                          validation={register("phone_no", {
                            // required: "Phone Number is required.",
                            // pattern: {
                            //   value: /^\d{10}$/,
                            //   message: "Please enter a valid phone number",
                            // },
                          })}
                        /> */}
                        <div className="fieldset">
                          <Controller
                            name="phone_no"
                            control={control}
                            defaultValue=""
                            rules={{
                              // required: "Phone Number is required.",
                              minLength: {
                                value: 12,
                                message: MOBILE_NO_MIN_ERROR_MSG,
                              },
                              maxLength: {
                                value: 15,
                                message: MOBILE_NO_MAX_ERROR_MSG,
                              },
                              // pattern: {
                              //   value: /^\d{10}$/,
                              //   message: "Please enter a valid phone number",
                              // },
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  field.onChange(numericValue);
                                }}
                                className="form-control input-icon phone-number"
                                placeholder="Phone number eg: 919898989898"
                                aria-invalid="true"
                                aria-errormessage="error-message-phone"
                              />
                            )}
                          />
                          <span className="input-field-icon">
                            <img src={phoneIcon} />
                          </span>
                        </div>
                        {errors?.phone_no && (
                          <ErrorMessage msg={errors.phone_no.message} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Professional Overview</h6>
                    <p>Add your own professional overview</p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <textarea
                            placeholder="Highlight your top skills experience, and interests. This is one of the first things recruiters will see in you profile"
                            className="form-control input-icon message-field"
                            maxLength={TEXT_AREA_MAX_LENGTH}
                            {...register("overview", {
                              // required: "Professional Overview is required",
                            })}
                          ></textarea>
                          <span className="characters-sets">
                            <RemainingCount
                              typedCharacters={watch("overview")?.length}
                            />
                            {/* 5000 characters */}
                          </span>
                          <span className="input-field-icon">
                            <img src="/assets/images/message-icon.svg" />
                          </span>
                          {errors.overview && (
                            <ErrorMessage msg={errors.overview.message} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Work Experience</h6>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <div className="border-popup-btn">
                            <p>
                              <img src="/assets/images/plus-icon.svg" /> Add
                              Your Work Experience
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              onClick={toggleExperienceModal}
                            >
                              Add Your Work Experience
                            </button>
                          </div>

                          <div className="experience-list">
                            <p>Experience</p>
                            <ListContainer
                              listData={profileDetails.experiences}
                              handleEditModal={handleEditModal}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Skills</h6>
                    <p>
                      Add specific skills to your profile to increase your
                      opportunities
                    </p>
                  </div>

                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <div className="border-popup-btn">
                            <p>
                              <img src="/assets/images/plus-icon.svg" /> Add
                              Your Skills
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={toggleSkillModal}
                            >
                              Add Your Skills
                            </button>
                          </div>

                          {profileDetails?.skills?.length > 0 && (
                            <div className="global-table table-responsive mt-4">
                              <table className="table align-middle">
                                <thead>
                                  <tr>
                                    <th>Skill Name</th>
                                    <th
                                      style={{
                                        width: "35%",
                                        minWidth: "200px",
                                      }}
                                    >
                                      Description
                                    </th>
                                    <th>Level</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {profileDetails?.skills.map(
                                    (skill, index) => (
                                      <tr key={index}>
                                        <td className="strong">
                                          {skill.skill_name}
                                        </td>
                                        <td>{skill.description}</td>
                                        <td className="skill-label">
                                          <span>{skill.level}</span>
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleEditSkillModal(skill, index)
                                            }
                                          >
                                            <img src="/assets/images/edit-icon.svg" />{" "}
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Qualification</h6>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <div className="border-popup-btn">
                            <p>
                              <img src="/assets/images/plus-icon.svg" /> Add
                              Your Qualification
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#qualificationPopup"
                              onClick={toggleQualificationModal}
                            >
                              Add Your Qualification
                            </button>
                          </div>

                          <div className="experience-list">
                            <p>Education</p>
                            <ListContainer
                              listData={profileDetails.qualifications}
                              qualification={true}
                              handleEditModal={handleEditModal}
                              icon={"/assets/images/edu-cap.svg"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Upload CV</h6>
                    <p>
                      You can autocomplete your profile in just a few seconds by
                      uploading a CV or just attach like a file
                    </p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <div className="company-profile-banner">
                            <input
                              type="file"
                              id="file-input"
                              onChange={(event) => handleCSVfileUpload(event)}
                            />

                            <div className="profile_banner">
                              <div className="upload_banner"></div>
                            </div>
                            <p>
                              We accept .doc, .docx, .rtf, .pdf, .odt file types{" "}
                            </p>
                            {/* <label htmlFor="file-input"> */}
                            {(uploadedFilename ||
                              profileDetails?.uplaod_cv) && (
                              <div className="d-flex justify-content-center">
                                <span className="d-flex">
                                  <img
                                    src="./assets/images/doc-icon.png"
                                    alt=""
                                  />
                                  {uploadedFilename
                                    ? uploadedFilename
                                    : profileDetails?.uplaod_cv
                                        ?.split("/")
                                        ?.slice(-1)[0]}
                                  {/* {uploadedFilename} */}
                                </span>
                              </div>
                            )}
                            {/* </label> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Links</h6>
                    <p>Add links to your website</p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <NameInputText
                          validation={register("websiteLinks", {
                            // required: "First Name is required.",
                          })}
                          placeholder={"Add Website Link"}
                          icon={"/assets/images/website-icon.svg"}
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <NameInputText
                          validation={register("linkedinLinks", {
                            // required: "First Name is required.",
                          })}
                          placeholder={"Add LinkedIn Link"}
                          icon={"/assets/images/linkedin-icon.svg"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Language</h6>
                    <p>Add Language</p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      {selectedLanguage.map((item, index, arr) => (
                        <Fragment key={index}>
                          <div className="col-md-4 col-12">
                            <DropdownField
                              // option={["English", "French", "Hindi"]}
                              option={
                                item.language !== ""
                                  ? languagepreferences.filter(
                                      (el) => el !== item.language
                                    )
                                  : languagepreferences
                              }
                              icon={"/assets/images/language-icon.svg"}
                              selected={
                                item.language
                                  ? item.language
                                  : "Select Language"
                              }
                              handleOnChange={(value) =>
                                handleLanguageChange(index, value)
                              }
                            />
                          </div>
                          <div className="col-md-4 col-12">
                            <DropdownField
                              // option={["Level 1", "Level 2", "Level 3"]}
                              option={
                                item.level !== ""
                                  ? levels.filter((el) => el !== item.level)
                                  : levels
                              }
                              icon={"/assets/images/level-icon.svg"}
                              selected={
                                item.level ? item.level : "Select Level"
                              }
                              handleOnChange={(value) =>
                                handleLabelChange(index, value)
                              }
                            />
                          </div>
                          {/* {arr.length - 1 !== 0 && (
                            <div className="col-md-4 col-6">
                              <button type="button" className="btn-design">
                                Remove
                              </button>
                            </div>
                          )} */}
                          <div className="col-md-4 col-6">
                            <button
                              onClick={() => {
                                removeLanguageAndLabel(index);
                              }}
                              type="button"
                              className={`btn-design ${
                                arr.length === 1 && "notAllowed"
                              }`}
                              disabled={arr.length === 1}
                            >
                              Remove
                            </button>
                          </div>
                        </Fragment>
                      ))}

                      <div className="col-12">
                        <button
                          type="button"
                          className="btn-design"
                          onClick={addLanguageAndLabel}
                        >
                          <img src="/assets/images/plus-icon.svg" /> Add another
                          Language
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Job Preferences</h6>
                    <p>Add more details to find job you are interested in</p>
                  </div>
                  <div className="form-field shadow-box ">
                    <div className="row">
                      {newPreferences?.map((curElem, index, arr) => {
                        return (
                          <>
                            <div className="col-12">
                              <DropdownField
                                option={[
                                  "Select Type 1",
                                  "Select Type 2",
                                  "Select Type 3",
                                  "Select Type 4",
                                ]}
                                icon={"/assets/images/industry-icon.svg"}
                                selected={
                                  curElem.industry_type
                                    ? curElem.industry_type
                                    : "What industry are you interested in?"
                                }
                                // handleOnChange={(value) =>
                                //   setNewPreferences([
                                //     {
                                //       ...curElem,
                                //       industry_type: value,
                                //     },
                                //   ])
                                // }
                                handleOnChange={(value) => {
                                  handleRoleChange(
                                    "industry_type",
                                    index,
                                    value
                                  );
                                }}
                              />
                            </div>

                            <div className="col-12">
                              <DropdownField
                                option={
                                  curElem.job_role !== ""
                                    ? jobRolePreferences.filter(
                                        (el) => el !== curElem.job_role
                                      )
                                    : jobRolePreferences
                                }
                                icon={"/assets/images/role-icon.svg"}
                                selected={
                                  curElem.job_role
                                    ? curElem.job_role
                                    : "What kind of role are you looking for?"
                                }
                                // handleOnChange={(value) =>
                                //   setNewPreferences([
                                //     {
                                //       ...curElem,
                                //       job_role: value,
                                //     },
                                //   ])
                                // }
                                handleOnChange={(value) => {
                                  handleRoleChange("job_role", index, value);
                                }}
                              />
                            </div>

                            <div className="col-12">
                              <DropdownField
                                option={[
                                  "Select Type 1",
                                  "Select Type 2",
                                  "Select Type 3",
                                  "Select Type 4",
                                ]}
                                icon={"/assets/images/yearExp-icon.svg"}
                                selected={
                                  curElem.job_experience
                                    ? curElem.job_experience
                                    : "How many years of experience do you have in this role?"
                                }
                                // handleOnChange={(value) =>
                                //   setNewPreferences([
                                //     {
                                //       ...curElem,
                                //       job_experience: value,
                                //     },
                                //   ])
                                // }
                                handleOnChange={(value) => {
                                  handleRoleChange(
                                    "job_experience",
                                    index,
                                    value
                                  );
                                }}
                              />
                            </div>
                            <div>
                              <button
                                onClick={() => {
                                  handleRemoveRole(index);
                                }}
                                type="button"
                                className={`btn-design mt-2 mb-2 ${
                                  arr.length === 1 && "notAllowed"
                                }`}
                                disabled={arr.length === 1}
                              >
                                Remove
                              </button>
                            </div>
                          </>
                        );
                      })}

                      <div className="col-12">
                        <button className="btn-design" onClick={handleAddRole}>
                          <img src="/assets/images/plus-icon.svg" /> Add Role
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Job Type</h6>
                    <p>Add information about your preferred type of job</p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          {/* <select
                            className="form-control input-icon language-field"
                            onChange={(value) =>
                              setProfileDetails({
                                ...profileDetails,
                                job_type: value.target.value,
                              })
                            }
                          >
                            <option disabled value="">
                              What type of job you are interested in?
                            </option>
                            <option value="Part Time">Part Time</option>
                            <option value="Full Time">Full Time</option>
                          </select> */}
                          <DropdownField
                            option={
                              profileDetails.job_type !== ""
                                ? jobType.filter(
                                    (el) => el !== profileDetails.job_type
                                  )
                                : jobType
                            }
                            icon={"assets/images/yearExp-icon.svg"}
                            selected={
                              profileDetails.job_type
                                ? profileDetails.job_type
                                : "What kind of role are you looking for?"
                            }
                            handleOnChange={(value) =>
                              setProfileDetails({
                                ...profileDetails,
                                job_type: value,
                              })
                            }
                          />
                          <span className="input-field-icon">
                            <img src="/assets/images/yearExp-icon.svg" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Employment options</h6>
                    <p>
                      Add information about your preferred employment options
                    </p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <label>
                          What employment options are you interested in?
                        </label>
                        <div className="fieldset">
                          <div className="checkbox-btns">
                            {employmentOptions.map((curOption, idx) => {
                              return (
                                <div
                                  className="checkbox-btn-items"
                                  key={curOption.id}
                                >
                                  <input
                                    type="checkbox"
                                    name="employment"
                                    checked={selectedOption.includes(
                                      curOption.title
                                    )}
                                    onChange={() =>
                                      handleEmploymetType(curOption)
                                    }
                                  />
                                  <span>{curOption.title}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Job Location</h6>
                    <p>Add information about your preferred job location</p>
                  </div>

                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <UpdateGoogleLocation
                            afterSelectLocation={handleAddLocation}
                          />
                          {/* <GoogleLocation
                            handleAddLocation={handleAddLocation}
                          /> */}
                          <ul
                            className="multi-select-list"
                            style={{ marginTop: "10px" }}
                          >
                            {profileDetails?.job_locations?.length > 0 &&
                              profileDetails.job_locations.map(
                                (loct, index) => (
                                  <li key={index}>
                                    {loct.location}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveLocation(loct)}
                                    >
                                      <img src="/assets/images/close-icon.svg" />
                                    </button>
                                  </li>
                                )
                              )}
                          </ul>

                          {/* <SelectWithSearch
                            searchBy={getCountryName}
                            profileDetails={profileDetails}
                            setProfileDetails={setProfileDetails}
                          /> */}

                          {/* <input
                            type="text"
                            placeholder="Enter multiple preferred job location"
                            className="form-control input-icon pin-field"
                            onKeyDown={handleAddLocation}
                          />
                          <ul className="multi-select-list">
                            {profileDetails?.locations?.length > 0 &&
                              profileDetails.locations.map((loct, index) => (
                                <li key={index}>
                                  {loct}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveLocation(loct)}
                                  >
                                    <img src="assets/images/close-icon.svg" />
                                  </button>
                                </li>
                              ))}
                          </ul>
                          <span className="input-field-icon">
                            <img src="assets/images/pin.svg" />
                          </span> */}
                        </div>
                      </div>
                      {/* <div className="col-12">
                        <div className="fieldset">
                          <SelectWithSearch
                            searchBy={getCityName}
                            placeholder={
                              "Enter multiple preferred job location"
                            }
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Salary Range</h6>
                    <p>Add information about your preferred salary</p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <label>What is your desired salary?</label>
                        <DropdownField
                          option={
                            profileDetails.salary_range !== ""
                              ? salaryRanges.filter(
                                  (el) => el !== profileDetails.salary_range
                                )
                              : salaryRanges
                          }
                          icon={"/assets/images/tag-icon.svg"}
                          selected={
                            profileDetails.salary_range
                              ? profileDetails.salary_range
                              : "United States Dollars ($)"
                          }
                          handleOnChange={(value) =>
                            setProfileDetails({
                              ...profileDetails,
                              salary_range: value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="fieldset-heading">
                    <h6>Status</h6>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <label>What are you in your job search?</label>
                        <div className="fieldset">
                          <div className="radio-btns">
                            <div className="radio-btn-items">
                              <input
                                type="radio"
                                name="employment"
                                checked={
                                  profileDetails.status ===
                                  "Ready for interview"
                                }
                                onChange={() =>
                                  setProfileDetails({
                                    ...profileDetails,
                                    status: "Ready for interview",
                                  })
                                }
                              />
                              <span>Ready for interview</span>
                            </div>
                            <div className="radio-btn-items">
                              <input
                                type="radio"
                                name="employment"
                                checked={
                                  profileDetails.status === "Open for offers"
                                }
                                onChange={() =>
                                  setProfileDetails({
                                    ...profileDetails,
                                    status: "Open for offers",
                                  })
                                }
                              />
                              <span>Open for offers</span>
                            </div>
                            <div className="radio-btn-items">
                              <input
                                type="radio"
                                name="employment"
                                checked={
                                  profileDetails.status === "Close for offers"
                                }
                                onChange={() =>
                                  setProfileDetails({
                                    ...profileDetails,
                                    status: "Close for offers",
                                  })
                                }
                              />
                              <span>Close for offers</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-field text-center pt-5">
                    <div className="profile-to-public">
                      <span>
                        Public Profile{" "}
                        <input
                          name="push_notification_status"
                          value="true"
                          id="push_notification_status"
                          type="checkbox"
                          className="switch_1 toggle-label"
                          checked={profileDetails.is_public}
                          onChange={() =>
                            setProfileDetails({
                              ...profileDetails,
                              is_public: !profileDetails.is_public,
                            })
                          }
                        />
                      </span>
                      <p>Your profile will be visible to companies</p>
                    </div>
                  </div>

                  <div className="form-field pt-5">
                    <div className="row">
                      <div className="col-12 text-center">
                        <div className="fieldset d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn-design border-btn"
                            onClick={() => navigate("/job-seeker/dashboard")}
                          >
                            Do Later
                          </button>
                          <button
                            type="button"
                            className="btn-design"
                            onClick={beforeSubmitForm}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Experience Modal */}
      {showExperienceModal && (
        <ExperienceModal
          toggleModal={toggleExperienceModal}
          showModal={showExperienceModal}
          setProfileDetails={setProfileDetails}
          profileDetails={profileDetails}
          edit={editModalData.show}
          editModalData={editModalData.data}
          index={editModalData.index}
        />
      )}

      {/* Skills Modal */}
      {showSkillModal && (
        <AddSkillsModal
          toggleModal={toggleSkillModal}
          showModal={showSkillModal}
          setProfileDetails={setProfileDetails}
          profileDetails={profileDetails}
          edit={editModalData.show}
          editModalData={editModalData.data}
          index={editModalData.index}
          skillList={skillList}
          profilePage={true}
        />
      )}

      {/* Qualification Modal */}
      {showQualificationModal && (
        <AddEditQualificationModal
          toggleModal={toggleQualificationModal}
          showModal={showQualificationModal}
          setProfileDetails={setProfileDetails}
          profileDetails={profileDetails}
          edit={editModalData.show}
          editModalData={editModalData.data}
          index={editModalData.index}
        />
      )}
    </>
  );
};

export default UserProfile;
