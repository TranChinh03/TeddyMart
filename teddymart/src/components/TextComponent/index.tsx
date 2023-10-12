import React from "react";
import { TxtProps } from "./txtprops";
import { COLORS } from "constants/colors";

export default function TextComponent({
  fontWeight = "font-bold",
  fontSize = 12,
  children,
  color = COLORS.black.defaultBlack,
  letterSpacing,
}: TxtProps) {
  return (
    <label
      className={`block mb-2 text-${fontSize} ${fontWeight} dark:text-white`}
      style={{ color, letterSpacing }}
    >
      {children}
    </label>
  );
}
