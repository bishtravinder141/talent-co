import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../errorMsg/ErrorMessage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactSelect from "react-select";
import Creatable from "react-select/creatable";
import RemainingCount from "../common/RemainingCount";
import { TEXT_AREA_MAX_LENGTH } from "../../constants/Constent";

const AddSkillsModal = ({
  showModal,
  toggleModal,
  setProfileDetails,
  profileDetails,
  edit,
  editModalData,
  index,
  preference = false,
  skillList,
  profilePage = false,
}) => {
  const location = useLocation();
  const [selectedLabel, setSelectedLabel] = useState("Beginner");
  const [selectedSkill, setSelectedSkill] = useState([])
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (edit) {
      Object.keys(editModalData).forEach((data) => {
        if (data === "skill_name") {
          setValue("skill_name", {
            label: editModalData[data],
            value: editModalData[data],
          });
        } else {
          setValue(data, editModalData[data]);
        }
      });
      setSelectedLabel(editModalData.level);
      setSelectedSkill({label:editModalData?.skill_name,value:editModalData?.skill_name})
    }
  }, [edit]);

  const onSubmit = (data) => {
    let addEditData;
    const tempDataVal = data;
    tempDataVal.skill_name = data.skill_name.value;
    if (edit) {
      // if (location.pathname === "/job-seeker/setting") {
      //   addEditData = [...profileDetails.job_alert_skills];
      //   addEditData[index] = {
      //     ...data,
      //     level: selectedLabel,
      //     is_updated: true,
      //   };
      // } else {
      addEditData = [...profileDetails.skills];
      addEditData[index] = {
        ...tempDataVal,
        level: selectedLabel,
        is_updated: true,
      };
      // }
    } else {
      const tempData = { ...tempDataVal, level: selectedLabel };
      // if (location.pathname === "/job-seeker/setting") {
      //   addEditData = [...profileDetails?.job_alert_skills, tempData];
      // } else {
      addEditData = [...profileDetails?.skills, tempData];
      // }
    }
    if (location.pathname === "/job-seeker/setting") {
      setProfileDetails({
        ...profileDetails,
        job_alert_skills: [...addEditData],
      });
    } else {
      setProfileDetails({
        ...profileDetails,
        skills: [...addEditData],
      });
    }
    toggleModal();
  };

  const handleRadioChange = (value) => {
    setSelectedLabel(value);
  };

  return (
    <div>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        id="skillPopup"
        tabIndex="-1"
        aria-labelledby="skillPopupLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-ds-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="skillPopupLabel">
                {edit ? "Update" : "Add"} Skill
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <label>Skill Name</label>
                    <div className="fieldset">
                      {profilePage ? (
                        <Creatable
                          {...register("skill_name", {
                            required: "Skill name is required",
                          })}
                          options={skillList}
                          value={selectedSkill}
                          placeholder="Select the skill1"
                          onChange={(selectedOption) => {
                            setSelectedSkill(selectedOption);
                            setValue("skill_name", selectedOption);
                          }}
                          onBlur={() => {
                            setSelectedSkill(selectedSkill);
                            setValue("skill_name", selectedSkill);
                          }}
                        />
                      ) : (
                        <Controller
                          name="skill_name"
                          control={control}
                          rules={{ required: "Skill name is required" }}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              placeholder="Select the skill"
                              options={skillList}
                            />
                          )}
                        />
                      )}
                      {/* <input
                        type="text"
                        name=""
                        placeholder="Ex: Communication"
                        className="form-control"
                        {...register("skill_name", {
                          required: "Skill name is required",
                        })}
                      /> */}
                      {errors.skill_name && (
                        <ErrorMessage msg={errors.skill_name.message} />
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <label>Description</label>
                    <div className="fieldset">
                      <textarea
                        placeholder="Enter here.."
                        maxLength={TEXT_AREA_MAX_LENGTH}
                        className="form-control message-field"
                        {...register("description", {
                          required: "Description is required",
                        })}
                      ></textarea>
                      {errors.description && (
                        <ErrorMessage msg={errors.description.message} />
                      )}
                      <span className="characters-sets">
                        {/* 5000 characters */}
                        <RemainingCount typedCharacters={watch("description")?.length}/>
                        </span>
                    </div>
                  </div>

                  <div className="col-12">
                    <label>Skill Level</label>
                    <div className="fieldset">
                      <div className="radio-btns">
                        <div className="radio-btn-items">
                          <input
                            type="radio"
                            name="skill-level"
                            checked={selectedLabel == "Beginner"}
                            onChange={() => handleRadioChange("Beginner")}
                          />
                          <span>
                            <img src="/assets/images/beginner.svg" /> Beginner
                          </span>
                        </div>
                        <div className="radio-btn-items">
                          <input
                            type="radio"
                            name="skill-level"
                            checked={selectedLabel == "Intermediate"}
                            onChange={() => handleRadioChange("Intermediate")}
                          />
                          <span>
                            <img src="/assets/images/intermediate.svg" />{" "}
                            Intermediate
                          </span>
                        </div>
                        <div className="radio-btn-items">
                          <input
                            type="radio"
                            name="skill-level"
                            checked={selectedLabel == "Expert"}
                            onChange={() => handleRadioChange("Expert")}
                          />
                          <span>
                            <img src="/assets/images/expert.svg" /> Expert
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="popupBtn">
                      <button
                        type="button"
                        className="btn-design border-btn"
                        onClick={toggleModal}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-design">
                        {edit ? "Update" : "Add"} Skill
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default AddSkillsModal;