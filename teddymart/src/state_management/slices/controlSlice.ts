import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type TControl = {
  openDrawer: boolean;
};
const controlSlice = createSlice({
  name: "controlSlice",
  initialState: { openDrawer: true },
  reducers: {
    openDrawer: (state: TControl) => {
      state.openDrawer = !state.openDrawer;
      return state;
    },
  },
});
export const { openDrawer } = controlSlice.actions;
export default controlSlice.reducer;
