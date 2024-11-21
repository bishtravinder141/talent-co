import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: {},
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notificationDetails = action.payload;
    }
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
