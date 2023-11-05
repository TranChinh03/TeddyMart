import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const groupProductSlice = createSlice({
    name: "groupProductSlice",
    initialState: [],
    reducers: {
        addNewGroupProduct: (state: TGroupProduct[], action: PayloadAction<TGroupProduct>) => {
            state.push(action.payload);
        },
        uploadGroupProduct: (state: TGroupProduct[], action: PayloadAction<TGroupProduct[]>) => {
            state = [...action.payload];
        },
        deleteGroupProduct: (state: TGroupProduct[], action: PayloadAction<TGroupProduct>) => {
            return state.filter((p) => p.groupId !== action.payload.groupId)
        },
        updateGroupProduct: (
            state: TGroupProduct[],
            action: PayloadAction<{ currentGroupProduct: TGroupProduct; newGroupProduct: TGroupProduct}>
            ) => {
                const index = state.findIndex(
                    (p) => p.groupId === action.payload.currentGroupProduct.groupId
                );
                if (index > 0) {
                    state[index] = {...action.payload.newGroupProduct}
                }
            }
    }
})

export const { addNewGroupProduct, uploadGroupProduct, deleteGroupProduct, updateGroupProduct} = groupProductSlice.actions;
export default groupProductSlice.reducer;