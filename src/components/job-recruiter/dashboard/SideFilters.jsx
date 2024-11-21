import React, { Fragment, useState } from "react";
import { DASHBOARD_TYPE } from "../constant/constant";
import FilterCheckbox from "./FilterCheckbox";
import { useEffect } from "react";
import { getFilterItems } from "../../../API/masterApiData";
import DropdownField from "../../inputFields/DropdownField";
import { useNumberOnly } from "../../../hooks/customHooks";
import { set } from "react-hook-form";
import { CURRENCY_LIST_FILTER } from "../../../pages/job/constant";
import UpdatedDropDown from "../../inputFields/UpdatedDropDown";

function SideFilters({
  dashboardType = DASHBOARD_TYPE.recruiter,
  setSelectedFilter,
  selectedFilter,
  applicationsData = [],
  filterList = {},
}) {
  let timerId;
  const [showAdvanceFilters, setShowAdvanceFilters] = useState(false);
  const [customSearchText, setCustomSearchText] = useState("");
  const [searchTimer, setSearchTimer] = useState();
  const [salary, setSalary] = useState({
    min: "",
    max: "",
  });
  const toggleAdvanceFilters = () => {
    setShowAdvanceFilters(!showAdvanceFilters);
  };

  const handleAddKeyWords = (e) => {
    if (e.key === "Enter") {
      let keyword = e.target.value;
      keyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      if (selectedFilter.keywords.includes(keyword)) {
        console.log("already added");
      } else {
        e.target.value = "";
        setSelectedFilter({
          ...selectedFilter,
          keywords: [...selectedFilter.keywords, keyword],
        });
      }
    }
  };

  const handleRemoveKeyWords = (index) => {
    const tempKeywords = [...selectedFilter.keywords];
    tempKeywords.splice(index, 1);
    setSelectedFilter({
      ...selectedFilter,
      keywords: [...tempKeywords],
    });
  };

  //handels jobtype,onsite/remote and experience level
  const handleJobFilters = (event, type, field) => {
    if (event.target.checked) {
      setSelectedFilter({
        ...selectedFilter,
        [field]: [...selectedFilter[field], type],
      });
    } else {
      const tempArray = [...selectedFilter[field]];
      const index = tempArray.findIndex((curElem) => curElem === type);
      tempArray.splice(index, 1);
      setSelectedFilter({
        ...selectedFilter,
        [field]: [...tempArray],
      });
    }
  };

  const handleSkillsAndScoreFilter = (event, skill, filed) => {
    if (event.target.checked) {
      setSelectedFilter({
        ...selectedFilter,
        [filed]: [...selectedFilter[filed], skill],
      });
    } else {
      const tempSkill = [...selectedFilter[filed]];
      tempSkill.splice(index, 1);
      setSelectedFilter({
        ...selectedFilter,
        [filed]: [...tempSkill],
      });
    }
  };
  const handleCustomSearch = (searchValue) => {
    if (
      (!applicationsData || applicationsData?.length === 0) &&
      customSearchText.length === 0
    ) {
      return;
    }
    setCustomSearchText(searchValue);
    clearTimeout(searchTimer);
    if (
      customSearchText.length === 0 &&
      selectedFilter?.custom_search?.length === 0
    ) {
      return;
    }
    const timer = setTimeout(() => {
      setSelectedFilter((prevFilter) => ({
        ...prevFilter,
        custom_search: searchValue,
      }));
    }, 500);
    setSearchTimer(timer);
  };

  const handleSearchBySalary = (name, searchValue, type) => {
    if (searchValue.length > 0 && !useNumberOnly(searchValue)) {
      return;
    }

    // commented for future use
    // if (
    //   (!applicationsData || applicationsData?.length === 0) &&
    //   salary[name]?.length === 0
    // ) {
    //   return;
    // }

    setSalary({
      ...salary,
      [name]: searchValue,
    });
    clearTimeout(searchTimer);

    // commented for future use
    // if (
    //   salary[name]?.length === 0 &&
    //   selectedFilter?.salaryRange[type]?.length === 0
    // ) {
    //   return;
    // }

    const timer = setTimeout(() => {
      setSelectedFilter((prevFilter) => ({
        ...prevFilter,
        [type]: searchValue,
      }));
    }, 500);
    setSearchTimer(timer);
  };

  const handleSearchBySkillName = (value) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      setSelectedFilter({
        ...selectedFilter,
        skillName: value,
      });
    }, 600);
  };

  return (
    <div className="side-filters-recruiter">
      <div className="row">
        <div className="col-12 pb-3">
          {dashboardType === DASHBOARD_TYPE.recruiter && showAdvanceFilters ? (
            <div className="border-bottom pb-3">
              <label>Filters</label>
              <div className="fieldset custom-search">
                <input
                  type="text"
                  name=""
                  placeholder="Custom Search"
                  className="form-control input-icon search-field"
                  value={customSearchText}
                  onChange={(e) => handleCustomSearch(e.target.value)}
                />
                <span className="input-field-icon">
                  <img src="/assets/images/search-icon.svg" alt="Search Icon" />
                </span>
              </div>
            </div>
          ) : (
            showAdvanceFilters && (
              <div className="border-bottom pb-3">
                <label>Listed</label>
                <div className="fieldset custom-search">
                  <select className="form-control">
                    <option>Any time</option>
                    <option>Select 1</option>
                    <option>Select 2</option>
                    <option>Select 3</option>
                    <option>Select 4</option>
                  </select>
                </div>
              </div>
            )
          )}
        </div>
        {showAdvanceFilters && (
          <div className="col-12 pb-3">
            <div className="border-bottom pb-3 ">
              <label>Skill Name</label>
              <div className="fieldset custom-search ">
                <input
                  type="text"
                  placeholder="Enter skill name"
                  className="form-control"
                  onChange={(e) => {  
                    handleSearchBySkillName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {dashboardType === DASHBOARD_TYPE.recruiter && showAdvanceFilters && (
          <div className="col-12 pb-3">
            <div className="border-bottom pb-3">
              <label>Keyword</label>
              <div className="fieldset">
                <input
                  type="text"
                  placeholder="Add Keywords"
                  className="form-control"
                  onKeyDown={handleAddKeyWords}
                />
                <ul className="multi-select-list">
                  {selectedFilter.keywords.map((words, i) => (
                    <li key={i}>
                      {words}{" "}
                      <button onClick={() => handleRemoveKeyWords(i)}>
                        <img
                          src="/assets/images/close-icon.svg"
                          alt="Close Icon"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {filterList?.job_type?.length > 0 && showAdvanceFilters && (
          <div className="col-12 pb-3">
            <div className="border-bottom pb-3">
              <label>Job type</label>
              <div className="row">
                {filterList.job_type.map((jobTyp, index) => (
                  <Fragment key={index}>
                    <FilterCheckbox
                      handleChangeFilter={handleJobFilters}
                      checked={selectedFilter?.job_type?.includes(jobTyp)}
                      type="job_type"
                      title={jobTyp}
                      id={jobTyp}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
        {filterList?.employment_type?.length > 0 &&
          dashboardType === DASHBOARD_TYPE.recruiter &&
          showAdvanceFilters && (
            <div className="col-12 pb-3">
              <div className="border-bottom pb-3">
                <label>Employee type</label>
                {filterList?.employment_type?.map((empTyp, i) => (
                  <Fragment key={i}>
                    <FilterCheckbox
                      handleChangeFilter={handleJobFilters}
                      checked={selectedFilter.employment_type.includes(empTyp)}
                      type="employment_type"
                      title={empTyp}
                      id={empTyp}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
          )}
        {dashboardType === DASHBOARD_TYPE.seeker && showAdvanceFilters && (
          <div className="advance-filter">
            <div className="col-12 pb-3">
              <div className="border-bottom pb-3">
                <label>Salary Range</label>
                <div className="fieldset">
                  <div className="d-flex g-2">
                    <UpdatedDropDown
                      isSearchable={false}
                      handleOnChange={(e) =>
                        setSelectedFilter({
                          ...selectedFilter,
                          salaryRange: {
                            ...selectedFilter.salaryRange,
                            salary_amount_currency: e.title,
                          },
                        })
                      }
                      placeholderText={"Select Currency"}
                      // icon={"/assets/images/tag-icon.svg"}
                      option={CURRENCY_LIST_FILTER}
                      // selectedValue={newJobPost.salary_currency}
                      // type="currency_type"
                    />
                    {/* <DropdownField
                      option={['$']}
                      selected="Select the currency"
                      handleOnChange={(value) =>
                        setSelectedFilter({
                          ...selectedFilter,
                          salaryRange: {
                            ...selectedFilter.salaryRange,
                            salary_amount_currency: value,
                          },
                        })
                      }
                    /> */}
                    <DropdownField
                      option={["Annual", "Half yearly", "Quarterly"]}
                      selected="Select Salary Type"
                      handleOnChange={(value) => {
                        setSelectedFilter((prevFilter) => ({
                          ...prevFilter,
                          salaryRange: {
                            ...prevFilter.salaryRange,
                            salary_amount_type: value,
                          },
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="fieldset">
                  <div className="d-flex g-2">
                    <input
                      type="text"
                      name="min"
                      placeholder="Min Salary"
                      className="form-control"
                      value={salary.min}
                      onChange={(e) =>
                        handleSearchBySalary(
                          "min",
                          e.target.value,
                          "salary_amount_min"
                        )
                      }
                    />
                    <input
                      type="text"
                      name="max"
                      placeholder="Max Salary"
                      className="form-control"
                      value={salary.max}
                      onChange={(e) =>
                        handleSearchBySalary(
                          "max",
                          e.target.value,
                          "salary_amount_max"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {filterList?.job_locations?.length > 0 &&
              showAdvanceFilters &&
              dashboardType === DASHBOARD_TYPE.seeker && (
                <div className="col-12 pb-3">
                  <div className="border-bottom pb-3">
                    <label>On-site/remote</label>
                    {filterList?.job_locations?.map((jobloc, i) => (
                      <Fragment key={i}>
                        <FilterCheckbox
                          handleChangeFilter={handleJobFilters}
                          checked={selectedFilter?.job_locations?.includes(
                            jobloc
                          )}
                          type="job_locations"
                          title={jobloc}
                          id={jobloc}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}
            {filterList?.experiences?.length > 0 &&
              showAdvanceFilters &&
              dashboardType === DASHBOARD_TYPE.seeker && (
                <div className="col-12 pb-3">
                  <div className="border-bottom pb-3">
                    <label>Experience Level</label>
                    {filterList?.experiences?.map((exptype, i) => (
                      <Fragment key={i}>
                        <FilterCheckbox
                          handleChangeFilter={handleJobFilters}
                          checked={selectedFilter?.experiences?.includes(
                            exptype
                          )}
                          type="experiences"
                          title={exptype}
                          id={exptype}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

            {/* As per discussion for now this is commented */}

            {/* <div className="col-12 pb-3">
              <div className="border-bottom pb-3">
                <label>Job Location</label>
                <div className="fieldset checkbox-set mb-2">
                  <input type="checkbox" name="employee-type" />
                  <span>On Site</span>
                </div>
                <div className="fieldset custom-search">
                  <input
                    type="text"
                    name=""
                    placeholder="Search by location"
                    className="form-control input-icon search-field"
                  />
                  <span className="input-field-icon">
                    <img src="/assets/images/search-icon.svg" />
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        )}

        {/* {filterList?.skills?.length > 0 && showAdvanceFilters && (
          <div className="col-12 pb-3">
            <div className="border-bottom pb-3">
              <label>Skill's</label>
              <div className="row">
                {filterList?.skills?.map((skl, index) => (
                  <Fragment key={index}>
                    <FilterCheckbox
                      handleChangeFilter={handleSkillsAndScoreFilter}
                      checked={selectedFilter.skills.includes(skl)}
                      type="skills"
                      title={skl}
                      id={skl}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )} */}
        {dashboardType === DASHBOARD_TYPE.recruiter && showAdvanceFilters && (
          <div className="col-12 pb-3">
            <div className="border-bottom pb-3">
              <label>Score</label>
              <div className="row">
                {new Array(5).fill().map((_, index) => (
                  <div className="col-6" key={index}>
                    <div className="fieldset checkbox-set">
                      <input
                        type="checkbox"
                        name="employee-type"
                        checked={selectedFilter?.rating?.includes(index + 1)}
                        onChange={(e) =>
                          handleSkillsAndScoreFilter(e, index + 1, "rating")
                        }
                      />
                      <span>{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="col-12 pb-2">
          <button
            type="button"
            className="btn-design full-width advance-filter-btn"
            onClick={toggleAdvanceFilters}
          >
            Advanced Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideFilters;
