import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./login.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="login-signup-module">
      <div className="row align-items-center">
        <div className="col-md-6 col-12">
          <div className="join-module custom_login">
            <div className="logo">
              <Link to={"/"}>
                <img src={logo} />
              </Link>
            </div>
            {children}
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="join-tabgline">
            <h3 className="text-center">Join the world’s Climate, ESG & Sustainability community.</h3>
            <p className="text-center">Find an employer of choice and a job you love</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
