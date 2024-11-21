import { useEffect, useState } from "react";
import checkedIcon from "../../assets/images/checked-icon.svg";
import recruitingIcon from "../../assets/images/recruitingIcon.svg";
import jobsIcon from "../../assets/images/jobsIcon.svg";
import { APIAxios, authAxios } from "../../config/APIConfig";
import { toast } from "react-toastify";
import { GET_ROLES, UPDATE_ROLES } from "../../config/APIUrls";
import SubmitButton from "../../components/button/SubmitButton";
import { ROLES } from "../../config/authConfig";
import Footer from "../../components/footer/Footer";
import SelectRoleHeader from "./SelectRoleHeader";
const LoginType = ({ afterSelectUserType, userID }) => {
  const [loginType, setLoginType] = useState(ROLES.jobseeker);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    APIAxios.get(GET_ROLES)
      .then((res) => {
        setAllRoles(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitLoginType = () => {
    const user_ID = localStorage.getItem("user_id");
    setButtonLoader(true);
    const group = allRoles.find((role) => role.name === loginType);
    const payload = {
      user_id: userID ? userID : user_ID,
      group_id: group?.id,
    };
    APIAxios
      .patch(UPDATE_ROLES, payload)
      .then((res) => {
        setButtonLoader(false);
        afterSelectUserType(loginType);
        if (res?.data?.message) toast.success(res.data.message);
        localStorage.setItem("selectedRole", loginType);
         // dispatch(setRole(loginType))
      })
      .catch((err) => {
        setButtonLoader(false);
        if (err?.response?.status === 400) {
          localStorage.setItem("selectedRole", loginType);
         // dispatch(setRole(loginType))
          toast.error(err.response.data?.message);
        }
      });
  };

  return (
    <>
    <SelectRoleHeader/>
    <section className="login-process-sec py-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="login-process-wrap">
              <h3>What are you interested in?</h3>
              <p>Help us customize your experience</p>

              <div className="select-types d-flex justify-content-center pt-2 pb-4">
                <div className="types-col">
                  <div className="inputype-col">
                    <input
                      type="radio"
                      name="login-type"
                      className="radio-btn"
                      checked={loginType === ROLES.recruiter}
                      onChange={() => setLoginType(ROLES.recruiter)}
                    />
                    <span>
                      <img src={checkedIcon} alt="Checked" />
                    </span>
                  </div>

                  <img src={recruitingIcon} alt="Recruiting" />
                  <h6>Recruiting</h6>
                  <p>Hire high-quality candidates</p>
                </div>
                <div className="types-col">
                  <div className="inputype-col">
                    <input
                      type="radio"
                      name="login-type"
                      className="radio-btn"
                      checked={loginType === ROLES.jobseeker}
                      onChange={() => setLoginType(ROLES.jobseeker)}
                    />
                    <span>
                      <img src={checkedIcon} alt="Checked" />
                    </span>
                  </div>

                  <img src={jobsIcon} alt="Jobs" />
                  <h6>Jobs</h6>
                  <p>Find Your Dream Job</p>
                </div>
              </div>
              <SubmitButton
                loader={buttonLoader}
                type="button"
                contentText={"Continue"}
                disabled={buttonLoader}
                onClickCallBack={submitLoginType}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default LoginType;