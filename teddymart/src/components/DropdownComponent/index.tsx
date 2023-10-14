import { useState } from "react";

interface DropdownComponentProps {
    size?: string;
    label?: string;
    options: string[];
    placeholder?: string;
}

// size: kích thước: small, default, big

const DropdownComponent: React.FC<DropdownComponentProps> = ({ size: customSize = '', label: customLabel = 'label', options, placeholder: customPlaceholder = 'Choose an option'}) => {
    const [size, setSize] = useState(customSize);
    const [label, setLabel] = useState(customLabel);
    const [placeholder, setPlaceholder] = useState(customPlaceholder);

    return (
        <div>
            <label htmlFor={size} className={`block mb-2 ${size === "large" ? "text-base" : "text-sm"} font-medium text-gray-900 dark:text-white`}>
                {label}
            </label>
            <select
                id={size}
                className={`block w-full p-2 ${size === "large" ? "px-4 py-3 text-base" : "mb-6 text-sm"} text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
}

export default DropdownComponent;