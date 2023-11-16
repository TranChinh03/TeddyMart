import React, { useState, useRef } from "react";
import ButtonSelect from "components/ButtonSelect";
import { ButtonComponent, ListCheckBox, SearchComponent, TextInputComponent } from "components";
import AddNewSupplier from "./AddNewSupplier";
import { COLORS } from "constants/colors";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaFileExcel } from "react-icons/lia";
import { TiPlus } from "react-icons/ti";
import { BiFilter, BiSearch } from "react-icons/bi";

export default function FieldSupplier() {
  const [isChecked, setIsChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [SupplierName, setSupplierName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAddSupplierVisible, setAddSupplierVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(selectedImageFile);
      setSelectedImage(imageUrl);
    }
  };

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
      displayName: ("Certificate"),
      value: true,
    },
    {
      displayName: ("Note"),
      value: true,
    },
  ]);

  const openAddSupplier = () => {
    setAddSupplierVisible(true);
  };
  const closeAddSupplier = () => {
    setAddSupplierVisible(false);
  };

  const handleOverlayClick = () => {
    setAddSupplierVisible(false);
  };
  const handleAddSupplierClick = (e: any) => {
    e.stopPropagation();
  };
  const handleInputChange = (value: string, setValue: React.Dispatch<React.SetStateAction<string>>, fieldName: string) => {
    setValue(value);
    validateForm(fieldName, value);
  };

  const validateForm = (fieldName: string, value: string) => {
    if (fieldName === "SupplierName") {

      setIsFormValid(value !== "" && phoneNumber !== "");
    } else if (fieldName === "phoneNumber") {

      setIsFormValid(value !== "" && SupplierName !== "");
    }
  };

  return (
    <div className="relative">
      <div className="bg-white w-full py-2 flex items-center justify-between flex-wrap gap-x-8 pb-8">
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
            onClick={openAddSupplier}
            iconLeft={
              <TiPlus
                style={{ marginRight: 10, color: "white", fontSize: 22 }}
              />
            }
          />
        </div>
      </div>

      {isAddSupplierVisible && (
        <div
          className="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          style={{ zIndex: 1040 }}
          onClick={handleOverlayClick}
        >
          <div onClick={handleAddSupplierClick}>
            <div className="flex justify-center py-16">
              <div className="bg-white border p-5 my-4 rounded-md shadow-md w-fit">
                <h1 className="pr-8 text-3xl">Add New Supplier</h1>
                <hr className="h-0.5 my-4 bg-black" />
                <div className="overflow-y-auto max-h-96">
                  <table>
                    <tbody>
                      <tr >
                        <td className="pr-8 py-6">
                          <p>Supplier Name <span className="text-red-600">*</span></p>
                        </td>
                        <td>
                          <TextInputComponent
                            placeHolder=''
                            width={"auto"}
                            value={SupplierName}
                            setValue={(value) => handleInputChange(value, setSupplierName, "customerName")}
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
                            width={"auto"}
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
                            value={SupplierName}
                            setValue={setSupplierName}
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
                            value={SupplierName}
                            setValue={setSupplierName}
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
                            value={SupplierName}
                            setValue={setSupplierName}
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
                            value={SupplierName}
                            setValue={setSupplierName}
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
                            value={SupplierName}
                            setValue={setSupplierName}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-8 py-6">
                          <p>Certificate</p>
                        </td>
                        <td>
                          <div
                            className="flex flex-col items-center border border-gray-300 rounded-lg w-fit h-fit px-10 py-4 cursor-pointer hover:bg-gray-300 active:bg-white"
                            onClick={() => fileInputRef.current.click()}
                          >
                            {selectedImage ? (
                              <img src={selectedImage} alt="Selected" style={{ width: '100%', maxHeight: '100%' }} />
                            ) : (
                              <div className="flex flex-col items-center" >
                                <p className="text-6xl font-thin text-gray-400">+</p>
                                <p className="text-gray-400">Upload Image</p>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageSelected}
                          />
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-x-4 mt-16">
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
                    onClick={closeAddSupplier}
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
