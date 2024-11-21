const ListContainer = ({
  listData,
  handleEditModal,
  qualification = false,
  icon = "/assets/images/brifcase.svg",
}) => {
  return (
    <>
      {listData?.length > 0 && (
        <div className="experience-list-col">
          {listData?.map((item, index) => ( 
            <div className="experience-list-items" key={index}>
              <div className="exp-thumb">
                <img
                  src={item?.imageUrl ? item?.imageUrl : icon}
                  alt={`Experience ${index + 1}`}
                />
              </div>
              <div className="exp-content">
                <h6>{qualification ? item?.university : item?.position}</h6>
                <p>
                  {qualification ? item?.qualification : item?.company_name}
                </p>
                <span>
                  {qualification ? (
                    <>
                      {/* Jun 2017 - Present - 7mos */}
                      {item?.start_year} - {item?.end_year}
                    </>
                  ) : (
                    <>
                      {item?.start_year}{" "}
                      {item?.end_year ? `- ${item?.end_year}` : "Present"}
                    </>
                  )}
                </span>
                <div className="edit-exp">
                  <span
                    className="cursor-pointer"
                    onClick={() => handleEditModal(item, qualification, index)}
                  >
                    <img src="/assets/images/edit-icon.svg" alt="Edit" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListContainer;
