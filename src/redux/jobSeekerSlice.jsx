import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobSeekerProfile: {},
  // companiesAndJobList: {},
  topCompaniesList:{},
  topJobsList:{},
  jobAlertPreferences:{}
};

export const jobSeekerSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    updateJobSeekerData: (state, action) => {
      state.jobSeekerProfile = action.payload;
    },
    // setCompanyAndJobList: (state, action) => {
    //   state.companiesAndJobList = action.payload;
    // },
    setTopCompaniesList:(state,action) =>{
      state.topCompaniesList = action.payload;
    },
    setTopJobsList:(state,action) =>{
      state.topJobsList = action.payload;
    },
    setJobAlertPreferences: (state,action) => {
      state.jobAlertPreferences = action.payload;
    }
  },
});

export const { updateJobSeekerData, setCompanyAndJobList, setJobAlertPreferences,setTopJobsList,setTopCompaniesList } =
  jobSeekerSlice.actions;

export default jobSeekerSlice.reducer;
