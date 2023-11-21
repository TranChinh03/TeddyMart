import Search, { SearchProps } from "antd/es/input/Search";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchComponentProps {
  placeholder?: string;
  label?: string;
  search?: string;
  setSearch?: (search: string) => void;
  width?: number | string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = "Type here ...",
  label,
  search,
  setSearch,
  width,
  style,
  onClick,
}) => {
  // const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  // console.log(info?.source, value);

  return (
    <TextInputComponent
      label={label}
      placeHolder={placeholder}
      value={search}
      setValue={setSearch}
      iconLeft={<BiSearch style={{ marginTop: "0.2em" }} />}
      textInputSize={"14px"}
      style={{
        borderWidth: 1.2,
        borderColor: COLORS.lightGray,
        width,
        paddingTop: "10px",
        paddingBottom: "10px",
        ...style,
      }}
      onIconClick={onClick}
    />
  );
};

export default SearchComponent;
