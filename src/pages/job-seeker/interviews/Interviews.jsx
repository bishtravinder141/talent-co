import React, { useEffect, useState } from "react";
import JobSeekerDashboardLayout from "../../../layouts/job-seeker/JobSeekerDashboardLayout";
import "../job-seeker-dashboard.css";
import InterviewSection from "../../../components/common/InterviewSection";
import moment from "moment";
import { chatRoomWIthSpecificRecruiter, getCandidateInterviewList } from "../../../API/candidateJobs";
import { JOB_PER_PAGE } from "../../../constants/Constent";
import Pagination from "../../../components/pagination/Pagination";
import { useNavigate } from "react-router";

const Interviews = () => {
  const [date, setDate] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "week").format("YYYY-MM-DD"),
  });
  // const [orderBy,setOrderBy] = useState("-day_and_date");
  const [filter, setFilter] = useState({
    timePeriod: "week",
    position: "Web developer",
  });
  const [interviewList, setInterviewList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    setLoader(true);
    let param = `start_date=${date.startDate}&end_date=${date.endDate}}`;
    // let param = `start_date=${date.startDate}&end_date=${date.endDate}&order_by=${orderBy}`;

    getInterviewListData(param);
  }, [currentPage]);
// }, [currentPage,orderBy]);


  const getInterviewListData = (param) => {
    getCandidateInterviewList(param)
      .then((res) => {
        setInterviewList(res?.data?.data?.results);
        setTotalPage(res?.data?.data?.count);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const onFilterChange = (name, value) => {
    if (filter[name] !== value) {
      setFilter({ ...filter, [name]: value });
      setCurrentPage({ page: 1 });
    }
  };

  const onDateChange = () => {
    setCurrentPage({ page: 1 });
  };

  const onPageChange = (selectedPage) => {
    setCurrentPage({ page: selectedPage.selected + 1 });
  };

  const createChatRoom = (userId) => {
    setLoader(true);
    chatRoomWIthSpecificRecruiter(userId)
      .then((res) => {
        setLoader(false);
        localStorage.setItem("roomId", res.data?.data?.results?.room_name);
        navigate("/job-seeker/messages");
        console.log(res);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  return (
    <JobSeekerDashboardLayout
      header={"Interviews"}
      subTitle={
        "Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at."
      }
      showSearchBar={false}
    >
      <InterviewSection
        loader={loader}
        interviewList={interviewList}
        filter={filter}
        onFilterChange={onFilterChange}
        date={date}
        setDate={setDate}
        onDateChange={onDateChange}
        seekerPage={true}
        createChatRoom={createChatRoom}
        // setOrderBy = {setOrderBy}
      />
      <div className="mt-4">
        {totalPage > JOB_PER_PAGE && (
          <Pagination
            pageData={interviewList}
            onPageChange={onPageChange}
            totalPage={totalPage}
          />
        )}
      </div>
    </JobSeekerDashboardLayout>
  );
};

export default Interviews;
