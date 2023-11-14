import Search, { SearchProps } from "antd/es/input/Search";
import TextInputComponent from 'components/TextInputComponent';
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

    return (
        <TextInputComponent placeHolder={placeholder} value={search} setValue={setSearch} iconLeft={<BiSearch style={{marginTop: "0.2em"}}/>}/>
    )
}

export default SearchComponent;