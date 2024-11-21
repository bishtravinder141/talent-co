import React, { useState } from "react";
import JobAlertPreferencesTab from "./tabs/JobAlertPreferencesTab";
import AccountSettingsTab from "./tabs/AccountSettingsTab";
import SettingsTabButton from "../../../components/button/SettingsTabButton";
import JobSeekerDashboardLayout from "../../../layouts/job-seeker/JobSeekerDashboardLayout";
import Header from "../../../components/job-recruiter/dashboard/Header";
import PageLoader from "../../../components/loader/PageLoader";
import { SEEKER_TAB_NAMES } from "./constant";
import NotificationTab from "../../job/settings/Tabs/NotificationTab";
import "../job-seeker-dashboard.css";

const JobSeekerSettings = () => {
  const [loader, setLoader] = useState(false);
  const [tabName, setTabName] = useState(SEEKER_TAB_NAMES[0].Tab_Name);
  return (
    <JobSeekerDashboardLayout
      header={"Settings"}
      subTitle={
        "Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at."
      }
      showSearchBar={false}
    >
      <div className="reduce-navbar">
        <div className="jobalert_setting">
          {loader && <PageLoader />}
          <div className="dashboard-application">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {SEEKER_TAB_NAMES.map((curTab, idx) => {
                return (
                  <li key={idx} className="nav-item" role="presentation">
                    <SettingsTabButton
                      contentText={curTab.Tab_Name}
                      id={curTab.id}
                      selecteTab={tabName}
                      callback={() => setTabName(curTab.Tab_Name)}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="tab-content" id="myTabContent">
              {tabName === SEEKER_TAB_NAMES[0].Tab_Name && (
                <JobAlertPreferencesTab setLoader={setLoader} />
              )}

              {tabName === SEEKER_TAB_NAMES[1].Tab_Name && (
                <div className="notifications-setting border pg-20">
                  <NotificationTab setLoader={setLoader} />
                </div>
              )}

              {tabName === SEEKER_TAB_NAMES[2].Tab_Name && (
                <AccountSettingsTab setLoader={setLoader} />
              )}
            </div>
          </div>
        </div>
      </div>
    </JobSeekerDashboardLayout>
  );
};

export default JobSeekerSettings;
