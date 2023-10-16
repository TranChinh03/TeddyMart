import { FONT_WEIGHT } from "constants/fonts";

/**
 * Props for the Button component.
 */
export type ButtonProps = {
  /**
   * @type {string} - The background color of the button.
   */
  color?: string;

  /**
   * @type {string} The label or text to display on the button.
   */
  label?: string;

  /**
   * @type {()=>void} A callback function to be executed when the button is clicked.
   */
  onClick: () => void;

  /**
   * @type {FONT_WEIGHT} The font weight of the text.
   */
  fontWeight?: FONT_WEIGHT;

  /**
   * @type {number} The font size of the text.
   */
  fontSize?: number;

  /**
   * @type {number} The horizontal padding of the button.
   */
  paddingHorizontal?: number;

  /**
   * @type {number} The vertical padding of the button.
   */
  paddingVertical?: number;

  /**
   * @type {number|string} The border radius of the button.
   */
  borderRadius?: number | string;

  /**
   * @type {React.ReactNode} An icon or content to be displayed on the left side of the button.
   */
  iconLeft?: React.ReactNode;

  /**
   *  An icon or content to be displayed on the right side of the button.
   */
  iconRight?: React.ReactNode;

  /**
   * @type {number} The maximum width of the button.
   */
  maxWidth?: number;
};
