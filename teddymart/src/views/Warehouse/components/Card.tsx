import { COLORS } from "constants/colors";
import React from "react";

type Props = {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
};
export default function Card({
  title,
  subTitle,
  icon,
  onClick,
  selected = false,
}: Props) {
  return (
    <button
      className="rounded-2xl px-5 py-5 hover:bg-hover flex items-center bg-white"
      onClick={onClick}
    >
      {/* <FaBoxArchive color={COLORS.blue} size={30} /> */}
      {icon}
      <div className="flex flex-col items-start ml-5">
        <p>{title}</p>
        <p className="text-txt_lightgrey font-normal text-xs">{subTitle}</p>
      </div>
    </button>
  );
}
