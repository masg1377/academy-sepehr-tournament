// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: null,
  },
  reducers: {
    handleRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const { handleRoles } = rolesSlice.actions;

export default rolesSlice.reducer;
