// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import {
  clearStorage,
  getItem,
  removeItem,
  setItem,
} from "@src/core/services/common/storage.service";

export const staffSlice = createSlice({
  name: "staff",
  initialState: {
    allStaff: [],
  },
  reducers: {
    handleStaffList: (state, action) => {
      state.allStaff = action.payload;
    },
  },
});

export const { handleStaffList } = staffSlice.actions;

export default staffSlice.reducer;
