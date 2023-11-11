import React from "react";
import { ReactNode, useState } from "react";
import { Collapse } from "antd";
import { DrawerProps } from "./Drawer";
type Props = {
  // name?: string;
  // icon1?: ReactNode;
  // icon2?: ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  item: DrawerProps;
  width?: string | number;
};

export default function DrawerItem({
  // name = "Item",
  // icon1,
  // icon2,
  onClick = () => {},
  isSelected = false,
  item,
  width = "90%",
}: Props) {
  return (
    <button
      className={`flex flex-row px-5 py-2 justify-between items-center text-txt_white rounded-lg hover:bg-hover_side_bar ${
        isSelected && "bg-hover_side_bar"
      }`}
      style={{ width: width }}
      onClick={onClick}
    >
      <div className="flex-row gap-5 items-center flex">
        <div className="text-white">{item.icon1}</div>
        <div className="text-start text-18 font-medium text-white hidden sm:flex">
          {item.name}
        </div>
      </div>
      <div className=" text-white">{item.icon2}</div>
    </button>
  );
}
