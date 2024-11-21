import React, { useState } from "react";
import StaffDetailCard from "../../../components/common/StaffDetailCard";
import Header from "../../../components/job-recruiter/dashboard/Header";
import "../style.css";
import { useNavigate } from "react-router-dom";
import JobRecruiterDashboardLayout from "../../../layouts/job-recruiter/JobRecruiterDashboardLayout";

export default function Staff() {
  const navigate = useNavigate();
  const openStaffDataPage = () => {
    navigate("/job-recruiter/staff/add-edit-staff");
  };
  return (
    <>
      <JobRecruiterDashboardLayout
        header={"Staff"}
        subTitle={"Connecting Opportunities: Your Ultimate Jobs Hub "}
        showSearchBar={false}
      >
        <div className="business-dashboard">
          <div className="dashboard-main-panel">
            {/* <Header title={"Staff"} /> */}
            <div className="dashboard-panel-content">
              {/* dashboard Head For Mobile */}
              <div className="top_left font-weight-bold">
                <div className="col-12 text-center">
                  <div
                    className="fieldset d-flex justify-content-start"
                    onClick={openStaffDataPage}
                  >
                    <span className="btn-design cursor-pointer">
                      + Add New Staff
                    </span>
                  </div>
                </div>
                <StaffDetailCard />
              </div>
            </div>
          </div>
        </div>
        {/* {
        (showAddStaff)&& <AddStaff/>
      } */}
      </JobRecruiterDashboardLayout>
    </>
  );
}
