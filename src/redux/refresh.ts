// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const refreshSlice = createSlice({
  name: "refresh",
  initialState: {
    platformCredential: false,
    mlsDoc: false,
    mlsConfig: false,
    platform: false,
    mlsServer: false,
    discount: false,
    promotion: false,
    flatRate: false,
    rangeRate: false,
    packages: false,
    btt: false,
    profile: false,
    role: false,
    permission: false,
    multiLang: false,
    user: false,
  },
  reducers: {
    handleRefresh: (state: any, action) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { handleRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;
