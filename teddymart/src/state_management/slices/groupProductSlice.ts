import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";
const groupProductSlice = createSlice({
  name: "groupProductSlice",
  initialState: [],
  reducers: {
    addNewGroupProduct: (
      state: TGroupProduct[],
      action: PayloadAction<TGroupProduct>
    ) => {
      state.push(action.payload);
    },
    uploadGroupProduct: (
      state: TGroupProduct[],
      action: PayloadAction<TGroupProduct[]>
    ) => {
      return [...action.payload];
    },
    deleteGroupProduct: (
      state: TGroupProduct[],
      action: PayloadAction<TGroupProduct>
    ) => {
      return state.filter((p) => p.groupId !== action.payload.groupId);
    },
    updateGroupProduct: (
      state: TGroupProduct[],
      action: PayloadAction<{
        currentGroupProduct: TGroupProduct;
        newGroupProduct: TGroupProduct;
      }>
    ) => {
      // Only allow to update Group Name, Note
      const index = state.findIndex(
        (p) => p.groupId === action.payload.currentGroupProduct.groupId
      );

      if (index !== -1) {
        state[index] = { ...action.payload.newGroupProduct };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, (state: TGroupProduct[]) => {
      return [];
    });
  },
});

export const {
  addNewGroupProduct,
  uploadGroupProduct,
  deleteGroupProduct,
  updateGroupProduct,
} = groupProductSlice.actions;
export default groupProductSlice.reducer;
