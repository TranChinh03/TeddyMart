import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import HomeRoutes from "./HomeRoutes";
import { NAV_LINK } from "routes/components/NAV_LINK";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";

export default function RootRoutes() {
  const userId = useSelector((state: RootState) => state.manager.userId);

  //const userId = window.localStorage.getItem("USER_ID");
  return (
    <BrowserRouter>
      <Routes>
        {!userId ? (
          <Route path={NAV_LINK.AUTH} element={<AuthRoutes />} />
        ) : (
          <Route path={NAV_LINK.HOME} element={<HomeRoutes />} />
        )}
        {/* <Route path={NAV_LINK.AUTH} element={<AuthRoutes />} />
        <Route path={NAV_LINK.HOME} element={<HomeRoutes />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
