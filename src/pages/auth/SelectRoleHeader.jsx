import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
const SelectRoleHeader = ({ verifyNumberPage = false }) => {
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
                        <div className="menu_icon"  onClick={()=>{document.body.classList.remove("open")}}>
                          <span></span>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link to={"/about-us"}>About Us</Link>
                        </li>
                        <li>
                          <Link to={"/blog"}>Blog</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="get-started">
                      {verifyNumberPage ? (
                        <Link to="/login">Log In</Link>
                      ) : (
                        <Link to="/register">Sign Up</Link>
                      )}{" "}
                    </div>
                    <div
                      className="menu_icon"
                      onClick={()=>{document.body.classList.add("open")}}
                    >
                      <span></span>
                    </div>
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

export default SelectRoleHeader;
