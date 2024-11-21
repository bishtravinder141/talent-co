import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import RemainingCount from "../../common/RemainingCount";
import { TEXT_AREA_MAX_LENGTH } from "../../../constants/Constent";

function JobSkillComponent({ edit, editModalData, newJobPost, setNewJobPost, toggleModal }) {
  const [selectedLabel, setSelectedLabel] = useState("Beginner");

  // Get edit data if id present else only fetch master api data to populate dropdown
  useEffect(() => {
    if (edit) {
      Object.keys(editModalData).forEach((data) => {
        setSkillData(data, editModalData[data]);
      });
      setSelectedLabel(editModalData.level);
    }
  }, [edit]);

  const [skillData, setSkillData ] = useState({
    skill_name: "",
    description: "",
    level: "Beginner",
  })
  
  const radioButtons = [
    { label: "Beginner", imgSrc: "assets/images/beginner.svg" },
    { label: "Intermediate", imgSrc: "assets/images/intermediate.svg" },
    { label: "Expert", imgSrc: "assets/images/expert.svg" },
  ];

  const onSubmit = (data) => {
    let addEditData;
    if (edit) {
      addEditData = [...newJobPost.skills];
      addEditData[index] = { ...data, level: selectedLabel, is_updated: true };
    } else {
      addEditData = [...newJobPost.skills, skillData];
    }

    setNewJobPost({
      ...newJobPost,
      skills: [...addEditData],
    });
    toggleModal();
  };

  const handleRadioChange = (value) => {
    setSkillData(prev => ({...prev, level: value}))
    setSelectedLabel(value);
  };

  const handleChangeByName = 

  useMemo(() => (event) => {
    const { name, value } = event.target;
    setSkillData((prev) => ({ ...prev, [name]: value }));
  }, [skillData])

  return (
    <>
        <div className="modal-body">
          <div className="row">
            <div className="col-12">
              <label>Skill Name</label>
              <div className="fieldset">
                <input
                  type="text"
                  name="skill_name"
                  placeholder="Ex: Communication"
                  className="form-control"
                  onChange={handleChangeByName}
                />
              </div>
            </div>
            <div className="col-12">
              <label>Description</label>
              <div className="fieldset">
                <textarea
                  name="description"
                  maxLength={TEXT_AREA_MAX_LENGTH}
                  placeholder="Enter here.."
                  className="form-control message-field"
                  onChange={handleChangeByName}
                ></textarea>
                <span className="characters-sets">
                  {/* 5000 characters */}
                  <RemainingCount typedCharacters={skillData?.description?.length}/>
                  </span>
              </div>
            </div>
            
            {/* select skill level */}
            <div className="col-12">
              <label>Skill Level</label>
              <div className="fieldset">
                <div className="radio-btns">
                  {radioButtons.map((button, index) => (
                    <div className="radio-btn-items" key={index}>
                      <input
                        type="radio"
                        name="skill_level"
                        checked={skillData.level === button.label}
                        onChange={() => handleRadioChange(button.label)}
                      />
                      <span>
                        <img src={button.imgSrc} /> {button.label}
                      </span>
                    </div>
                  ))}
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
                <button type="button" onClick={() => onSubmit(skillData)}  className="btn-design">
                  {edit ? "Update" : "Add"} Skill
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default JobSkillComponent