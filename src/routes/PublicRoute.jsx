import { Navigate, Outlet, useLocation } from "react-router-dom";
import PublicHeader from "../components/publicHeader/PublicHeader";
import PublicFooter from "../components/publicFooter/PublicFooter";

const PublicRoute = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");
  const location = useLocation()
  return (
    <>
      { (location.pathname !== '/login' && location.pathname !== '/register')  && <PublicHeader />}
      {(!isToken || !selectedRole)  ? <Outlet /> : selectedRole ? <Navigate to="/job-seeker/dashboard" /> : <Navigate to="/login" />}
      { (location.pathname !== '/login' && location.pathname !== '/register')  && <PublicFooter />}
    </>
  );
};

export default PublicRoute;
