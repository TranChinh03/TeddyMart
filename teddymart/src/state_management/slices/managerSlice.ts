import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const managerSlice = createSlice({
  name: "managerSlice",
  initialState: {
    userId: "",
    shopName: "",
    userName: "",
    photoUrl: "",
    address: "",
    phoneNumber: "",
    email: "",
  },
  reducers: {
    uploadManager: (state: TManager, action: PayloadAction<TManager>) => {
      state = action.payload;
    },
  },
});

export const { uploadManager } = managerSlice.actions;
export default managerSlice.reducer;
