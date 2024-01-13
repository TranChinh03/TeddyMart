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
    deleteNotifications: (state, action: PayloadAction<string | string[]>) => {
      const idsToDelete = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return state.filter(
        (notification) => !idsToDelete.includes(notification.notiId)
      );
    },
  },
});

export const { updateNotifications, addNotifications,deleteNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
