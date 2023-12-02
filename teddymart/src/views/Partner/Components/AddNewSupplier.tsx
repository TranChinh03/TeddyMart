import { useState, useRef } from "react";
import ButtonComponent from "components/ButtonComponent";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { useTranslation } from "react-i18next";
import { Modal, message } from "antd";
import { createEntityID } from "utils/appUtils";
import { addNewPartner } from "state_management/slices/partnerSlice";
import { addData } from "controller/addData";
import { db, storage } from "firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type Props = {
  opernAddNewSupplier: boolean;
  setOpernAddNewSupplier: (opernAddNewSupplier: boolean) => void;
};

export default function AddNewSupplierForm({
  opernAddNewSupplier,
  setOpernAddNewSupplier,
}: Props) {
  const [supplierName, setSupplierName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [totalBuyAmount, setTotalBuyAmount] = useState("");
  const [debt, setDebt] = useState("");
  const [note, setNote] = useState("");
  const [certificate, setCertificate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelected = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImageFile = event.target.files[0];
      const storageRef = ref(
        storage,
        `/Supplier/Certificate/${createEntityID("P")}`
      );
      try {
        const snapshot = await uploadBytes(storageRef, selectedImageFile);
        const imageUrl = await getDownloadURL(snapshot.ref);
        setSelectedImage(imageUrl);
        setCertificate(imageUrl);
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
      }
    }
  };

  const { t } = useTranslation();
  const { userId } = useSelector((state: RootState) => state.manager);
  const dispatch = useDispatch();

  const handleInputChange = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    fieldName: string
  ) => {
    setValue(value);
    validateForm(fieldName, value);
  };
  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = (fieldName: string, value: string) => {
    if (fieldName === "supplierName") {
      setIsFormValid(value !== "" && phoneNumber !== "");
    } else if (fieldName === "phoneNumber") {
      setIsFormValid(value !== "" && supplierName !== "");
    }
  };
  const onAddNewSupplier = () => {
    const partnerId = createEntityID("P");
    const certificateImageUrl = selectedImage;
    const data: TPartner = {
      partnerId: partnerId,
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
    dispatch(addNewPartner(data));
    addData({ data, table: "Partner", id: partnerId });
    message.success("Supplier added successfully");
    setOpernAddNewSupplier(false);
  };
  return (
    <Modal
      open={opernAddNewSupplier}
      onCancel={() => setOpernAddNewSupplier(false)}
      footer={false}
      title={<h1 className="pr-8 text-3xl">{t("supplier.addNewSupplier")}</h1>}
      width={720}
    >
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
                    handleInputChange(value, setSupplierName, "supplierName")
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
                    handleInputChange(value, setPhoneNumber, "phoneNumber")
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
                      <p className="text-6xl font-thin text-gray-400">+</p>
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

      <div className="flex justify-end gap-x-4 mt-4">
        <ButtonComponent
          label={t("button.save")}
          backgroundColor={
            isFormValid ? COLORS.darkYellow : COLORS.defaultWhite
          }
          color={isFormValid ? COLORS.defaultWhite : COLORS.lightGray}
          onClick={onAddNewSupplier}
        />
        <ButtonComponent
          label={t("button.close")}
          backgroundColor={COLORS.defaultWhite}
          color={COLORS.extra_gray}
          onClick={() => setOpernAddNewSupplier(false)}
        />
      </div>
    </Modal>
  );
}
