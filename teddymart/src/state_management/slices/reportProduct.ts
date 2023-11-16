import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";
const reportProduct = createSlice({
  name: "reportProduct",
  initialState: [],
  reducers: {
    uploadReportProduct: (
      state: TReportProduct[],
      action: PayloadAction<TReportProduct[]>
    ) => {
      return [...action.payload];
    },
  },
  extraReducers(builder) {
    builder.addCase(RESET_ALL_STORES, (state: TReportProduct[]) => {
      return [];
    });
  },
});
export const { uploadReportProduct } = reportProduct.actions;
export default reportProduct.reducer;
