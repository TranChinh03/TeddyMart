import { useState } from "react";

interface DropdownComponentProps {
  size?: string;
  label?: string;
  options: string[];
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

// size: kích thước: small, default, big

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  size = "",
  label = "",
  options,
  placeholder = "Choose an option",
  value = "",
  setValue = () => {},
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={size}
          className={`block mb-1 ${
            size === "large" ? "text-base" : "text-sm"
          } font-medium text-gray-900 dark:text-white`}
        >
          {label}
        </label>
      )}

      <select
        id={size}
        className={`p-2 ${
          size === "large" ? "text-base" : "text-sm"
        } text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option selected>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownComponent;
