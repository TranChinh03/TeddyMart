import React, { useState } from 'react';

interface CheckboxComponentProps {
  type: string;
  height?: string;
  tickSize?: string;
}

function CheckboxComponent({ type, height = '16px', tickSize = '50%' }: CheckboxComponentProps) {
  const [isChecked, setIsChecked] = useState(type === 'red');
  const checkboxStyle = {
    height,
    width: height,
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div style={{ width: height }}>
      {type === 'green' && (
        <input
          type="checkbox"
          className={`form-checkbox accent-[#217ca0]`}
          style={checkboxStyle}
        />
      )}
      {type === 'red' && (
        <input
          type="checkbox"
          className={`form-checkbox accent-[#e6493f]`}
          checked={isChecked}
        onChange={handleCheckboxChange} 
          style={checkboxStyle}
        />
      )}
      <style>{`
        .form-checkbox:checked + .form-checkbox-icon::before {
          transform: scale(${tickSize}); 
        }
      `}</style>
    </div>
  );
}

export default CheckboxComponent;
