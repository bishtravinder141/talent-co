import React from "react";
import { toast } from "react-toastify";
import microsoftIcon from "../../assets/images/microsoft-icon.svg";
import appleIcon from "../../assets/images/apple-icon.svg";
import googleIcon from "../../assets/images/google-icon.svg";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { ROLES } from "../../config/authConfig";
import { loginRequest, msalInstance } from "../../config/authConfig";
import { authAxios } from "../../config/APIConfig";

const SocialLogin = ({ afterAPISuccess }) => {
  const navigate = useNavigate();

  //handle login with microsoft
  const handleLoginWithMicrosoft = async () => {
    try {
      let res = await msalInstance.loginPopup(loginRequest);
      const url = "/accounts/microsoft-login/";
      handleSocialAppLogin(res?.accessToken, url);
    } catch (error) {
      console.error("Login error", error);
      toast.error(error);
    }
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const url = "/accounts/google-login/";
        handleSocialAppLogin(tokenResponse.access_token, url);
      } catch (error) {
        console.error("Google error:", error);
        toast.error(error);
      }
    },
  });

  const handleSocialAppLogin = (token, url) => {
    authAxios
      .post(url, {
        token: token,
      })
      .then((response) => {
        const role = response.data?.data?.groups;
        const responseData = response?.data?.data;
        localStorage.setItem("token", responseData?.access);
        localStorage.setItem("refresh_token", responseData?.refresh);

        localStorage.setItem("user_id", responseData?.id);
        localStorage.setItem("selectedRole", role);
        // dispatch(setRole(role))
        localStorage.setItem(
          "first_name",
          responseData?.first_name
            ? responseData?.first_name
            : responseData?.givenName
            ? responseData?.givenName
            : responseData?.given_name
        );
        localStorage.setItem(
          "last_name",
          responseData?.last_name
            ? responseData?.last_name
            : responseData?.surname
            ? responseData?.surname
            : responseData?.family_name
        );
        localStorage.setItem("phone_number", responseData?.phone_number);
        localStorage.setItem(
          "email",
          responseData?.email ? responseData?.email : responseData?.mail
        );
        if (role) {
          if (role === ROLES.jobseeker) {
            navigate("/job-seeker/dashboard");
          } else {
            navigate("/job-recruiter/dashboard");
          }
        } else {
          afterAPISuccess();
        }
      })
      .catch((err) => {
        const erroMessage = err?.response?.data?.message
          ? err.response.data.message
          : "Something went wrong! please try again";
        toast.error(erroMessage);
      });
  };
  return (
    <div className="sign-options">
      <Link to={"/"} className="border-btn">
        <img src={appleIcon} /> Login with Apple
      </Link>
      <button className="social-login-btn" onClick={handleLoginWithGoogle}>
        <img src={googleIcon} /> Login with Google
      </button>

      <button className="social-login-btn" onClick={handleLoginWithMicrosoft}>
        <img src={microsoftIcon} /> Login with Microsoft
      </button>
    </div>
  );
};

export default SocialLogin;
