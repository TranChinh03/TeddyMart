export type SwitchProps = {
  /**
   * @type {string} -  The color of the track when the switch is off
   */
  trackColor?: string;

  /**
   * @type {string} -  The color of the thumb when the switch is off.
   */
  thumbColor?: string;

  /**
   * @type {string} -  The color of the track when the switch is on.
   */
  trackActiveColor?: string;

  /**
   * @type {string} - The color of the thumb when the switch is on.
   */
  thumbActiveColor?: string;

  /**
   * @type {string} - The label associated with the switch.
   */
  label?: string;

  /**
   * @type {string|number} - The width of the track.
   */
  trackWidth?: string | number;

  /**
   * @type {string|number} - The size of the thumb.
   */
  thumbSize?: string | number;

  /**
   * @type {string|number} - The font size for the label.
   */
  fontSize?: string | number;

  /**
   * @type {boolean} -  Whether the thumb is checked.
   */
  isChecked?: boolean;

  /**
   * @type {(value: boolean) => void} - Whether the thumb is checked
   */
  setIsChecked: (value: boolean) => void;

  /**
   * @type {string} - The color for the label
   */
  labelColor?: string;
};
