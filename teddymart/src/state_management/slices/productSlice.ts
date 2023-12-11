import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "state_management/actions/actions";
const productSlice = createSlice({
  name: "productSlice",
  initialState: [],
  reducers: {
    addNewProduct: (state: TProduct[], action: PayloadAction<TProduct>) => {
      state.unshift(action.payload);
    },
    uploadProduct: (state: TProduct[], action: PayloadAction<TProduct[]>) => {
      return [...action.payload];
    },
    deleteProduct: (
      state: TProduct[],
      action: PayloadAction<Pick<TProduct, "productId">>
    ) => {
      let tmp = state.filter((p) => p.productId !== action.payload.productId);
      console.log(tmp.length);
      return [...tmp];
    },
    updateProduct: (
      state: TProduct[],
      action: PayloadAction<{ currentProduct: TProduct; newProduct: TProduct }>
    ) => {
      // Only allow to update Product Name, image, sell_price, cost_price, VAT, note
      const index = state.findIndex(
        (p) => p.productId === action.payload.currentProduct.productId
      );
      if (index !== -1) {
        state[index] = { ...action.payload.newProduct };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, (state: TProduct[]) => {
      return [];
    });
  },
});

export const { addNewProduct, uploadProduct, deleteProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
