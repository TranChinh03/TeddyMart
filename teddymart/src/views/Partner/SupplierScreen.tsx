import Header from "components/Header";
import { PartnerTable } from "components/TableComponent";
import FieldSupplier from "./Components/FieldSupplier";
import React, { useState, useRef } from "react";
import {
  ButtonComponent,
  ListCheckBox,
  SearchComponent,
  TextInputComponent,
} from "components";
import { COLORS } from "constants/colors";
import { LiaFileExcel } from "react-icons/lia";
import { TiPlus } from "react-icons/ti";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { uuidv4 } from "@firebase/util";
import { addData } from "controller/addData";
import { useDispatch } from "react-redux";
import { addNewPartner } from "state_management/slices/partnerSlice";

export default function CustomerScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [totalBuyAmount, setTotalBuyAmount] = useState("");
  const [debt, setDebt] = useState("");
  const [note, setNote] = useState("");
  const [certificate, setCertificate]=useState("");

  const [isAddSupplierVisible, setAddSupplierVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const SUPPLIERS = useSelector((state: RootState) => state.partnerSlice);
  const [supplier, setsupplier] = useState(SUPPLIERS[0]?.partnerId);

  const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(selectedImageFile);
      console.log(imageUrl); 
      setSelectedImage(imageUrl);
      setCertificate(imageUrl);
    }
  };

  const [listFilter, setListFilter] = useState([
    {
      displayName: t("supplier.phoneNumber"),
      value: true,
    },
    {
      displayName: t("supplier.email"),
      value: true,
    },
    {
      displayName: t("supplier.address"),
      value: true,
    },
    {
      displayName: t("supplier.totalBuyAmount"),
      value: true,
    },
    {
      displayName: t("supplier.debt"),
      value: true,
    },
    {
      displayName: t("supplier.certificate"),
      value: true,
    },
    {
      displayName: t("Note"),
      value: true,
    },
  ]);

  const filterOptions = {
    partnerID: true,
    partnerName: true,
    gender: listFilter[5].value,
    phoneNumber: listFilter[0].value,
    email: listFilter[5].value,
    address: listFilter[5].value,
    debt: listFilter[5].value,
    totalBuyAmount: listFilter[5].value,
    certificate: listFilter[5].value,
    note: listFilter[5].value,
  };

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
  const handleInputChange = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    fieldName: string
  ) => {
    setValue(value);
    validateForm(fieldName, value);
  };

  const validateForm = (fieldName: string, value: string) => {
    if (fieldName === "SupplierName") {
      setIsFormValid(value !== "" && phoneNumber !== "");
    } else if (fieldName === "phoneNumber") {
      setIsFormValid(value !== "" && supplierName !== "");
    }
  };

  const addNewSupplier = async () => {
    const id = uuidv4();
    const certificateImageUrl = selectedImage;
    const data: TPartner = {
      partnerId: id,
      partnerName: supplierName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      note: note,
      type: "Supplier",
      totalBuyAmount: parseInt(totalBuyAmount),
      debt: parseInt(debt),
      certificate: certificateImageUrl,
    };
    await addData({
      data: data,
      id: id,
      table: "Partner",
    });
    dispatch(addNewPartner(data));
  };

  return (
    <div className="flex flex-col w-full">
      {/* <Header width={"100%"} title={"Supplier"} /> */}
      <div
        className="bg-white border-2 p-5 mx-1.5 my-1.5 rounded-md"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="relative">
          <div className="bg-white w-full py-2 flex items-center justify-between flex-wrap gap-x-8 pb-8">
            <div className="w-100% bg-white flex items-center justify-between py-2 gap-x-2 ">
              <ButtonComponent
                label={t("button.all")}
                onClick={() => alert("Button Clicked")}
                backgroundColor={COLORS.defaultWhite}
                color={COLORS.extra_gray}
              />
              <SearchComponent
                placeholder={t("supplier.insertNameToSearch")}
                search={search}
                setSearch={setSearch}
                //width={"250px"}
              />
              <ListCheckBox
                listFilter={listFilter}
                setListFilter={setListFilter}
              />
            </div>
            <div className="w-100% bg-white flex items-center justify-between gap-x-2 flex-wrap">
              <ButtonComponent
                label={t("button.delete")}
                onClick={() => {}}
                style={{ backgroundColor: "#EA5A47", marginInline: 12 }}
              />
              <ButtonComponent
                label={t("supplier.importOrExportExcel")}
                onClick={() => alert("Button Clicked")}
                backgroundColor={COLORS.lightBlack}
                iconLeft={
                  <LiaFileExcel
                    style={{ marginRight: 10, color: "white", fontSize: 22 }}
                  />
                }
              />
              <ButtonComponent
                label={t("button.addNew")}
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
                    <h1 className="pr-8 text-3xl">
                      {t("supplier.addNewSupplier")}
                    </h1>
                    <hr className="h-0.5 my-4 bg-black" />
                    <div className="overflow-y-auto max-h-96">
                      <table>
                        <tbody>
                          <tr>
                            <td className="pr-8 py-6">
                              <p>
                                {t("supplier.supplierName")}
                                <span className="text-red-600">*</span>
                              </p>
                            </td>
                            <td>
                              <TextInputComponent
                                placeHolder=""
                                width={"auto"}
                                value={supplierName}
                                setValue={(value) =>
                                  handleInputChange(
                                    value,
                                    setSupplierName,
                                    "supplierName"
                                  )
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-8 py-6">
                              <p>
                                {t("supplier.phoneNumber")}
                                <span className="text-red-600">*</span>
                              </p>
                            </td>
                            <td>
                              <TextInputComponent
                                placeHolder=""
                                width={"auto"}
                                value={phoneNumber}
                                setValue={(value) =>
                                  handleInputChange(
                                    value,
                                    setPhoneNumber,
                                    "phoneNumber"
                                  )
                                }
                              />
                            </td>
                          </tr>

                          <tr>
                            <td className="pr-8 py-6">
                              <p>{t("supplier.email")}</p>
                            </td>
                            <td>
                              <TextInputComponent
                                placeHolder=""
                                width={492}
                                value={email}
                                setValue={setEmail}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td className="pr-8 py-6">
                              <p>{t("supplier.address")}</p>
                            </td>
                            <td>
                              <TextInputComponent
                                placeHolder=""
                                width={492}
                                value={address}
                                setValue={setAddress}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-8 py-6">
                              <p>{t("supplier.totalBuyAmount")}</p>
                            </td>
                            <td>
                              <TextInputComponent
                                placeHolder=""
                                width={492}
                                value={totalBuyAmount}
                                setValue={setTotalBuyAmount}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-8 py-6">
                              <p>{t("supplier.debt")}</p>
                            </td>
                            <td>
                              <TextInputComponent
                                placeHolder=""
                                width={492}
                                value={debt}
                                setValue={setDebt}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-8 py-6">
                              <p>{t("supplier.note")}</p>
                            </td>
                            <td>
                              <TextInputComponent
                                placeHolder=""
                                width={492}
                                value={note}
                                setValue={setNote}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-8 py-6">
                              <p>{t("supplier.certificate")}</p>
                            </td>
                            <td>
                              <div
                                className="flex flex-col items-center border border-gray-300 rounded-lg w-fit h-fit px-10 py-4 cursor-pointer hover:bg-gray-300 active:bg-white"
                                onClick={() => fileInputRef.current.click()}
                              >
                                {selectedImage ? (
                                  <img
                                    src={selectedImage}
                                    alt="Selected"
                                    style={{ width: "100%", maxHeight: "100px" }}
                                    />
                                  ) : (
                                  <div className="flex flex-col items-center">
                                    <p className="text-6xl font-thin text-gray-400">
                                      +
                                    </p>
                                    <p className="text-gray-400">
                                      {t("supplier.uploadImage")}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleImageSelected}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end gap-x-4 mt-16">
                      <ButtonComponent
                        label={t("button.save")}
                        backgroundColor={
                          isFormValid ? COLORS.darkYellow : COLORS.defaultWhite
                        }
                        color={
                          isFormValid ? COLORS.defaultWhite : COLORS.lightGray
                        }
                        onClick={addNewSupplier}
                      />
                      <ButtonComponent
                        label={t("button.close")}
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
        <PartnerTable
          isCustomer={false}
          filterOption={filterOptions}
          search={search}
        />
      </div>
    </div>
  );
}
