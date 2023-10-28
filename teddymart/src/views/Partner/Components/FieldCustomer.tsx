import React, { useState } from "react";
import ButtonSelect from "components/ButtonSelect";
import SearchComponent from "components/SearchComponent";
import SwitchComponent from "components/SwitchComponent/SwitchComponent";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaFileExcel } from "react-icons/lia";
import { TiPlus } from "react-icons/ti";
import { BiFilter } from "react-icons/bi";

export default function FieldCustomer() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="w-100% bg-white flex items-center justify-between px-4 py-2">
      <div className="w-100% bg-white flex items-center justify-between px-4 py-2 gap-x-8">
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 100, color: "gray" }} />
          }
          title="All"
          label="Retail Customer group"
        />
        <SearchComponent />
        <SwitchComponent isChecked={isChecked} setIsChecked={setIsChecked} />
        <ButtonComponent
          onClick={() => alert("Button Clicked")}
          paddingHorizontal={10}
          paddingVertical={10}
          borderRadius={100}
          iconLeft={<BiFilter style={{ color: "white", fontSize: 22 }} />}
        />
      </div>
      <div className="w-100% bg-white flex items-center justify-between gap-x-4">
        <ButtonComponent
          label="Import or Export Excel"
          onClick={() => alert("Button Clicked")}
          backgroundColor = {COLORS.lightBlack}
          iconLeft={
            <LiaFileExcel
              style={{ marginRight: 10, color: "white", fontSize: 22 }}
            />
          }
        />
        <ButtonComponent
          label="Add new"
          onClick={() => alert("Button Clicked")}
          iconLeft={
            <TiPlus style={{ marginRight: 10, color: "white", fontSize: 22 }} />
          }
        />
      </div>
    </div>
  );
}
