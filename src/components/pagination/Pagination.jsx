import React from "react";
import ReactPaginate from "react-paginate";
import { JOB_PER_PAGE } from "../../constants/Constent";
import "./style.css";

const Pagination = ({ onPageChange, totalPage, jobPerPage= JOB_PER_PAGE}) => {
  const pageCount = Math.ceil(totalPage / jobPerPage);
  return (
    <ReactPaginate
      previousLabel={"Prev"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination flex-wrap"}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      disabledClassName={"pagination__link--disabled"}
      activeClassName={"active"}
      pageClassName={"page-item"}
    />
  );
};

export default Pagination;
