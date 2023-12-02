import { useState } from "react";
import TextInputComponent from "components/TextInputComponent";
import { useNavigate } from "react-router-dom";
import { NAV_LINK } from "routes/components/NAV_LINK";
import { Spin, message } from "antd";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import { db } from "firebaseConfig";

type Inputs = {
  email: string;
};
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { t } = useTranslation();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const snapshot = await getDocs(collection(db, "Manager"));
      const user = snapshot.docs.find((d) => d.data().email === data.email);
      if (!user) {
        message.error("Email does not exist.");
        setLoading(false);
        return;
      } else {
        await sendPasswordResetEmail(auth, data.email);
        setSuccessMessage("Password reset email sent successfully.");
        message.success("Password reset email sent successfully.");
        setTimeout(function () {
          navigate(NAV_LINK.LOGIN);
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.message;
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-2 mt-10">
              <TextInputComponent
                placeHolder=""
                label={t("signUp.email")}
                width={"100%"}
                required={true}
                register={register}
                registerName="email"
                pattern={{
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: t("signUp.errEmail"),
                }}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col justify-center items-center gap-y-3 mt-4">
              <button
                type="submit"
                className="w-5/12 py-2 bg-sidebar text-white text-xl rounded-md hover:bg-hover"
              >
                {t("login.getCode")}
              </button>
            </div>
          </form>

          {successMessage && (
            <div className="text-green-500 text-center">{successMessage}</div>
          )}

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
    //</Spin>
  );
}
