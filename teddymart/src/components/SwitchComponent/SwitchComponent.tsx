import { COLORS } from "constants/colors";
import { SwitchProps } from "./props";
/**
 * @param {SwitchProps} props - The props for the SwitchComponent.
 * @param {string} [props.trackColor] - The color of the track when the switch is off.
 * @param {string} [props.thumbColor] - The color of the thumb when the switch is off.
 * @param {string} [props.trackActiveColor] - The color of the track when the switch is on.
 * @param {string} [props.thumbActiveColor] - The color of the thumb when the switch is on.
 * @param {string} [props.label] - The label associated with the switch.
 * @param {string | number} [props.trackWidth] - The width of the track.
 * @param {string | number} [props.thumbSize] - The size of the thumb.
 * @param {string | number} [props.fontSize] - The font size for the label.
 * @param {boolean} [props.isChecked] - Whether the thumb is checked.
 * @param {(value: boolean) => void} [props.setIsChecked] - Function to turn on/off the thumb
 * @param {string} [props.labelColor] - The color for the label
 */
const SwitchComponent = ({
  trackColor = COLORS.lightGray,
  thumbColor = COLORS.defaultWhite,
  trackActiveColor = COLORS.lightBlue,
  thumbActiveColor = COLORS.mediumBlue,
  label,
  trackWidth = "40",
  thumbSize = "20",
  fontSize = 15,
  isChecked = false,
  setIsChecked,
  labelColor,
}: SwitchProps) => {
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  return (
    <label className="relative inline-flex item-center">
      <div
        onClick={toggleSwitch}
        className="relative flex items-center cursor-pointer"
      >
        <div
          className="h-4 rounded-full"
          style={{
            backgroundColor: isChecked ? trackActiveColor : trackColor,
            width: trackWidth + "px",
          }}
        />
        <div
          className="absolute flex group transition-transform ease-in-out duration-50 transform"
          style={{
            width: thumbSize + "px",
            height: thumbSize + "px",
            transform: isChecked
              ? `translateX(${Number(trackWidth) - Number(thumbSize)}px)`
              : "translateX(0px)",
          }}
        >
          <span className="absolute inline-flex h-full w-full rounded-full group-hover:bg-sky-400 group-hover:opacity-75 group-hover:animate-ping" />
          <div
            className={`rounded-full shadow-md`}
            style={{
              backgroundColor: isChecked ? thumbActiveColor : thumbColor,
              width: thumbSize + "px",
              height: thumbSize + "px",
            }}
          />
        </div>
      </div>
      {label && (
        <span
          className={`ml-3`}
          style={{ fontSize: fontSize, color: labelColor }}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default SwitchComponent;
