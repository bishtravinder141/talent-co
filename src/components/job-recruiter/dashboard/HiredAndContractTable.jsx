import React, { useState } from "react";
import NoDataFound from "../../noDataFound/NoDataFound";
import moment from "moment";
import DeleteAccountModal from "../../common/model/DeleteAccountModal";

const HiredAndContractTable = ({ applicationData, deleteHiredJob }) => {
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    id: "",
  });

  const handleDeleteClick = (candidateId) => {
    setShowDeleteModal({ show: true, id: candidateId });
  };
  const handleConfirmDelete = () => {
    deleteHiredJob(showDeleteModal.id, ()=>setShowDeleteModal({ show: !showDeleteModal.show, id: "" }));
  };

  return (
    <>
      <div className="applications-details-col border mb-4">
        <div className="applicant-body">
          <div className="global-table table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Candidate Name</th>
                  <th style={{ width: "35%", minWidth: "200px" }}>Job Title</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicationData.length > 0 ? (
                  applicationData?.map((candidataData, index) => (
                    <tr key={index}>
                      <td>
                        {moment(candidataData?.hired_at, "DD-MM-YYYY").format(
                          "MMMM DD, YYYY"
                        )}
                      </td>
                      <td>{candidataData?.candidate_name}</td>
                      <td>{candidataData?.job_title}</td>
                      <td className="text-end">
                        <div className="action-flex">
                          {/* <a className="btn-design btn-small border-btn">
                          Save
                        </a> */}
                          <span
                            className="cursor-pointer"
                            onClick={() => handleDeleteClick(candidataData?.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoDataFound />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showDeleteModal.show && (
        <DeleteAccountModal
          toggleModal={() =>
            setShowDeleteModal({ show: !showDeleteModal.show, id: "" })
          }
          showDeleteModal={showDeleteModal.show}
          text="Are you sure you want to delete this record?"
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default HiredAndContractTable;
