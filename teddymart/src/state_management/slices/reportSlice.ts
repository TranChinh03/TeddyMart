import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ADD_ORDER,
  DELETE_ORDER,
  RESET_ALL_STORES,
} from "state_management/actions/actions";

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
            state.byMonth[iM].outcome += order.totalPayment;
            state.byYear[iY].outcome += order.totalPayment;

            state.byDate[i].profit -= order.totalPayment;
            state.byMonth[iM].profit -= order.totalPayment;
            state.byYear[iY].profit -= order.totalPayment;
          }
          if (order.type === "Export" && order.status === "paid") {
            state.byDate[i].revenue += order.totalPayment;
            state.byMonth[iM].revenue += order.totalPayment;
            state.byYear[iY].revenue += order.totalPayment;

            state.byDate[i].profit += order.totalPayment;
            state.byMonth[iM].profit += order.totalPayment;
            state.byYear[iY].profit += order.totalPayment;
          }
          if (order.type === "Import") {
            state.byDate[i].importOrder += 1;
            state.byMonth[iM].importOrder += 1;
            state.byYear[iY].importOrder += 1;
          } else {
            state.byDate[i].exportOrder += 1;
            state.byMonth[iM].exportOrder += 1;
            state.byYear[iY].exportOrder += 1;
          }

          state.byDate[i].numberOfOrder += 1;
          state.byMonth[iM].numberOfOrder += 1;
          state.byYear[iY].numberOfOrder += 1;
        }

        return state;
      }
    );
    builder.addCase(
      DELETE_ORDER,
      (state: TReportSlice, action: PayloadAction<TOrder[]>) => {
        for (const order of action.payload) {
          //let index = state.byDate.findIndex(())
          let iD = state.byDate.findIndex(
            (d) =>
              new Date(d.date).getTime() === new Date(order.createdAt).getTime()
          );
          let iM = state.byMonth.findIndex(
            (m) =>
              new Date(m.date).getTime() === new Date(order.createdAt).getTime()
          );
          let iY = state.byYear.findIndex(
            (y) =>
              new Date(y.date).getTime() === new Date(order.createdAt).getTime()
          );

          if (iD !== -1) {
            if (order.type === "Export") {
              state.byDate[iD].exportOrder -= 1;
              state.byMonth[iM].exportOrder -= 1;
              state.byYear[iY].exportOrder -= 1;
              if (order.status === "paid") {
                state.byDate[iD].revenue -= order.totalPayment;
                state.byMonth[iM].revenue -= order.totalPayment;
                state.byYear[iY].revenue -= order.totalPayment;

                state.byDate[iD].profit -= order.totalPayment;
                state.byMonth[iM].profit -= order.totalPayment;
                state.byMonth[iY].profit -= order.totalPayment;
              }
            }

            if (order.type === "Import") {
              state.byDate[iD].importOrder -= 1;
              state.byMonth[iM].importOrder -= 1;
              state.byYear[iY].importOrder -= 1;
              if (order.status === "paid") {
                state.byDate[iD].outcome += order.totalPayment;
                state.byMonth[iM].outcome += order.totalPayment;
                state.byYear[iY].outcome += order.totalPayment;

                state.byDate[iD].profit += order.totalPayment;
                state.byMonth[iM].profit += order.totalPayment;
                state.byMonth[iY].profit += order.totalPayment;
              }
            }

            state.byDate[iD].numberOfOrder -= 1;
            state.byMonth[iM].numberOfOrder -= 1;
            state.byYear[iY].numberOfOrder -= 1;
          }
        }
        return state;
      }
    );
  },
});
export const { uploadReport } = reportSlice.actions;
export default reportSlice.reducer;
