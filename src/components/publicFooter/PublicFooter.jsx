import logo from "../../assets/images/logo.svg";
import subscribeIcon from "../../assets/images/subscribe.svg";
import userIcon from "../../assets/images/user.svg";
import companyIcon from "../../assets/images/company.svg";
import emailIcon from "../../assets/images/email.svg";
import { Link, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";

const PublicFooter = () => {
  const location = useLocation();
  return (
    <>
      {(location.pathname !== "/forgot-password" && location.pathname !== "/reset-password") && (
        <footer className="site_footer">
          <section className="subscribe_sec">
            <div className="container">
              <div className="border-top py-100">
                <div className="row justify-content-between">
                  <div className="col-md-6 col-12">
                    <img src={subscribeIcon} />
                    <h2>Subscribe Today</h2>
                    <p>Register your details to receive news and updates.</p>
                  </div>
                  <div className="col-lg-5 col-md-6 col-12">
                    <div className="subscribe_form">
                      <form>
                        <div className="fieldset">
                          <input
                            type="text"
                            placeholder="First name"
                            className="form-control input-icon name-field"
                          />
                          <span className="input-field-icon">
                            <img src={userIcon} />
                          </span>
                        </div>
                        <div className="fieldset">
                          <input
                            type="text"
                            placeholder="Last name"
                            className="form-control input-icon name-field"
                          />
                          <span className="input-field-icon">
                            <img src={userIcon} />
                          </span>
                        </div>
                        <div className="fieldset">
                          <input
                            type="text"
                            placeholder="Company"
                            className="form-control input-icon company-field"
                          />
                          <span className="input-field-icon">
                            <img src={companyIcon} />
                          </span>
                        </div>
                        <div className="fieldset">
                          <input
                            type="text"
                            placeholder="Your email"
                            className="form-control input-icon email-field"
                          />
                          <span className="input-field-icon">
                            <img src={emailIcon} />
                          </span>
                        </div>
                        <div className="fieldset">
                          <p className="text-grey termsConditionLink">
                            With our{" "}
                            <Link to={"/terms-conditions"}  className="text-grey">
                              Terms and Conditions
                            </Link>{" "}
                            and <Link to={"/policies"}  className="text-grey">Privacy Policy</Link>
                          </p>
                        </div>
                        <div className="fieldset">
                          <input
                            type="submit"
                            value="Subscribe"
                            className="btn-design"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="footer_bottom">
            <div className="container">
              <div className="border-top py-100">
                <div className="row">
                  <div className="col-lg-3 col-12">
                    <div className="footer_logo">
                      <Link to={"/"}>
                        <img src={logo} />
                      </Link>
                    </div>
                    <p className="text-grey">
                      Transforming business for a better tomorrow, one job at a
                      time.
                    </p>
                    <div className="followUs">
                      <h6>Follow Us :</h6>
                      <ul>
                        <li>
                          <Link to={"/"}>
                            <i className="fa-brands fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}>
                            <i className="fa-brands fa-square-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}>
                            <i className="fa-brands fa-x-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}>
                            <i className="fa-brands fa-linkedin"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-4 col-12">
                    <h6>For Job Seekers</h6>
                    <ul>
                      <li>
                        <Link to={"/categories"}>Job Categories</Link>
                      </li>
                      <li>
                        <Link to={"/job"}>Browse Jobs</Link>
                      </li>
                      <li>
                        <Link>Browse Companies</Link>
                      </li>
                      <li>
                        <Link>Career Advice</Link>
                      </li>
                      <li>
                        <Link to={"/"}>Remote Jobs</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-3 col-md-4 col-12">
                    <h6>For Recruiters</h6>
                    <ul>
                      <li>
                        <Link>Browse Candidates</Link>
                      </li>
                      <li>
                        <Link>Recruiter Tools</Link>
                      </li>
                      <li>
                        <Link to={"/pricing"}>Pricing</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-4 col-12">
                    <h6>Company</h6>
                    <ul>
                      <li>
                        <Link to={"/about-us"}>About</Link>
                      </li>
                      <li>
                        <Link to={"/contact-us"}>Contact Us</Link>
                      </li>
                      <li>
                        <Link>Training Centre</Link>
                      </li>
                      <li>
                        <Link to={"/blog"}>Blog</Link>
                      </li>
                      <li>
                        <Link>Help</Link>
                      </li>
                      <li>
                        <Link>Partner with us</Link>
                      </li>
                      <li>
                        <Link to={"/terms-conditions"}>Terms & Risks</Link>
                      </li>
                      <li>
                        <Link to={"/policies"}>Our policies</Link>
                      </li>
                      <li>
                        <Link>Careers at TalentCo</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </footer>
      )}
      <Footer />
    </>
  );
};

export default PublicFooter;
