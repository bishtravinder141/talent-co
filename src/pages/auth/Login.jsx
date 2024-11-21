import phoneIcon from "../../assets/images/phone-icon.svg";
import passwordIcon from "../../assets/images/password-icon.svg";
import "./login.css";
import AuthLayout from "./AuthLayout";
import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../../components/errorMsg/ErrorMessage";
import { Link } from "react-router-dom";
import { authAxios } from "../../config/APIConfig";
import { LOGIN } from "../../config/APIUrls";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialAuth/SocialLogin";
import { ROLES, googleCaptchaID } from "../../config/authConfig";
import LoginType from "./LoginType";
import SubmitButton from "../../components/button/SubmitButton";
import { useDispatch } from "react-redux";
import { setMobile } from "../../redux/authSlice";
import { updateRecruiterData } from "../../redux/recruiterSlice";
import { updateJobSeekerData } from "../../redux/jobSeekerSlice";
import ReCAPTCHA from "react-google-recaptcha";
import {
  CAPTCHA_ERROR_MSG,
  MOBILE_NO_MAX_ERROR_MSG,
  MOBILE_NO_MIN_ERROR_MSG,
} from "../../utils/ErrorMessages";

const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  // .min(10, "Password must be at least 10 digits long."),
  phone_number: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .min(12, MOBILE_NO_MIN_ERROR_MSG)
    .max(15, MOBILE_NO_MAX_ERROR_MSG),
  // Add more fields and validation rules as needed
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });
  const [buttonLoader, setButtonLoader] = useState(false);
  const [step, setStep] = useState("Login");
  const [userDetails, setUserDetails] = useState({ id: "" });
  const [remember, setIsRemember] = useState(false);
  const [selectCaptcha, setSelectedCaptcha] = useState(false);
  const selectedRole = localStorage.getItem("selectedRole");
  const isToken = localStorage.getItem("token");
  const recaptchaRef = useRef();
  const loginPageView = isToken ? selectedRole : true;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  }); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("phone_number");
    const storedPass = localStorage.getItem("password");
    if (storedUsername && storedPass) {
      setValue("phone_number", storedUsername);
      setValue("password", storedPass);
      setIsRemember(true);
    }
  }, []);

  const afterAPISuccess = () => {
    setStep("SelectUser");
  };

  const onChange = (value) => {
    setSelectedCaptcha(true);
    setShowErrorMsg({ show: false, msg: "" });
    console.log("Captcha value:", value);
  };

  const onSubmit = (data) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue.length <= 0) {
      setShowErrorMsg({ show: true, msg: CAPTCHA_ERROR_MSG });
      return;
    }
    if (showErrorMsg.show) {
      return;
    }
    const payload = { ...data, phone_number: "+" + data.phone_number };
    setButtonLoader(true);
    authAxios
      .post(LOGIN, payload)
      .then((res) => {
        setUserDetails({
          id: res.data.data?.id,
        });
        const role = res.data?.data?.groups
          ? res.data.data.groups[0]?.name
          : null;
        localStorage.setItem("token", res.data.data.access);
        localStorage.setItem("refresh_token", res.data.data.refresh);
        localStorage.setItem("user_id", res.data.data.id);
        localStorage.setItem("selectedRole", role);
        // dispatch(setRole(role))
        localStorage.setItem("phone_number", res.data.data.phone_number);
        dispatch(setMobile(res.data.data.phone_number));
        if (role) {
          if (role === ROLES.jobseeker) {
            dispatch(updateJobSeekerData(res.data.data));
            navigate("/job-seeker/dashboard");
          } else {
            dispatch(updateRecruiterData(res.data.data));
            navigate("/job-recruiter/dashboard");
          }
        } else {
          afterAPISuccess();
        }
        toast.success("Login successfully");
        setButtonLoader(false);
      })
      .catch((err) => {
        setButtonLoader(false);
        if (err?.response?.status === 400) {
          setShowErrorMsg({ show: true, msg: err.response.data.message });
        } else {
          toast.error("something went wrong");
        }
        console.log(err.message, "error in the login");
      });
  };

  const handleChange = () => {
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };

  const afterSelectUserType = (loginType) => {
    if (loginType === ROLES.jobseeker) {
      navigate("/job-seeker/dashboard");
    } else {
      navigate("/job-recruiter/dashboard");
    }
  };

  const rememberOnchange = (e) => {
    if (e.target.checked) {
      localStorage.setItem("phone_number", watch("phone_number"));
      localStorage.setItem("password", watch("password"));
    } else {
      localStorage.removeItem("phone_number");
      localStorage.removeItem("password");
    }

    setIsRemember(!remember);
  };

  return (
    <>
      {step === "Login" && loginPageView ? (
        <AuthLayout>
          <h2>Login</h2>
          <div className="form-wrap">
            <form name="login-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="fieldset">
                <Controller
                  name="phone_number"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        // Allow only numeric input
                        handleChange();
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        field.onChange(numericValue);
                      }}
                      className="form-control input-icon phone-number"
                      placeholder="Phone number eg: 919898989898"
                      aria-label="Has Error"
                      aria-invalid="true"
                      aria-errormessage="error-message-phone"
                    />
                  )}
                />
                {/* <input
              type="text"
              placeholder="Phone number"
              className="form-control input-icon phone-number"
              {...register("phone_number", {
                required: "Phone number is required.",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            /> */}
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
                          handleChange();
                          field.onChange(e);
                        }}
                        placeholder="Password"
                        className="password form-control input-icon"
                        type={showPass ? "text" : "password"}
                        aria-label="Has Error"
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
                  onClick={() => setShowPass((prev) => !prev)}
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
              </div>
              {showErrorMsg.show && <ErrorMessage msg={showErrorMsg.msg} />}

              <div className="fieldset d-flex align-items-center justify-content-between remember my-3">
                <div className="custom_check position-relative me-2">
                  <input
                    type="checkbox"
                    id="rememberme"
                    checked={remember}
                    onChange={(e) => rememberOnchange(e)}
                  />
                  <span></span>
                  <label className="form-check-label ms-1" htmlFor="rememberme">
                    Remember me
                  </label>
                </div>
                <Link to={"/forgot-password"}>Forgot password?</Link>
              </div>

              <div className="fieldset mt-2 mb-2">
                <SubmitButton
                  loader={buttonLoader}
                  disabled={showErrorMsg.show || buttonLoader}
                  contentText={"Login"}
                />
              </div>
            </form>

            <div className="or-with">
              <span>Or Login with</span>
            </div>
            <SocialLogin afterAPISuccess={afterAPISuccess} />
            <div className="d-flex justify-content-center mt-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={googleCaptchaID}
                onChange={onChange}
              />
            </div>
            <p>
              Don’t have an account? <Link to={"/register"}> Sign Up</Link>.
            </p>
          </div>
        </AuthLayout>
      ) : (
        <LoginType
          afterSelectUserType={afterSelectUserType}
          userID={userDetails.id}
        />
      )}
    </>
  );
};

export default Login;
