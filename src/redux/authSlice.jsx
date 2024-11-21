import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  mobile: "",
  isLogin: false,
  // selectedRole:null,
  user: {},
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuthState: (state) => {
      // state.mobile = "";
      state.token = "";
      state.isLogin = false;
      state.user = {};
      state.user = {};
    },
    // setRole:(state,action) => {
    //   state.selectedRole = action.payload;
    // }
  },
});

export const { setLogin, setMobile, setToken, setUser, clearAuthState } =
  authSlice.actions;

export default authSlice.reducer;
