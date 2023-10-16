import ButtonComponent from "components/ButtonComponent";
import SearchComponent from "components/SearchComponent";
import SwitchComponent from "components/SwitchComponent/SwitchComponent";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { CiAlarmOn } from "react-icons/ci";
import CheckboxComponent from "components/CheckBoxComponent";
export default function Draft() {
  const [isOn, setIsOn] = useState(false);
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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
    </div>
  );
}
