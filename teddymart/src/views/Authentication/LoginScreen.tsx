import React, { useState, useRef, useEffect } from "react";
import TextInputComponent from "components/TextInputComponent";
import { AiFillCaretDown, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { NAV_LINK } from "routes/components/NAV_LINK";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    //e.preventDefault();
    if (username.length == 0 || password.length == 0) {
      setError(true);
    } else {
      navigate(NAV_LINK.SALE);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-sidebar to-white">
      <div className="flex w-8/12 shadow-lg bg-white rounded-md p-5">
        <div className="w-1/2 flex flex-col justify-center items-center p-5">
          <img src={require("assets/images/logo.png")} alt="" />
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

          <div className="w-full grid justify-items-center gap-y-2 py-10">
            <TextInputComponent
              placeHolder=""
              label="Username"
              //labelFontSize={11}
              width={"90%"}
              required={true}
              value={username}
              setValue={setUsername}
            />

            {error && username.length <= 0 ? (
              <label className="text-red-500 text-12">
                Username required !
              </label>
            ) : (
              ""
            )}

            <TextInputComponent
              placeHolder=""
              label="Password"
              //labelFontSize={11}
              width={"90%"}
              required={true}
              inputType={visible ? "text" : "password"}
              icon={visible ? <AiFillEyeInvisible /> : <AiFillEye />}
              onIconClick={() => setVisible(!visible)}
              value={password}
              setValue={setPassword}
            />

            {error && password.length <= 0 ? (
              <label className="text-red-500 text-12">
                Password required !
              </label>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-y-3">
            <button
              className="w-5/12 py-2 bg-sidebar text-white text-xl rounded-md hover:bg-hover"
              onClick={handleSubmit}
            >
              Login
            </button>
            <button
              className="w-5/12 text-sidebar text-14"
              //onClick={()=>navigate(NAV_LINK.FORGOT_PASSWORD)}
            >
              Forgot Password
            </button>

            <div className="flex justify-center gap-2 text-16 pt-5">
              <p>New to TeddyMart?</p>
              <button className="text-sidebar font-medium">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
