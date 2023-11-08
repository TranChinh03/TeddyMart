import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DELETE_PRODUCT } from "state_management/actions/deleteProductAction";
// const initialState = {
//   warehouseId: "",
//   warehouseName: "",
//   address: "",
//   products: [],
//   numberOfProducts: 0,
// };
type updatedData = Pick<
  TWarehouse,
  "warehouseName" | "address" | "numberOfProducts"
>;
const warehouseSlice = createSlice({
  name: "warehouseSlice",
  initialState: [],
  reducers: {
    addNewWarehouse: (
      state: TWarehouse[],
      action: PayloadAction<TWarehouse>
    ) => {
      state.push(action.payload);
    },
    uploadWarehouse: (
      state: TWarehouse[],
      action: PayloadAction<TWarehouse[]>
    ) => {
      state = [...action.payload];
    },
    deleteWarehouse: (state: TWarehouse[], action: PayloadAction<string>) => {
      return state.filter((w) => w.warehouseId !== action.payload);
    },
    updateWarehouse: (
      state: TWarehouse[],
      action: PayloadAction<{ warehouseId: string; updatedData: TWarehouse }>
    ) => {
      const index = state.findIndex(
        (w) => w.warehouseId === action.payload.warehouseId
      );
      if (index > 0) {
        state[index] = { ...action.payload.updatedData };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(DELETE_PRODUCT, (state, action) => {
      console.log("extraReducers");
      console.log(action.payload);
    });
  },
});
export const {
  addNewWarehouse,
  uploadWarehouse,
  deleteWarehouse,
  updateWarehouse,
} = warehouseSlice.actions;
export default warehouseSlice.reducer;
