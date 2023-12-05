import { Route, Routes } from "react-router-dom";
import LoginScreen from "views/Authentication/LoginScreen";
import SignUpScreen from "views/Authentication/SignUpScreen";
import ForgotPassword from "views/Authentication/ForgotPassword";
export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<LoginScreen />} />
      <Route path="signup/:userId?/:email?" element={<SignUpScreen />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
}
