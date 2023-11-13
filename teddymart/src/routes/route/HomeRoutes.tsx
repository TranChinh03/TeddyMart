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
      <Layout
        className="fixed top-0 left-0 h-screen scrollbar-hide hidden md:block bg-sidebar overflow-y-auto"
        hasSider
      >
        <Drawer />
      </Layout>
      <div
        className={`transition-all ${
          openDrawer ? "duration-1000" : "duration-0"
        } ease-in-out ${!openDrawer ? "w-[10%]" : "w-[5%]"}`}
      />
      <Layout className="w-full  ml-0" hasSider>
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
      </Layout>
    </div>
  );
}
