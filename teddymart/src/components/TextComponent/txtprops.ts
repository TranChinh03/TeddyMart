import { FONT_WEIGHT } from "constants/fonts";
import React from "react";
export type TxtProps = {
  fontWeight?: FONT_WEIGHT;
  fontSize?: number;
  children: React.ReactNode;
  color?: string;
  letterSpacing?: number;
  style?: React.CSSProperties;
};
