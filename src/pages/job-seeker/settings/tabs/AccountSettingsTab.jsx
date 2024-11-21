import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../../../../components/errorMsg/ErrorMessage";
import { changePassword } from "../../../../API/candidateProfile";
import { toastMessage } from "../../../../utils/toastMessages";
import { response } from "msw";
import {
  accountDeletedMessage,
  failureMessage,
  successType,
} from "../../../../utils/allToastMessage";
import SubmitButton from "../../../../components/button/SubmitButton";
import DeleteAccountModal from "../../../../components/common/model/DeleteAccountModal";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../API/candidateJobs";
import { reduxStore } from "../../../../redux/store";
import persistStore from "redux-persist/es/persistStore";

const AccountSettingsTab = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [show, setShow] = useState({
    old_password: false,
    new_password: false,
  });
  const schema = yup.object().shape({
    old_password: yup.string().required("This field are required"),
    new_password: yup
      .string()
      .required("This field are required")
      .min(6, "Password must be at least 6 digits long.")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
  });
  const [passwordError, setPasswordError] = useState(false);
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handlePassword = (values) => {
    const payload = {
      ...values,
      confirm_password: values?.new_password,
    };
    if (!passwordError) {
      setLoader(true);
      changePassword(payload)
        .then((res) => {
          setLoader(false);
          toastMessage(res?.data?.message, successType);
          setValue("new_password", "");
          setValue("old_password", "");
        })
        .catch((err) => {
          if (err?.response?.data?.message?.old_password[0]) {
            toastMessage(err?.response?.data?.message?.old_password[0]);
          } else {
            toastMessage(failureMessage);
          }
          setLoader(false);
        });
    }
  };
  const handleShow = (inputName) => {
    show[inputName]
      ? setShow({ ...show, [inputName]: false })
      : setShow({ ...show, [inputName]: true });
  };
  const handleChange = (type, value) => {
    const old_password = watch("old_password");
    const new_password = watch("new_password");
    if (watch("old_password") && watch("new_password")) {
      if (type === "old_password") {
        if (value === new_password) {
          // setError("old_password", {
          //   type: "manual",
          //   message: "old password and new password should not match",
          // });
          setPasswordError(true);
        } else {
          // setError("old_password", {
          //   type: "manual",
          //   message: "", // Clear the error message
          // });
          setPasswordError(false);
        }
      } else if (type === "new_password") {
        if (value === old_password) {
          // setError("old_password", {
          //   type: "manual",
          //   message: "old password and new password should not match",
          // });
          setPasswordError(true);
        } else {
          // setError("old_password", {
          //   type: "manual",
          //   message: "", // Clear the error message
          // });
          setPasswordError(false);
        }
      }
    }
  };

  const toggleModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleConfirmDelete = () => {
    deleteAccount()
      .then((res) => {
        toastMessage(accountDeletedMessage, successType);
        localStorage.clear();
        persistStore(reduxStore).purge();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toastMessage(failureMessage);
        toggleModal();
      });
  };
  const handleResetPassword = () => {
    localStorage.clear();
    persistStore(reduxStore).purge();
  };
  return (
    <>
      <div
        className=""
        id="account-setting"
        role="tabpanel"
        aria-labelledby="account-setting-tab"
      >
        <div className="accountSettins border  pg-20">
          <div className="alerts-pref  border-bottom">
            <h5>Account Settings</h5>
            <p>
              Here you can update the info used to determine the job in your
              daily job alerts emails and notifications
            </p>
          </div>

          <div className="form-field-max-width mt-4">
            <div className="PassWord border-bottom pb-4">
              <div className="PasswordINfo">
                <h5>Password</h5>
                <form onSubmit={handleSubmit(handlePassword)}>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="fieldset">
                        <Controller
                          name="old_password"
                          control={control}
                          defaultValue=""
                          render={({ field }) => {
                            return (
                              <div>
                                <input
                                  {...field}
                                  onChange={(e) => {
                                    handleChange(
                                      "old_password",
                                      e.target.value
                                    );
                                    field.onChange(e);
                                  }}
                                  type={show.old_password ? "text" : "password"}
                                  name="old_password"
                                  placeholder="Old password"
                                  className="password form-control input-icon"
                                  id="field_password_confirm"
                                  aria-errormessage="error-message-old-pasword"
                                />
                              </div>
                            );
                          }}
                        />
                        <i
                          className={`far icon-position ${
                            show?.old_password
                              ? "fa-eye fa-eye-slash"
                              : "fa-eye-slash"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleShow("old_password");
                          }}
                        ></i>
                        <span className="input-field-icon">
                          <img src="../assets/images/password-icon.svg" />
                        </span>
                        {/*  */}
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="fieldset">
                        <Controller
                          name="new_password"
                          control={control}
                          defaultValue=""
                          render={({ field }) => {
                            return (
                              <div>
                                <input
                                  {...field}
                                  onChange={(e) => {
                                    handleChange(
                                      "new_password",
                                      e.target.value
                                    );
                                    field.onChange(e);
                                  }}
                                  type={show.new_password ? "text" : "password"}
                                  name="new_password"
                                  placeholder="New password"
                                  className="password form-control input-icon"
                                  id="field_password_confirm"
                                  aria-errormessage="error-message-new-pasword"
                                />
                              </div>
                            );
                          }}
                        />
                        <i
                          className={`far icon-position ${
                            show?.new_password
                              ? "fa-eye fa-eye-slash"
                              : "fa-eye-slash"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleShow("new_password");
                          }}
                        ></i>
                        <span className="input-field-icon">
                          <img src="../assets/images/password-icon.svg" />
                        </span>
                      </div>
                    </div>
                    {passwordError && (
                      <ErrorMessage msg="Old password and new password cannot be same" />
                    )}
                    {errors?.old_password?.message?.length > 0 && (
                      <ErrorMessage
                        id={"error-message-new-pasword"}
                        msg={errors.old_password.message}
                      />
                    )}
                    <div className="col-12">
                      <p>
                        Can’t remember your current password?{" "}
                        <Link
                          to="/forgot-password"
                          onClick={handleResetPassword}
                        >
                          Reset your password
                        </Link>
                      </p>
                      <SubmitButton
                        contentText="Save Password"
                        loader={loader}
                        disabled={loader}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="deleteAccount mt-3">
              <h5>Delete Account</h5>
              <p>Would you like to delete your account?</p>
              <p>
                Deleting your account will remove all the content associated
                with it.
              </p>
              <Link onClick={toggleModal}>I want to delete my account</Link>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteAccountModal
          toggleModal={toggleModal}
          showDeleteModal={showDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default AccountSettingsTab;
