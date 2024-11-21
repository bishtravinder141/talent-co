import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../../components/errorMsg/ErrorMessage";
import passwordIcon from "../../assets/images/password-icon.svg";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import "./login.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { authAxios } from "../../config/APIConfig";
import { RESET_PASSWORD } from "../../config/APIUrls";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 digits long.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: yup
    .string()
    // .oneOf(
    //   [yup.ref("password"), null],
    //   "Passwords and confirm password must match"
    // )
    .required("Confirm Password is required"),
});

const ResetPassword = ({ userId, setUserId, setStep }) => {
  const {
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const [showPass, setShowPass] = useState({
    confirmPass: false,
    pass: false,
  });
  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });
  const [showResetPassSuccess, setShowResetPassSuccess] = useState(false);

  const onSubmit = (data) => {
    const payload = {
      user_code: userId,
      new_password: data.password,
    };
    authAxios
      .post(RESET_PASSWORD, payload)
      .then((res) => {
        if (res.status === 200) {
          setUserId("")
          toast.success(res?.data?.message);
          setShowResetPassSuccess(true);
        }
      })
      .catch((err) => {
        if(err.response.status === 400) {
          setStep("Forgot")
        }
        // if(err.resolver)
        const erroMessage = err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong";
        toast.error(erroMessage);
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

  return (
    <>
      {showResetPassSuccess ? (
        <ResetPasswordSuccess />
      ) : (
        <section className="login-process-sec py-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="login-process-wrap">
                  <h3>
                    Create new password
                  </h3>

                  <div className="form-wrap pt-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                              />
                            </div>
                          )}
                        />
                        <i
                          className={`far icon-position ${
                            showPass.pass
                              ? "fa-eye fa-eye-slash"
                              : "fa-eye-slash"
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
                          <ErrorMessage msg={errors.password.message} />
                        )}
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
                                  handleChange(
                                    "confirmPassword",
                                    e.target.value
                                  );
                                  field.onChange(e);
                                }}
                                placeholder="confirmPassword"
                                className="password form-control input-icon"
                                type={
                                  showPass.confirmPass ? "text" : "password"
                                }
                              />
                            </div>
                          )}
                        />
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
                          <ErrorMessage msg={errors.confirmPassword.message} />
                        )}
                      </div>
                      <div className="fieldset">
                        <button type="submit" className="btn-design">
                          Reset Password
                        </button>
                      </div>

                      <p>
                        Please create a password with at least 10 characters
                        that uses a combination of uppercase and lowercase
                        letters, numbers, and special characters (e,g .,!?$).
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ResetPassword;
