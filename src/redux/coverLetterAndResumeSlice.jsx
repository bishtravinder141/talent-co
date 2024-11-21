import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coverLetterDetails: {},
  coverLetterAndResumeDetails: {},
};

export const resumeAndCoverLetterSlice = createSlice({
  name: "CoverLetterAndResume",
  initialState,
  reducers: {
    setCoverLetterDetails: (state, action) => {
      state.coverLetterDetails = action.payload;
    },
    setCoverLetterAndResumeDetails: (state, action) => {
      state.coverLetterAndResumeDetails = action.payload;
    },
  },
});

export const { setCoverLetterDetails, setCoverLetterAndResumeDetails } = resumeAndCoverLetterSlice.actions;

export default resumeAndCoverLetterSlice.reducer;
