import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { updateData } from "controller/addData";
import {
  ADD_ORDER,
  DELETE_ORDER,
  RESET_ALL_STORES,
  UPDATE_ORDER,
} from "state_management/actions/actions";
const partnerSlice = createSlice({
  name: "partnerSlice",
  initialState: [],
  reducers: {
    addNewPartner: (state: TPartner[], action: PayloadAction<TPartner>) => {
      state.unshift(action.payload);
    },
    uploadPartner: (state: TPartner[], action: PayloadAction<TPartner[]>) => {
      return [...action.payload];
    },
    deletePartner: (
      state: TPartner[],
      action: PayloadAction<{ partnerId: string }>
    ) => {
      return state.filter((p) => p.partnerId !== action.payload.partnerId);
    },

    updatePartner: (
      state: TPartner[],
      action: PayloadAction<{ partnerId: string; newData: TPartner }>
    ) => {
      // Only allow to update Partner Name, email, phone number, address, total buy amount, debt, note, gender, certificate
      const index = state.findIndex(
        (p) => p.partnerId === action.payload.partnerId
      );
      if (index !== -1) {
        state[index] = { ...action.payload.newData };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, (state: TPartner[]) => {
      return [];
    });
    builder.addCase(
      ADD_ORDER,
      (state: TPartner[], action: PayloadAction<TOrder>) => {
        const order = action.payload;
        const index = state.findIndex((s) => s.partnerId === order.partnerId);
        if (index !== -1) {
          state[index].totalBuyAmount += order.totalPayment;
          state[index].debt += order.debt;
          updateData({
            data: {
              ...state[index],
              totalBuyAmount: state[index].totalBuyAmount,
              debt: state[index].debt,
            },
            table: "Partner",
            id: state[index].partnerId,
          });
        }
      }
    );
    builder.addCase(
      DELETE_ORDER,
      (state: TPartner[], action: PayloadAction<TOrder[]>) => {
        for (const order of action.payload) {
          const index = state.findIndex((s) => s.partnerId === order.partnerId);
          if (index !== -1) {
            state[index].debt -= order.debt;
            state[index].totalBuyAmount -= order.totalPayment;

            updateData({
              data: {
                ...state[index],
                totalBuyAmount: state[index].totalBuyAmount,
                debt: state[index].debt,
              },
              table: "Partner",
              id: state[index].partnerId,
            });
          }
        }
      }
    );
    builder.addCase(
      UPDATE_ORDER,
      (state: TPartner[], action: PayloadAction<TOrder>) => {
        const order = action.payload;

        const index = state.findIndex((s) => s.partnerId === order.partnerId);
        if (index !== -1) {
          state[index].debt -= order.debt;
          state[index].totalBuyAmount += order.payment;
          updateData({
            data: {
              ...state[index],
              totalBuyAmount: state[index].totalBuyAmount,
              debt: state[index].debt,
            },
            table: "Partner",
            id: state[index].partnerId,
          });
        }
      }
    );
  },
});

export const { addNewPartner, uploadPartner, deletePartner, updatePartner } =
  partnerSlice.actions;
export default partnerSlice.reducer;
