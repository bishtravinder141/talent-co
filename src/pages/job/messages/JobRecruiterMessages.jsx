import React, { useState } from "react";
import Header from "../../../components/job-recruiter/dashboard/Header";
import MessageSection from "../../../components/common/MessageSection";
import "../style.css";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";

const JobRecruiterMessages = () => {
  return (
    <>
      <JobRecruiterDashboardLayout
        header={"Messages"}
        subTitle={"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at "}
        showSearchBar={false}
      >
        <div className="business-dashboard">
          <div className="dashboard-main-panel">
            {/* <Header title={"Messaging"} /> */}
            <div className="dashboard-panel-content">
              {/* dashboard Head For Mobile */}
              <div className="top_left font-weight-bold for-mobile">
                <h3>Messaging</h3>
              </div>
              <div class="interviewsList-sec">
                <MessageSection seekerPage={true} />
              </div>
            </div>
          </div>
        </div>
      </JobRecruiterDashboardLayout>
    </>
  );
};

export default JobRecruiterMessages;
