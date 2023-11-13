import Search, { SearchProps } from "antd/es/input/Search";
import TextComponent from "components/TextComponent";
import TextInputComponent from 'components/TextInputComponent';
import { COLORS } from "constants/colors";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchComponentProps {
    placeholder?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({placeholder: customPlaceholder = "Type here ..."}) => {
    const [placeholder, setPlaceholder] = useState(customPlaceholder)
    const [search, setSearch] = useState("");
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
    const labelFontWeight = "font-medium";
    const labelFontSize = 12;
    const labelColor = COLORS.defaultBlack;

    return (
        // <TextInputComponent placeHolder={placeholder} value={search} setValue={setSearch} iconLeft={<BiSearch style={{marginTop: "0.2em"}}/>}/>
        <div className="mb-3" style={{margin: 0}}>
            <div className="relative mb-4 flex items-center w-full flex-wrap items-stretch" style={{margin: 0}}>
                {/* <!--Search icon--> */}
                <span
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                id="basic-addon2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                    fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd" />
                </svg>
                </span>
                <input
                type="search"
                className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,130,246)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder={placeholder}
                aria-label="Search"
                aria-describedby="button-addon2" />

                
            </div>
            </div>
    )
}

export default SearchComponent;
