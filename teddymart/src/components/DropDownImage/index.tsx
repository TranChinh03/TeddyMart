import { Select } from "antd";
const { Option } = Select;
type TOption = {
  image: string;
  title: string;
};
type DropdownComponentProps = {
  width?: number | string;
  options: TOption[];
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
};

const DropdownImage: React.FC<DropdownComponentProps> = ({
  width = 100,
  options,
  placeholder = "Choose an option",
  value,
  setValue,
}) => {
  return (
    <Select
      style={{ width: width }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e)}
    >
      {options.map((option, index) => (
        <Option key={index} value={option.title}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>{option.title}</div>
            <img
              src={option.image}
              alt="Flag"
              style={{ width: "30px", height: "20px" }}
            />
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default DropdownImage;
