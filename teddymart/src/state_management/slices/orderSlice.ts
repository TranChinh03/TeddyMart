import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orderSlice",
    initialState: [],
    reducers: {
        addNewOrder: (state: TOrder[], action: PayloadAction<TOrder>) => {
            state.push(action.payload);
        },
        uploadOrder: (state: TOrder[], action: PayloadAction<TOrder[]>) => {
            state = [...action.payload];
        },
        deleteOrder: (state: TOrder[], action: PayloadAction<TOrder>) => {
            return state.filter((p) => p.orderId !== action.payload.orderId)
        },
        updateOrder: (
            state: TOrder[],
            action: PayloadAction<{ currentOrder: TOrder; newOrder: TOrder}>
            ) => {
                const index = state.findIndex(
                    (p) => p.orderId === action.payload.currentOrder.orderId
                );
                if (index > 0) {
                    state[index] = {...action.payload.newOrder}
                }
            }
    }
})

export const { addNewOrder, uploadOrder, deleteOrder, updateOrder} = orderSlice.actions;
export default orderSlice.reducer;