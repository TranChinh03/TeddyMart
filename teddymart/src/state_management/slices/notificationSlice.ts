import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type TNotification = {
  notiId: string;
  img: string;
  subTitle: string;
  title: string;
};
const initalState: TNotification[] = [];
const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: initalState,
  reducers: {
    updateNotifications: (
      state: TNotification[],
      action: PayloadAction<TNotification[]>
    ) => {
      state = action.payload;
      return state;
    },
    addNotifications: (
      state: TNotification[],
      action: PayloadAction<TNotification>
    ) => {
      return [...state, action.payload];
    },
  },
});

export const { updateNotifications, addNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
