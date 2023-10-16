import { TxtProps } from "./txtprops";
import { COLORS } from "constants/colors";

export default function TextComponent({
  fontWeight = "font-bold",
  fontSize = 12,
  children,
  color = "message_success",
  letterSpacing,
  style,
}: TxtProps) {
  return (
    <label
      className={`block mb-2 ${fontWeight} dark:text-white text-${color}`}
      style={{ letterSpacing, ...style, fontSize: fontSize }}
    >
      {children}
    </label>
  );
}
