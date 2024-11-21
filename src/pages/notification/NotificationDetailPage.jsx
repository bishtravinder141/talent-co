import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  deleteNotification,
  getAllNotification,
  updateNotificationStatus,
} from "../../API/masterApiData";
import Pagination from "../../components/pagination/Pagination";
import PageLoader from "../../components/loader/PageLoader";
import { calculateTimeAgo } from "../../utils/utils";
import NoDataFound from "../../components/noDataFound/NoDataFound";
import { APPLICATION_STATUS } from "../../constants/Constent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toastMessage } from "../../utils/toastMessages";

const NotificationDetailPage = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const JOB_PER_PAGE = 10;

  const { pathname } = useLocation();
  const isRecruiter = pathname === "/job-recruiter/all-notification";
  useEffect(() => {
    setLoader(true);
    const query = `page=${currentPage.page}&page_size=10`;
    getAllNotification(query)
      .then((res) => {
        setLoader(false);
        setTotalPage(res.data.data.count);
        // const tempData = res?.data?.data?.results.slice(0, 4);
        setNotificationList(res?.data?.data?.results);
        // setNotifications(tempData);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [currentPage]);

  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };

  const handleClickOnNotification = (currentNotification) => {
    if (!currentNotification.is_read) {
      setLoader(true);
      updateNotificationStatus(currentNotification.id, { is_read: true })
        .then((res) => {
          handleNotificationsDetails(currentNotification);
          setLoader(false);
        })
        .then((err) => {
          setLoader(false);
          console.log("err");
        });
    } else {
      handleNotificationsDetails(currentNotification);
    }
  };

  const handleNotificationsDetails = (currentNotification) => {
    if (currentNotification.category === "chat") {
      localStorage.setItem(
        "roomId",
        currentNotification?.extra_details?.chat_room_name
      );
      navigate(
        isRecruiter ? "/job-recruiter/messages" : "/job-seeker/messages"
      );
    } else if (currentNotification.category === "job_application") {
      localStorage.setItem("redirectedTab", APPLICATION_STATUS.applied);
      navigate("/job-recruiter/application");
    } else if (currentNotification.category === "interview") {
      navigate(
        isRecruiter ? "/job-recruiter/interviews" : "/job-seeker/interviews"
      );
    } else if (currentNotification.category === "job_invitation") {
      navigate(`/job-seeker/job-detail/${currentNotification.extra_details.job_id}`);
    } else if (currentNotification.category === "hiring") {
      navigate(
        `/job-seeker/offer-letter/${currentNotification?.extra_details?.hiring_id}`
      );     
      // if (currentNotification.extra_details?.offer_letter !== "None") {
      //   const url = `${APPLICATION_BASE_URL}/media/${currentNotification.extra_details.offer_letter}`;
      //   window.open(url, "_blank");
      // }s
    }
  };
  const handleDeleteNotification = (notificationID, type = "delete") => {
    setLoader(true);
    deleteNotification(notificationID)
      .then(() => {
        const temp = [...notificationList];
        const index = notificationList.findIndex(
          (curElem) => curElem.id === notificationID
        );
        temp.splice(index, 1);
        setNotificationList(temp);
        type === "delete" && toastMessage(NOTIFICATION_DELETED, successType);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      {loader && <PageLoader />}
      <section className="notification-screen view-profile-sec py-60">
        <div className="container">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="overview-card-heading fw-bold">Notifications</h2>
              <div className="back-arrow-heading d-flex font-weight-bold align-items-center mt-2">
                <Link
                  to={
                    isRecruiter
                      ? "/job-recruiter/dashboard"
                      : "/job-seeker/dashboard"
                  }
                >
                  <img src="/assets/images/back-arrow.svg" alt="Back" />
                </Link>
                <h4>Go Back</h4>
              </div>
              {unreadMsgCount > 0 && (
                <p className="notification-text">
                  You've {unreadMsgCount} unread notifications
                </p>
              )}
            </div>
          </div>

          <div className="notification-main pt-4">
            <div className="notification-list">
              {notificationList.length > 0 ? (
                notificationList.map((msg) => (
                  <div className="notification-wrapper" key={msg.id}>
                    <span className="bell-icon">
                      <img src="/assets/images/bell_icon_white.svg" />
                    </span>
                    <div
                      className="d-flex gap-4 justify-content-between cursor-pointer w-100"
                      onClick={() => handleClickOnNotification(msg)}
                    >
                      <div>
                        <h3 className="notification-heading">
                          {msg.title}
                          {!msg.is_read && (
                            <span className="new-notify">New</span>
                          )}
                          {/* {msg.category === "hiring" &&
                            msg.extra_details?.offer_letter && (
                              <span

                                className="new-notify"
                                // download="offer_letter"
                              >
                                Download Offer Letter
                              </span>
                            )} */}
                          <p className="notification-text">{msg.message}</p>
                        </h3>
                      </div>
                      <div className="notify-recieve">
                        <span className="notify-date">
                          {moment(msg.created_at).format("YYYY-MM-DD")}
                        </span>
                        <span className="notify-time">
                          {calculateTimeAgo(msg.created_at)}
                        </span>
                      </div>
                    </div>
                    <div
                      className="delete-notification pointer"
                      onClick={() => {
                        handleDeleteNotification(msg.id);
                      }}
                    >
                      <img src="/assets/images/crossIcon.svg" />
                    </div>
                  </div>
                ))
              ) : (
                <NoDataFound title={"You don't have any notification"} />
              )}
            </div>
          </div>
          {totalPage > JOB_PER_PAGE && (
            <Pagination
              onPageChange={onPageChange}
              totalPage={totalPage}
              jobPerPage={JOB_PER_PAGE}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default NotificationDetailPage;
