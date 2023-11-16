import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type TControl = {
  openDrawer: boolean;
};
const controlSlice = createSlice({
  name: "controlSlice",
  initialState: { openDrawer: false },
  reducers: {
    toggleDrawer: (state: TControl) => {
      state.openDrawer = !state.openDrawer;
      return state;
    },
  },
});
export const { toggleDrawer } = controlSlice.actions;
export default controlSlice.reducer;
