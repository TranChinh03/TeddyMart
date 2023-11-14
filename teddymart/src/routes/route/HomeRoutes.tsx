import { Route, Routes } from "react-router-dom";
import SaleScreen from "views/Sale/SaleScreen";
import ProductScreen from "views/Product/ProductScreen";
import ReportScreen from "views/Report/Report";
import CustomerScreen from "views/Partner/CustomerScreen";
import SupplierScreen from "views/Partner/SupplierScreen";
import WarehouseScreen from "views/Warehouse/WarehouseScreen";
import Drawer from "../components/Drawer";
import Draft from "views/Draft/Draft";
import Layout from "antd/es/layout/layout";
import VoucherScreen from "views/Voucher/VoucherScreen";
import GroupProductScreen from "views/GroupProduct/GroupProductScreen";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
export default function HomeRoutes() {
  const { openDrawer } = useSelector((state: RootState) => state.controlSlice);
  return (
    <div className="flex max-h-screen">
      <div
        className="fixed top-0 left-0 h-screen scrollbar-hide hidden md:block bg-sidebar overflow-y-auto"
        style={{
          width: !openDrawer ? "20%" : "7%",
        }}
      >
        <Drawer />
      </div>
      <div
        className={`transition-all ${
          openDrawer ? "duration-800" : "duration-100"
        } ease-in-out`}
        style={{
          width: !openDrawer ? "20%" : "7%",
        }}
      />
      <div
        className="w-fit"
        style={{
          width: !openDrawer ? "80%" : "93%",
        }}
      >
        <Routes>
          <Route path="sale" element={<SaleScreen />} />
          <Route path="product" element={<ProductScreen />} />
          <Route path="report" element={<ReportScreen />} />
          <Route path="customer" element={<CustomerScreen />} />
          <Route path="supplier" element={<SupplierScreen />} />
          <Route path="warehouse" element={<WarehouseScreen />} />
          <Route path="voucher" element={<VoucherScreen />} />
          <Route path="draft" element={<Draft />} />
          <Route path="groupproduct" element={<GroupProductScreen />} />
        </Routes>
      </div>
    </div>
  );
}
