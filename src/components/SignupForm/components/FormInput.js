import React from "react";

const FormInput = ({
  type,
  placeholder,
  inputId,
  onInputChange,
  min,
  max,
  step,
  value
}) => {
  return (
    <input
      className="form_group_input"
      type={type}
      placeholder={placeholder}
      id={inputId}
      onChange={e => onInputChange(e, inputId)}
      required
      min={min}
      max={max}
      step={step}
      value={value}
    />
  );
};

export default FormInput;
