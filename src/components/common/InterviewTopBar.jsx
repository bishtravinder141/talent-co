import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import DropdownField from "../inputFields/DropdownField";
import { INTERVIEW_ORDER_BY_OPTIONS } from "../../pages/job/application/constant";

const InterviewTopBar = ({
  filter,
  onFilterChange,
  date,
  setDate,
  onDateChange,
  seekerPage,
  // setOrderBy,
  // isRecruiter = false,
}) => {
  // const jobTitles = useSelector((state) => state?.masterAPIData?.jobTitles);
  let jobTitles = [
    "All",
    ...useSelector((state) => state?.masterAPIData?.jobTitles),
  ];
  jobTitles = [...new Set(jobTitles)]; //for removing duplicates
  const handleNextDate = () => {
    setDate((prev) => {
      return {
        startDate: prev.endDate,
        endDate: moment(prev.endDate)
          .add(1, filter.timePeriod)
          .format("YYYY-MM-DD"),
      };
    });
    onDateChange();
  };
  const handlePreviousDate = () => {
    setDate((prev) => {
      return {
        startDate: moment(prev.startDate)
          .subtract(1, filter.timePeriod)
          .format("YYYY-MM-DD"),
        endDate: prev.startDate,
      };
    });
    onDateChange();
  };

  const handleChangePeriod = (name, value) => {
    if (name === "timePeriod") {
      const currentDate = moment().format("YYYY-MM-DD");
      setDate({
        startDate: currentDate,
        endDate: moment(currentDate).add(1, value).format("YYYY-MM-DD"),
      });
    }
    onFilterChange(name, value);
  };
  return (
    <div className="interviewstable-topbar">
      <div className="row align-items-center">
        <div className="col-md-7 col-12">
          <div className="inteviewTableDateFilter">
            <ul>
              <li>
                <p>
                  <strong>
                    {moment(date.startDate, "YYYY-MM-DD").format(
                      "MMMM D, YYYY"
                    )}{" "}
                    -{" "}
                    {moment(date.endDate, "YYYY-MM-DD").format("MMMM D, YYYY")}
                  </strong>
                  <button
                    className="border-0 rounded"
                    style={{ marginLeft: "7px", width: "30px" }}
                    onClick={handlePreviousDate}
                  >
                    <i className="fa-solid fa-caret-left"></i>
                  </button>
                  <button
                    className="border-0 rounded"
                    style={{ marginLeft: "7px", width: "30px" }}
                    onClick={handleNextDate}
                  >
                    <i className="fa-solid fa-caret-right"></i>
                  </button>
                </p>
              </li>
              <li>
                <select
                  className="form-control no-border"
                  value={filter.timePeriod}
                  onChange={(e) =>
                    handleChangePeriod("timePeriod", e.target.value)
                  }
                >
                  <option value={"week"}>Week</option>
                  <option value={"month"}>Month</option>
                  <option value={"year"}>Year</option>
                </select>
              </li>
              <li>
                {/* <div
                  className={
                    isRecruiter
                      ? "RecruiterinterviewTopBarSortFilter"
                      : "interviewTopBarSortFilter"
                  }
                >
                  <div>
                    <div>
                      <div className="fieldset custom-search">
                        <DropdownField
                          option={INTERVIEW_ORDER_BY_OPTIONS}
                          handleOnChange={(value) => setOrderBy(value)}
                          smallDropdown={true}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </li>
            </ul>
          </div>
        </div>
        {!seekerPage && (
          <div className="col-md-5 col-12">
            <div className="sortfilter">
              <DropdownField
                option={jobTitles}
                handleOnChange={(value) => {
                  onFilterChange("position", value);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewTopBar;
