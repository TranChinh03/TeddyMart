import { BrowserRouter, Route, Routes } from "react-router-dom";
import SaleScreen from "views/Sale/SaleScreen";
import ProductScreen from "views/Product/ProductScreen";
import ReportScreen from "views/Report/ReportScreen";
import CustomerScreen from "views/Partner/CustomerScreen";
import SupplierScreen from "views/Partner/SupplierScreen";
import WarehouseScreen from "views/Warehouse/WarehouseScreen";
import LoginScreen from "views/Authentication/LoginScreen";
import SignUpScreen from "views/Authentication/SignUpScreen";
import ForgotPassword from "views/Authentication/ForgotPassword";
import Drawer from "./Drawer";
import Draft from "views/Draft/Draft";
export default function RootRoutes() {
  return (
    <BrowserRouter>
      {/* <Drawer /> */}
      <Routes>
        <Route path="/" index element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/sale" element={<SaleScreen />} />
        <Route path="product" element={<ProductScreen />} />
        <Route path="report" element={<ReportScreen />} />
        <Route path="customer" element={<CustomerScreen />} />
        <Route path="supplier" element={<SupplierScreen />} />
        <Route path="warehouse" element={<WarehouseScreen />} />
        <Route path="draft" element={<Draft />} />
      </Routes>
    </BrowserRouter>
  );
}
