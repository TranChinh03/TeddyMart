import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "productSlice",
    initialState: [],
    reducers: {
        addNewProduct: (state: TProduct[], action: PayloadAction<TProduct>) => {
            state.push(action.payload);
        },
        uploadProduct: (state: TProduct[], action: PayloadAction<TProduct[]>) => {
            state = [...action.payload];
        },
        deleteProduct: (state: TProduct[], action: PayloadAction<TProduct>) => {
            return state.filter((p) => p.productId !== action.payload.productId)
        },
        updateProduct: (
            state: TProduct[],
            action: PayloadAction<{ currentProduct: TProduct; newProduct: TProduct}>
            ) => {
                const index = state.findIndex(
                    (p) => p.productId === action.payload.currentProduct.productId
                );
                if (index > 0) {
                    state[index] = {...action.payload.newProduct}
                }
            }
    }
})

export const { addNewProduct, uploadProduct, deleteProduct, updateProduct} = productSlice.actions;
export default productSlice.reducer;