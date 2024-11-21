import React, { useState, Fragment, useRef, useCallback } from "react";
import DropdownField from "../../../components/inputFields/DropdownField";
import DropdownFieldCommon from "../../../components/inputFields/DropdownFieldCommon";
import ModalWrapper from "../../../components/common/model/ModalWrapper";
import JobSkillComponent from "../../../components/job/DashboardCreateJob/SkillComponent";
import { useEffect } from "react";
import {
  createSingleJob,
  getMasterJobData,
  getSingleJobPostData,
  updateJobById,
} from "../../../API/recruitersApi";
import AddSkillsModalNew from "../../../components/profileDetails/AddNewSkillsModal";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../style.css";
import Header from "../../../components/job-recruiter/dashboard/Header";
import SimpleReactValidator from "simple-react-validator";
import PageLoader from "../../../components/loader/PageLoader";
import BasicInformation from "../../../components/job/DashboardCreateJob/BasicInformation";
import { useLocation } from "react-router-dom";
import { levels } from "../../../components/job/constant";
import UpdatedDropDown from "../../../components/inputFields/UpdatedDropDown";
import {
  getAllSkills,
  getMasterLanguages,
  getSalaryCurrency,
} from "../../../API/masterApiData";
import UpdateGoogleLocation from "../../../components/GoogleLocation/UpdateGoogleLocation";
import { CURRENCY_LIST } from "../constant";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";
import { toastMessage } from "../../../utils/toastMessages";
import {
  CREATE_JOB_ERROR_MESSAGE,
  DELETE_JOB_ERROR_MESSAGE,
  EDIT_JOB_ERROR_MESSAGE,
  SAVE_DRAFT_JOB_ERROR,
  isAllowedToAddJob,
  isAllowedToDeleteJob,
  isAllowedToEditJob,
} from "../staffManagement";
import PermissionModal from "../../../components/common/model/PermissionModal";

function DashboardCreateJob() {
  const [loader, setLoader] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [ifWeHaveEditPage, setIfWeHaveEditPage] = useState(false);
  const [optionField, setOptionField] = useState({});
  const location = useLocation();
  const duplicateData = location.state;
  const [newJobPost, setNewJobPost] = useState({
    title: "",
    job_role: "",
    job_type: "",
    experience: "",
    about_company: "",
    role_details: "",
    culture: "",
    skills: [],
    languages: [],
    employment_options: [],
    salary_currency: "",
    salary_range_min: 100,
    salary_range_max: 1000,
    location: "",
    status: "active",
    latitude: "",
    longitude: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState([
    { title: "Select Language", level: "Select Label" },
  ]);
  const [editModalData, setEditModalData] = useState({
    show: false,
    data: {},
    index: null,
  });
  const [showPermissionAccessModal, setShowPermissionAccessModal] =
    useState(false);
  const togglePermissionModal = () => {
    setShowPermissionAccessModal(!showPermissionAccessModal);
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [validator] = useState(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const [salaryRange, setSalaryRange] = useState({
    minSalary: 100,
    maxSalary: 1000,
  });
  const [skillList, setSkillList] = useState([]);
  // multi range slider
  const min = 100;
  const max = 1000;
  const [minVal, setMinVal] = useState(salaryRange.minSalary);
  const [maxVal, setMaxVal] = useState(salaryRange.maxSalary);
  const [languageList, setLanguageList] = useState([]);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const [permissionErrorMessage, setPermissionErrorMessage] = useState(null);
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    setLoader(true);
    let salary_currency = [];

    if (id) {
      setIfWeHaveEditPage(true);
      getSingleJobPostData(id)
        .then((res) => {
          if (res?.data?.data !== undefined) {
            const data = JSON.parse(JSON.stringify(res.data.data.results[0]));
            data.employment_options = data.employment_options.map(
              (el) => el.id
            );
            data.job_role = { label: data.job_role, value: data.job_role };
            data.job_type = { label: data.job_type, value: data.job_type };
            data.experience = {
              label: data.experience,
              value: data.experience,
            };
            data.salary_currency = data.salary_currency ? CURRENCY_LIST[0] : "";
            // let selectedCurrency_type = data.salary_currency;
            // if (salary_currency.length > 0) {
            //   selectedCurrency_type = salary_currency.find(
            //     (cur) => cur.value === data.salary_currency
            //   );
            //   data.salary_currency = {
            //     label: selectedCurrency_type?.label,
            //     value: selectedCurrency_type?.value,
            //   };
            // } else {
            //   data.salary_currency = {
            //     label: selectedCurrency_type,
            //     value: selectedCurrency_type,
            //   };
            // }
            setNewJobPost(data);
            if (data.languages.length > 0) {
              setSelectedLanguage(
                data.languages.map((lang) => {
                  return {
                    title: { label: lang.title, value: lang.title },
                    level: { label: lang.level, value: lang.level },
                  };
                })
              );
            }
            if (data?.salary_range_max && data?.salary_range_min) {
              setSalaryRange({
                ...salaryRange,
                minSalary: data?.salary_range_min,
                maxSalary: data?.salary_range_max,
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      if (!isAllowedToAddJob()) {
        toastMessage(CREATE_JOB_ERROR_MESSAGE);
        // setPermissionErrorMessage(CREATE_JOB_ERROR_MESSAGE);
        // togglePermissionModal();
        navigate("/job-recruiter/job-dashboard");

        // getSalaryCurrency()
        //   .then((currencyData) => {
        //     const tempCurrentCureny = currencyData.data.data.map((curr) => ({
        //       label: curr.display_name,
        //       value: curr.currency_symbol,
        //     }));
        //     setCurrencyList([...tempCurrentCureny]);
        //     salary_currency = [...tempCurrentCureny];
        //     setOriginalCurrencyList([...currencyData.data.data]);
        //   })
        //   .catch((error) => {
        //     console.error("getSalaryCurrency", error.message);
        //   })
        //   .finally(() => {
        //     setLoader(false);
        //   });
      }
    }
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
    getMasterLanguages()
      .then((data) => {
        if (data?.data?.data?.length > 0) {
          const tempLang = data.data.data.map((lan) => ({
            value: lan,
            label: lan,
          }));
          setLanguageList(tempLang);
        }
      })
      .catch((error) => {
        console.log(error, "///");
      })
      .finally(() => {
        setLoader(false);
      });
    getMasterJobData()
      .then((data) => {
        let tempApiData = data?.data?.data;
        tempApiData.job_type =
          data?.data?.data.job_type.length > 0
            ? data?.data?.data.job_type.map((job) => ({
                value: job.id,
                label: job.title,
              }))
            : data?.data?.data.job_type;

        tempApiData.job_role =
          data?.data?.data.job_role.length > 0
            ? data?.data?.data.job_role.map((job) => ({
                value: job.id,
                label: job.title,
              }))
            : data?.data?.data.job_role;
        tempApiData.work_experience =
          data?.data?.data.work_experience.length > 0
            ? data?.data?.data.work_experience.map((job) => ({
                value: job.id,
                label: job.title,
              }))
            : data?.data?.data.work_experience;
        setOptionField(tempApiData);
      })
      .catch((error) => {
        console.log("getMasterJobData", error.message);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  // useEffect(() => {
  //   if (originalCurrencyList.length > 0) {
  //     const tmpJobPost = { ...newJobPost };
  //     tmpJobPost.salary_currency = originalCurrencyList.find(
  //       (cur) => cur.currency_symbol === tmpJobPost.salary_currency
  //     )?.display_name;
  //     setNewJobPost(tmpJobPost);
  //   }
  // }, [originalCurrencyList]);
  //commented for future use
  // multi range slide useeffect
  // useEffect(() => {
  //   const minPercent = getPercent(minVal);
  //   const maxPercent = getPercent(maxValRef.current);

  //   if (range.current) {
  //     range.current.style.left = `${minPercent}%`;
  //     range.current.style.width = `${maxPercent - minPercent}%`;
  //   }
  // }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  // useEffect(() => {
  //   const minPercent = getPercent(minValRef.current);
  //   const maxPercent = getPercent(maxVal);

  //   if (range.current) {
  //     range.current.style.width = `${maxPercent - minPercent}%`;
  //   }
  // }, [maxVal, getPercent]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validator.allValid()) {
      onSubmit(event);
    } else {
      validator.showMessages();
      forceUpdate(1);
    }
  };

  const toggleSkillModal = () => {
    setShowSkillModal(!showSkillModal);
    setEditModalData({ show: false, data: {} });
  };

  const handleLanguageChange = (language, index) => {
    const updatedItems = [...selectedLanguage];
    updatedItems[index].title = language;
    setSelectedLanguage(updatedItems);
  };

  const handleLabelChange = (label, index) => {
    const updatedItems = [...selectedLanguage];
    updatedItems[index].level = label;
    setSelectedLanguage(updatedItems);
  };

  const handleChangeByName = (event, type) => {
    if (type) {
      setNewJobPost((prev) => ({ ...prev, [type]: event }));
    } else {
      const { name, value } = event.target;
      if (name === "employment_options_all") {
        const arrary = [...newJobPost?.employment_options];
        if (arrary !== undefined) {
          const data = arrary;
          let optionWeHave = [];
          optionField.employment_options;

          if (optionField.employment_options.length > 0) {
            optionWeHave = optionField.employment_options.map((el) => el.id);
          }

          const allThreeOption = data.length === 3 ? [] : optionWeHave;
          setNewJobPost({
            ...newJobPost,
            employment_options: [...allThreeOption],
          });
        }
        return false;
      }
      setNewJobPost((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEmploymetType = (type) => {
    const tempEmploymentType = [
      ...(newJobPost?.employment_options ? newJobPost?.employment_options : []),
    ];
    const index = tempEmploymentType.indexOf(type);
    if (index === -1) {
      tempEmploymentType.push(type);
    } else {
      tempEmploymentType.splice(index, 1);
    }
    setNewJobPost({
      ...newJobPost,
      employment_options: [...tempEmploymentType],
    });
  };

  const addLanguageAndLabel = () => {
    const lastItem = selectedLanguage[selectedLanguage.length - 1];
    const defaultItem = { title: "Select Language", level: "Select Label" };

    if (
      lastItem.title?.value?.length > 0 &&
      lastItem.level?.value?.length > 0
    ) {
      setSelectedLanguage((prevItems) => [
        ...prevItems,
        { label: "", value: "" },
      ]);
    }
  };

  const handleRemoveLanguageAndLabel = (index) => {
    const temp = [...selectedLanguage];
    temp.splice(index, 1);
    setSelectedLanguage(temp);
  };
  const handleEditSkillModal = (data, index) => {
    setEditModalData({ show: true, data, index });
    setShowSkillModal(true);
  };

  const ifElementPresent = (name) => {
    const arrary = newJobPost?.employment_options;
    if (arrary !== undefined) {
      return arrary.includes(name);
    }
    return false;
  };

  const handleDeactivateJob = () => {
    if (isAllowedToDeleteJob()) {
      changeJobStatus("closed");
    } else {
      // toastMessage(DELETE_JOB_ERROR_MESSAGE);
      setPermissionErrorMessage(DELETE_JOB_ERROR_MESSAGE);
      togglePermissionModal();
      // navigate("/job-recruiter/job-dashboard");
    }
  };

  const handleSaveAsDraft = () => {
    if (isAllowedToEditJob()) {
      changeJobStatus("draft");
    } else {
      // toastMessage(SAVE_DRAFT_JOB_ERROR);
      setPermissionErrorMessage(SAVE_DRAFT_JOB_ERROR);
      togglePermissionModal();
      // navigate("/job-recruiter/job-dashboard");
    }
  };

  // SUBMIT ACTION
  const onSubmit = (event) => {
    event.preventDefault();
    setLoader(true);

    const payload = JSON.parse(JSON.stringify(newJobPost));
    payload.experience = newJobPost.experience.label;
    payload.job_role = newJobPost.job_role.label;
    payload.job_type = newJobPost.job_type.label;
    payload.salary_currency = newJobPost.salary_currency.title;

    payload["salary_range_min"] = salaryRange?.minSalary;
    payload["salary_range_max"] = salaryRange?.maxSalary;
    if (selectedLanguage.length > 0) {
      payload.languages = selectedLanguage
        .filter((lng) => lng.title)
        .map((lng) => ({ title: lng.title.label, level: lng.level.label }));
    }

    if (ifWeHaveEditPage && !duplicateData) {
      if (isAllowedToEditJob()) {
        updateJobById(payload, payload.id)
          .then((res) => {
            toast.success("Job Updated Successfully");
            navigate("/job-recruiter/job-dashboard");
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoader(false);
          });
        return;
      } else {
        // toastMessage(EDIT_JOB_ERROR_MESSAGE);
        setPermissionErrorMessage(EDIT_JOB_ERROR_MESSAGE);
        togglePermissionModal();
        setLoader(false);
        // navigate("")
      }
    } else {
      if (
        payload.id ||
        payload.created_by ||
        payload.closed_at ||
        payload.created_by
      ) {
        delete payload.id;
        delete payload.created_by;
        delete payload.closed_at;
        delete payload.created_by;
        delete payload.similar_jobs;
        payload.languages = payload.languages.map(({ title, level }) => ({
          title,
          level,
        }));
        payload.skills = payload.skills.map(
          ({ title, level, experience, description }) => ({
            title,
            level,
            experience,
            description,
          })
        );
        payload.status = "active";
      }
      if (isAllowedToAddJob()) {
        createSingleJob(payload)
          .then((res) => {
            toast.success("Job Created Successfully");
            setNewJobPost(res.data.data);
            navigate("/job-recruiter/job-dashboard");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            console.log(err);
          })
          .finally(() => {
            setLoader(false);
          });
      } else {
        // toastMessage(CREATE_JOB_ERROR_MESSAGE);
        setPermissionErrorMessage(CREATE_JOB_ERROR_MESSAGE);
        togglePermissionModal();
        setLoader(false);
        // navigate("/job-recruiter/job-dashboard");
      }
    }
  };

  // TRIGGER JOB STATUS CHANGE
  const changeJobStatus = (status) => {
    const payload = JSON.parse(JSON.stringify(newJobPost));
    payload.status = status;
    payload.experience = newJobPost.experience.label;
    payload.job_role = newJobPost.job_role.label;
    payload.job_type = newJobPost.job_type.label;
    payload.salary_currency = newJobPost.salary_currency.title;

    payload["salary_range_min"] = salaryRange?.minSalary;
    payload["salary_range_max"] = salaryRange?.maxSalary;

    const id = newJobPost.id;
    if (status === "draft" && !id) {
      if (validator.allValid()) {
        setDraftError(false);
        createSingleJob(payload)
          .then((res) => {
            toast.success("Job saved in draft");
            setNewJobPost(res.data.data);
            navigate("/job-recruiter/job-dashboard");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            console.log(err);
          })
          .finally(() => {
            setLoader(false);
          });
      } else {
        validator.showMessages();
        forceUpdate(1);
      }
    } else {
      setLoader(true);
      updateJobById(payload, id)
        .then((res) => {
          toast.success(
            status === "draft"
              ? "Job saved in draft"
              : "Job closed successfully"
          );
          navigate("/job-recruiter/job-dashboard");
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            console.log(err?.response?.data?.message);
            // toast.error(err?.response?.data?.message);
          }
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const handleSelectLocation = (location) => {
    setNewJobPost({
      ...newJobPost,
      location: location.location,
      longitude: location.long,
      latitude: location.lat,
    });
  };

  return (
    <>
      {loader && <PageLoader />}
      <JobRecruiterDashboardLayout
        header={(id)?"Edit Job":"Create Job"}
        subTitle={"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at"}
        showSearchBar={false}
        showSidebar = {false}
      >
      <div className="dashboard-main-panel">
        {/* <Header /> */}
        {/*=======================dashboard Head End=========================*/}
        <div className="dashboard-panel-content">
          {/*================dashboard Head For Mobile===================*/}
          <div className="top_left font-weight-bold for-mobile">
            <h3> {ifWeHaveEditPage ? "Edit Job" : "Post a Job"} </h3>
            <p>Finish filling out your Job listing</p>
          </div>
          {/*================dashboard Head For Mobile END===============*/}
          <div className="row">
            <div className="col-12">
              <h6>Job Details</h6>
              <p>Update Job details here</p>
            </div>
          </div>
          <div className="post-a-job">
            {/* <form onSubmit={(event) => onSubmit(event) }> */}
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* =================== Section 1 START Here ================ */}

                <BasicInformation
                  handleChangeByName={handleChangeByName}
                  newJobPost={newJobPost}
                  validator={validator}
                  optionField={optionField}
                />

                {/* =================== Section 1 END Here ================ */}

                <div className="col-12">
                  <div className="fieldset-heading">
                    <h6>Skills</h6>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="fieldset">
                      <div className="border-popup-btn">
                        <p>
                          <img src="/assets/images/plus-icon.svg" /> Add Your
                          Skills
                        </p>
                        {/*---------------- Button trigger modal ----------------*/}
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#skillPopup"
                          onClick={toggleSkillModal}
                        >
                          Add Your Skills
                        </button>
                      </div>
                      {/* Skills Listing Table */}
                      {newJobPost?.skills?.length > 0 && (
                        <div className="global-table table-responsive mt-4">
                          <table className="table align-middle">
                            <thead>
                              <tr>
                                <th>Skill Title</th>
                                <th
                                  style={{
                                    width: "35%",
                                    minWidth: "200px",
                                  }}
                                >
                                  Description
                                </th>
                                <th>Experience</th>
                                <th>Proficiency Level</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {newJobPost?.skills.map((skill, index) => (
                                <tr key={index}>
                                  <td className="strong">{skill.title}</td>
                                  <td>{skill.description}</td>
                                  <td>{skill.experience}</td>
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
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {/* TO DO */}
                      {/* {showSkillModal && (
                          <ModalWrapper
                            showModal={showSkillModal}
                            title={editModalData.show ? "Edit Skill" : "Add Skill"}
                            toggleModal={toggleSkillModal}  
                          >
                            <JobSkillComponent
                              edit={editModalData.show}
                              newJobPost={newJobPost}
                              setNewJobPost={setNewJobPost} 
                              toggleModal={toggleSkillModal}
                              editModalData={editModalData}
                            />
                          </ModalWrapper>
                        )} */}
                    </div>
                  </div>
                </div>

                {/* Language Section Here */}
                <div className="col-md-6 col-12">
                  <div className="fieldset-heading">
                    <h6>Language</h6>
                    <p>What language your employee should know?</p>
                  </div>
                  <div className="form-field shadow-box">
                    {/* <div className=""> */}
                    {selectedLanguage.map((item, index, arr) => (
                      <Fragment key={index}>
                        <UpdatedDropDown
                          handleOnChange={(e) => handleLanguageChange(e, index)}
                          placeholderText={"Select Language"}
                          icon={"/assets/images/language-icon.svg"}
                          option={languageList}
                          selectedValue={item.title}
                          type="job_role"
                        />
                        <UpdatedDropDown
                          handleOnChange={(e) => handleLabelChange(e, index)}
                          placeholderText={"Select Label"}
                          icon={"/assets/images/level-icon.svg"}
                          option={levels}
                          selectedValue={item.level}
                          type="job_role"
                        />
                        <button
                          onClick={() => {
                            handleRemoveLanguageAndLabel(index);
                          }}
                          type="button"
                          className={`btn-design mt-2 mb-2 ${
                            arr.length === 1 && "notAllowed"
                          }`}
                          disabled={arr.length === 1}
                        >
                          Remove
                        </button>
                      </Fragment>
                    ))}

                    {validator.message(
                      "selectedLanguage",
                      selectedLanguage,
                      "required",
                      { className: "text-danger" }
                    )}
                    <button
                      type="button"
                      onClick={addLanguageAndLabel}
                      className="btn-design"
                    >
                      <img src="/assets/images/plus-icon.svg" /> Add another
                      Language
                    </button>
                  </div>

                  {/* Job Location - TO DO */}

                  <div className="fieldset-heading">
                    <h6>Job Location</h6>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="fieldset">
                      <UpdateGoogleLocation
                        afterSelectLocation={handleSelectLocation}
                        selectedLocation={newJobPost.location}
                      />
                    </div>
                  </div>
                </div>

                {/* Employment options */}
                <div className="col-md-6 col-12">
                  <div className="fieldset-heading">
                    <h6>Employment options</h6>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="fieldset">
                      {optionField.employment_options && (
                        <div className="checkbox-btns">
                          {optionField.employment_options.map(
                            (option, index) => (
                              <div
                                className="checkbox-btn-items"
                                key={option.id}
                              >
                                <input
                                  type="checkbox"
                                  name="employment_options"
                                  value={option.id}
                                  onChange={() =>
                                    handleEmploymetType(option.id)
                                  }
                                  checked={ifElementPresent(option.id)}
                                  aria-label={option.title} // Add aria-label attribute with option title
                                />
                                <span>{option.title}</span>
                              </div>
                            )
                          )}
                          <div className="select-all">
                            <div className="checkbox-btn-items">
                              <input
                                type="checkbox"
                                name="employment_options_all"
                                onChange={handleChangeByName}
                                checked={
                                  newJobPost?.employment_options.length ===
                                  optionField.employment_options.length
                                }
                                aria-label="Select All"
                              />
                              <span>Select All</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="fieldset-heading">
                    <h6>Salary Range</h6>
                  </div>
                  <div className="form-field shadow-box">
                    {/* <UpdatedDropDown
                      handleOnChange={handleChangeByName}
                      placeholderText={"Type of Job"}
                      icon={"/assets/images/yearExp-icon.svg"}
                      option={optionField.job_type}
                      selectedValue={newJobPost.job_type}
                      type="job_type"
                    /> */}
                    <div className="fieldset">
                      <UpdatedDropDown
                        handleOnChange={(e) =>
                          setNewJobPost({
                            ...newJobPost,
                            salary_currency: e,
                          })
                        }
                        placeholderText={"Select Currency"}
                        icon={"/assets/images/tag-icon.svg"}
                        option={CURRENCY_LIST}
                        selectedValue={newJobPost.salary_currency}
                        type="currency_type"
                      />
                      {/* <DropdownField
                        label="currency_type"
                        option={
                          newJobPost.salary_currency !== ""
                            ? currencyList.filter(
                                (el) => el !== newJobPost.salary_currency
                              )
                            : currencyList
                        }
                        icon={"/assets/images/tag-icon.svg"}
                        // selected="United States Dollars ($)"
                        // salary_currency
                        selected={
                          newJobPost.salary_currency
                            ? newJobPost.salary_currency
                            : "Select Currency"
                        }
                        handleOnChange={(value) =>
                          setNewJobPost({
                            ...newJobPost,
                            salary_currency: value,
                          })
                        }
                      /> */}
                      {validator.message(
                        "salary_currency",
                        newJobPost.salary_currency,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                    {/* commented for future use */}
                    {/* <div className="container">
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={salaryRange?.minSalary}
                        onChange={(event) => {
                          const value = Math.min(
                            Number(event.target.value),
                            maxVal - 1
                          );
                          setMinVal(value);
                          setNewJobPost({
                            ...newJobPost,
                            salary_range_min: value,
                          });
                          setSalaryRange({...salaryRange,minSalary:value})
                          minValRef.current = value;
                        }}
                        className="thumb thumb--left"
                        style={{ zIndex: minVal > max - 100 && "5" }}
                      />
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={salaryRange?.maxSalary}
                        onChange={(event) => {
                          const value = Math.max(
                            Number(event.target.value),
                            minVal + 1
                          );
                          setMaxVal(value);
                          setNewJobPost({
                            ...newJobPost,
                            salary_range_max: value,
                          }); 
                          setSalaryRange({...salaryRange,maxSalary:value})

                          maxValRef.current = value;
                        }}
                        className="thumb thumb--right"
                      />

                      <div className="slider">
                        <div className="slider__track" />
                        <div ref={range} className="slider__range" />
                      </div>
                    </div> */}
                    <div className="fieldset">
                      <div className="range-value">
                        <span>
                          Min:{" "}
                          <input
                            type="text"
                            // minLength={4}
                            value={salaryRange?.minSalary}
                            className="from"
                            name="salary_range_min"
                            onChange={(e) => {
                              const value = Math.min(
                                Number(e.target.value),
                                maxVal - 1
                              );
                              handleChangeByName;
                              setSalaryRange({
                                ...salaryRange,
                                minSalary: e.target.value,
                              });
                              setMinVal(value);
                              minValRef.current = value;
                            }}
                            aria-label="salary_range_min"
                          />
                          {validator.message(
                            "salary_range_min",
                            salaryRange?.minSalary,
                            "required",
                            { className: "text-danger" }
                          )}
                        </span>
                        <span>
                          Max:{" "}
                          <input
                            type="text"
                            maxLength={10}
                            value={salaryRange?.maxSalary}
                            className="to"
                            name="salary_range_max"
                            onChange={(e) => {
                              const value = Math.max(
                                Number(e.target.value),
                                minVal + 1
                              );
                              setMaxVal(value);
                              handleChangeByName;
                              setSalaryRange({
                                ...salaryRange,
                                maxSalary: e.target.value,
                              });
                              maxValRef.current = value;
                            }}
                            aria-label="salary_range_max"
                          />
                          {validator.message(
                            "salary_range_max",
                            salaryRange?.maxSalary,
                            "required",
                            { className: "text-danger" }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-7 col-12 mob-center">
                  <div>
                    <button
                      type="button"
                      onClick={handleSaveAsDraft}
                      className="btn-design border-btn m-2"
                    >
                      Save as Draft
                    </button>
                  </div>
                  {/*---------------- Button trigger modal ----------------*/}
                  <button type="submit" className="btn-design  m-2">
                    {ifWeHaveEditPage && !duplicateData
                      ? "Update Job"
                      : "Create Job"}
                  </button>
                </div>
                {ifWeHaveEditPage && !duplicateData ? (
                  <div className="col-md-5 col-12 text-end  mob-center">
                    <div>
                      <button
                        type="button"
                        onClick={handleDeactivateJob}
                        className="btn-design border-btn"
                      >
                        Deactivate Job
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
          {/* <div className="dashboard-footer copyright">
            <div className="row">
              <div className="col-md-7 col-12">
                <p>© 2023 TalentCo. All Rights Reserved.</p>
              </div>
              <div className="col-md-5 col-12">
                <ul>
                  <li>
                    <a href="contact.html">Contact Us</a>
                  </li>
                  <li>
                    <a href="faq.html">FAQs</a>
                  </li>
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      </JobRecruiterDashboardLayout>
      {showSkillModal && (
        <AddSkillsModalNew
          toggleModal={toggleSkillModal}
          showModal={showSkillModal}
          setProfileDetails={setNewJobPost}
          profileDetails={newJobPost}
          edit={editModalData.show}
          editModalData={editModalData.data}
          index={editModalData.index}
          isExperienceFieldRequired={true}
          skillList={skillList}
        />
      )}
      {showPermissionAccessModal && (
        <PermissionModal
          showModal={showPermissionAccessModal}
          toggleModal={togglePermissionModal}
          text={permissionErrorMessage}
        />
      )}
    </>
  );
}

export default DashboardCreateJob;
