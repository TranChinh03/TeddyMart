import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import HomeRoutes from "./HomeRoutes";
import { NAV_LINK } from "routes/components/NAV_LINK";
export default function RootRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={NAV_LINK.AUTH} element={<AuthRoutes />} />
        <Route path={NAV_LINK.HOME} element={<HomeRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
