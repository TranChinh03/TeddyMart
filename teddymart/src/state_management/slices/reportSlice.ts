import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ADD_ORDER, RESET_ALL_STORES } from "state_management/actions/actions";

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
    builder.addCase(RESET_ALL_STORES, (state: TReportSlice) => {
      return {};
    });
    builder.addCase(
      ADD_ORDER,
      (state: TReportSlice, action: PayloadAction<TOrder>) => {
        let order = action.payload;
        let i = state.byDate.findIndex(
          (d) =>
            new Date(d.date).getTime() === new Date(order.createdAt).getTime()
        );

        let iM = state.byMonth.findIndex(
          (d) =>
            new Date(d.date).getTime() === new Date(order.createdAt).getTime()
        );

        let iY = state.byYear.findIndex(
          (d) =>
            new Date(d.date).getTime() === new Date(order.createdAt).getTime()
        );

        const data = {
          date: new Date(order.createdAt),
          outcome:
            order.type === "Import" && order.status === "paid"
              ? order.totalPayment
              : 0,
          revenue:
            order.type === "Export" && order.status === "paid"
              ? order.totalPayment
              : 0,
          numberOfOrder: 1,
          importOrder: order.type === "Import" ? 1 : 0,
          exportOrder: order.type === "Export" ? 1 : 0,
          profit:
            order.type === "Import" && order.status === "paid"
              ? -order.totalPayment
              : order.totalPayment,
        };

        if (iM === -1) {
          state.byMonth.unshift(data);
        }
        if (iY === -1) {
          state.byYear.unshift(data);
        }
        if (i === -1) {
          state.byDate.unshift(data);
        } else {
          if (order.type === "Import" && order.status === "paid") {
            state.byDate[i].outcome += order.totalPayment;
            state.byMonth[i].outcome += order.totalPayment;
            state.byYear[i].outcome += order.totalPayment;

            state.byDate[i].profit -= order.totalPayment;
            state.byMonth[i].profit -= order.totalPayment;
            state.byYear[i].profit -= order.totalPayment;
          }
          if (order.type === "Export" && order.status === "paid") {
            state.byDate[i].revenue += order.totalPayment;
            state.byMonth[i].revenue += order.totalPayment;
            state.byYear[i].revenue += order.totalPayment;

            state.byDate[i].profit += order.totalPayment;
            state.byMonth[i].profit += order.totalPayment;
            state.byYear[i].profit += order.totalPayment;
          }
          if (order.type === "Import") {
            state.byDate[i].importOrder += 1;
            state.byMonth[i].importOrder += 1;
            state.byYear[i].importOrder += 1;
          } else {
            state.byDate[i].exportOrder += 1;
            state.byMonth[i].exportOrder += 1;
            state.byYear[i].exportOrder += 1;
          }

          state.byDate[i].numberOfOrder += 1;
          state.byMonth[i].numberOfOrder += 1;
          state.byYear[i].numberOfOrder += 1;
        }

        return state;
      }
    );
  },
});
export const { uploadReport } = reportSlice.actions;
export default reportSlice.reducer;
