import { useForm } from "react-hook-form";
import ErrorMessage from "../errorMsg/ErrorMessage";
import {
  getLast20YearsArray,
  getNext5YearsArray,
} from "../../utils/getYearData";
import DropdownField from "../inputFields/DropdownField";
import { useEffect, useState } from "react";
import RemainingCount from "../common/RemainingCount";
import { TEXT_AREA_MAX_LENGTH } from "../../constants/Constent";

const AddEditQualificationModal = ({
  showModal,
  toggleModal,
  setProfileDetails,
  profileDetails,
  edit,
  editModalData,
  index,
}) => {
  const last20YearsArray = getLast20YearsArray();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    if (edit) {
      Object.keys(editModalData).forEach((data) => {
        setValue(data, editModalData[data]);
      });
    }
  }, [edit]);

  const onSubmit = (data) => {
    let addEditData;
    if (edit) {
      addEditData = [...profileDetails.qualifications];
      addEditData[index] = { ...data, is_updated: true };
    } else {
      addEditData = [...profileDetails.qualifications, data];
    }
    setProfileDetails({
      ...profileDetails,
      qualifications: [...addEditData],
    });
    toggleModal();
  };

  return (
    <div>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        id="qualificationPopup"
        tabIndex="-1"
        aria-labelledby="qualificationPopupLabel"
        aria-hidden="true"
        role="dialog"
        // data-bs-backdrop="static"
        data-ds-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="qualificationPopupLabel">
              {edit ? "Update" : "Add"} Qualification
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <label>School</label>
                    <div className="fieldset">
                      <input
                        type="text"
                        name=""
                        placeholder="Ex: School Name"
                        className="form-control"
                        {...register("university", {
                          required: "School Name is required",
                        })}
                      />
                      {errors.university && (
                        <ErrorMessage msg={errors.university.message} />
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <label>Dates Attended</label>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <DropdownField
                          option={last20YearsArray}
                          // selected={profileDetails?.startYear}
                          validation={register("start_year", {
                            // required: "End year is required.",
                          })}
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <DropdownField
                          option={
                            watch("start_year")
                              ? getNext5YearsArray(watch("start_year"))
                              : []
                          }
                          selected={watch("end_year")}
                           // selected={profileDetails?.endYear}
                          disabledField={!watch("start_year")}
                          validation={register("end_year", {
                            // required: "End year is required.",
                          })}
                        />
                        {errors.date_complete && (
                          <ErrorMessage msg={errors.date_complete.message} />
                        )}
                      </div>
                    </div>
                    <span className="sample-info">
                      Or expected graduation year
                    </span>
                  </div>

                  <div className="col-12">
                    <label>Degree</label>
                    <select
                      className="form-control"
                      {...register("graduation_year", {
                        // required: "Start Date is required",
                      })}
                    >
                      <option selected disabled value="">
                        End Year
                      </option>
                      {last20YearsArray?.map((opt, i) => (
                        <option value={opt} key={i}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label>Field of Study</label>
                    <div className="fieldset">
                      <input
                        type="text"
                        name=""
                        placeholder="Ex: Business/Commerce, General"
                        className="form-control"
                        {...register("qualification", {
                          required: "Study field is required",
                        })}
                      />
                      {errors.qualification && (
                        <ErrorMessage msg={errors.qualification.message} />
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <label>Grade</label>
                    <div className="fieldset">
                      <input
                        type="text"
                        name=""
                        placeholder="Ex: Business/Commerce, General"
                        className="form-control"
                        {...register("grade", {
                          required: "Grade field is required",
                        })}
                      />
                      {errors.gradeField && (
                        <ErrorMessage msg={errors.gradeField.message} />
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <label>Activities and Societies</label>
                    <div className="fieldset">
                      <input
                        type="text"
                        name=""
                        placeholder="Ex: Alpha Phi Omega, Chamber  Chorale, Debate Team"
                        className="form-control"
                        {...register("activities_and_societies", {
                          // required: "activity_societies is required",
                        })}
                      />
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
                          // required: "Description is required",
                        })}
                      ></textarea>
                      <span className="characters-sets">
                        {/* 5000 characters */}
                        <RemainingCount typedCharacters={watch("description")?.length}/>
                        </span>
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
                        {edit ? "Update" : "Add"} Qualification
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
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

export default AddEditQualificationModal;
