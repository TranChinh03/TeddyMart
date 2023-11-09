import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const managerSlice = createSlice({
  name: "managerSlice",
  initialState: [],
  reducers: {
    addNewManager: (state: TManager[], action: PayloadAction<TManager>) => {
      state.push(action.payload);
    },
    uploadManager: (state: TManager[], action: PayloadAction<TManager[]>) => {
      state = [...action.payload];
    },
    deleteManager: (state: TManager[], action: PayloadAction<TManager>) => {
      return state.filter((p) => p.userId !== action.payload.userId);
    },
    updateManager: (
      state: TManager[],
      action: PayloadAction<{ currentManager: TManager; newManager: TManager }>
    ) => {
      const index = state.findIndex(
        (p) => p.userId === action.payload.currentManager.userId
      );
      if (index > 0) {
        state[index] = { ...action.payload.newManager };
      }
    },
  },
});

export const { addNewManager, uploadManager, deleteManager, updateManager } =
  managerSlice.actions;
export default managerSlice.reducer;
