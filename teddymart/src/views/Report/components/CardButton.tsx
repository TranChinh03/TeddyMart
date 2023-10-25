import { Tooltip } from "antd";
import { COLORS } from "constants/colors";
import { MouseEventHandler } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
type Props = {
  title: string;
  amount?: number;
  tooltip?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function CardButton({
  title,
  amount = 0,
  tooltip,
  onClick = () => {},
}: Props) {
  return (
    <button
      className="bg-white rounded-3xl px-5 py-3 hover:bg-hover flex items-start flex-col"
      onClick={onClick}
    >
      <div className="hover:bg-white rounded-lg px-3 pt-2 pb-3 flex-row flex items-center w-full">
        <div className="text-xs text-txt_mediumgrey mr-2">{title}</div>
        {tooltip && (
          <Tooltip title={tooltip}>
            <button>
              <AiOutlineQuestionCircle
                style={{}}
                color={COLORS.txt_mediumgrey}
                size={14}
              />
            </button>
          </Tooltip>
        )}
      </div>
      <p className="px-3 font-bold text-3xl text-highlight_sidebar pt-3 pb-5">
        {amount}
      </p>
    </button>
  );
}
