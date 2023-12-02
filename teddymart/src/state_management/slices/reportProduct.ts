import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ADD_ORDER, RESET_ALL_STORES } from "state_management/actions/actions";
const reportProduct = createSlice({
  name: "reportProduct",
  initialState: [],
  reducers: {
    uploadReportProduct: (
      state: TReportProduct[],
      action: PayloadAction<TReportProduct[]>
    ) => {
      return [...action.payload];
    },
  },
  extraReducers(builder) {
    builder.addCase(RESET_ALL_STORES, (state: TReportProduct[]) => {
      return [];
    });
    builder.addCase(
      ADD_ORDER,
      (state: TReportProduct[], action: PayloadAction<TOrder>) => {
        const order = action.payload;
        const isExport = order.type === "Export" ? true : false;
        let i = state.findIndex(
          (s) => s.date.getTime() === order.createdAt.getTime()
        );
        if (i === -1) {
          state.unshift({
            date: order.createdAt,
            products: order.listProduct.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              import: isExport ? 0 : item.quantity,
              export: isExport ? item.quantity : 0,
              stock: isExport ? -item.quantity : item.quantity,
            })),
          });
        } else {
          order.listProduct?.forEach((item) => {
            let index = state[i].products.findIndex(
              (t) => t.productId === item.productId
            );
            if (index === -1) {
              state[i].products.push({
                productId: item.productId,
                productName: item.productName,
                import: isExport ? 0 : item.quantity,
                export: isExport ? item.quantity : 0,
                stock: isExport ? -item.quantity : item.quantity,
              });
            } else {
              if (isExport) {
                state[i].products[index].export += item.quantity;
                state[i].products[index].stock -= item.quantity;
              } else {
                state[i].products[index].import += item.quantity;
                state[i].products[index].stock += item.quantity;
              }
            }
          });
        }
        return state;
      }
    );
  },
});
export const { uploadReportProduct } = reportProduct.actions;
export default reportProduct.reducer;
