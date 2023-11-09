import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const partnerSlice = createSlice({
  name: "partnerSlice",
  initialState: [],
  reducers: {
    addNewPartner: (state: TPartner[], action: PayloadAction<TPartner>) => {
      state.push(action.payload);
    },
    uploadPartner: (state: TPartner[], action: PayloadAction<TPartner[]>) => {
      state = [...action.payload];
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
      if (index > 0) {
        state[index] = { ...action.payload.newData };
      }
    },
  },
});

export const { addNewPartner, uploadPartner, deletePartner, updatePartner } =
  partnerSlice.actions;
export default partnerSlice.reducer;
