import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import recruiterSlice from "./recruiterSlice";
import jobSeekerSlice from "./jobSeekerSlice";
import masterAPISlice from "./masterDataSlice";
import notificationAPISlice from "./notificationSlice";
import coverLetterAndResumeSlice from "./coverLetterAndResumeSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: authSlice,
  recruiter: recruiterSlice,
  jobSeeker: jobSeekerSlice,
  masterAPIData: masterAPISlice,
  notificationAPIData: notificationAPISlice,
  coverLetterAndResume: coverLetterAndResumeSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const reduxStore = persistStore(store);
