import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/privateHeader/Header";
import Footer from "../../components/job-seeker/Footer";
import { USER_ROLE } from "../../constants/Constent";

const JobRecruiterLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");

  return (
    <>
      {isToken && <Header role={USER_ROLE.recruiter} />}
      {isToken ? (
        USER_ROLE.recruiter === selectedRole ? (
          <Outlet />
        ) : (
          <Navigate to="/job-recruiter/dashboard" />
        )
      ) : (
        <Navigate to="/" />
      )}
      {isToken && <Footer />}
    </>
  );
};

export default JobRecruiterLayout;
