import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";
const voucherSlice = createSlice({
  name: "voucherSlice",
  initialState: [],
  reducers: {
    addNewVoucher: (state: TVoucher[], action: PayloadAction<TVoucher>) => {
      state.push(action.payload);
    },
    uploadVoucher: (state: TVoucher[], action: PayloadAction<TVoucher[]>) => {
      return [...action.payload];
    },
    deleteVoucher: (state: TVoucher[], action: PayloadAction<string>) => {
      return state.filter((v) => v.voucherId !== action.payload);
    },
    updateVoucher: (
      state: TVoucher[],
      action: PayloadAction<{ voucherId: string; updateData: TVoucher }>
    ) => {
      // only allow to update: Voucher Name, Expiration Date, Discount Amount
      const index = state.findIndex(
        (voucher) => voucher.voucherId === action.payload.voucherId
      );
      if (index > 0) {
        state[index] = action.payload.updateData;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, (state: TVoucher[]) => {
      return [];
    });
  },
});

export const { addNewVoucher, uploadVoucher, deleteVoucher, updateVoucher } =
  voucherSlice.actions;
export default voucherSlice.reducer;
