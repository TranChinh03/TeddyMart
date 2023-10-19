import { TxtProps } from "./txtprops";
export default function TextComponent({
  fontWeight = "font-normal",
  fontSize = 15,
  children,
  color = "message_success",
  letterSpacing,
  style,
}: TxtProps) {
  return (
    <div
      className={`${fontWeight} dark:text-white text-${color} font-roboto`}
      style={{ letterSpacing, ...style, fontSize: fontSize }}
    >
      {children}
    </div>
  );
}
