import React from "react";
import { COLORS } from "constants/colors";
import { ButtonProps } from "./props";
const ButtonComponent: React.FC<ButtonProps> = ({
  color = COLORS.defaultWhite,
  label,
  onClick,
  fontWeight = "normal",
  fontSize = "12px",
  paddingHorizontal = "20",
  paddingVertical = "8",
  borderRadius = 10,
  iconLeft,
  iconRight,
  maxWidth,
  backgroundColor = COLORS.darkYellow,
}) => {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius: borderRadius,
        fontSize: fontSize,
        maxWidth,
        color: color,
        fontWeight: fontWeight,
        letterSpacing: 0.8,
      }}
      onClick={onClick}
      className={`${fontWeight} flex justify-between items-center hover:opacity-80`}
    >
      {iconLeft && iconLeft}
      <span style={{ color: color }}>{label}</span>
      {iconRight && iconRight}
    </button>
  );
};

export default ButtonComponent;
