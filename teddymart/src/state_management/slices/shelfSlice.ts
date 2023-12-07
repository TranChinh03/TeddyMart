import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";
const shelfSlice = createSlice({
  name: "shelfSlice",
  initialState: [],
  reducers: {
    addNewShelf: (state: TShelf[], action: PayloadAction<TShelf>) => {
      state.push(action.payload);
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
        currentShelf: TShelf;
        newShelf: TShelf;
      }>
    ) => {
      // Only allow to update Group Name, Note
      const index = state.findIndex(
        (p) => p.shelfId === action.payload.currentShelf.shelfId
      );
      if (index > 0) {
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
