import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";

const reportSlice = createSlice({
  name: "reportSlice",
  initialState: {},
  reducers: {
    uploadReport: (
      state: TReportSlice,
      action: PayloadAction<TReportSlice>
    ) => {
      //return [...action.payload];
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, (state: TReport[]) => {
      return {};
    });
  },
});
export const { uploadReport } = reportSlice.actions;
export default reportSlice.reducer;
