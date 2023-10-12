import { FONT_SIZE, FONT_WEIGHT } from "constants/fonts";
import React from "react";

export type TxtProps = {
  fontWeight?: FONT_WEIGHT;
  fontSize?: FONT_SIZE | number | string;
  children: React.ReactNode;
  color?: string;
  letterSpacing?: number;
};
