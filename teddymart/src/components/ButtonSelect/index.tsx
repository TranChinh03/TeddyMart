import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import React from "react";
type Props = {
  width?: number | string;
  iconRight?: React.ReactNode;
  title?: string;
  label?: string;
  titleFontSize?: number;
  titleColor?: string;
};
export default function ButtonSelect({
  width = 200,
  iconRight,
  title = "Title",
  label = "Label",
  titleFontSize = 15,
  titleColor = COLORS.defaultBlack,
}: Props) {
  return (
    <div className="px-2 py-2">
      <button className="relative border rounded-md px-2 py-2 flex items-center hover:border-2 h-full border-gray-300">
        <TextComponent
          fontSize={titleFontSize}
          color={titleColor}
          letterSpacing={0.8}
        >
          {title}
        </TextComponent>
        {iconRight && iconRight}
        {label && (
          <div className="absolute -top-2 left-2 bg-white text-10 px-1 font-roboto text-txt_lightgrey">
            {label}
          </div>
        )}
      </button>
    </div>
  );
}
