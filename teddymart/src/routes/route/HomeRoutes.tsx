import { Route, Routes } from "react-router-dom";
import SaleScreen from "views/Sale/SaleScreen";
import ProductScreen from "views/Product/ProductScreen";
import ReportScreen from "views/Report";
import CustomerScreen from "views/Partner/CustomerScreen";
import SupplierScreen from "views/Partner/SupplierScreen";
import WarehouseScreen from "views/Warehouse/WarehouseScreen";
import Drawer from "../components/Drawer";
export default function HomeRoutes() {
  return (
    <div className="flex items-start">
      <Drawer />
      <Routes>
        <Route path="sale" element={<SaleScreen />} />
        <Route path="product" element={<ProductScreen />} />
        <Route path="report" element={<ReportScreen />} />
        <Route path="customer" element={<CustomerScreen />} />
        <Route path="supplier" element={<SupplierScreen />} />
        <Route path="warehouse" element={<WarehouseScreen />} />
      </Routes>
    </div>
  );
}
