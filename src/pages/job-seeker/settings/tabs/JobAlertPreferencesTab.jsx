import React, { Fragment, useEffect, useState } from "react";
import ErrorMessage from "../../../../components/errorMsg/ErrorMessage";
import AddSkillsModal from "../../../../components/profileDetails/AddSkillsModal";
import {
  EXPERIENCE_LEVEL,
  JOB_TYPES,
  LOCATION_PREFERENCES,
  SalaryError,
  addAtLeastOneMessage,
  locationError,
  titleError,
} from "../constant";
import {
  addJobAlertPreferences,
  getJobAlertPreferences,
} from "../../../../API/candidateJobs";
import GoogleLocation from "../../../../components/GoogleLocation";
import PageLoader from "../../../../components/loader/PageLoader";
import { toastMessage } from "../../../../utils/toastMessages";
import {
  jobAlertPreferencesSaved,
  successType,
} from "../../../../utils/allToastMessage";
const JobAlertPreferencesTab = () => {
  const [loader, setLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editModalData, setEditModalData] = useState({ show: false, data: {} });
  const [jobTitleError, setjobTitleError] = useState(false);
  const [jobLocationError, setJobLocationError] = useState(false);
  const [jobAlertpreferences, setJobAlertPreferences] = useState({
    monthly_salary_range: null,
    annual_salary_range: null,
    job_alert_locations: [
      {
        location: "",
      },
    ],
    job_alert_titles: [
      {
        title: "",
      },
    ],
    job_type: [],
    employment_options: [],
    experience: [],
    job_alert_skills: [],
  });

  // creating new fields for ensuring empty data doesn't get overrriden
  const [newTitles, setNewTitles] = useState([
    {
      title: "",
    },
  ]);
  const [newLocations, setNewLocations] = useState([
    {
      location: "",
    },
  ]);
  const [salary, setSalary] = useState({
    currency: "",
    amount: null,
    type: "",
  });
  // commented for future use
  // const [alertPreferences, setAlertPreferences] = useState({
  //   title: {
  //     basedOnActivity: false,
  //     basedOnTitles: false,
  //   },
  //   location: {
  //     basedOnActivity: false,
  //     basedOnTitles: false,
  //   },
  // });
  useEffect(() => {
    setLoader(true);
    getJobAlertPreferences()
      .then((res) => {
        setLoader(false);
        setJobAlertPreferences(res.data.data);

        // setting job titles in new state
        if (res?.data?.data?.job_alert_titles?.length > 0) {
          setNewTitles([...res?.data?.data?.job_alert_titles]);
        }

        // for setting job locations in new state
        if (res?.data?.data?.job_alert_locations?.length > 0) {
          setNewLocations([...res?.data?.data?.job_alert_locations]);
        }

        // for setting salary in new state
        if (res?.data?.data?.annual_salary_range) {
          setSalary({
            ...salary,
            amount: res?.data?.data?.annual_salary_range,
            type: "Annual",
          });
        } else if (res?.data?.data?.monthly_salary_range) {
          setSalary({
            ...salary,
            amount: res?.data?.data?.monthly_salary_range,
            type: "Monthly",
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // job title
  const addAnotherTitle = () => {
    const index = newTitles.findIndex((curElem) => {
      return curElem.title === "";
    });
    if (index >= 0) {
      setjobTitleError(true);
    } else {
      setNewTitles([...newTitles, { title: "" }]);
      setjobTitleError(false);
    }
  };

  const handleJobTitleChange = (idx, e) => {
    const temp = [...newTitles];
    temp[idx].title = e.target.value;
    setNewTitles([...temp]);
    const index = temp.findIndex((curElem) => curElem.title === "");
    if (index < 0) {
      setjobTitleError(false);
    }
  };
  const handleRemoveJobTitle = (idx) => {
    const temp = [...newTitles];
    temp.splice(idx, 1);
    setNewTitles([...temp]);
  };

  // location preferences
  const addAnotherLocation = () => {
    const index = newLocations.findIndex((curElem) => {
      return curElem.location === "";
    });
    if (index >= 0) {
      setJobLocationError(true);
    } else {
      setNewLocations([...newLocations, { location: "" }]);
      setJobLocationError(false);
    }
  };
  const handleJobLocationChange = (idx, value) => {
    const temp = [...newLocations];
    temp[idx].location = value;
    setNewLocations([...temp]);
    const index = temp.findIndex((curElem) => curElem.location === "");
    if (index < 0) {
      setJobLocationError(false);
    }
  };

  const handleRemoveJobLocation = (idx) => {
    const temp = [...newLocations];
    temp.splice(idx, 1);
    setNewLocations([...temp]);
  };

  //  for job type ,employment options and experience
  const handlePreferences = (e, value, field) => {
    if (e.target.checked) {
      setJobAlertPreferences({
        ...jobAlertpreferences,
        [field]: [...jobAlertpreferences[field], value],
      });
    } else {
      const tempJob = [...jobAlertpreferences[field]];
      const index = tempJob.findIndex((curitem) => {
        return curitem === value;
      });
      tempJob.splice(index, 1);
      setJobAlertPreferences({ ...jobAlertpreferences, [field]: [...tempJob] });
    }
  };

  // salary preferences
  const handleSalaryPreferences = (e, field) => {
    setSalary({
      ...salary,
      [field]: e.target.value,
    });
  };

  // for handling save and update
  const handleSaveAndUpdate = () => {
    const payload = JSON.parse(JSON.stringify(jobAlertpreferences));
    let tempShowError = false;
    if (newTitles[0]?.title !== ""|| newTitles?.length>1) {
      const tempArray = newTitles.filter((curElem) => curElem.title !== "");
      payload["job_alert_titles"] = [...tempArray];
      setNewTitles(tempArray);
    } else {
      setShowError(true);
      tempShowError = true;
    }

    if (newLocations[0]?.location !== "" || newLocations?.length>1) {
      const tempArray = newLocations.filter(
        (curElem) => curElem.location !== ""
      );
      payload["job_alert_locations"] = [...tempArray];
      setNewLocations(tempArray);
      payload["job_alert_location"] = [...newLocations];
    } else {
      setShowError(true);
      tempShowError = true;
    }

    if (salary?.amount !== "") {
      if (salary?.type === "" || salary?.type === "Annual") {
        payload["annual_salary_range"] = salary.amount;
        payload["monthly_salary_range"] = null;
      } else if (salary?.type === "Monthly") {
        payload["monthly_salary_range"] = salary.amount;
        payload["annual_salary_range"] = null;
      }
    } else {
      setShowError(true);
      tempShowError = true;
    }

    if (jobAlertpreferences?.job_type?.length > 0) {
      payload["job_type"] = [...jobAlertpreferences?.job_type];
    } else {
      setShowError(true);
      tempShowError = true;
    }

    if (jobAlertpreferences?.experience?.length > 0) {
      payload["experience"] = [...jobAlertpreferences?.experience];
    } else {
      setShowError(true);
      tempShowError = true;
    }
    if (jobAlertpreferences?.employment_options?.length > 0) {
      payload["employment_options"] = [
        ...jobAlertpreferences?.employment_options,
      ];
    } else {
      setShowError(true);
      tempShowError = true;
    }
    if (!tempShowError) {
      setLoader(true);
      addJobAlertPreferences(payload)
        .then((res) => {
          toastMessage(jobAlertPreferencesSaved, successType);
          setjobTitleError(false);
          setJobLocationError(false);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };
  // skill and edit modal
  const toggleSkillModal = () => {
    setShowSkillModal(!showSkillModal);
    setEditModalData({ show: false, data: {} });
  };
  const handleEditSkillModal = (data, index) => {
    setEditModalData({ show: true, data, index });
    setShowSkillModal(true);
  };
  // skill and edit modal
  return (
    <>
      {loader && <PageLoader />}
      <div
        className="tab-pane fade show active"
        id="jobalert"
        role="tabpanel"
        aria-labelledby="jobalert-tab"
      >
        <div className="jobAlertPreference border">
          <div className="alerts-pref  border-bottom">
            <h5>Job Alert Preference</h5>
            <p>
              Here you can update the info used to determine the job in your
              daily job alerts emails and notifications
            </p>
          </div>

          <div className="form-field-max-width">
            <div className="jobsTabs-col mt-2 pt-3">
              <h5>Job Title</h5>
              <div className="border pg-20 mb-3">
                <div className="fieldset checkbox-set">
                  <input type="checkbox" name="" className="w-25" />
                  <span>
                    <strong>Based on my activity</strong>
                  </span>
                </div>
                <p>
                  Your apply, click and search activity will determine your
                  matches in alerts.
                </p>
              </div>
              <div className="border pg-20 mb-4">
                <div className="fieldset checkbox-set">
                  <input type="checkbox" name="" className="w-25" />
                  <span>
                    <strong>Based on job titles I selected</strong>
                  </span>
                  <p>
                    Well only use the job titles you enter to determine your
                    matches in alerts.
                  </p>
                </div>
                <div className="fieldset add-atleast-one">
                  <label>Note: You must add at least one</label>
                  {/* job titles  */}
                  {newTitles?.map((curTitle, idx, arr) => {
                    return (
                      <Fragment key={idx}>
                        <input
                          type="text"
                          name=""
                          placeholder="Add a Job title"
                          className="form-control"
                          value={curTitle?.title}
                          onChange={(e) => {
                            handleJobTitleChange(idx, e);
                          }}
                        />
                        {arr.length === 1 ? (
                          <button className="btn-design notAllowed" disabled>
                            Remove
                          </button>
                        ) : (
                          <button
                            className="btn-design"
                            onClick={() => {
                              handleRemoveJobTitle(idx);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </Fragment>
                    );
                  })}

                  {showError && newTitles[0]?.title === "" && (
                    <ErrorMessage msg={addAtLeastOneMessage} />
                  )}
                  {/* {jobTitleError && newTitles.length !== 1 && (
                    <ErrorMessage msg={titleError} />
                  )} */}

                  <div className="col-12 px-0 form-field">
                    <button className="btn-design" onClick={addAnotherTitle}>
                      <img src="../assets/images/plus-icon.svg" /> Add another
                      Title
                    </button>
                  </div>
                  {/* job titles  */}
                </div>
              </div>

              <h5>Location</h5>
              <div className="border pg-20 mb-3">
                <div className="fieldset checkbox-set">
                  <input type="checkbox" name="" className="w-25" />
                  <span>
                    <strong>Based on my activity</strong>
                  </span>
                  <p>
                    Your apply, click and search activity will determine the
                    location of your matches in alerts.
                  </p>
                </div>
              </div>
              <div className="border pg-20 mb-4">
                <div className="fieldset checkbox-set">
                  <input type="checkbox" name="" className="w-25" />
                  <span>
                    <strong>Based on job titles I selected</strong>
                  </span>
                  <p>
                    Well only use the job titles you enter to determine your
                    matches in alerts.
                  </p>
                </div>
                <div className="fieldset add-atleast-one">
                  <label>Note: You must add at least one</label>
                  <div className="row">
                    {newLocations?.map((curJobLocation, idx, arr) => (
                      <Fragment key={idx}>
                        <div className="col-md-6 col-12 fullwidth ">
                          <input
                            type="text"
                            name=""
                            placeholder="Add a ZIP or City"
                            className="form-control"
                            value={curJobLocation?.location}
                            onChange={(e) => {
                              handleJobLocationChange(idx, e.target.value);
                            }}
                          />   
                          {/* Commented for future use */}
                          {/* <div>
                            <GoogleLocation
                              handleAddLocation={handleJobLocationChange}
                              idx={idx}
                              defaultData ={curJobLocation?.location}
                            />
                          </div> */}
                        </div>
                        <div className="col-md-6 col-12">
                          <select className="form-control currency-field">
                            <option>Within 20 miles</option>
                            <option>Within 30 miles</option>
                            <option>Within 40 miles</option>
                            <option>Within 50 miles</option>
                            <option>Within 60 miles</option>
                          </select>
                          {arr.length === 1 ? (
                            <button
                              type="button"
                              className="btn-design notAllowed"
                              disabled
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn-design"
                              onClick={() => {
                                handleRemoveJobLocation(idx);
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </Fragment>
                    ))}
                    {showError && newLocations[0]?.location === "" && (
                      <ErrorMessage msg={addAtLeastOneMessage} />
                    )}
                    {/* {jobLocationError && newLocations.length !== 1 && (
                      <ErrorMessage msg={locationError} />
                    )} */}
                  </div>
                  <div className="col-12 px-0 form-field">
                    <button className="btn-design" onClick={addAnotherLocation}>
                      <img src="../assets/images/plus-icon.svg" /> Add another
                      Location
                    </button>
                  </div>
                </div>
              </div>

              <div className="desire-salary mb-4">
                <h5>Salary</h5>
                <p>
                  We’ll try to prioritize jobs that meets your pay preferences.
                  This info is not shared with employers and is only used to
                  improve your job matches.
                </p>

                <div className=".fieldset.flex-inner d-flex">
                  <select
                    className="form-control currency-field me-2"
                    onChange={(e) => {
                      handleSalaryPreferences(e, "currency");
                    }}
                  >
                    <option>Dollars ($)</option>
                    <option>Euro (€)</option>
                    <option>Pound (£)</option>
                    <option>Rupee (₹)</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="form-control amount-field me-2 "
                    onChange={(e) => {
                      handleSalaryPreferences(e, "amount");
                    }}
                    value={salary?.amount}
                  />
                  <select
                    value={salary?.type}
                    className="form-control years-field"
                    onChange={(e) => {
                      handleSalaryPreferences(e, "type");
                    }}
                  >
                    <option>Annual</option>
                    <option>Monthly</option>
                  </select>
                </div>
                {showError && salary?.amount === "" && (
                  <span className="text-center">
                    <ErrorMessage msg={SalaryError} />
                  </span>
                )}
              </div>

              <div className="jobType mb-4">
                <h5>Job Type</h5>
                <div className="row">
                  {JOB_TYPES.map((curJobType, idx) => (
                    <Fragment key={idx}>
                      <div className="col-md-6 col-12">
                        <div className="fieldset checkbox-set">
                          <input
                            type="checkbox"
                            checked={jobAlertpreferences?.job_type?.includes(
                              curJobType
                            )}
                            name=""
                            onChange={(e) => {
                              handlePreferences(e, curJobType, "job_type");
                            }}
                            // {...register("jobTypes")}
                          />
                          <span>{curJobType.toUpperCase()}</span>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
                {showError && jobAlertpreferences?.job_type?.length === 0 && (
                  <ErrorMessage msg={addAtLeastOneMessage} />
                )}
              </div>
              <div className="jobType  mb-4">
                <h5>On-site/remote</h5>
                <div className="row">
                  {LOCATION_PREFERENCES.map((curEmploymentOption, idx) => (
                    <Fragment key={idx}>
                      <div className="col-md-6 col-12">
                        <div className="fieldset checkbox-set">
                          <input
                            type="checkbox"
                            // {...register("employmentOptions")}
                            checked={jobAlertpreferences?.employment_options?.includes(
                              curEmploymentOption
                            )}
                            name=""
                            onChange={(e) => {
                              handlePreferences(
                                e,
                                curEmploymentOption,
                                "employment_options"
                              );
                            }}
                          />
                          <span>{curEmploymentOption.toUpperCase()}</span>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
                {showError &&
                  jobAlertpreferences?.employment_options?.length === 0 && (
                    <ErrorMessage msg={addAtLeastOneMessage} />
                  )}
              </div>
              <div className="jobType  mb-4">
                <h5>Experience Level</h5>
                <div className="row">
                  {EXPERIENCE_LEVEL.map((curExperienceValue, idx) => (
                    <Fragment key={idx}>
                      <div className="col-md-6 col-12">
                        <div className="fieldset checkbox-set">
                          <input
                            type="checkbox"
                            name=""
                            checked={jobAlertpreferences?.experience?.includes(
                              curExperienceValue
                            )}
                            onChange={(e) => {
                              handlePreferences(
                                e,
                                curExperienceValue,
                                "experience"
                              );
                            }}
                          />
                          <span>{curExperienceValue.toUpperCase()}</span>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
                {showError && jobAlertpreferences?.experience?.length === 0 && (
                  <ErrorMessage msg={addAtLeastOneMessage} />
                )}
              </div>
            </div>
          </div>

          {/* Add skill Section */}
          <div className="form-field shadow-box">
            <div className="row">
              <h5>Skills</h5>
              <div className="col-12">
                <div className="fieldset">
                  <div className="border-popup-btn">
                    <p>
                      <img src="/assets/images/plus-icon.svg" /> Add Your Skills
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={toggleSkillModal}
                    >
                      Add Your Skills
                    </button>
                  </div>
                  {jobAlertpreferences?.job_alert_skills?.length > 0 && (
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
                          {jobAlertpreferences?.job_alert_skills.map(
                            (skill, index) => (
                              <tr key={index}>
                                <td className="strong">{skill.skill_name}</td>
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

                  {jobAlertpreferences?.skills?.length > 0 && (
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
                          {jobAlertpreferences?.skills?.map((skill, index) => (
                            <tr key={index}>
                              <td className="strong">{skill.skill_name}</td>
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
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Add skill Section */}

          <div className="col-12 text-center py-4">
            <button
              type="button"
              className="btn-design"
              onClick={handleSaveAndUpdate}
            >
              Save & Update
            </button>
          </div>
        </div>
      </div>
      {showSkillModal && (
        <AddSkillsModal
          toggleModal={toggleSkillModal}
          showModal={showSkillModal}
          setProfileDetails={setJobAlertPreferences}
          profileDetails={jobAlertpreferences}
          edit={editModalData.show}
          editModalData={editModalData.data}
          index={editModalData.index}
          preference={true}
        />
      )}
    </>
  );
};

export default JobAlertPreferencesTab;
