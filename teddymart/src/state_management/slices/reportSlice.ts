import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ADD_ORDER,
  DELETE_ORDER,
  RESET_ALL_STORES,
  UPDATE_ORDER,
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
        const order = action.payload;
        const data = {
          date: new Date(order.createdAt),
          outcome:
            order.type === "Import" && order.status === "paid"
              ? order.totalPayment
              : 0,
          revenue:
            order.type === "Export" && order.totalPayment > 0
              ? order.totalPayment
              : 0,
          numberOfOrder: 1,
          importOrder: order.type === "Import" ? 1 : 0,
          exportOrder: order.type === "Export" ? 1 : 0,
          profit:
            order.type === "Import" && order.totalPayment > 0
              ? -order.totalPayment
              : order.totalPayment,
        };

        const iY = state.byYear.findIndex(
          (y) => y.date === `${new Date(order.createdAt).getFullYear()}`
        );
        const iM = state.byMonth.findIndex(
          (m) =>
            m.date ===
            `${new Date(order.createdAt).getMonth() + 1}/${new Date(
              order.createdAt
            ).getFullYear()}`
        );
        const i = state.byDate.findIndex(
          (d) =>
            new Date(d.date).getTime() === new Date(order.createdAt).getTime()
        );

        if (iY === -1) {
          state.byYear.unshift({
            ...data,
            date: `${new Date(order.createdAt).getFullYear()}`,
          });
        }
        if (iM === -1) {
          state.byMonth.unshift({
            ...data,
            date: `${new Date(order.createdAt).getMonth() + 1}/${new Date(
              order.createdAt
            ).getFullYear()}`,
          });
        }
        if (i === -1) {
          state.byDate.unshift(data);
        } else {
          if (order.type === "Import") {
            state.byDate[i].importOrder += 1;
            state.byMonth[iM].importOrder += 1;
            state.byYear[iY].importOrder += 1;
            if (order.totalPayment > 0) {
              state.byDate[i].outcome += order.totalPayment;
              state.byMonth[iM].outcome += order.totalPayment;
              state.byYear[iY].outcome += order.totalPayment;

              state.byDate[i].profit -= order.totalPayment;
              state.byMonth[iM].profit -= order.totalPayment;
              state.byYear[iY].profit -= order.totalPayment;
            }
          }
          if (order.type === "Export") {
            state.byDate[i].exportOrder += 1;
            state.byMonth[iM].exportOrder += 1;
            state.byYear[iY].exportOrder += 1;
            if (order.totalPayment > 0) {
              state.byDate[i].revenue += order.totalPayment;
              state.byMonth[iM].revenue += order.totalPayment;
              state.byYear[iY].revenue += order.totalPayment;

              state.byDate[i].profit += order.totalPayment;
              state.byMonth[iM].profit += order.totalPayment;
              state.byYear[iY].profit += order.totalPayment;
            }
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
          const iD = state.byDate.findIndex(
            (d) =>
              new Date(d.date).getTime() === new Date(order.createdAt).getTime()
          );
          const iM = state.byMonth.findIndex(
            (m) =>
              m.date ===
              `${new Date(order.createdAt).getMonth() + 1}/${new Date(
                order.createdAt
              ).getFullYear()}`
          );
          const iY = state.byYear.findIndex(
            (y) => y.date === `${new Date(order.createdAt).getFullYear()}`
          );

          if (iD !== -1) {
            if (order.type === "Export") {
              state.byDate[iD].exportOrder -= 1;
              state.byMonth[iM].exportOrder -= 1;
              state.byYear[iY].exportOrder -= 1;
              if (order.totalPayment > 0) {
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
              if (order.totalPayment > 0) {
                state.byDate[iD].outcome -= order.totalPayment;
                state.byMonth[iM].outcome -= order.totalPayment;
                state.byYear[iY].outcome -= order.totalPayment;

                state.byDate[iD].profit += order.totalPayment;
                state.byMonth[iM].profit += order.totalPayment;
                state.byMonth[iY].profit += order.totalPayment;
              }
            }

            state.byDate[iD].numberOfOrder -= 1;
            state.byMonth[iM].numberOfOrder -= 1;
            state.byYear[iY].numberOfOrder -= 1;

            if (state.byYear[iD].numberOfOrder === 0) {
              state.byYear.splice(iY, 1);
              state.byMonth.splice(iM, 1);
              state.byDate.splice(iD, 1);
            }
          }
        }
        return state;
      }
    );
    builder.addCase(
      UPDATE_ORDER,
      (state: TReportSlice, action: PayloadAction<TOrder>) => {
        const order = action.payload;
        const iD = state.byDate.findIndex(
          (d) =>
            new Date(d.date).getTime() === new Date(order.createdAt).getTime()
        );
        const iM = state.byMonth.findIndex(
          (m) =>
            m.date ===
            `${new Date(order.createdAt).getMonth() + 1}/${new Date(
              order.createdAt
            ).getFullYear()}`
        );
        const iY = state.byYear.findIndex(
          (y) => y.date === `${new Date(order.createdAt).getFullYear()}`
        );
        if (order.type === "Export") {
          state.byDate[iD].revenue += order.debt;
          state.byMonth[iM].revenue += order.debt;
          state.byYear[iY].revenue += order.debt;

          state.byDate[iD].profit += order.debt;
          state.byMonth[iM].profit += order.debt;
          state.byYear[iY].profit += order.debt;
        } else {
          state.byDate[iD].outcome += order.debt;
          state.byMonth[iM].outcome += order.debt;
          state.byYear[iY].outcome += order.debt;

          state.byDate[iD].profit -= order.debt;
          state.byMonth[iM].profit -= order.debt;
          state.byYear[iY].profit -= order.debt;
        }
        return state;
      }
    );
  },
});
export const { uploadReport } = reportSlice.actions;
export default reportSlice.reducer;
