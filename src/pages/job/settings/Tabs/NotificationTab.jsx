import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../../../API/settingsApi";
import { toastMessage } from "../../../../utils/toastMessages";
import {
  failureMessage,
  settingSuccessMessage,
  successType,
} from "../../../../utils/allToastMessage";
import {
  EmailNotificationError,
  EmailNotificationMessage,
  PushNotificationMessage,
  SmsNotificationError,
  SmsNotificationMessage,
  settingDetails,
} from "../constant";
import { getProfileData } from "../../../../API/candidateProfile";
import ErrorMessage from "../../../../components/errorMsg/ErrorMessage";
import { useSelector } from "react-redux";

const NotificationTab = ({ setLoader }) => {
  const [setting, setSetting] = useState({
    interview_email: false,
    interview_push: false,
    interview_sms: false,
    message_email: false,
    message_push: false,
    message_sms: false,
    talent_matched_email: false,
    talent_matched_push: false,
    talent_matched_sms: false,
  });
  const [emailError, setEmailError] = useState({
    showError: false,
    index: null,
  });
  const [smsError, setSMSError] = useState({ showError: false, index: null });
  const {jobSeekerProfile} = useSelector((state)=>state.jobSeeker);
  useEffect(() => {
    getSettings()
      .then((res) => {
        setSetting(res.data.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  const handleOnchange = (val, idx) => {
    let tempEmailError = emailError;
    let tempSmsError = smsError;
    if (val.includes("email") && jobSeekerProfile?.email === "") {
      setEmailError({ ...emailError, showError: true, index: idx });
      tempEmailError = true;
    } else if (val.includes("sms") && jobSeekerProfile?.phone_number === "") {
      setSMSError({ ...emailError, showError: true, index: idx });
      tempSmsError = true;
    }
    if (!tempSmsError.showError && !tempEmailError.showError) {
      const payload = {
        [val]: !setting[val],
      };
      setLoader(true);
      updateSettings(payload)
        .then((res) => {
          setLoader(false);
          toastMessage(settingSuccessMessage, successType);
          setSetting({ ...setting, [val]: !setting[val] });
        })
        .catch((err) => {
          setLoader(false);
          toastMessage(failureMessage);
        });
    }
  };
  return (
    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade show active"
        id="notification"
        role="tabpanel"
        aria-labelledby="notification-tab"
      >
        <div className="notifications-setting">
          <h6>Notifications</h6>
          <p>
            We may still send you important notification about your account
            outside of your notification settings
          </p>

          {settingDetails.map((stg, idx) => (
            <div className="reminder-setting" key={idx}>
              <div className="row">
                <div className="col-6">
                  <h6>{stg.title}</h6>
                  <p>{stg.subTitle}</p>
                </div>
                <div className="col-6">
                  <div className="profile-to-public">
                    <span
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title={`${PushNotificationMessage}`}
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        name="push_notification_status"
                        value="true"
                        id="push_notification_status"
                        type="checkbox"
                        className="switch_1 toggle-label"
                        checked={setting[`${stg.checkBox}_push`]}
                        onChange={() =>
                          handleOnchange(`${stg.checkBox}_push`, idx)
                        }
                      />
                      Push
                    </span>
                    <span
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title={
                        jobSeekerProfile?.email === ""
                          ? `${EmailNotificationError}`
                          : `${EmailNotificationMessage}`
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        name="push_notification_status"
                        value="true"
                        id="push_notification_status"
                        type="checkbox"
                        className="switch_1 toggle-label"
                        checked={setting[`${stg.checkBox}_email`]}
                        disabled={jobSeekerProfile?.email === ""}
                        onChange={() =>
                          handleOnchange(`${stg.checkBox}_email`, idx)
                        }
                      />
                      Email
                    </span>
                    {emailError.showError && emailError.index === idx && (
                      <p className="text-center text-danger">
                        {EmailNotificationError}
                      </p>
                    )}

                    <span
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title={
                        jobSeekerProfile?.phone_number === ""
                          ? `${SmsNotificationError}`
                          : `${SmsNotificationMessage}`
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        name="push_notification_status"
                        value="true"
                        id="push_notification_status"
                        type="checkbox"
                        className="switch_1 toggle-label"
                        checked={setting[`${stg.checkBox}_sms`]}
                        onChange={() =>
                          handleOnchange(`${stg.checkBox}_sms`, idx)
                        }
                        disabled={jobSeekerProfile?.phone_number === ""}
                      />
                      SMS
                    </span>

                    {smsError.showError && smsError.index === idx && (
                      <p className="text-center text-danger">
                        {SmsNotificationError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;
