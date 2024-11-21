import "./App.css";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
// import { Loader } from "./components/Loader";
import { route } from "./routes/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import DashboardLayout from "./routes/DashboardLayout";
import PublicRoute from "./routes/PublicRoute";
import JobSeekerLayout from "./layouts/job-seeker/JobSeekerLayout";
import JobRecruiterLayout from "./layouts/job-recruiter/JobRecruiter";
import JobDashboardLayout from "./layouts/job-recruiter/JobDashboardLayout";
import Header from "./components/job-recruiter/dashboard/Header";
import CommonLayout from "./routes/CommonLayout";
import { HAS_JOB_CREATE_PERMISSION, isAllowedStaffAccess } from "./pages/job/staffManagement";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense>
        {/* <Router> */}
        <Routes>
          {route?.map((item, index) =>
            item.private ? (
              <React.Fragment key={index}>
                {item.jobSeeker ? (
                  <Route key={index} element={<JobSeekerLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : item.jobRecruiter ? (
                  item.jobRecruiterDashboard ? (
                    <Route key={index} element={<JobDashboardLayout item = {item} />}>
                        <Route path={item.path} element={item.element} />
                    </Route>
                  ) : (
                    <Route key={index} element={<JobRecruiterLayout />}>
                      <Route path={item.path} element={item.element} />
                    </Route>
                  )
                ) : (
                  <Route key={index} element={<DashboardLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                )}
              </React.Fragment>
            ) : item.private === false ? (
              <Route key={index} element={<PublicRoute />}>
                <Route path={item.path} element={item.element} />
              </Route>
            ) : (
              <Route key={index} element={<CommonLayout />}>
                <Route path={item.path} element={item.element} />
              </Route>
            )
          )}
        </Routes>
        {/* </Router> */}
      </Suspense>
    </>
  );
}

export default App;
