import React from "react";
import phoneIcon from "../../assets/images/phone-icon.svg";
import emailIcon from "../../assets/images/email.svg";
import shareIcon from "../../assets/images/share.svg";
import editIcon from "../../assets/images/edit-icon.svg";
import deleteIcon from "../../assets/images/del.svg";
import { Link } from "react-router-dom";
import staffIMG from "../../assets/images/staff1.png";
import { useEffect } from "react";
import { getStaffList, deleteStaffData } from "../../API/staffApiData";
import { useState } from "react";
import PageLoader from "../loader/PageLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteAccountModal from "./model/DeleteAccountModal";
import { APPLICATION_BASE_URL } from "../../config/APIConfig";
import NoDataFound from "../noDataFound/NoDataFound";
import Pagination from "../pagination/Pagination";
import ShareModal from "./model/ShareModal";

const StaffDetailCard = () => {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalPage] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const StaffPageSize = 9; //for items per page
  useEffect(() => {
    getAllStaff();
  }, [currentPage]);
  const getAllStaff = () => {
    setLoader(true);
    const query = `page=${currentPage?.page}&page_size=${StaffPageSize}`;
    getStaffList(query)
      .then((res) => {
        if (res) {
          setStaffData(res.data?.data?.results);
          setTotalPage(res?.data?.data?.count);
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, "error in get staff");
      });
  };

  const handleDeleteClick = (staffId) => {
    setSelectedStaffId(staffId);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    setLoader(true);
    if (selectedStaffId) {
      deleteStaffData(selectedStaffId)
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data?.message);
          } else {
            toast.error("Something Went Wrong");
          }
          // Reload staff list after deletion
          getAllStaff();
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        })
        .finally(() => {
          setLoader(false);
          setShowDeleteModal(false);
          setSelectedStaffId(null);
        });
    }
  };
  const toggleModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const openEditStaffPage = (staffMember) => {
    navigate("/job-recruiter/staff/add-edit-staff", { state: { staffMember } });
  };
  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };
  // commented for future use
  // const toggleShareModal = () => {
  //   setShowShareModal(!showShareModal);
  // };
  return (
    <>
      {loader && <PageLoader className="loader_stance" />}
      <div className="founders">
        <div className="row mt-5">
          {staffData?.length > 0 ? (
            staffData?.map((staffMember) => (
              <div
                key={staffMember.id}
                className="col-md-6 col-lg-6 col-xl-4 staffCard mb-3"
              >
                <div className="border-col">
                  <div className=" profile_image founderThumb d-flex align-items-start justify-content-between">
                    <img
                      src={`${
                        staffMember?.profile_picture
                          ? `${APPLICATION_BASE_URL}${staffMember?.profile_picture}`
                          : "/assets/images/demo-user.png"
                      }`}
                      alt={staffMember.name}
                    />
                    <span className="label-type text-capitalize">
                      {/* {staffMember.skill_level} */}
                      {staffMember.groups[0]?.name.split("_")[1]}
                    </span>
                  </div>
                  <h5>{`${staffMember.first_name} ${staffMember.last_name}`}</h5>
                  <span>
                    <strong className="designation">
                      {staffMember.designation}
                    </strong>
                  </span>
                  <div className="bottomCard d-flex justify-content-between align-items-end">
                    <ul className="mt-4">
                      <li>
                        <Link className="d-flex">
                          <img src={phoneIcon} className="me-3" alt="phone" />
                          <span>{staffMember.phone_number}</span>
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={emailIcon} className="me-3" alt="email" />
                          <span>{staffMember.email}</span>
                        </Link>
                      </li>
                    </ul>
                    <ul className="d-flex align-items-center justify-content-center">
                      <li>
                        <Link>
                          <img
                            src={deleteIcon}
                            onClick={() => handleDeleteClick(staffMember.id)}
                            alt="delete"
                            className="me-3"
                          />
                        </Link>
                      </li>
                      <li>
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={() => openEditStaffPage(staffMember)}
                          src={editIcon}
                          alt="Edit"
                          className="me-3"
                        />
                      </li>
                      <li>
                        <Link
                        >
                          <img src={shareIcon} alt="share"/>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoDataFound msg="No Staff Added Yet" />
          )}
        </div>
        {totalPage > StaffPageSize && (
          <Pagination
            onPageChange={onPageChange}
            totalPage={totalPage}
            jobPerPage={StaffPageSize}
          />
        )}
      </div>
      {showDeleteModal && (
        <DeleteAccountModal
          toggleModal={toggleModal}
          showDeleteModal={showDeleteModal}
          text="Are you sure you want to delete this staff member?"
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
      {/* commented for future use */}
      {/* {showShareModal && (
        <ShareModal
          showShareModal={showShareModal}
          toggleShareModal={toggleShareModal}
          text="Share Your Profile"
        />
      )} */}
    </>
  );
};

export default StaffDetailCard;
