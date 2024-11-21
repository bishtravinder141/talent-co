import { Fragment, useEffect, useState } from "react";
import "../job-seeker-dashboard.css";
import ELearningCard from "../../../components/LearningCenter/ELearningCard";
import { E_LEARNING_CARD } from "./constant";
import {
  APPLICATION_STATUS,
  CANDIDATE_JOB__PER_PAGE,
} from "../../../constants/Constent";
import SideFilters from "../../../components/job-recruiter/dashboard/SideFilters";
import JobCard from "../../../components/job-seeker/dashboard/JobCard";
import { JOBS } from "../../../components/job-seeker/dashboard/constant";
import JobSeekerDashboardLayout from "../../../layouts/job-seeker/JobSeekerDashboardLayout";
import {
  getCandidateRecommendedJobs,
  updateJobStatus,
} from "../../../API/candidateJobs";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import { buildQueryFromSelectedFilters } from "../../../utils/utils";
import PageLoader from "../../../components/loader/PageLoader";
import Pagination from "../../../components/pagination/Pagination";
import { toastMessage } from "../../../utils/toastMessages";
import { jobSavedMessage, successType } from "../../../utils/allToastMessage";
import { getFilterItems } from "../../../API/masterApiData";
import DropdownField from "../../../components/inputFields/DropdownField";
import { JOBS_ORDER_BY_OPTIONS } from "../../job/application/constant";

const Dashboard = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [jobList, setJobList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [selectedFilter, setSelectedFilter] = useState({
    keywords: [],
    custom_search: "",
    job_type: [],
    job_location: [],
    skills: [],
    employment_type: [],
    rating: [],
    salaryRange: {
      salary_amount_currency: "",
      range: "",
      salary_amount_type: "",
      salary_amount_max: "",
      salary_amount_min: "",
    },
    experiences: [],
    job_locations: [],
  });
  const [filterList, setFilterList] = useState([]);
  const [searchText, setSearchText] = useState({
    job_title_text: "",
    country_city: "",
  });
  const [orderBy, setOrderBy] = useState("-created_at");

  useEffect(() => {
    setLoader(true);
    const locationSearch = searchText.country_city
      ? searchText.country_city
      : "";
    const titleSearch = searchText.job_title_text
      ? searchText.job_title_text
      : "";
    let temSelectedFilter = { ...selectedFilter };
    if (selectedFilter.rating?.length > 0) {
      temSelectedFilter.rating = [Math.max(...selectedFilter.rating)];
    }
    let query = buildQueryFromSelectedFilters(temSelectedFilter);
    query =
      query.length > 0
        ? `${query}&page=${currentPage.page}&page_size=${CANDIDATE_JOB__PER_PAGE}&search_keyword=${titleSearch}&search_location=${locationSearch}`
        : `page=${currentPage.page}&page_size=${CANDIDATE_JOB__PER_PAGE}&search_keyword=${titleSearch}&search_location=${locationSearch}&order_by=${orderBy}`;
    getCandidateRecommendedJobs(query)
      .then((res) => {
        setJobList(res?.data?.data?.results);
        setTotalPage(res?.data?.data?.count);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err, "error in recommended job");
        setLoader(false);
      });
    getFilterItems()
      .then((res) => {
        setFilterList(res.data.data);
      })
      .catch((err) => {
        console.log(err, "console..loogerrr");
      });
  }, [selectedFilter, currentPage, orderBy]);

  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };

  // for updating saved job status
  const handleSaveJob = (jobId) => {
    setLoader(true);
    const payload = {
      job: jobId,
      job_status: APPLICATION_STATUS.saved,
    };
    updateJobStatus(payload)
      .then((res) => {
        setLoader(false);
        const index = jobList.findIndex((curJob) => curJob.id === jobId);
        const tempJobList = [...jobList];
        tempJobList[index].job_saved = true;
        setJobList(tempJobList);
        toastMessage(jobSavedMessage, successType);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        toastMessage(err?.response?.data?.message);
      });
  };

  const handleOnSearchChange = (searchedTextValue, name) => {
    // const {name, value} = e.target
    setSearchText({
      ...searchText,
      [name]: searchedTextValue,
    });
  };

  const handleSubmitSearch = () => {
    setCurrentPage({ page: 1 });
  };

  return (
    <JobSeekerDashboardLayout
      header={"Dashboard"}
      subTitle={"Find a job you love"}
      showSearchBar={true}
      handleOnchange={handleOnSearchChange}
      searchText={searchText}
      handleSubmitSearch={handleSubmitSearch}
      isSideFilterRequired={true}
      applicationsData={jobList}
      dashboardType="seeker"
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
      filterList={filterList}
    >
      <div className="sidebarFilters d-none">
        {/* <h6>Filters</h6>
        <SideFilters
          applicationsData={jobList}
          dashboardType="seeker"
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterList={filterList}
        /> */}
      </div>
      {loader && <PageLoader />}
      <div className="jobListFilter">
        <div className="dashboardRecommendedFilter">
          <div>
            <div>
              <div className="fieldset custom-search">
                <DropdownField
                  option={JOBS_ORDER_BY_OPTIONS}
                  handleOnChange={(value) => setOrderBy(value)}
                  smallDropdown={true}
                />
              </div>
            </div>
          </div>
        </div>
        <h6>Recommended jobs</h6>

        {jobList.length > 0 ? (
          jobList.map((job, i) => (
            <Fragment key={i}>
              <JobCard
                jobDetails={job}
                headerBadge={false}
                featured={true}
                handleSaveJob={() => {
                  handleSaveJob(job?.id);
                }}
                showDetailJob={true}
              />
            </Fragment>
          ))
        ) : (
          <NoDataFound />
        )}

        {totalPage > CANDIDATE_JOB__PER_PAGE && (
          <Pagination
            onPageChange={onPageChange}
            totalPage={totalPage}
            jobPerPage={CANDIDATE_JOB__PER_PAGE}
          />
        )}

        <div className="recommended-training mt-5">
          <div className="row align-items-center">
            <div className="col-12">
              <h6>Recommended Training</h6>
            </div>
            <NoDataFound />
            {/* commented for future use */}
            {/* {E_LEARNING_CARD.map((learn, index) => (
              <Fragment key={index}>
                <ELearningCard
                  imgSrc={learn.img}
                  title={learn.title}
                  description={learn.subTitle}
                />
              </Fragment>
            ))} */}
          </div>
        </div>
      </div>
    </JobSeekerDashboardLayout>
  );
};

export default Dashboard;
