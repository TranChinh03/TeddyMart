import { combineReducers } from "@reduxjs/toolkit";
import partnerSlice from "state_management/slices/partnerSlice";
import voucherSlice from "state_management/slices/voucherSlice";
import warehouseSlice from "state_management/slices/warehouseSlice";
export type RootState = {
  partnerSlice: TPartner[];
  voucherSlice: TVoucher[];
  warehouseSlice: TWarehouse[];
};
const rootReducer = combineReducers({
  partnerSlice: partnerSlice,
  voucherSlice: voucherSlice,
  warehouseSlice: warehouseSlice,
});
export default rootReducer;
