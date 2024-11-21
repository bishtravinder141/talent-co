import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/privateHeader/Header";
import Footer from "../../components/job-seeker/Footer";
import { USER_ROLE } from "../../constants/Constent";

const JobSeekerLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole =  localStorage.getItem("selectedRole");

  return (
    <>
      {isToken && <Header role={USER_ROLE.seeker} />}
      {isToken ? USER_ROLE.seeker === selectedRole ? <Outlet /> : <Navigate to="/job-recruiter/dashboard" /> : <Navigate to="/" />}
      {isToken && <Footer />}
    </>
  );
};

export default JobSeekerLayout;
