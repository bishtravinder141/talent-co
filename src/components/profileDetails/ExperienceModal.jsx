import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../errorMsg/ErrorMessage";
import { useEffect, useState } from "react";
import InputFieldDate from "../inputFields/inputFieldDate";
import UpdateGoogleLocation from "../GoogleLocation/UpdateGoogleLocation";
import GoogleLocation from "../GoogleLocation";
import { TEXT_AREA_MAX_LENGTH } from "../../constants/Constent";
import RemainingCount from "../common/RemainingCount";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";

const ExperienceModal = ({
  showModal,
  toggleModal,
  setProfileDetails,
  profileDetails,
  edit,
  editModalData,
  index,
}) => {
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [location, setLocation] = useState({
    location: "",
    lat: "",
    long: "",
  });
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (edit) {
      Object.keys(editModalData).forEach((data) => {
        setValue(data, editModalData[data]);
      });
      setCurrentlyWorking(!editModalData.end_date);
      setLocation({...location,location:editModalData?.location});
    }
  }, [edit]);
  const preFinalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
    if (location.location.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const onSubmit = (data) => {
  console.log(location,"location on submit")
    if (location.location.length === 0) {
      setError(true);
      return;
    }
    let addEditData;
    const tempData = { ...data, location:location?.location };
    if (currentlyWorking) {
      delete tempData.end_date;
    }
    if (edit) {
      addEditData = [...profileDetails.experiences];
      addEditData[index] = { ...tempData };
    } else {
      addEditData = [...profileDetails.experiences, tempData];
    }
    setProfileDetails({
      ...profileDetails,
      experiences: [...addEditData],
    });
    toggleModal();
  };

  // const handleSelectLocation = (location, lat, long) => {
  //   setError(false);
  //   setLocation({
  //     location: location,
  //   });
  //   setValue("location", location);
  //   // setValue("lat", lat);
  //   // setValue("long", long);
  // };
  const handleLocation = (data) =>{
    const location = data?.label;
    const place_id = data?.value?.place_id
    handleCordinates(place_id,location)
  }
  const handleCordinates = async (placeId, loacation) => {
    try {
      const results = await geocodeByPlaceId(placeId);
      if (results.length > 0) {
        const { geometry } = results[0];
        const { location } = geometry;
        console.log("coordinates", {
          lat: location.lat(),
          long: location.lng(),
        });
        // setLocation({location:loacation, lat: location.lat(), long: location.lng() });
        setLocation({location:loacation });
        // Send location, longitude and latitude to parent
        // {
        //   path.pathname === "/job-seeker/setting"
        //     ? handleAddLocation(idx, loacation)
        //     : handleAddLocation(loacation, location.lat(), location.lng());
        // }
      }
    } catch (error) { 
      console.error("Error geocoding place ID:", error);
    }
  };
    return (
    <div>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        id="experiencePopup"
        tabIndex="-1"
        aria-labelledby="experiencePopupLabel"
        aria-hidden="true"
        // data-bs-backdrop="static"
        data-ds-keyboard="false"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="experiencePopupLabel">
                {edit ? "Update" : "Add"} Experience
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
              <form onSubmit={preFinalSubmit}>
                <div className="row">
                  <div className="col-12">
                    <label>Title</label>
                    <div className="fieldset">
                      <input
                        type="text"
                        name=""
                        placeholder="Ex: Retail Sales Manager"
                        className="form-control"
                        {...register("position", {
                          required: "Title is required",
                        })}
                      />
                      {errors.position && (
                        <ErrorMessage msg={errors.position.message} />
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <label>Employment Type</label>
                    <div className="fieldset">
                      <select
                        className="form-control"
                        {...register("employment_type", {
                          required: "Employment type is required",
                        })}
                      >
                        <option selected disabled value="">
                          Please Select
                        </option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                      </select>
                      {errors.employment_type && (
                        <ErrorMessage msg={errors.employment_type.message} />
                      )}
                    </div>
                    {/* <span>Country-Specific employment types</span> */}
                  </div>
                  <div className="col-12">
                    <label>Company Name</label>
                    <div className="fieldset">
                      <input
                        type="text"
                        name=""
                        placeholder="Ex: Microsoft"
                        className="form-control"
                        {...register("company_name", {
                          required: "Company Name is required",
                        })}
                      />
                      {errors.company_name && (
                        <ErrorMessage msg={errors.company_name.message} />
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <label>Location</label>
                    <div className="fieldset">
                      <GooglePlacesAutocomplete
                        apiKey={process.env.VITE_GOOGLE_MAP_API}
                        debounce={1000}
                        autocompletionRequest={
                          {
                            //   componentRestrictions: {
                            //     country: ["ng"], //to set the specific country
                            //   },
                          }
                        }
                        selectProps={{
                          //set default value
                          value: { label: location?.location, value: location?.location },
                          // onChange: setData, //save the value gotten from google
                          onChange:(data)=>handleLocation(data),
                          placeholder: "Enter location",
                        }}
                        onLoadFailed={(error) => {
                          console.log(error);
                        }}
                      />
                      {/* <GoogleLocation
                        handleAddLocation={handleSelectLocation}  
                        selectedValue={watch("location")}
                      /> */}
                      {/* <UpdateGoogleLocation
                        afterSelectLocation={handleSelectLocation}
                        // selectedLocation={watch("location")}
                        placeholder="Ex: London, United Kingdom"
                        hideIcon={true}
                        styleClass="form-control"
                      /> */}
                      {/* <input
                        type="text"
                        name=""
                        placeholder="Ex: London, United Kingdom"
                        className="form-control"
                        {...register("location", {
                          required: "Location is required",
                        })}
                      /> */}
                      {error && location.location.length === 0 && (
                        <ErrorMessage msg={"Location is required"} />
                      )}
                    </div>
                  </div>

                  <div className="col-6">
                    <label>Start Date</label>
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <InputFieldDate
                            max={new Date().toISOString().split("T")[0]}
                            {...register("start_date", {
                              required: "Start Date is required",
                            })}
                            validation={register("start_date", {
                              required: "Start Date is required",
                            })}
                          />
                          {errors.start_date && (
                            <ErrorMessage msg={errors.start_date.message} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <label>End Date</label>
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <InputFieldDate
                            disableField={
                              !watch("start_date") || (edit && currentlyWorking)
                            }
                            min={
                              watch("start_date")
                                ? new Date(watch("start_date"))
                                    ?.toISOString()
                                    ?.split("T")[0]
                                : undefined
                            }
                            validation={register("end_date", {
                              // required: "End Date is required",
                            })}
                          />
                          {errors.end_date && (
                            <ErrorMessage msg={errors.end_date.message} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label>Description</label>
                    <div className="fieldset">
                      <textarea
                        placeholder="Enter here.."
                        maxLength={TEXT_AREA_MAX_LENGTH}
                        className="form-control message-field"
                        {...register("job_description", {
                          // required: "Start Date is required",
                        })}
                      ></textarea>
                      <span className="characters-sets">
                        <RemainingCount
                          typedCharacters={watch("job_description")?.length}
                        />
                        {/* 5000 characters */}
                      </span>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="custom_check position-relative me-2">
                      <input
                        type="checkbox"
                        id="rememberme"
                        checked={currentlyWorking}
                        onChange={(e) => setCurrentlyWorking(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="rememberme">
                        I am currently working in this role
                      </label>
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
                        {edit ? "Update" : "Add"} Experience
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

export default ExperienceModal;
