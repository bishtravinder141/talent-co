import "./login.css";
// import phoneIcon from "../../assets/images/phone-icon.svg";
// import captchaIcon from "../../assets/images/captcha.jpg";
import ErrorMessage from "../../components/errorMsg/ErrorMessage";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import VerifyOTP from "./VerifyOTP";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authAxios } from "../../config/APIConfig";
import { toast } from "react-toastify";
import {
  FORGOT_PASSWORD,
  RESET_PASSWORD_VERIFY_OTP,
} from "../../config/APIUrls";
import ResetPassword from "./ResetPassword";
import SubmitButton from "../../components/button/SubmitButton";
import { googleCaptchaID } from "../../config/authConfig";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_ERROR_MSG, MOBILE_NO_MAX_ERROR_MSG, MOBILE_NO_MIN_ERROR_MSG } from "../../utils/ErrorMessages";

const validationSchema = yup.object().shape({
  phone_number: yup
  .string()
  .required("Mobile number is required")
  .matches(
    /^[0-9]+$/,
    "Mobile number must contain only digits with country code eg: 919898989898"
    )
    .min(12, MOBILE_NO_MIN_ERROR_MSG)
    .max(15, MOBILE_NO_MAX_ERROR_MSG),
    // Add more fields and validation rules as needed
  });
  
  const ForgotPassword = () => {
    const [step, setStep] = useState("Forgot");
    const [buttonLoader, setButtonLoader] = useState(false);
    const [userId, setUserId] = useState('');
    const recaptchaRef = useRef();
    const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if(recaptchaValue.length <=0 ) {
      setShowErrorMsg({ show: true, msg: CAPTCHA_ERROR_MSG });
      return
    }
    setButtonLoader(true);
    authAxios
      .post(FORGOT_PASSWORD, { phone_number: `+${data.phone_number}` })
      .then((res) => {
        setButtonLoader(false);
        if (res.status === 200) {
          setStep("otp");
          toast.success(res?.data?.message);
        }
      })
      .catch((err) => {
        setButtonLoader(false);
        if (err?.response?.status === 400) {
          setShowErrorMsg({ show: true, msg: err.response.data.message });
        }
        const erroMessage = err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong";
        toast.error(erroMessage);
      });
  };

  const afterAPISuccess = () => {
    setStep("ResetPassword");
  };
  const handleChange = () => {
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };

  const onChange = (value) => {
    setShowErrorMsg({ show: false, msg: "" });
    console.log("Captcha value:", value);
  };


  return (
    <>
      <div>
        <section className="login-process-sec py-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {step === "Forgot" && (
                  <div className="login-process-wrap">
                    <h3>Forgot your Password?</h3>

                    <div className="form-wrap pt-4">
                      <form
                        aria-label="form-main"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="fieldset">
                          <Controller
                            name="phone_number"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                onChange={(e) => {
                                  handleChange();
                                  // Allow only numeric input
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
                            <img
                              src="./../assets/images/phone-icon.svg"
                              alt="img 1"
                            />
                          </span>
                          {errors.phone_number && (
                            <ErrorMessage
                              id="error-message-phone"
                              msg={errors.phone_number.message}
                            />
                          )}
                        </div>
                        {showErrorMsg.show && (
                          <ErrorMessage msg={showErrorMsg.msg} />
                        )}
                        <div className="fieldset">
                          <SubmitButton
                            loader={buttonLoader}
                            contentText={"Continue"}
                            disabled={buttonLoader}
                          />
                        </div>

                        <p>
                          Enter the phone number associated with your account
                          and we'll send you a One Time Password.
                        </p>

                        <div className="d-flex justify-content-center mt-2">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={googleCaptchaID}
                            onChange={onChange}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {step === "otp" && (
                  <VerifyOTP
                    afterAPISuccess={afterAPISuccess}
                    mobileNo={watch("phone_number")}
                    APIUrl={RESET_PASSWORD_VERIFY_OTP}
                    setUserId={setUserId}
                  />
                )}
                {step === "ResetPassword" && (
                  <ResetPassword userId={userId} setUserId={setUserId} setStep={setStep} />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;
