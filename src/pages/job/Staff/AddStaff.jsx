import React, { useState } from "react";
import userSvg from "../../../assets/images/user.svg";
import Placeholder from "../../../assets/images/img-placeholder.png";
import emailSvg from "../../../assets/images/email.svg";
import phoneSvg from "../../../assets/images/phone-icon.svg";
import passwordIcon from "../../../assets/images/password-icon.svg";
import designation from "../../../assets/images/designation.svg";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import "./style.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createstaffData,
  editStaffData,
  createStaffImg,
} from "../../../API/staffApiData";
import ErrorMessage from "../../../components/errorMsg/ErrorMessage";
import {
  MOBILE_NO_MAX_ERROR_MSG,
  MOBILE_NO_MIN_ERROR_MSG,
} from "../../../utils/ErrorMessages";
import PageLoader from "../../../components/loader/PageLoader";
import { APPLICATION_BASE_URL } from "../../../config/APIConfig";
import { STAFF_ROLE } from "../../../constants/Constent";
import { EMAIL_REGEX } from "../../../config/regexForValidation";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  designation: yup.string().required("Designation is required"),
  skill_level: yup.string().required("Role is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 digits long.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  phone_number: yup
    .string()
    .matches(
      /^[0-9]+$/,
      "Mobile number must contain only digits with country code eg: 919898989898"
    )
    .min(12, MOBILE_NO_MIN_ERROR_MSG)
    .max(15, MOBILE_NO_MAX_ERROR_MSG)
    .required("Mobile number is required"),
  email: yup
    .string()
    .matches(EMAIL_REGEX,"Invalid email address")
    // .email("Invalid email address")
    .required("Email is required"),
});

export default function AddStaff() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [loader, setLoader] = useState(false);
  const [staffUserId, setStaffUserId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordValue, setPasswordValue] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (state && state.staffMember) {
      setStaffUserId(state.staffMember.id);
      const userProperties = ["first_name", "last_name", "email", "password"];

      userProperties.forEach((property) => {
        setValue(property, state.staffMember[property]);
      });
      if (state?.staffMember?.phone_number[0] === "+") {
        setValue("phone_number", state?.staffMember?.phone_number?.slice(1));
      }
      setValue("designation", state.staffMember.designation);
      setValue("skill_level", state.staffMember.groups[0]?.name);
      setValue("profile_picture", state.staffMember.profile_picture);
      // setSelectedImage(state.staffMember.profile_picture)
    }
  }, [state]);

  const handleCancel = () => {
    navigate("/job-recruiter/staff");
  };
  const handleImageChange = (event) => {
    // const file = e.target.files[0];

    const file = event.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      toast.error("Please upload vaild format image(jpg,jpeg,png)");
    } else {
      setSelectedImage(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUpdatePassword = () => {
    if (state) {
      setIsEditable(true);
    }
  };
  const onSubmit = (data) => {
    const payload = {
      ...data,
      phone_number: `+${data.phone_number}`,
    };
    setLoader(true);
    if (state && state.staffMember) {
      // Editing existing staff member
      editStaffData(state.staffMember.id, payload)
        .then((response) => {
          if (selectedImage) {
            const formData = new FormData();
            formData.append("profile_picture", selectedImage);
            createStaffImg(response.data?.data?.id, formData)
              .then((response) => {
                navigate("/job-recruiter/staff");
                setLoader(false);
              })
              .catch((err) => {
                setLoader(false);
                console.log(err);
              });
          } else {
            toast.success("Staff updated successfully");
            navigate("/job-recruiter/staff");
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong");
          }
          console.error("Error updating data:", error);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      createstaffData(payload)
        .then((response) => {
          if (selectedImage) {
            const formData = new FormData();
            formData.append("profile_picture", selectedImage);
            createStaffImg(response.data?.data?.id, formData)
              .then((response) => {
                toast.success("Staff Created Successfully");
                navigate("/job-recruiter/staff");
                setLoader(false);
              })
              .catch((err) => {
                setLoader(false);
                console.log(err);
              });
          } else {
            toast.success("Staff Created Successfully");
            navigate("/job-recruiter/staff");
          }
        })
        .catch((error) => {
          setLoader(false);
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong");
          }
          console.error("Error saving data:", error);
        });
    }
  };

  return (
    <>
     <JobRecruiterDashboardLayout
        header={(state?.staffMember)?"Edit Staff" :"Add Staff"}
        subTitle={"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at"}
        showSearchBar={false}
        showSidebar = {false}
      >
      {loader && <PageLoader className="loader_stance" />}
      <section className="dashboard-main-panel">
        <div className="addStaffForm">
          <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
            <div className="fieldset-heading">
              <h6>Staff Details</h6>
              <p>Provide your staff details</p>
            </div>
            <div className="form-field shadow-box">
              <div className="row">
                <div className="col-12 pb-3 mb-4">
                  <div className="fieldset">
                    <div className="expert_profile_image">
                      <div className="profile_avtar">
                        <div className="upload_file_btn">
                          <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                          />
                        </div>
                        <img
                          id="companyLogo"
                          src={
                            imagePreview
                              ? imagePreview
                              : state?.staffMember?.profile_picture
                              ? `${APPLICATION_BASE_URL}${state.staffMember.profile_picture}`
                              : Placeholder
                          }
                          alt="Staff Image"
                        />
                      </div>
                      <p>Add Staff Image</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="fieldset">
                    <Controller
                      name="first_name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          className="form-control input-icon phone-number"
                          placeholder="First Name"
                        />
                      )}
                    />
                    <span className="input-field-icon">
                      <img src={userSvg} alt="user icon" />
                    </span>
                    {errors.first_name && (
                      <ErrorMessage msg={errors.first_name.message} />
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="fieldset">
                    <Controller
                      name="last_name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          className="form-control input-icon phone-number"
                          placeholder="Last Name"
                        />
                      )}
                    />
                    <span className="input-field-icon">
                      <img src={userSvg} alt="user icon" />
                    </span>
                    {errors.last_name && (
                      <ErrorMessage msg={errors.last_name.message} />
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="fieldset">
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          className="form-control input-icon phone-number"
                          placeholder="Email"
                        />
                      )}
                    />
                    <span className="input-field-icon">
                      <img src={emailSvg} alt="user icon" />
                    </span>
                    {errors.email && (
                      <ErrorMessage msg={errors.email.message} />
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="fieldset">
                    <Controller
                      name="phone_number"
                      control={control}
                      defaultValue=""
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
                      <img src={phoneSvg} alt="phone icon" />
                    </span>
                    {errors.phone_number && (
                      <ErrorMessage
                        id="error-message-phone"
                        msg={errors.phone_number.message}
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="fieldset">
                    <Controller
                      name="designation"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          className="form-control input-icon phone-number"
                          placeholder="Designation"
                        />
                      )}
                    />
                    <span className="input-field-icon">
                      <img src={designation} alt="designation icon" />
                    </span>
                    {errors.designation && (
                      <ErrorMessage msg={errors.designation.message} />
                    )}
                  </div>
                </div>
                {!state?.staffMember && (
                  <div className="col-md-6 col-12">
                    <div className="fieldset">
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <div>
                            <input
                              {...field}
                              placeholder={"Password"}
                              className="password form-control input-icon"
                              type={showPass ? "text" : "password"}
                              // disabled={state ? !isEditable : isEditable}
                              aria-invalid="true"
                              aria-errormessage="error-message-pasword"
                            />
                          </div>
                        )}
                      />

                      <i
                        className={`far icon-position ${
                          showPass ? "fa-eye fa-eye-slash" : "fa-eye-slash"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPass(!showPass)}
                      ></i>
                      <span className="input-field-icon">
                        <img src={passwordIcon} />
                      </span>

                      {/* {state && state.staffMember && (
                      <button
                        type="button"
                        onClick={handleUpdatePassword}
                        className="update-password-btn save-btnn mt-2 py-2 px-2"
                      >
                        Update Password
                      </button>
                    )} */}

                      {errors.password && (
                        <ErrorMessage
                          id="error-message-pasword"
                          msg={errors.password.message}
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className="col-md-12 col-12 mt-2">
                  <label>Role</label>
                  <div className="fieldset">
                    <div className="radio-btns mb-2">
                      {STAFF_ROLE?.map((curSkillLevel, index) => (
                        <div className="radio-btn-items" key={index}>
                          <input
                            {...register("skill_level")}
                            type="radio"
                            name="skill_level"
                            value={curSkillLevel.key}
                            // checked={curSkillLevel === }
                          />
                          <span>{curSkillLevel.value}</span>
                        </div>
                      ))}
                    </div>
                    {errors.skill_level && (
                      <ErrorMessage
                        id="error-message-pasword"
                        msg={errors.skill_level.message}
                      />
                    )}
                  </div>
                </div>

                <div className="col-12 text-center mt-5">
                  <div className="fieldset d-flex justify-content-center">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="cancel-btnn"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="save-btnn">
                      {state ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      </JobRecruiterDashboardLayout>
    </>
  );
}
