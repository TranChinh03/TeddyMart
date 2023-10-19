import { COLORS } from "constants/colors";
import { TxtProps } from "./txtprops";
export default function TextComponent({
  fontWeight = "font-normal",
  fontSize = 15,
  children,
  color = COLORS.defaultBlack,
  letterSpacing,
  style,
}: TxtProps) {
  return (
    <div
      className={`${fontWeight} dark:text-white font-roboto`}
      style={{ letterSpacing, ...style, fontSize: fontSize, color }}
    >
      {children}
    </div>
  );
}
