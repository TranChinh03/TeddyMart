import React, { useState, useRef, useEffect } from "react";
import TextInputComponent from "components/TextInputComponent";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { NAV_LINK } from "routes/components/NAV_LINK";
import { Spin } from "antd";
import { getData } from "controller/getData";
import { useDispatch, useSelector } from "react-redux";
import { uploadVoucher } from "state_management/slices/voucherSlice";
import { uploadPartner } from "state_management/slices/partnerSlice";
import { uploadGroupProduct } from "state_management/slices/groupProductSlice";
import { uploadProduct } from "state_management/slices/productSlice";
import { uploadWarehouse } from "state_management/slices/warehouseSlice";
import { uploadOrder } from "state_management/slices/orderSlice";
import { RootState } from "state_management/reducers/rootReducer";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const partners = useSelector((state: RootState) => state.partnerSlice);

  const handleSubmit = async () => {
    if (username.length == 0 || password.length == 0) {
      setError(true);
    } else {
      setLoading(true);
      await Promise.all([
        getData("/Manager/M001/Voucher").then((data: TVoucher[]) =>
          dispatch(uploadVoucher(data))
        ),
        getData("/Manager/M001/Group_Product").then((data: TGroupProduct[]) =>
          dispatch(uploadGroupProduct(data))
        ),
        getData("/Manager/M001/Product").then((data: TProduct[]) => {
          dispatch(uploadProduct(data));
        }),
        getData("/Manager/M001/Partner").then((data: TPartner[]) => {
          dispatch(uploadPartner(data));
        }),
        getData("/Manager/M001/Ware_House").then((data: TWarehouse[]) => {
          dispatch(uploadWarehouse(data));
        }),
        getData("/Manager/M001/Orders").then((data: TOrder[]) => {
          dispatch(uploadOrder(data));
        }),
      ]).then(() => {
        console.log("P", partners);
        setLoading(false);
      });
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="flex justify-center items-center h-screen bg-gradient-to-t from-sidebar to-white">
        <div className="flex w-8/12 shadow-lg bg-white rounded-md p-5">
          <div className="w-1/2 flex flex-col justify-center items-center p-5">
            <img src={require("assets/images/logo.png")} alt="image" />
            <p className="pt-5 text-center text-sidebar font-medium text-2xl">
              MANAGE YOUR BUSINESS BETTER
            </p>
          </div>

          <div className="border border-gray-100"></div>

          <div className="w-1/2 p-5">
            <h1 className="text-center text-sidebar font-medium text-3xl">
              LOGIN
            </h1>
            <p className="text-center">Sign in to manage your store</p>

            <div className="w-full grid gap-y-1 mt-4">
              <TextInputComponent
                placeHolder=""
                label="Username"
                width={"90%"}
                required={true}
                value={username}
                setValue={setUsername}
              />
              <label
                className={` text-12 ${
                  error && username.length <= 0 ? `text-red-500` : `text-white`
                }`}
              >
                Username required !
              </label>
            </div>
            <div className="w-full grid gap-y-1 mt-3">
              <TextInputComponent
                placeHolder=""
                label="Password"
                width={"90%"}
                required={true}
                inputType={visible ? "text" : "password"}
                icon={visible ? <AiFillEyeInvisible /> : <AiFillEye />}
                onIconClick={() => setVisible(!visible)}
                value={password}
                setValue={setPassword}
              />
              <label
                className={` text-12 ${
                  error && password.length <= 0 ? `text-red-500` : `text-white`
                }`}
              >
                Password required !
              </label>
            </div>

            <div className="flex flex-col justify-center items-center gap-y-3 mt-4">
              <button
                className="w-5/12 py-2 bg-sidebar text-white text-xl rounded-md hover:bg-hover"
                onClick={handleSubmit}
              >
                Login
              </button>
              <button
                className="w-5/12 text-sidebar text-14"
                onClick={() => navigate(NAV_LINK.FORGOT_PASSWORD)}
              >
                Forgot Password
              </button>

              <div className="flex justify-center gap-2 text-16 pt-5">
                <p>New to TeddyMart?</p>
                <button
                  className="text-sidebar font-medium"
                  onClick={() => navigate(NAV_LINK.SIGN_UP)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}
