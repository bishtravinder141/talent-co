import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
const PublicHeader = () => {
  return (
    <header>
      <div className="header_top_bar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="head">
                <div className="logo">
                  <Link to={"/"}>
                    <img src={logo} />
                  </Link>
                </div>

                <div className="top_right">
                  <div className="header_left">
                    <div className="navbar">
                      <div className="close_icon">
                        <div
                          className="menu_icon"
                          onClick={() => {
                            document.body.classList.remove("open");
                          }}
                        >
                          <span></span>
                        </div>
                      </div>
                      <ul>
                        {location.pathname !== "/forgot-password" ? (
                          <>
                            <li>
                              <Link to={"/"}>Jobs </Link>
                            </li>
                            <li>
                              <Link to={"/"}>Candidates </Link>
                            </li>
                            <li>
                              <Link to={"/"}> Employers</Link>
                            </li>
                            <li>
                              <Link to={"/"}>Other</Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link to={"/"}>About Us</Link>
                            </li>
                            <li>
                              <Link to={"/"}>Blog</Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className={"login"}>
                      <Link to={"/login"}>Login</Link>
                    </div>
                    {(location.pathname === "/forgot-password" ||
                      location.pathname === "/reset-password") && (
                      <div className="get-started ms-2">
                        <Link to={"/register"}>Sign Up</Link>
                      </div>
                    )}
                    {location.pathname !== "/forgot-password" &&
                      location.pathname !== "/reset-password" && (
                        <div className="get-started">
                          <Link to={"/register"}>Get Started</Link>
                        </div>
                      )}
                  </div>
                  <div className="menu_icon">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
