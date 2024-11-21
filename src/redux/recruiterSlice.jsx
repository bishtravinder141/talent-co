import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recruiterProfile: {},
  companyProfile: {}
};

export const recruiterSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    updateRecruiterData: (state, action) => {
      state.recruiterProfile = action.payload;
    },
    updateRecruiterId: (state, action) => {
      if (state.recruiterProfile) {
        state.recruiterProfile["profile_id"] = action.payload;
      } else {
        state.recruiterProfile = {
          profile_id: action.payload,
        };
      }
    },
    updateCompanyDetails : (state, action) => {
      state.companyProfile = action.payload
    }
  },
});

export const { updateRecruiterData, updateRecruiterId, updateCompanyDetails } =
  recruiterSlice.actions;

export default recruiterSlice.reducer;
