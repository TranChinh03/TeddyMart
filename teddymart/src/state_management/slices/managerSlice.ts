import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";

const managerSlice = createSlice({
  name: "managerSlice",
  initialState: {
    // userId: "",
    // shopName: "",
    // userName: "",
    // photoUrl: "",
    // address: "",
    // phoneNumber: "",
    // email: "",
  },
  reducers: {
    uploadManager: (state: TManager, action: PayloadAction<TManager>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(RESET_ALL_STORES, (state: TManager) => {
      return {};
    });
  },
});

export const { uploadManager } = managerSlice.actions;
export default managerSlice.reducer;
