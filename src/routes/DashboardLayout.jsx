import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/privateHeader/Header";
import Footer from "../components/footer/Footer";

const DashboardLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");
  return (
    <>
      {isToken && <Header />}
      {isToken ? selectedRole ? <Outlet /> : <Navigate to="/login" /> : <Navigate to="/" />}
      {isToken && <Footer />}
    </>
  );
};

export default DashboardLayout;
