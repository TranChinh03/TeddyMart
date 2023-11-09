import React, { useState } from "react";
import ButtonSelect from "components/ButtonSelect";
import SearchComponent from "components/SearchComponent";
import SwitchComponent from "components/SwitchComponent/SwitchComponent";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaFileExcel } from "react-icons/lia";
import { TiPlus } from "react-icons/ti";

export default function FieldSupplier() {
  const [isChecked, setIsChecked] = useState(false);
  const [isAddSupplierVisible, setAddSupplierVisible] = useState(false);
  const handleAddNewSupplier = () => {
    setAddSupplierVisible(true);
  };

  const handleOverlayClick = () => {
    setAddSupplierVisible(false);
  };
  const handleAddSupplierClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className="relative">
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
        </div>

        <div className="w-100% bg-white flex items-center justify-between gap-x-4">
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
            onClick={handleAddNewSupplier}
            iconLeft={
              <TiPlus style={{ marginRight: 10, color: "white", fontSize: 22 }} />
            }
          />
        </div>
      </div>
      {isAddSupplierVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75" style={{ zIndex: 60 }} onClick={handleOverlayClick}>
          <div className="cart-sidebar-wrapper" onClick={handleAddSupplierClick}>
            <AddNewSupplier />
          </div>
        </div>

      )}
    </div>

  );
}
