import React from "react";
import { COLORS } from "constants/colors";
import { ButtonProps } from "./props";
const ButtonComponent: React.FC<ButtonProps> = ({
  color = COLORS.defaultWhite,
  label,
  onClick,
  fontWeight = "font-medium",
  fontSize = "12px",
  paddingHorizontal = "20",
  paddingVertical = "8",
  borderRadius = 10,
  iconLeft,
  iconRight,
  maxWidth,
  labelColor = COLORS.defaultWhite,
}) => {
  return (
    <button
      style={{
        backgroundColor: color,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius: borderRadius,
        fontSize: fontSize,
        maxWidth,
      }}
      onClick={onClick}
      className={`${fontWeight} flex justify-between items-center`}
    >
      {iconLeft && iconLeft}
      <span style={{ color: labelColor }}>{label}</span>
      {iconRight && iconRight}
    </button>
  );
};

export default ButtonComponent;
