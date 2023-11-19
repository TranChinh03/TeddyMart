import { useState } from "react";
import TextInputComponent from "components/TextInputComponent";
import { useNavigate } from "react-router-dom";
import { NAV_LINK } from "routes/components/NAV_LINK";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useForm} from "react-hook-form";


type Inputs = {
  email: string;
};
export default function ForgotPassword() {
  const navigate = useNavigate();
  //const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  
  return (
    //<Spin spinning={loading}>
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
            {t("login.forgotpassword")}
          </p>
          <p className="text-center">{t("login.sloganforgot")}</p>

          <form >
            <div className="grid gap-y-1 mt-4">
              <TextInputComponent
                placeHolder=""
                label={t("login.newPassword")}
                width={"100%"}
                required={true}
                
              />
              {/* {errors.email && (
                <p className="text-xs text-red-500">
                  {errors.email.message}
                </p>
              )} */}
            </div>

            <div className="grid gap-y-2 mt-10">
              <TextInputComponent
                placeHolder=""
                label={t("login.confirmPassword")}
                width={"100%"}
                required={true}
                
              />
              {/* {errors.email && (
                <p className="text-xs text-red-500">
                  {errors.email.message}
                </p>
              )} */}
            </div>
            
            <div className="flex flex-col justify-center items-center gap-y-3 mt-4">
              <button
                className="w-5/12 py-2 bg-sidebar text-white text-xl rounded-md hover:bg-hover"
                //onClick={() => (onLogin)}
              >
                {t("login.confirm")}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  //</Spin>
  )
  
}
