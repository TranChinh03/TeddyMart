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
export default function HomeRoutes() {
  return (
    <div className="flex max-h-screen ">
      <Layout
        className="fixed top-0 left-0 h-screen w-1/5 scrollbar-hide hidden md:block bg-sidebar"
        hasSider
      >
        <Drawer />
      </Layout>
      <Layout className="w-full md:w-4/5 ml-0 md:ml-[20%]" hasSider>
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
