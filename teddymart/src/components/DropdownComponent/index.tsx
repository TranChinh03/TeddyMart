import { useState } from "react";

interface DropdownComponentProps {
  size?: string;
  label?: string;
  options: string[];
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
  isValueIndex?: boolean;
  width?: string;
}

// size: kích thước: small, default, big

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  size = "",
  label = "",
  options,
  placeholder = "Choose an option",
  value = "",
  setValue = () => {},
  isValueIndex = false,
  width = "100%",
}) => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={size}
          className={`absolute -top-2 left-2 bg-white ${
            size === "large" ? "text-base" : "text-xs"
          } font-medium text-gray-900 dark:text-white`}
        >
          {label}
        </label>
      )}

      <select
        id={size}
        className={`px-2 py-3 ${
          size === "large" ? "text-base" : "text-sm"
        } text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        //style={width}
      >
        <option selected disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={isValueIndex ? index : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownComponent;
