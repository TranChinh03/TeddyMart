import { FONT_WEIGHT } from "constants/fonts";
import React from "react";

export type ButtonProps = {
  color?: string;
  label?: string;
  onClick: () => void;
  fontWeight?: FONT_WEIGHT;
  fontSize?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number | string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  maxWidth?: number;
};
