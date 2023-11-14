import { useState, useEffect, CSSProperties } from "react";
import { Popover } from "antd";
import ButtonComponent from "components/ButtonComponent";
import { BiFilter } from "react-icons/bi";
import { COLORS } from "constants/colors";
import CheckboxComponent from "components/CheckBoxComponent";
type Item = {
  displayName: string;
  value: boolean;
};
type Props = {
  listFilter: Item[];
  setListFilter: Function;
};
export default function ListCheckBox({ listFilter, setListFilter }: Props) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<Item[]>(listFilter);
  const onChange = (index: number) => {
    let tmp = result.map((r, i) => {
      if (i === index) {
        return { ...r, value: !r.value };
      }
      return r;
    });
    setResult(tmp);
  };
  const onClose = () => {
    if (open) {
      setListFilter(result);
    }
    setOpen(!open);
  };
  return (
    <Popover
      placement="bottom"
      open={open}
      //onOpenChange={() => setOpen(!open)}
      content={() => (
        <div className="grid grid-cols-2 gap-2">
          {result.map((d, index) => (
            <CheckboxComponent
              label={d.displayName}
              isChecked={d.value}
              setIsChecked={() => onChange(index)}
              color={COLORS.darkYellow}
            />
          ))}
        </div>
      )}
    >
      <ButtonComponent
        onClick={onClose}
        label="Filter"
        iconLeft={<BiFilter size={22} color={COLORS.defaultWhite} />}
      ></ButtonComponent>
    </Popover>
  );
}
