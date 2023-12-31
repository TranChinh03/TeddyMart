import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import addNotification from "react-push-notification";
import { DELETE_PRODUCT } from "state_management/actions/actions";
import { RESET_ALL_STORES } from "state_management/actions/actions";
import { store } from "state_management/stores/store";
import { addNotificationFirebase, updateProductFirebase } from "utils/appUtils";
import { addNotifications } from "./notificationSlice";
type WarehouseUpdate = {
  warehouseName: string;
  listProduct: {
    productId: string;
    productName: string;
    quantity: number;
    numberOnShelf?: number;
  }[];
};
const warehouseSlice = createSlice({
  name: "warehouseSlice",
  initialState: [],
  reducers: {
    addNewWarehouse: (
      state: TWarehouse[],
      action: PayloadAction<TWarehouse>
    ) => {
      state.unshift(action.payload);
    },
    uploadWarehouse: (
      state: TWarehouse[],
      action: PayloadAction<TWarehouse[]>
    ) => {
      return [...action.payload];
    },
    deleteWarehouse: (
      state: TWarehouse[],
      action: PayloadAction<Pick<TWarehouse, "warehouseId">>
    ) => {
      return state.filter((w) => w.warehouseId !== action.payload.warehouseId);
    },
    deleteMultiOrder: (
      state: TWarehouse[],
      action: PayloadAction<string[]>
    ) => {
      return state.filter((w) => !action.payload.includes(w.warehouseId));
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
    updateProductWarehouse: (
      state: TWarehouse[],
      action: PayloadAction<{
        userId: string;
        listUpdate: WarehouseUpdate[];
        // warehouseName: string;
        // listProduct: {
        //   productId: string;
        //   productName: string;
        //   quantity: number;
        // }[];
        type: "Import" | "Export";
        isDelete: boolean;
      }>
    ) => {
      for (const item of action.payload.listUpdate) {
        const index = state.findIndex(
          (w) => w.warehouseName === item.warehouseName
        );
        const count =
          item.listProduct.reduce((pre, cur) => pre + cur.quantity, 0) *
          (action.payload.type === "Import" ? 1 : -1);
        console.log("update product warehouse", index);
        if (index > -1) {
          let listProduct = state[index].listProduct;
          let products = item.listProduct;
          for (let index = 0; index < products.length; index++) {
            const element = products[index];
            let index_product = listProduct.findIndex(
              (product) => product.productId === element.productId
            );
            if (index_product > -1) {
              if (action.payload.type === "Import")
                listProduct[index_product] = {
                  ...state[index].listProduct[index_product],
                  quantity: !action.payload.isDelete
                    ? listProduct[index_product].quantity + element.quantity
                    : listProduct[index_product].quantity - element.quantity,
                };
              else {
                listProduct[index_product] = {
                  ...listProduct[index_product],
                  quantity: !action.payload.isDelete
                    ? listProduct[index_product].quantity - element.quantity
                    : listProduct[index_product].quantity + element.quantity,
                  numberOnShelf: element.numberOnShelf,
                };
              }
            } else {
              listProduct = [...state[index].listProduct, element];
            }
          }
          state[index] = {
            ...state[index],
            listProduct: listProduct,
            count:
              state[index].count + count * (action.payload.isDelete ? -1 : 1),
          };

          updateProductFirebase(
            action.payload.userId,
            state[index].warehouseId,
            listProduct,
            count * (action.payload.isDelete ? -1 : 1)
          );
        }
      }
    },
    updateShelfWarehouse: (
      state: TWarehouse[],
      action: PayloadAction<{
        warehouseName: string;
        product: TProduct;
        numberOnShelf: number;
        userId: string;
      }>
    ) => {
      const warehouseIndex = state.findIndex(
        (w) => w.warehouseName === action.payload.warehouseName
      );
      if (warehouseIndex > -1) {
        const productIndex = state[warehouseIndex].listProduct.findIndex(
          (p) => p.productId === action.payload.product?.productId
        );
        if (productIndex !== -1) {
          state[warehouseIndex].listProduct[productIndex] = {
            ...state[warehouseIndex].listProduct[productIndex],
            numberOnShelf: action.payload.numberOnShelf,
          };
          updateProductFirebase(
            action.payload.userId,
            state[warehouseIndex].warehouseId,
            state[warehouseIndex].listProduct,
            0
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RESET_ALL_STORES, (state: TWarehouse[]) => {
        return [];
      })
      .addCase(DELETE_PRODUCT, (state, action) => {
        console.log("extraReducers");
        console.log(action.payload);
      });
  },
});
export const {
  addNewWarehouse,
  uploadWarehouse,
  deleteWarehouse,
  deleteMultiOrder,
  updateWarehouse,
  updateProductWarehouse,
  updateShelfWarehouse,
} = warehouseSlice.actions;
export default warehouseSlice.reducer;
