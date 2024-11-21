import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeZone: [],
  jobTitles: []
};

export const masterAPISlice = createSlice({
  name: "masterAPI",
  initialState,
  reducers: {
    setTimeZonList: (state, action) => {
      state.timeZone = action.payload;
    },
    setJobTitlesList: (state, action) => {
      state.jobTitles = action.payload;
    },
  },
});

export const { setTimeZonList, setJobTitlesList } = masterAPISlice.actions;

export default masterAPISlice.reducer;