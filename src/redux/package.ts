// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const packageSlice = createSlice({
  name: "package",
  initialState: {
    paymentType: [],
    paymentId: null,
    modalSit: false,
  },
  reducers: {
    handlePaymentType: (state: any, action) => {
      let oldVal = state.paymentType;
      const newVal = action.payload;
      const existIndex = oldVal.findIndex((o: any) => o.id === newVal.id);
      if (existIndex < 0) oldVal.push(newVal);
      else oldVal[existIndex] = newVal;
      state.paymentType = oldVal;
    },
    removePaymentType: (state: any, action) => {
      let oldVal = state.paymentType;
      const newVal = action.payload;
      const existIndex = oldVal.findIndex((o: any) => o.id === newVal.id);
      if (existIndex > -1) oldVal.splice(existIndex, 1);
      state.paymentType = oldVal;
    },
  },
});

export const { handlePaymentType, removePaymentType } = packageSlice.actions;

export default packageSlice.reducer;
