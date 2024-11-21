import React from "react";
import Header from "../components/privateHeader/Header";
import { Outlet, useLocation } from "react-router-dom";
import PublicHeader from "../components/publicHeader/PublicHeader"; 
import PublicFooter from "../components/publicFooter/PublicFooter"; 
// import Footer from "../components/footer/Footer";
import Footer from "../components/job-seeker/Footer";

const CommonLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");
  const location = useLocation();

  return (
    <>
      {isToken ? <Header role={selectedRole} /> : <PublicHeader />}
      <Outlet />
     {(isToken)?<Footer/>:(
        (<PublicFooter/>)
     )}    
    </>
  );
};

export default CommonLayout;
