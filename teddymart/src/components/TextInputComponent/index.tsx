import { COLORS } from "constants/colors";
import { Props } from "./props";
import TextComponent from "components/TextComponent";
import { ChangeEvent } from "react";
/**
 * Props for a custom text input component.
 *
 * @param labelFontWeight - Font weight of the label.
 * @param labelFontSize - Font size of the label.
 * @param labelColor - Color of the label text.
 * @param placeHolder - Placeholder text for the input.
 * @param id - The unique identifier for the input.
 * @param inputType - Type of the input element (e.g., text, checkbox, radio, etc.).
 * @param borderRadius - Border radius of the input component.
 * @param label - Text to be displayed as the label.
 * @param width - Width of the input component.
 * @param textInputColor - Color of the input text.
 * @param borderColor - Border color of the input component.
 * @param textInputSize - Size of the input text.
 * @param icon - Icon element to be displayed alongside the input.
 * @param onIconClick - Callback function to be invoked when the icon is clicked.
 * @param required - Indicates if the input is required.
 * @param value - The current value of the input.
 * @param setValue - Function to update the value of the input.
 */
export default function TextInputComponent({
  labelFontWeight = "font-medium",
  labelFontSize = 12,
  labelColor = COLORS.black.defaultBlack,
  placeHolder = "Type here...",
  id,
  inputType = "text",
  label = "Label",
  borderRadius = "rounded-lg",
  width = 200,
  textInputColor = "txt_main_color",
  borderColor = "gray",
  textInputSize = "text-sm",
  icon,
  onIconClick,
  required = false,
  value,
  setValue,
}: Props) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  console.log(value);
  return (
    <div style={{ width }}>
      {label && (
        <TextComponent
          fontSize={labelFontSize}
          fontWeight={labelFontWeight}
          color={labelColor}
        >
          {"Label"}
        </TextComponent>
      )}
      <div
        className={`flex items-center border ${borderRadius} p-2 focus-within:border-black focus-within:border-1 w-full border-${borderColor}`}
      >
        <input
          type={inputType}
          id={id}
          className={`bg-gray-50 ${textInputColor} ${textInputSize} block w-full p-2.5 focus:outline-none`}
          placeholder={placeHolder}
          required={required}
          value={value}
          onChange={handleInputChange}
        />
        {icon && (
          <button
            onClick={onIconClick}
            className="p-2 hover:bg-slate-300 rounded-full"
          >
            {icon}
          </button>
        )}
      </div>
    </div>
  );
}
