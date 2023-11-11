import React, { useState } from "react";
import TextInputComponent from "components/TextInputComponent";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { NAV_LINK } from "routes/components/NAV_LINK";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spin } from "antd";
type Inputs = {
  username: string;
  email: string;
  password: string;
  shopName: string;
  phoneNo: string;
  address: string;
};
export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [shopname, setShopname] = useState("");
  const [phone, setPhone] = useState("");
  const [field, setField] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSignUp: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    //e.preventDefault();
    if (
      username.length == 0 ||
      password.length == 0 ||
      email.length == 0 ||
      phone.length == 0 ||
      shopname.length == 0 ||
      field.length == 0 ||
      address.length == 0
    ) {
      setError(true);
    }
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

          <div className="border border-gray-100 hidden md:flex"></div>

          <div className="md:w-1/2 w-full py-5 px-2">
            <p className="text-center text-sidebar font-medium text-3xl">
              {t("signUp.signUp")}
            </p>
            <p className="py-2 text-center text-black text-14">
              {t("signUp.createAccount")}
            </p>

            <form onSubmit={handleSubmit(onSignUp)}>
              <div className="flex">
                <div className="w-full grid grid-cols-2 gap-y-7 py-2 gap-2">
                  <TextInputComponent
                    label={t("signUp.username")}
                    width={"100%"}
                    required={true}
                    register={register}
                    registerName={"username"}
                  />

                  <TextInputComponent
                    label={t("signUp.password")}
                    //labelFontSize={11}
                    width={"100%"}
                    required={true}
                    inputType={visible ? "text" : "password"}
                    icon={visible ? <AiFillEyeInvisible /> : <AiFillEye />}
                    onIconClick={() => setVisible(!visible)}
                    register={register}
                    registerName="password"
                  />

                  <TextInputComponent
                    label={t("signUp.email")}
                    width={"100%"}
                    required={true}
                    register={register}
                    registerName="email"
                  />

                  <TextInputComponent
                    label={t("signUp.phoneNo")}
                    width={"100%"}
                    required={true}
                    register={register}
                    registerName="phone"
                  />
                  <TextInputComponent
                    label={t("signUp.shopname")}
                    width={"100%"}
                    required={true}
                    register={register}
                    registerName="shopName"
                  />
                  <TextInputComponent
                    label={t("signUp.address")}
                    width={"100%"}
                    required={true}
                    register={register}
                    registerName="address"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-3">
                <button
                  className="w-5/12 py-2 bg-sidebar text-white text-xl rounded-md hover:bg-hover"
                  onClick={() => onSignUp}
                >
                  {t("signUp.signUp")}
                </button>
              </div>
            </form>
            <div className=" flex flex-row gap-2 text-16 pt-5">
              <div className="self-center">
                <AiOutlineArrowLeft color="#217CA3" />
              </div>
              <button
                className="text-sidebar font-medium"
                onClick={() => navigate(NAV_LINK.LOGIN)}
              >
                {t("login.login")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}
