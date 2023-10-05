import React from "react";
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

export default function RootRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LoginScreen />} />
        <Route path="/signup" exact element={<SignUpScreen />} />
        <Route path="/forgotpassword" exact element={<ForgotPassword />} />
        <Route path="/sale" exact element={<SaleScreen />} />
        <Route path="product" element={<ProductScreen />} />
        <Route path="report" element={<ReportScreen />} />
        <Route path="customer" element={<CustomerScreen />} />
        <Route path="supplier" element={<SupplierScreen />} />
        <Route path="warehouse" element={<WarehouseScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
