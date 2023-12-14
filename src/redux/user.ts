// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import {
  clearStorage,
  getItem,
  removeItem,
  setItem,
} from "@src/core/services/common/storage.service";

const initialAuth = (): boolean => {
  const item = getItem("user");
  //** Parse stored json or if none return initialValue
  return item && typeof item !== "boolean" ? !!JSON.parse(item) : false;
};

const initialUser = () => {
  const item = getItem("user");
  //** Parse stored json or if none return initialValue
  return item && typeof item !== "boolean" ? JSON.parse(item) : null;
};

export const layoutSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: initialAuth(),
    user: initialUser(),
    authEmail: "",
    profileSetupStatus: true,
  },
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      setItem("user", action.payload);
    },
    handleLogout: (state) => {
      state.user = null;
      state.isAuth = false;
      //removeItem("user");
      clearStorage();
    },
    handleAuthEmail: (state, action) => {
      state.authEmail = action.payload;
    },
    handleProfileSetupStatus: (state, action) => {
      state.profileSetupStatus = action.payload;
    },
  },
});

export const {
  handleLogin,
  handleLogout,
  handleAuthEmail,
  handleProfileSetupStatus,
} = layoutSlice.actions;

export default layoutSlice.reducer;
