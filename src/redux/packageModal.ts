// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const packagePaymentSlice = createSlice({
  name: "paymentEditModal",
  initialState: {
    paymentId: null,
    modalSit: false,
  },
  reducers: {
    handleModalSit: (state, action) => {
      state.modalSit = action.payload;
    },
    handlePaymentId: (state, action) => {
      state.paymentId = action.payload;
    },
  },
});

export const { handleModalSit, handlePaymentId } = packagePaymentSlice.actions;

export default packagePaymentSlice.reducer;
