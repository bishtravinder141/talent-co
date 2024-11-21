import React, { useEffect } from "react";
import { useState } from "react";
import { getCompanyProfile } from "../../../API/candidateProfile";
import { toast } from "react-toastify";
import { NOTIFICATIONBASEURL } from "../../../config/APIUrls";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAllUnreadNotification,
  updateNotificationStatus,
} from "../../../API/masterApiData";
import { setNotification } from "../../../redux/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_STATUS } from "../../../constants/Constent";
import { updateCompanyDetails } from "../../../redux/recruiterSlice";
import PageLoader from "../../loader/PageLoader";

const Header = ({ title = "Jobs" }) => {
  const [showNotifications, setShowNotification] = useState(false);
  const [notification, setNotifications] = useState([]);
  const [realtimeNotification, setRealTimeNotification] = useState({});
  const [showIncompleteProfile, setShowIncompleteProfile] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const [unReadMessageCount, setUnreadMessageCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const COMPLETE_YOUR_PROFILE_MESSAGE = (
    <>
      Your profile is not completed please{" "}
      <Link
        className="text-decoration-underline text-primary"
        to="/job-recruiter/complete-company-profile"
      >
        {" "}
        complete your profile
      </Link>
    </>
  );

  useEffect(() => {
    // getAllUnreadNotification()
    //   .then((res) => {
    //     setUnreadMessageCount(res?.data?.data?.results.length);
    //     const tempData = res?.data?.data?.results;
    //     setNotifications(tempData);
    //   })
    //   .catch((err) => console.log(err));
    getUnreadNotifications();
  }, []);

  useEffect(() => {
    getCompanyProfile()
      .then((res) => {
        dispatch(updateCompanyDetails(res.data.data));
        if (!res.data.data.profile_completed) {
          setShowIncompleteProfile(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // useEffect for web socket
  useEffect(() => {
    const notificationSocket = new WebSocket(
      `${NOTIFICATIONBASEURL}/${userId}/?token=${token}`
    );
    notificationSocket.onopen = () => {
      console.log("connection established");
    };
    notificationSocket.onmessage = (event) => {
      // will be updated based on the response
      const newNotification = JSON.parse(event.data);
      setRealTimeNotification(newNotification);
      // setNotifications([...notification, newNotification]);
    };
    return () => {
      notificationSocket.close();
    };
  }, []);

  useEffect(() => {
    setNotifications([realtimeNotification, ...notification]);
  }, [realtimeNotification]);

  const getUnreadNotifications = () => {
    getAllUnreadNotification()
      .then((res) => {
        setUnreadMessageCount(res?.data?.data?.results.length);
        const tempData = res?.data?.data?.results;
        setNotifications(tempData);
      })
      .catch((err) => console.log(err));
  };

  const handleClickOnNotification = (currentNotification) => {
    const id = currentNotification?.id
      ? currentNotification?.id
      : currentNotification?.notification_id &&
        currentNotification?.notification_id;
    setLoader(true);

    setShowNotification(!showNotifications);
    updateNotificationStatus(id, { is_read: true })
      .then((res) => {
        getUnreadNotifications();
        setLoader(false);
        if (currentNotification.category === "chat") {
          localStorage.setItem(
            "roomId",
            currentNotification.extra_details.chat_room_name
          );
          navigate("/job-recruiter/messages");
        } else if (currentNotification.category === "job_application") {
          localStorage.setItem("redirectedTab", APPLICATION_STATUS.applied);
          navigate("/job-recruiter/application");
        } else if (currentNotification.category === "interview") {
          navigate("/job-recruiter/interviews");
        } else if (currentNotification.category === "job_invitation") {
          navigate(
            `/job-seeker/job-detail/${currentNotification.extra_details.job_id}`
          );
        } else if (currentNotification.category === "hiring") {
          navigate("/job-seeker/all-notification");
        }
        console.log(res);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="mainpanel-nav head">
        <div className="logo for-mobile">
          <a href="dashboard.html">
            <img src="/assets/images/logo.svg" />
          </a>
        </div>
        {loader && <PageLoader />}
        <div className="top_left font-weight-bold for-desktop">
          <h3>{title}</h3>
        </div>
        {/* {showIncompleteProfile && (
          <div>
            <div className="header-alert-bar">
              {COMPLETE_YOUR_PROFILE_MESSAGE}
            </div>
          </div>
        )} */}
        <div className="top_right header_login">
          <div className="notifications_wrapper position-relative">
            {/* <div
              className="notifications_icon position-relative"
              onClick={() => setShowNotification(!showNotifications)}
            >
              <img src="/src/assets/images/bell_icon.svg" />
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
              <img src="/assets/images/bell_icon.svg" alt="Bell Icon" />
              {notification.length > 0 && (
                <span className="notifications_active"></span>
              )}
            </button>
            <div
              class="dropdown-menu notifications_list"
              aria-labelledby="dropdownMenuButton"
            >
              <h4>Notifications</h4>
              <ul>
                {notification.length > 0 ? (
                  <>
                    {notification.slice(0, 4).map((curNotification, i) => (
                      <li
                        key={i}
                        class="dropdown-item"
                        onClick={() =>
                          handleClickOnNotification(curNotification)
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
                <Link
                  to={"/job-recruiter/all-notification"}
                  className="text-primary"
                >
                  View All Notification
                </Link>
              </ul>
            </div>
          </div>

          <div className="panel_list_thumbs for-desktop">
            <img src="/assets/images/thumb1.png" />
            <img src="/assets/images/thumb2.png" />
            <img src="/assets/images/thumb3.png" />
            <div className="thumbplus">+8</div>
          </div>
        </div>
        <div className="menu_icon">
          <span></span>
        </div>
      </div>
    </>
  );
};

export default Header;
