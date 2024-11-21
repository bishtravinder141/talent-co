import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../errorMsg/ErrorMessage";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import RemainingCount from "../common/RemainingCount";

const AddSkillsModalNew = ({
  showModal,
  toggleModal,
  setProfileDetails,
  profileDetails,
  edit,
  editModalData,
  index,
  isExperienceFieldRequired,
  skillList,
}) => {
  const [selectedLabel, setSelectedLabel] = useState("Beginner");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (edit) {
      Object.keys(editModalData).forEach((data) => {
        if (data === "title") {
          setValue("title", {
            label: editModalData[data],
            value: editModalData[data],
          });
        } else {
          setValue(data, editModalData[data]);
        }
      });
      setSelectedLabel(editModalData.level);
    }
  }, [edit]);

  const onSubmit = (data) => {
    let addEditData;
    const tempDataVal = data;
    tempDataVal.title = data.title.value;
    if (edit) {
      addEditData = [...profileDetails.skills];
      addEditData[index] = { ...tempDataVal, level: selectedLabel };
    } else {
      const tempData = { ...tempDataVal, level: selectedLabel };
      addEditData = [...profileDetails.skills, tempData];
    }
    setProfileDetails({
      ...profileDetails,
      skills: [...addEditData],
    });
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
                      <Controller
                        name="title"
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
                      {errors.title && (
                        <ErrorMessage msg={errors.title.message} />
                      )}
                    </div>
                    {/* <label>Skill Name</label>
                    <div className="fieldset">
                      <input
                        type="text"
                        name=""
                        placeholder="Ex: Communication"
                        className="form-control"
                        {...register("title", {
                          required: "Skill name is required",
                        })}
                        aria-label="skill_name"
                      />
                      {errors.title && (
                        <ErrorMessage msg={errors.title.message} />
                      )}
                    </div> */}
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
                        aria-label="skill_description"
                      ></textarea>
                      {errors.description && (
                        <ErrorMessage msg={errors.description.message} />
                      )}
                      <span className="characters-sets">
                        <RemainingCount typedCharacters={watch("description")?.length}/>
                        {/* 5000 characters */}
                        </span>
                    </div>
                  </div>
                  {isExperienceFieldRequired && (
                    <div className="col-12">
                      <label>Experience</label>
                      <input
                        type="text"
                        placeholder="Ex: 5+ Years"
                        className="form-control"
                        {...register("experience", {
                          required: "Experience is required",
                        })}
                        aria-label="skill_experience"
                      />
                      {errors.experience && (
                        <ErrorMessage msg={errors.experience.message} />
                      )}
                    </div>
                  )}
                  <div className="col-12">
                    <label>Skill Level</label>
                    <div className="fieldset">
                      <div className="radio-btns">
                        <div className="radio-btn-items">
                          <input
                            type="radio"
                            name="level"
                            checked={selectedLabel == "Beginner"}
                            onChange={() => handleRadioChange("Beginner")}
                            aria-label="skill_Beginner"
                          />
                          <span>
                            <img src="/assets/images/beginner.svg" /> Beginner
                          </span>
                        </div>
                        <div className="radio-btn-items">
                          <input
                            type="radio"
                            name="level"
                            checked={selectedLabel == "Intermediate"}
                            onChange={() => handleRadioChange("Intermediate")}
                            aria-label="skill_Intermediate"
                          />
                          <span>
                            <img src="/assets/images/intermediate.svg" />{" "}
                            Intermediate
                          </span>
                        </div>
                        <div className="radio-btn-items">
                          <input
                            type="radio"
                            name="level"
                            checked={selectedLabel == "Expert"}
                            onChange={() => handleRadioChange("Expert")}
                            aria-label="skill_Expert"
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
                        data-bs-dismiss="modal"
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

export default AddSkillsModalNew;
