import { Link } from "react-router-dom";
import successIcon from "../../assets/images/success-icon.svg";

const ResetPasswordSuccess = () => {
  return (
    <section className="login-process-sec py-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="login-process-wrap">
              <h3>Success</h3>
              <p>Your Password has been reset</p>

              <div className="successfully-col">
                <img src={successIcon} />
              </div>
              <Link to={"/login"} className="btn-design">
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordSuccess;
