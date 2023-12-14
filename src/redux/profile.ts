// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {
    handleProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { handleProfile } = profileSlice.actions;

export default profileSlice.reducer;
