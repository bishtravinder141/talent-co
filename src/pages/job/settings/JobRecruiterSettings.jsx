import React, { useEffect, useState } from "react";
import Header from "../../../components/job-recruiter/dashboard/Header";
import PageLoader from "../../../components/loader/PageLoader";
import NotificationTab from "./Tabs/NotificationTab";
import SubscriptionPlanTab from "./Tabs/SubscriptionPlanTab";
import { TAB_NAME } from "./constant";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";
import {  isAllowedSubscriptionPlansAccess } from "../staffManagement";

const JobRecruiterSettings = () => {
  const [loader, setLoader] = useState(true);
  const [tabName, setTabName] = useState(TAB_NAME.SETTING);
  return (
    <>
      <JobRecruiterDashboardLayout
        header={"Settings"}
        subTitle={
          "Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at "
        }
        showSearchBar={false}
      >
        <div className="business-dashboard">
          {loader && <PageLoader />}
          <div className="dashboard-main-panel">
            {/* <Header title={"Settings"} /> */}
            <div className="dashboard-panel-content">
              <div className="top_left font-weight-bold for-mobile">
                <h3>Settings</h3>
              </div>

              <div className="dashboard-settings shadow-box">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="notification-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#notification"
                      type="button"
                      role="tab"
                      aria-controls="notification"
                      aria-selected="false"
                      onClick={() => setTabName(TAB_NAME.SETTING)}
                    >
                      Notifications
                    </button>
                  </li>
                  {isAllowedSubscriptionPlansAccess() && (
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="subscriptionPlans-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#subscriptionPlans"
                        type="button"
                        role="tab"
                        aria-controls="subscriptionPlans"
                        aria-selected="true"
                        onClick={() => setTabName(TAB_NAME.SUBSCRIPTION)}
                      >
                        Subscription Plans
                      </button>
                    </li>
                  )}
                </ul>
                <NotificationTab setLoader={setLoader} />
                {isAllowedSubscriptionPlansAccess() && (
                  <SubscriptionPlanTab setLoader={setLoader} />
                )}
              </div>
            </div>
          </div>
        </div>
      </JobRecruiterDashboardLayout>
    </>
  );
};

export default JobRecruiterSettings;
