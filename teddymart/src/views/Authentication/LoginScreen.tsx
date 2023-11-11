import React, { useState, useRef, useEffect, useTransition } from "react";
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
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  username: string;
  password: string;
};
export default function LoginScreen() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const partners = useSelector((state: RootState) => state.partnerSlice);
  const { t, i18n } = useTranslation();
  const { register, handleSubmit } = useForm<Inputs>();
  const onLogin: SubmitHandler<Inputs> = async (data) => {
    // console.log("submit");
    // console.log(data);
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
  };

  return (
    <Spin spinning={loading}>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-sidebar to-white">
        <div className="flex w-8/12 shadow-lg bg-white rounded-md p-2">
          <div className="w-1/2 flex-col justify-center items-center p-5 hidden md:flex">
            <img src={require("assets/images/logo.png")} alt="image" />
            <p className="pt-5 text-center text-sidebar font-medium text-2xl">
              {t("login.slogan")}
            </p>
          </div>

          <div className="border hidden md:flex border-gray-100"></div>

          <div className="md:w-1/2 w-full lg:w-1/2 p-5 ">
            <p className="text-center text-sidebar font-medium text-3xl mb-1">
              {t("login.login")}
            </p>
            <p className="text-center">{t("login.signInToManageStore")}</p>

            <form onSubmit={handleSubmit(onLogin)}>
              <div className="grid gap-y-1 mt-4">
                <TextInputComponent
                  placeHolder=""
                  label={t("login.username")}
                  width={"100%"}
                  required={true}
                  register={register}
                  registerName="username"
                />
              </div>
              <div className="grid gap-y-1 mt-3">
                <TextInputComponent
                  placeHolder=""
                  label={t("login.password")}
                  width={"100%"}
                  required={true}
                  inputType={visible ? "text" : "password"}
                  icon={visible ? <AiFillEyeInvisible /> : <AiFillEye />}
                  onIconClick={() => setVisible(!visible)}
                  register={register}
                  registerName="password"
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-y-3 mt-4">
                <button
                  className="w-5/12 py-2 bg-sidebar text-white text-xl rounded-md hover:bg-hover"
                  onClick={() => onLogin}
                >
                  {t("login.login")}
                </button>
                <button
                  className="w-5/12 text-sidebar text-14"
                  onClick={() => navigate(NAV_LINK.FORGOT_PASSWORD)}
                >
                  {t("login.forgotpassword")}
                </button>

                <div className="flex justify-center gap-2 text-16 pt-5">
                  <p>{t("login.newTeddyMart")}</p>
                  <button
                    className="text-sidebar font-medium"
                    onClick={() => navigate(NAV_LINK.SIGN_UP)}
                  >
                    {t("login.signUp")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Spin>
  );
}
