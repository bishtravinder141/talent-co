import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "./../../../../test-utils";
import userEvent from "@testing-library/user-event";
import ViewJobs from "./ViewJobs";

describe("View job page Test cases", () => {
  const getJobListData = jest.fn();
  beforeEach(() => {
    render(<ViewJobs />);
  });
  it("view job page Render Correctly", () => {
    expect(screen.getAllByText("Jobs")[0]).toBeInTheDocument();
  });
  it("Does all tabs present", () => {
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active Jobs")).toBeInTheDocument();
    expect(screen.getByText("Closed Jobs")).toBeInTheDocument();
    expect(screen.getByText("Drafts Jobs")).toBeInTheDocument();
    expect(screen.getByText("Drafts Jobs")).toBeInTheDocument();
  });
  it("Tab all should be active on first time", () => {
    const activeTab = screen.getByText("All");
    expect(activeTab).toHaveClass("active");
  });
  it("it should mark the clicked tab as active", () => {
    const tab1 = screen.getByText("All");
    fireEvent.click(tab1);
    expect(tab1).toHaveClass("active");

    const tab2 = screen.getByText("Active Jobs");
    fireEvent.click(tab2);
    expect(tab2).toHaveClass("active");

    const tab3 = screen.getByText("Closed Jobs");
    fireEvent.click(tab3);
    expect(tab3).toHaveClass("active");

    const tab4 = screen.getByText("Drafts Jobs");
    fireEvent.click(tab4);
    expect(tab4).toHaveClass("active");
  });

  it("It should redirect to create new job page on create new job click", async () => {
    const Btn = screen.getByText("Create New Job");
    await userEvent.click(Btn);
    expect(window.location.pathname).toEqual("/job-recruiter/create-job");
  });

  // test("useEffect runs with initial currentPage and sets loader", () => {
  //   const selectedTab = "all"; // Set your desired initial selectedTab value
  //   // const { getByText } = render(<ViewJobs />);

  //   // Assert that the loader is set to true
  //   // expect(screen.getByText("Loading...")).toBeTruthy();

  //   // Expect that getJobListData is called with the initial parameter
  //   expect(getJobListData).toHaveBeenCalledWith('?page=1&page_size=10')

  //   // Reset the mock function
  //   // mockGetJobListData.mockReset();
  // });
});

// it("On All tab get all job list", async () => {
//   await act(() => {
//     render(<ViewJobs />);
//   });

//   expect(screen.getByText("Job/Template Title")).toBeInTheDocument();
//   expect(screen.getByText("Status")).toBeInTheDocument();
//   expect(screen.getByText("Date Posted")).toBeInTheDocument();
//   expect(screen.getByText("Actions")).toBeInTheDocument();

//   // await waitFor(() => {
//   expect(screen.getByText("react developer")).toBeInTheDocument();
//   //   expect(screen.getByText('Part time')).toBeInTheDocument();
//   //   expect(screen.getByText('intermediate')).toBeInTheDocument();
//   // });
// });
