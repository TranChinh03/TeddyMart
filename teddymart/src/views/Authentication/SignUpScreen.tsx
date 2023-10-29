import React, { useState, useRef, useEffect } from "react";
import TextInputComponent from "components/TextInputComponent";
import {AiFillCaretDown, AiFillEye, AiFillEyeInvisible, AiOutlineArrowLeft} from "react-icons/ai";



export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState("");
  const [shopname, setShopname] = useState("");
  const [phone, setPhone] = useState("");
  const [field, setField] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  // const handleInput = () => {
  //   const formattedPhoneNumber = formatPhoneNumber(value);
  //   setPhone(formattedPhoneNumber);
  // }
  //let dropdownRef = useRef();

  // useEffect(() => {
  //   document.addEventListener("mousedown", (event) => {
  //     if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsActive(false)
  //     }
  //   })
  // })

  const handleSubmit = () => {
    //e.preventDefault();
    if(username.length == 0 || password.length == 0 || email.length ==0 || phone.length==0 || 
      shopname.length==0 || field.length==0 || address.length==0){
      setError(true)
    }

  }
  
  const fieldOption = [
    'Building Materials',
    'Mini Supermarket', 
    'Fashion',
    'Cosmetics',
    'Agricultural Products',
    'Mom & Baby Products',
    'Flowers & Gifts',
    'Pharmacy',
    'Groceries',
    'Books & Stationery',
    'Mobile & Electrical Appliances',
    'Interiors & Exteriors',
    'Garage',
    'Canteen'
  ]
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-sidebar to-white">
       <div className="flex w-8/12 shadow-lg bg-white rounded-md p-5">
          <div className="w-1/2 justify-center self-center p-5">
            <img src= {require ('Images/logo.png')} alt=""/>
            <p className="pt-5 text-center text-sidebar font-medium text-2xl" >MANAGE YOUR BUSINESS BETTER</p>

          </div>

          <div className="border border-gray-100"></div>

          <div className="w-1/2 p-5">
            <h1 className="text-center text-sidebar font-medium text-3xl">
              SIGN UP
            </h1>
            <p className="py-2 text-center text-black text-14">
              Create your account. It's free and only take a minute.
            </p>
            <div className="flex ">
              <div className="w-full grid grid-cols-2 justify-items-start gap-y-2 p-5">
                <div className="flex flex-col gap-x-5">
                  <TextInputComponent
                    placeHolder=""
                    label="Username"
                    //labelFontSize={11}
                    width={250}
                    required={true}
                    value={username}
                    setValue={setUsername}
                  />
            
                  {error&&username.length<=0?
                    <label className="text-red-500 text-12">Username required !</label>
                    : error&&username.length<=5?
                      <label className="text-red-500 text-12">Username at least 6 character !</label>
                      :""} 
                </div>

                <div className="flex flex-col gap-x-5">
                  <TextInputComponent
                    placeHolder=""
                    label="Password"
                    //labelFontSize={11}
                    width={"90%"}
                    required={true}
                    inputType={visible?"text":"password"}
                    icon={visible? <AiFillEyeInvisible/> : <AiFillEye/>}
                    onIconClick={() => setVisible(!visible)}
                    value={password}
                    setValue={setPassword}
                  />

                  {error&&password.length<=0?
                    <label className="text-red-500 text-12">Password required !</label>
                    :error&&password.length<=7?
                      <label className="text-red-500 text-12">Password at least 8 characters !</label>
                      :""} 
                </div>

                <div className="flex flex-col gap-x-5">
                  <TextInputComponent
                    placeHolder=""
                    label="Email"
                    //labelFontSize={11}
                    width={"90%"}
                    required={true}
                    value={email}
                    setValue={setEmail}
                  />

                  {error&&email.length<=0?
                    <label className="text-red-500 text-12">Email required !</label>
                    :error&&!email.includes('@')?
                    <label className="text-red-500 text-12">Unvalid Email !</label>
                    :""} 
                </div>

                <div className="flex flex-col gap-x-5">
                  <TextInputComponent
                    placeHolder=""
                    label="Phone Number"
                    //labelFontSize={11}
                    width={250}
                    required={true}
                    //inputType="number"
                    value={phone}
                    setValue={setPhone}
                  />

                  {error&&phone.length<=0?
                    <label className="text-red-500 text-12">Phone Number required!</label>
                    :error&&(!/^\d+$/.test(phone))?
                    <label className="text-red-500 text-12">Number only required!</label>
                    :error&&phone.length!=10?
                    <label className="text-red-500 text-12">Unvalid number phone</label>
                    :error&&phone.charAt(0)!="0"?
                    <label className="text-red-500 text-12">Unvalid number phone</label>
                    :""
                    } 
                </div>

                <div className="flex flex-col gap-x-5">
                  <TextInputComponent
                    placeHolder=""
                    label="Shop Name"
                    //labelFontSize={11}
                    width={250}
                    required={true}
                    value={shopname}
                    setValue={setShopname}
                  />

                  {error&&shopname.length<=0?
                    <label className="text-red-500 text-12">Shop Name required!</label>
                    :""} 
                </div>
                <div className="flex flex-col gap-x-5">
                  <TextInputComponent
                    placeHolder=""
                    label="Field"
                    //labelFontSize={11}
                    width={250}
                    required={true}
                    icon={<AiFillCaretDown/>}
                    onIconClick={()=> setIsActive(!isActive)}
                    value={field}
                    setValue={setField}
                  />

                  {isActive && (
                    <div className="w-62 overflow-y-auto max-h-60 bg-white border rounded-md">
                      {fieldOption.map(item => (
                        <div onClick={() => setField(item)}
                        className={`px-4 py-2 hover:bg-slate-100 text-14 ${item === field &&'text-sidebar'}`}>
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {error&&field.length<=0?
                    <label className="text-red-500 text-12">Field required!</label>
                    :""} 
                </div>
                
                <div className="flex flex-col gap-x-5">
                  <TextInputComponent
                    placeHolder=""
                    label="Address"
                    //labelFontSize={11}
                    width={400}
                    required={true}
                    value={address}
                    setValue={setAddress}
                  />  

                  {error&&address.length<=0?
                    <label className="text-red-500 text-12">Address required!</label>
                    :""} 
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-3">
              <button className="w-5/12 py-2 bg-sidebar text-white text-xl rounded-md hover:bg-hover" 
                onClick={handleSubmit}
                >
                  Sign Up
              </button>
              
            </div>
            <div className=" flex flex-row gap-2 text-16 pt-5">
                <div className="self-center"><AiOutlineArrowLeft color="#217CA3"/></div>
                <button className="text-sidebar font-medium">
                  Login
                </button>
              </div>
          </div>
       </div>
    </div>
  );
}
