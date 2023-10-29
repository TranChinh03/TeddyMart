import SwitchComponent from "components/SwitchComponent";
import TextInputComponent from "components/TextInputComponent";
import React, { useState } from "react";
import { CiAlarmOn } from "react-icons/ci";
export default function Draft() {
  const [isOn, setIsOn] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      <SwitchComponent
        label="option1"
        isChecked={isOn}
        setIsChecked={setIsOn}
      />
      <TextInputComponent
        icon={<CiAlarmOn />}
        onIconClick={() => console.log("AA")}
        value={value}
        setValue={setValue}
        
      />
    </div>
  );
}
