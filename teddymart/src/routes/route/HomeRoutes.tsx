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
export default function HomeRoutes() {
  return (
    <div className="flex max-h-screen">
      <Layout className="w-1/5 fixed" hasSider>
        <Drawer />
      </Layout>
      <Layout className="w-4/5 ml-[20%]" hasSider>
        <Routes>
          <Route path="sale" element={<SaleScreen />} />
          <Route path="product" element={<ProductScreen />} />
          <Route path="report" element={<ReportScreen />} />
          <Route path="customer" element={<CustomerScreen />} />
          <Route path="supplier" element={<SupplierScreen />} />
          <Route path="warehouse" element={<WarehouseScreen />} />
          <Route path="draft" element={<Draft />} />
        </Routes>
      </Layout>
    </div>
  );
}
