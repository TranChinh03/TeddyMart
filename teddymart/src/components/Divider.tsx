import React from "react";
type Props = {
  width?: number | string;
  color?: string;
};
export default function Divider({ width = 1, color = "bg-gray-700" }: Props) {
  return <div className={`flex w-${width} ${color} h-0.1`}></div>;
}
