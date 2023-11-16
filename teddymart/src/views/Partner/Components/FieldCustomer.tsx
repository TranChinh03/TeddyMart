import React, { useState } from "react";
import ButtonSelect from "components/ButtonSelect";
import { ButtonComponent, ListCheckBox, SearchComponent, TextInputComponent } from "components";
import AddNewCustomer from "./AddNewCustomer";
import { COLORS } from "constants/colors";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaFileExcel } from "react-icons/lia";
import { TiPlus } from "react-icons/ti";
import { BiFilter, BiSearch } from "react-icons/bi";

export default function FieldCustomer() {
  const [isChecked, setIsChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAddCustomerVisible, setAddCustomerVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [listFilter, setListFilter] = useState([
    {
      displayName: ("Phone Number"),
      value: true,
    },
    {
      displayName: ("Email"),
      value: true,
    },
    {
      displayName: ("Address"),
      value: true,
    },
    {
      displayName: ("Total Buy Amount"),
      value: true,
    },
    {
      displayName: ("Debt"),
      value: true,
    },
    {
      displayName: ("Gender"),
      value: true,
    },
    {
      displayName: ("partner.note"),
      value: true,
    },
  ]);

  const openAddCustomer = () => {
    setAddCustomerVisible(true);
  };
  const closeAddCustomer = () => {
    setAddCustomerVisible(false);
  };

  const handleOverlayClick = () => {
    setAddCustomerVisible(false);
  };
  const handleAddCustomerClick = (e: any) => {
    e.stopPropagation();
  };
  const handleInputChange = (value: string, setValue: React.Dispatch<React.SetStateAction<string>>, fieldName: string) => {
    setValue(value);
    validateForm(fieldName, value);
  };

  const validateForm = (fieldName: string, value: string) => {
    if (fieldName === "customerName") {

      setIsFormValid(value !== "" && phoneNumber !== "");
    } else if (fieldName === "phoneNumber") {

      setIsFormValid(value !== "" && customerName !== "");
    }
  };

  return (
    <div className="relative">
      <div className="bg-white w-full py-2 flex items-center justify-between flex-wrap gap-x-8">
        <div className="w-100% bg-white flex items-center justify-between py-2 gap-x-4 ">
          <ButtonComponent
            label="All"
            onClick={() => alert("Button Clicked")}
            backgroundColor={COLORS.defaultWhite}
            color={COLORS.extra_gray}
          />
          <SearchComponent
            placeholder={("Insert name to search")}
            search={search}
            setSearch={setSearch}
          //width={"250px"}
          />
          <ListCheckBox
            listFilter={listFilter}
            setListFilter={setListFilter}
          />
        </div>
        <div className="w-100% bg-white flex items-center justify-between gap-x-4 flex-wrap">
          <ButtonComponent
            label={("Delete")}
            onClick={() => { }}
            style={{ backgroundColor: "#EA5A47", marginInline: 12 }}
          />
          <ButtonComponent
            label="Import or Export Excel"
            onClick={() => alert("Button Clicked")}
            backgroundColor={COLORS.lightBlack}
            iconLeft={
              <LiaFileExcel
                style={{ marginRight: 10, color: "white", fontSize: 22 }}
              />
            }
          />
          <ButtonComponent
            label="Add new"
            onClick={openAddCustomer}
            iconLeft={
              <TiPlus
                style={{ marginRight: 10, color: "white", fontSize: 22 }}
              />
            }
          />
        </div>
      </div>

      {isAddCustomerVisible && (
        <div
          className="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          style={{ zIndex: 1040 }}
          onClick={handleOverlayClick}
        >
          <div onClick={handleAddCustomerClick}>
            <div className="flex justify-center">
              <div className="bg-white border p-5 my-4 rounded-md shadow-md w-fit">
                <h1 className="pr-8 text-3xl">Add New Customer</h1>
                <hr className="h-0.5 my-4 bg-black" />
                <div className="overflow-y-auto h-96"> <table>
                  <tbody>
                    <tr >
                      <td className="pr-8 py-6">
                        <p>Customer Name <span className="text-red-600">*</span></p>
                      </td>
                      <td>
                        <TextInputComponent
                          placeHolder=''
                          width={492}
                          value={customerName}
                          setValue={(value) => handleInputChange(value, setCustomerName, "customerName")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-8 py-6">
                        <p>Phone Number<span className="text-red-600">*</span></p>
                      </td>
                      <td>
                        <TextInputComponent
                          placeHolder=''
                          width={492}
                          value={phoneNumber}
                          setValue={(value) => handleInputChange(value, setPhoneNumber, "phoneNumber")}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="pr-8 py-6">
                        <p>Gender</p>
                      </td>
                      <td>
                        <input type="radio" name="radio-gender" className="w-4 h-4 mr-4" />
                        <label className="mr-16">Male</label>
                        <input type="radio" name="radio-gender" className=" w-4 h-4 mr-4" />
                        <label className="mr-16">Female</label>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-8 py-6">
                        <p>Email</p>
                      </td>
                      <td>
                        <TextInputComponent
                          placeHolder=''
                          width={492}
                          value={customerName}
                          setValue={setCustomerName}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="pr-8 py-6">
                        <p>Address</p>
                      </td>
                      <td>
                        <TextInputComponent
                          placeHolder=''
                          width={492}
                          value={customerName}
                          setValue={setCustomerName}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-8 py-6">
                        <p>Total Buy Amount</p>
                      </td>
                      <td>
                        <TextInputComponent
                          placeHolder=''
                          width={492}
                          value={customerName}
                          setValue={setCustomerName}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-8 py-6">
                        <p>Debt</p>
                      </td>
                      <td>
                        <TextInputComponent
                          placeHolder=''
                          width={492}
                          value={customerName}
                          setValue={setCustomerName}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-8 py-6">
                        <p>Note</p>
                      </td>
                      <td>
                        <TextInputComponent
                          placeHolder=''
                          width={492}
                          value={customerName}
                          setValue={setCustomerName}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table></div>

                <div className="flex justify-end gap-x-4 mt-4">
                  <ButtonComponent
                    label="Save"
                    backgroundColor={isFormValid ? COLORS.darkYellow : COLORS.defaultWhite}
                    color={isFormValid ? COLORS.defaultWhite : COLORS.lightGray}
                    onClick={() => isFormValid && alert("Button Clicked")}
                  />
                  <ButtonComponent
                    label="Close"
                    backgroundColor={COLORS.defaultWhite}
                    color={COLORS.extra_gray}
                    onClick={closeAddCustomer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
