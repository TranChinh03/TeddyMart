import React, { useState } from 'react';
import { COLORS } from 'constants/colors';
import { FONT_WEIGHT, FONT_SIZE, FONT_COLOR } from 'constants/fonts';

type ButtonProps = {
  color: 'yellow' | 'gray' | 'black';
  label: string;
  onClick: () => void;
  fontWeight: FONT_WEIGHT;
  fontSize: FONT_SIZE;
};

const ButtonComponent: React.FC<ButtonProps> = ({
  color,
  label,
  onClick,
  fontWeight,
  fontSize,
}) => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({
    padding: '8px 16px',
    color: COLORS.white.defaultWhite,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: fontWeight,
    fontSize: `${14}px`,
    backgroundColor: getBackgroundColor(color),
    transition: 'background-color 0.3s ease-in-out',
  });

  function getBackgroundColor(color: 'yellow' | 'gray' | 'black') {
    switch (color) {
      case 'yellow':
        return COLORS.yellow.darkYellow;
      case 'gray':
        return COLORS.grey.lightGray;
      case 'black':
        return COLORS.black.lightBlack;
      default:
        return 'white';
    }
  }

  function handleMouseEnter() {
    // Tạo một bản sao của buttonStyle và cập nhật màu nền mới
    const newButtonStyle = { ...buttonStyle };
    if (color === 'yellow') {
      newButtonStyle.backgroundColor = COLORS.yellow.darkerYellow;
    } else if (color === 'gray') {
      newButtonStyle.backgroundColor = 'white';
    } else if (color === 'black') {
      newButtonStyle.backgroundColor = COLORS.black.mediumBlack;
    }
    setButtonStyle(newButtonStyle);
  }

  function handleMouseLeave() {
    // Khôi phục màu nền ban đầu
    const newButtonStyle = { ...buttonStyle };
    newButtonStyle.backgroundColor = getBackgroundColor(color);
    setButtonStyle(newButtonStyle);
  }

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
