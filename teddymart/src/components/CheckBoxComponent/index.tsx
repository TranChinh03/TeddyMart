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
  setIsChecked: (isChecked: boolean) => void;
}
function CheckboxComponent({
  size = "16px",
  color = COLORS.mediumBlue,
  isChecked,
  setIsChecked,
}: CheckboxComponentProps) {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
      style={{
        accentColor: color,
        height: size,
        width: size,
      }}
    />
  );
}

export default CheckboxComponent;
