import phoneIcon from "../../assets/images/phone-icon.svg";
import passwordIcon from "../../assets/images/password-icon.svg";
import userIcon from "../../assets/images/user.svg";
import "./login.css";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../../components/errorMsg/ErrorMessage";
import { authAxios } from "../../config/APIConfig";
import { REGISTER } from "../../config/APIUrls";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import VerifyOTP from "./VerifyOTP";
import LoginType from "./LoginType";
import SocialLogin from "../../components/SocialAuth/SocialLogin";
import SubmitButton from "../../components/button/SubmitButton";
import { ROLES, googleCaptchaID } from "../../config/authConfig";
import ReCAPTCHA from "react-google-recaptcha";
import {
  CAPTCHA_ERROR_MSG,
  MOBILE_NO_MIN_ERROR_MSG,
  MOBILE_NO_MAX_ERROR_MSG,
} from "../../utils/ErrorMessages";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
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
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Passwords and confirm password must match"
    )
    .required("Confirm Password is required"),
});

const Register = () => {
  const [showPass, setShowPass] = useState({
    confirmPass: false,
    pass: false,
  });

  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });

  const [step, setStep] = useState("Register");
  const navigate = useNavigate();
  const [btnLoader, setButtonLoader] = useState(false);
  const [selectCaptcha, setSelectedCaptcha] = useState(false);
  const recaptchaRef = useRef();

  const {
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onChange = (value) => {
    setSelectedCaptcha(true);
    setShowErrorMsg({ show: false, msg: "" });
  };

  const onSubmit = (data) => {
    const recaptchaValue = recaptchaRef?.current?.getValue();
    if (recaptchaValue?.length <= 0) {
      setShowErrorMsg({ show: true, msg: CAPTCHA_ERROR_MSG });
      return;
    }
    if (!selectCaptcha) {
      setShowErrorMsg({ show: true, msg: CAPTCHA_ERROR_MSG });
      return;
    }
    const payload = { ...data, phone_number: "+" + data.phone_number };
    delete payload.confirmPassword;
    setButtonLoader(true);
    authAxios
      .post(REGISTER.createOtp, payload)
      .then((res) => {
        setButtonLoader(false);
        localStorage.setItem("first_name", payload.first_name);
        localStorage.setItem("last_name", payload.last_name);
        localStorage.setItem("phone_number", payload.phone_number);
        if (res?.data?.message) toast.success(res.data.message);
        setStep("OTP");
      })
      .catch((err) => {
        setButtonLoader(false);
        if (err?.response?.status === 400) {
          setShowErrorMsg({ show: true, msg: err.response.data?.message });
          toast.error(err.response.data?.message);
        }
      });
  };

  const handleChange = (type, value) => {
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    if (type === "password") {
      if (value === confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "", // Clear the error message
        });
      } else {
        if (confirmPassword.length > 0) {
          setError("confirmPassword", {
            type: "manual",
            message: "Passwords and confirm password must match",
          });
        }
      }
    }
    if (type === "confirmPassword") {
      if (password === value) {
        setError("confirmPassword", {
          type: "manual",
          message: "", // Clear the error message
        });
      }
    }
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };

  const afterAPISuccess = (data) => {
    if (data) {
      localStorage.setItem("token", data?.access);
      localStorage.setItem("refresh_token", data?.refresh);
      localStorage.setItem("user_id", data?.id);
    }
    setStep("SelectUser");
  };

  const afterSelectUserType = (loginType) => {
    if (loginType === ROLES.jobseeker) {
      navigate("/job-seeker/dashboard");
    } else {
      navigate("/job-recruiter/dashboard");
    }
  };

  const mobileNumberScreen = () => {
    setStep("Register");
  };

  return (
    <>
      {step === "Register" && (
        <AuthLayout>
          <h2>Sign Up</h2>
          <div className="form-wrap">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="fieldset">
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        handleChange("first_name", "name");
                        field.onChange(e.target.value);
                      }}
                      className="form-control input-icon phone-number"
                      placeholder="First Name"
                    />
                  )}
                />
                <span className="input-field-icon">
                  <img src={userIcon} />
                </span>
                {errors.first_name && (
                  <ErrorMessage msg={errors.first_name.message} />
                )}
              </div>
              <div className="fieldset">
                <Controller
                  name="last_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        handleChange("last_name", "name");
                        field.onChange(e.target.value);
                      }}
                      className="form-control input-icon phone-number"
                      placeholder="Last Name"
                    />
                  )}
                />
                <span className="input-field-icon">
                  <img src={userIcon} />
                </span>
                {errors.last_name && (
                  <ErrorMessage msg={errors.last_name.message} />
                )}
              </div>
              <div className="fieldset">
                <Controller
                  name="phone_number"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        handleChange("number", "num");
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
                {errors.phone_number && (
                  <ErrorMessage
                    id="error-message-phone"
                    msg={errors.phone_number.message}
                  />
                )}
              </div>
              <div className="fieldset">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        onChange={(e) => {
                          handleChange("password", e.target.value);
                          field.onChange(e);
                        }}
                        placeholder="Password"
                        className="password form-control input-icon"
                        type={showPass.pass ? "text" : "password"}
                        aria-invalid="true"
                        aria-errormessage="error-message-pasword"
                      />
                    </div>
                  )}
                />
                {/* <input
              type={showPass.pass ? "text" : "password"}
              name=""
              placeholder="Password"
              className="password form-control input-icon"
              id="field_password"
              {...register("password", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 6,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      value
                    ),
                },
              })}
            /> */}
                <i
                  className={`far icon-position ${
                    showPass.pass ? "fa-eye fa-eye-slash" : "fa-eye-slash"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowPass({ ...showPass, pass: !showPass.pass })
                  }
                ></i>
                <span className="input-field-icon">
                  <img src={passwordIcon} />
                </span>

                {errors.password && (
                  <ErrorMessage
                    id="error-message-pasword"
                    msg={errors.password.message}
                  />
                )}
                {/* {errors.password?.type === "checkLength" && (
              <ErrorMessage msg={"Password should be at-least 6 characters."} />
            )}
            {errors.password?.type === "matchPattern" && (
              <ErrorMessage
                msg={
                  "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol."
                }
              />
            )} */}
              </div>
              <div className="fieldset">
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        onChange={(e) => {
                          handleChange("confirmPassword", e.target.value);
                          field.onChange(e);
                        }}
                        placeholder="confirmPassword"
                        className="password form-control input-icon"
                        type={showPass.confirmPass ? "text" : "password"}
                        aria-label="Has Error"
                        aria-invalid="true"
                        aria-errormessage="error-message-confirm-pasword"
                      />
                    </div>
                  )}
                />
                {/* <input
              type={showPass.confirmPass ? "text" : "password"}
              name=""
              placeholder="Confirm Password"
              className="password form-control input-icon"
              id="field_password_confirm"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            /> */}
                <i
                  className={`far icon-position ${
                    showPass.confirmPass
                      ? "fa-eye fa-eye-slash"
                      : "fa-eye-slash"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowPass({
                      ...showPass,
                      confirmPass: !showPass.confirmPass,
                    })
                  }
                ></i>
                <span className="input-field-icon">
                  <img src={passwordIcon} />
                </span>
                {errors.confirmPassword && (
                  <ErrorMessage
                    id="error-message-confirm-pasword"
                    msg={errors.confirmPassword.message}
                  />
                )}
              </div>
              {showErrorMsg.show && <ErrorMessage msg={showErrorMsg.msg} />}
              <div className="fieldset">
                <SubmitButton
                  loader={btnLoader}
                  disabled={showErrorMsg.show || btnLoader}
                  contentText={"Sign Up"}
                />
              </div>
            </form>

            <div className="or-with">
              <span>Or Signup with</span>
            </div>

            <SocialLogin afterAPISuccess={afterAPISuccess} />
            <p>
              By continuing you accept our standard{" "}
              <Link to={"/rms-conditions.html"}>Terms and conditions</Link> and
              our <Link to={"/licies"}>Privacy policy</Link>.
            </p>
            <div className="d-flex justify-content-center mt-2 mb-2">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={googleCaptchaID}
                  onChange={onChange}
                />
              </div>
            <p>
              Already have an account? <Link to={"/login"}> Log In</Link>.
            </p>
          </div>
        </AuthLayout>
      )}
      {step === "OTP" && (
        <VerifyOTP
          afterAPISuccess={afterAPISuccess}
          mobileNumberScreen={mobileNumberScreen}
          mobileNo={watch("phone_number")}
          APIUrl={REGISTER.verifyOtp}
          registerFlow={true}
        />
      )}
      {step === "SelectUser" && (
        <LoginType afterSelectUserType={afterSelectUserType} />
      )}
    </>
  );
};

export default Register;
