import { COLORS } from "constants/colors";
import { MouseEventHandler } from "react";
type Props = {
  title: string;
  amount?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  color?: string;
};

export default function CardButton({
  title,
  amount = 0,
  onClick = () => {},
  selected = false,
  color = COLORS.blue,
}: Props) {
  return (
    <button
      className={`rounded-3xl px-5 py-3 hover:bg-hover flex items-start flex-col`}
      onClick={onClick}
      style={{ backgroundColor: selected ? COLORS.hover : COLORS.defaultWhite }}
    >
      <div className="rounded-lg px-3 pt-2 pb-3 flex-row flex items-center w-full">
        <div className="text-xs text-txt_mediumgrey mr-2">{title}</div>
      </div>
      <p className="px-3 font-bold text-3xl  pt-3 pb-5" style={{ color }}>
        {amount}
      </p>
    </button>
  );
}
