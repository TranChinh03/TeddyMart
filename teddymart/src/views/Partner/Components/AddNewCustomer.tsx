import { useState, useRef } from "react";
import ButtonComponent from "components/ButtonComponent";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { useTranslation } from "react-i18next";
import { Modal, message } from "antd";
import { createID } from "utils/appUtils";
import { addNewPartner } from "state_management/slices/partnerSlice";
import { addData } from "controller/addData";

type Props = {
  opernAddNewCustomer: boolean;
  setOpernAddNewCustomer: (opernAddNewCustomer: boolean) => void;
};

export default function AddNewCustomerForm({
  opernAddNewCustomer,
  setOpernAddNewCustomer,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [totalBuyAmount, setTotalBuyAmount] = useState("");
  const [debt, setDebt] = useState("");
  const [note, setNote] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("Female");
  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
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
    if (fieldName === "customerName") {
      setIsFormValid(value !== "" && phoneNumber !== "");
    } else if (fieldName === "phoneNumber") {
      setIsFormValid(value !== "" && customerName !== "");
    }
  };
  const onAddNewCustomer = () => {
    const partnerId = createID({ prefix: "P" });
    const data: TPartner = {
      partnerId: partnerId,
      partnerName: customerName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      note: note,
      gender: selectedGender as "female" | "male",
      type: "Customer",
      totalBuyAmount: parseInt(totalBuyAmount),
      debt: parseInt(debt),
    };
    dispatch(addNewPartner(data));
    addData({ data, table: "Partner", id: partnerId });
    message.success("Supplier added successfully");
    setOpernAddNewCustomer(false);
  };
  return (
    <Modal
      open={opernAddNewCustomer}
      onCancel={() => setOpernAddNewCustomer(false)}
      footer={false}
      title={<h1 className="pr-8 text-3xl">{t("customer.addNewCustomer")}</h1>}
      width={720}
    >
      <hr className="h-0.5 my-4 bg-black" />
      <div className="overflow-y-auto h-96">
        {" "}
        <table>
          <tbody>
            <tr>
              <td className="pr-8 py-6">
                <p>
                  {t("customer.customerName")}
                  <span className="text-red-600">*</span>
                </p>
              </td>
              <td>
                <TextInputComponent
                  placeHolder=""
                  width={492}
                  value={customerName}
                  setValue={(value) =>
                    handleInputChange(value, setCustomerName, "customerName")
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="pr-8 py-6">
                <p>
                  {t("customer.phoneNumber")}
                  <span className="text-red-600">*</span>
                </p>
              </td>
              <td>
                <TextInputComponent
                  placeHolder=""
                  width={492}
                  value={phoneNumber}
                  setValue={(value) =>
                    handleInputChange(value, setPhoneNumber, "phoneNumber")
                  }
                />
              </td>
            </tr>

            <tr>
              <td className="pr-8 py-6">
                <p>{t("customer.gender")}</p>
              </td>
              <td>
                <input
                  type="radio"
                  name="radio-gender"
                  className="w-4 h-4 mr-4"
                  checked={selectedGender === "Male"}
                  onChange={() => handleGenderChange("Male")}
                />
                <label className="mr-16">{t("customer.male")}</label>
                <input
                  type="radio"
                  name="radio-gender"
                  className=" w-4 h-4 mr-4"
                  checked={selectedGender === "Female"}
                  onChange={() => handleGenderChange("Female")}
                />
                <label className="mr-16">{t("customer.female")}</label>
              </td>
            </tr>
            <tr>
              <td className="pr-8 py-6">
                <p>{t("customer.email")}</p>
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
                <p>{t("customer.address")}</p>
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
                <p>{t("customer.totalBuyAmount")}</p>
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
                <p>{t("customer.debt")}</p>
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
                <p>{t("customer.note")}</p>
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
          onClick={onAddNewCustomer}
        />
        <ButtonComponent
          label={t("button.close")}
          backgroundColor={COLORS.defaultWhite}
          color={COLORS.extra_gray}
          onClick={() => setOpernAddNewCustomer(false)}
        />
      </div>
    </Modal>
  );
}
