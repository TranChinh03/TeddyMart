import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";
const orderSlice = createSlice({
  name: "orderSlice",
  initialState: [],
  reducers: {
    addNewOrder: (state: TOrder[], action: PayloadAction<TOrder>) => {
      state.push(action.payload);
    },
    uploadOrder: (state: TOrder[], action: PayloadAction<TOrder[]>) => {
      return [...action.payload];
    },
    deleteOrder: (state: TOrder[], action: PayloadAction<TOrder>) => {
      return state.filter((p) => p.orderId !== action.payload.orderId);
    },
    updateOrder: (
      state: TOrder[],
      action: PayloadAction<{ currentOrder: TOrder; newOrder: TOrder }>
    ) => {
      const index = state.findIndex(
        (p) => p.orderId === action.payload.currentOrder.orderId
      );
      if (index > 0) {
        state[index] = { ...action.payload.newOrder };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, (state: TOrder[]) => {
      return [];
    });
  },
});

export const { addNewOrder, uploadOrder, deleteOrder, updateOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
