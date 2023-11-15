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
      state.general = action.payload.general;
      //return [...action.payload];
    },
  },
  extraReducers: (builder) => {},
});
export const { uploadReport } = reportSlice.actions;
export default reportSlice.reducer;
