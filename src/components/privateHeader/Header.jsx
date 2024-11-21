import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import userProfile from "../../assets/images/user-profile.svg";
import "../../pages/auth/login.css";
import { Link } from "react-router-dom";
import { APPLICATION_STATUS, USER_ROLE } from "../../constants/Constent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import persistStore from "redux-persist/es/persistStore";
import { reduxStore } from "../../redux/store";
import {
  getAllUnreadNotification,
  logout,
  updateNotificationStatus,
} from "../../API/masterApiData";
import { NOTIFICATIONBASEURL } from "../../config/APIUrls";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProfile, getProfileData } from "../../API/candidateProfile";
import { useLocation } from "react-router";
import { setNotification } from "../../redux/notificationSlice";
import { updateCompanyDetails } from "../../redux/recruiterSlice";
import PageLoader from "../loader/PageLoader";
import { toastMessage } from "../../utils/toastMessages";
import { profileIncompleteWarningType } from "../../utils/allToastMessage";

const Header = ({ role }) => {
  const navigate = useNavigate();
  const [notification, setNotifications] = useState([]);
  const [showNotificationList, setShowNotificationlist] = useState(false);
  const [showIncompleteProfile, setShowIncompleteProfile] = useState(false);
  const [unReadMessageCount, setUnreadMessageCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [newNotification, setNewNotification] = useState({});
  const [userName, setUserName] = useState({
    jobSeekerName: "",
    jobRecruiterName: "",
  });
  const refreshToken = localStorage.getItem("refresh_token");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const COMPLETE_YOUR_PROFILE_MESSAGE = (
    <>
      <div>
        Your profile is not completed please{" "}
        <Link
          className="text-decoration-underline text-primary"
          to={
            role === USER_ROLE.recruiter
              ? "/job-recruiter/complete-company-profile"
              : "/job-seeker/user-profile-page"
          }
        >
          {" "}
          complete your profile
        </Link>
      </div>
    </>
  );

  useEffect(() => {
    // getAllUnreadNotification()
    //   .then((res) => {
    //     const tempData = res?.data?.data?.results;
    //     setNotifications(tempData);
    //     setUnreadMessageCount(res?.data?.data?.results.length);
    //   })
    //   .catch((err) => console.log(err));
    getUnreadNotification();
  }, []);
  const getUnreadNotification = () => {
    getAllUnreadNotification()
      .then((res) => {
        const tempData = res?.data?.data?.results;
        setNotifications(tempData);
        setUnreadMessageCount(res?.data?.data?.results.length);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const notificationSocket = new WebSocket(
      `${NOTIFICATIONBASEURL}/${userId}/?token=${token}`
    );
    notificationSocket.onopen = () => {
      console.log("connection established");
    };
    notificationSocket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNewNotification(newNotification);
    };
    return () => {
      notificationSocket.close();
    };
  }, []);

  useEffect(() => {
    setNotifications([newNotification, ...notification]);
  }, [newNotification]);

  useEffect(() => {
    if (role === USER_ROLE.recruiter) {
      getCompanyProfile()
        .then((res) => {
          res?.data?.data?.company_name &&
            setUserName({
              ...userName,
              jobRecruiterName: `${res?.data?.data?.company_name}`,
            }); 
          dispatch(updateCompanyDetails(res.data.data));
          if (!res.data.data.profile_completed && pathname!=="/job-recruiter/complete-company-profile") {
            setShowIncompleteProfile(true);
            toastMessage(COMPLETE_YOUR_PROFILE_MESSAGE,profileIncompleteWarningType);
          }
        })
        .catch((err) => console.log(err));
    } else {
      getProfileData()
        .then((res) => {
          (res?.data?.data?.first_name || res?.data?.data?.last_name) &&
            setUserName({
              ...userName,
              jobSeekerName: `${res?.data?.data?.first_name} ${res?.data?.data?.last_name}`,
            });
          if (!res.data.data.profile_completed && pathname!== "/job-seeker/user-profile-page") {
            // setShowIncompleteProfile(true);
            // toast.error("your profile is not completed");
            toastMessage(COMPLETE_YOUR_PROFILE_MESSAGE,profileIncompleteWarningType);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleLogout = () => {
    //commented for future use
    // const payload = {
    //   refresh_token:refreshToken
    // }
    // logout(payload)
    // .then((res)=>{
    //   localStorage.clear();
    //   persistStore(reduxStore).purge();
    //   toast.success("Logout Successfully");
    //   window.location.href= "/login";
    //   navigate("/login");
    // })
    // .catch((err)=>console.log(err))
    localStorage.clear();
    persistStore(reduxStore).purge();
    toast.success("Logout Successfully");
    // window.location.href = "/login";
    navigate("/login");
  };

  const handleClickOnNotification = (currentNotification) => {
    const id = currentNotification?.id
      ? currentNotification?.id
      : currentNotification?.notification_id &&
        currentNotification?.notification_id;
    setLoader(true);
    setShowNotificationlist(!showNotificationList);
    updateNotificationStatus(id, { is_read: true })
      .then((res) => {
        setNotification();
        getUnreadNotification();
        setLoader(false);
        if (currentNotification.category === "chat") {
          localStorage.setItem(
            "roomId",
            currentNotification?.extra_details?.chat_room_name
          );
          navigate(
            role === USER_ROLE.recruiter
              ? "/job-recruiter/messages"
              : "/job-seeker/messages"
          );
        } else if (currentNotification.category === "job_application") {
          localStorage.setItem("redirectedTab", APPLICATION_STATUS.applied);
          navigate("/job-recruiter/application");
        } else if (currentNotification.category === "interview") {
          navigate(
            role === USER_ROLE.recruiter
              ? "/job-recruiter/interviews"
              : "/job-seeker/interviews"
          );
        } else if (currentNotification.category === "job_invitation") {
          navigate(
            `/job-seeker/job-detail/${currentNotification.extra_details.job_id}`
          );
        } else if (currentNotification.category === "hiring") {
          navigate("/job-seeker/all-notification");
        }
      })
      .then((err) => {
        setLoader(false);
        console.log("err");
      });
  };

  return (
    <header>
      <div className="header_top_bar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="head d-block">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="Logo" />
                    </Link>
                  </div>
                  {/* <div className="incompleteProfileMsg">
                    {showIncompleteProfile &&
                      pathname !== "/job-seeker/user-profile-page" &&
                      pathname !==
                        "/job-recruiter/complete-company-profile" && (
                        <div className="header-alert-bar d-lg-block d-none">
                          {COMPLETE_YOUR_PROFILE_MESSAGE}
                        </div>
                      )}
                  </div> */}
                  {loader && <PageLoader />}
                  <div className="top_right">
                    {/* <div className="header_left">
                    <div className="navbar">
                      <div className="close_icon">
                        <div className="menu_icon">
                          <span></span>
                        </div>
                      </div>
                    )}
                  {loader && <PageLoader />}
                  <div className="top_right">
                    {/* <div className="header_left">
                      <div className="navbar">
                        <div className="close_icon">
                          <div className="menu_icon">
                            <span></span>
                          </div>
                        </div>
                        <ul>
                          <li>
                            <a href="about.html">About Us</a>
                          </li>
                          <li>
                            <a href="blog.html">Blog</a>
                          </li>
                        </ul>
                      </div>
                    </div> */}

                    <div className="top_right header_login">
                      <div className="notifications_wrapper position-relative">
                        {/* <div
                          className="notifications_icon position-relative"
                          onClick={() => {
                            setShowNotificationlist(!showNotificationList);
                          }}
                        >
                          <img src={bellIcon} alt="Bell Icon" />
                          {notification.length > 0 && (
                            <span className="notifications_active"></span>
                          )}
                        </div> */}
                        <button
                          className="btn  dropdown-toggle notifications_icon position-relative"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img
                            src="/assets/images/bell_icon.svg"
                            alt="Bell Icon"
                          />
                          {notification.length > 0 && (
                            <span className="notifications_active"></span>
                          )}
                        </button>
                        <div
                          class="dropdown-menu notifications_list"
                          aria-labelledby="dropdownMenuButton"
                        >
                          {/* <h4>Notifications {unReadMessageCount}</h4> */}
                          <h4>Notifications</h4>
                          <ul>
                            {notification.length > 0 ? (
                              <>
                                {notification
                                  .slice(0, 4)
                                  .map((curNotification) => (
                                    <li
                                      class="dropdown-item"
                                      key={curNotification.id}
                                      onClick={() =>
                                        handleClickOnNotification(
                                          curNotification
                                        )
                                      }
                                      className="cursor-pointer"
                                    >
                                      {curNotification.title}
                                    </li>
                                  ))}
                              </>
                            ) : (
                              <h6>No Notification</h6>
                            )}
                            <div className="text-center">
                              <Link
                                to={
                                  role === USER_ROLE.recruiter
                                    ? "/job-recruiter/all-notification"
                                    : "/job-seeker/all-notification"
                                }
                                onClick={() =>
                                  setShowNotificationlist(!showNotificationList)
                                }
                                className="text-primary"
                              >
                                View All Notification
                              </Link>
                            </div>
                          </ul>
                        </div>
                      </div>

                      <div className="dropdown profile_detail">
                        <button
                          className="btn p-0 dropdown-toggle icon_profile"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img src={userProfile} alt="User Profile" />
                          <span className="text-capitalize">
                            {role === USER_ROLE.seeker
                              ? userName?.jobSeekerName
                                ? userName?.jobSeekerName
                                : "User"
                              : userName?.jobRecruiterName
                              ? userName?.jobRecruiterName
                              : "Company"}
                          </span>
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <h4>Settings</h4>
                          <div className="account_setting">
                            <ul>
                              {role === USER_ROLE.seeker ? (
                                <li>
                                  <Link to={"/view-user-profile"}>
                                    User Profile
                                  </Link>
                                </li>
                              ) : (
                                <li>
                                  <Link to={"/view-company-profile"}>
                                    Company Profile
                                  </Link>
                                </li>
                              )}
                              <li>
                                <Link to={"/terms-conditions"}>
                                  Terms and Condition
                                </Link>
                              </li>
                              <li>
                                <Link to={"/about-us"}>About</Link>
                              </li>
                              <li onClick={handleLogout}>
                                <Link to={"/login"}>Log Out</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <div className="incompleteProfileMsg">
                        {showIncompleteProfile &&
                          pathname !== "/job-seeker/user-profile-page" &&
                          pathname !==
                            "/job-recruiter/complete-company-profile" && (
                            <div className="header-alert-bar d-lg-block d-none">
                              {COMPLETE_YOUR_PROFILE_MESSAGE}
                            </div>
                          )}
                      </div> */}
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

export default Header;
