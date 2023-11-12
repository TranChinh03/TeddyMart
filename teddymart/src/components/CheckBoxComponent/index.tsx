import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
interface CheckboxComponentProps {
  /**
   * @type {string} - The size of the component.
   */
  size?: string;

  /**
   * @type {string} - The color of the component.
   */
  color?: string;

  /**
   * @type {boolean} -  A boolean value indicating whether the component is checked.
   */
  isChecked: boolean;

  /**
   * @type {(isChecked: boolean) => void} - A function that sets the `isChecked` value.
   */
  setIsChecked: () => void;
  label?: string;
}
function CheckboxComponent({
  size = "16px",
  color = COLORS.mediumBlue,
  isChecked,
  setIsChecked,
  label,
}: CheckboxComponentProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked()}
        style={{
          accentColor: "blue",
          height: size,
          width: size,
          color: "white",
        }}
        className="text-white"
      />
      <div className="w-2"></div>
      {label && <TextComponent>{label}</TextComponent>}
    </div>
  );
}

export default CheckboxComponent;
