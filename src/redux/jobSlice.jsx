import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editedJob: {},
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setEditedJob: (state, action) => {
      state.editedJob = action.payload;
    },
    clearJobState: (state) => {
      state.editedJob = {};
    },
  },
});

export const { setEditedJob } = jobSlice.actions;

export default jobSlice.reducer;
