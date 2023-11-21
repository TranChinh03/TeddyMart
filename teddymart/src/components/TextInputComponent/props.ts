import { FONT_WEIGHT } from "constants/fonts";
import { ReactNode } from "react";
import { UseFormRegister, ValidationRule } from "react-hook-form";
import { Style } from "util";
type TPattern = {
  value: RegExp;
  message: string;
};
export type Props = {
  labelFontWeight?: FONT_WEIGHT;
  labelFontSize?: number;
  labelColor?: string;
  placeHolder?: string;
  id?: string;
  inputType?:
    | "text"
    | "checkbox"
    | "radio"
    | "color"
    | "date"
    | "file"
    | "password";
  borderRadius?: number;
  label?: string;
  width?: number | string;
  textInputColor?: string;
  borderColor?: string;
  textInputSize?: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  required?: boolean;
  value?: string;
  style?: React.CSSProperties;
  outStyle?: React.CSSProperties;
  setValue?: (value: string) => void;
  iconLeft?: ReactNode;
  register?: UseFormRegister<any>;
  registerName?: string;
  readOnly?: boolean;
  onClick?: () => void;
  enterAction?: () => void;
  pattern?: TPattern;
  minLength?: {
    value: number;
    message: string;
  };
  onStopTyping?: (value: string) => void;
};
