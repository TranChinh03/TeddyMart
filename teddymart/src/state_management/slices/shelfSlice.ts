import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";
const shelfSlice = createSlice({
  name: "shelfSlice",
  initialState: [],
  reducers: {
    addNewShelf: (state: TShelf[], action: PayloadAction<TShelf>) => {
      state.unshift(action.payload);
    },
    uploadShelf: (state: TShelf[], action: PayloadAction<TShelf[]>) => {
      return [...action.payload];
    },
    deleteShelf: (state: TShelf[], action: PayloadAction<string>) => {
      return state.filter((p) => p.shelfId !== action.payload);
    },
    updateShelf: (
      state: TShelf[],
      action: PayloadAction<{
        currentShelfId: string;
        newShelf: TShelf;
      }>
    ) => {
      const index = state.findIndex(
        (p) => p.shelfId === action.payload.currentShelfId
      );
      if (index !== -1) {
        state[index] = { ...action.payload.newShelf };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, (state: TShelf[]) => {
      return [];
    });
  },
});

export const { addNewShelf, uploadShelf, deleteShelf, updateShelf } =
  shelfSlice.actions;
export default shelfSlice.reducer;
