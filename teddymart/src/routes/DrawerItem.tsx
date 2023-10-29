import React from "react";
import { ReactNode, useState} from "react";
type Props = {
  name?: string;
  icon1?: ReactNode;
  icon2?: ReactNode;
  onClick: () => void;
  isSelected?: boolean;
};

export default function DrawerItem({
  name = "Item",
  icon1,
  icon2,
  onClick = () => {},
  isSelected = false,
}: Props) {
  return (
    <button className= {`flex flex-row w-4/5 px-5 py-5 m-3 justify-between text-txt_white rounded-lg hover:bg-hover ${isSelected&&'bg-hover'}`} onClick={onClick}>
      <div className="flex flex-row gap-5">
        <div className="self-center">{icon1}</div>
        <div className="self-center text-18 font-medium">{name}</div>
      </div>
      <div className="self-center">{icon2}</div>
    </button>
  );
}
