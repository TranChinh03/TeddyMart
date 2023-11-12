import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { BsCheckLg } from "react-icons/bs";
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
      <button
        className="flex w-4 h-4 rounded border items-center justify-center border-slate-400"
        style={{
          backgroundColor: isChecked ? color : COLORS.defaultWhite,
        }}
        onClick={setIsChecked}
      >
        {isChecked && <BsCheckLg color={COLORS.defaultWhite} />}
      </button>

      <div className="w-2"></div>
      {label && <TextComponent>{label}</TextComponent>}
    </div>
  );
}

export default CheckboxComponent;
