import ButtonComponent from "components/ButtonComponent";
import SearchComponent from "components/SearchComponent";
import SwitchComponent from "components/SwitchComponent/SwitchComponent";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { CiAlarmOn } from "react-icons/ci";
import CheckboxComponent from "components/CheckBoxComponent";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { addNewPartner } from "state_management/slices/partnerSlice";

export default function Draft() {
  const [isOn, setIsOn] = useState(false);
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const partners = useSelector((state: RootState) => state.partnerSlice);
  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      <SwitchComponent
        label="option1"
        isChecked={isOn}
        setIsChecked={setIsOn}
        labelColor={COLORS.checkbox_bg}
      />
      <TextInputComponent
        icon={<CiAlarmOn />}
        onIconClick={() => console.log("AA")}
        value={value}
        setValue={setValue}
        labelFontWeight={"font-bold"}
        labelFontSize={12}
      />
      <ButtonComponent
        color={COLORS.hover}
        onClick={() => {
          alert("Button clicked!");
          console.log(partners);
          i18n.changeLanguage("vi");
          // dispatch(
          //   addNewPartner({
          //     partnerId: "AAA",
          //     partnerName: "AAA",
          //     email: "1123@gmail.com",
          //     phoneNumber: "12345678",
          //     address: "123",
          //     notes: "asass",
          //     gender: "female",
          //   })
          // );
        }}
        label="Label 1"
        iconLeft={<CiAlarmOn />}
      />
      <ButtonComponent
        color={COLORS.hover}
        onClick={() => {
          dispatch(
            addNewPartner({
              partnerId: "AAA",
              partnerName: "AAA",
              email: "1123@gmail.com",
              phoneNumber: "12345678",
              address: "123",
              notes: "asass",
              gender: "female",
            })
          );
        }}
        label="Label 1"
        iconLeft={<CiAlarmOn />}
      />
      <SearchComponent />
      <CheckboxComponent
        color="red"
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <div>
        <h1>{t("welcome")}</h1>
      </div>
    </div>
  );
}
