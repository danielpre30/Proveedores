import React from "react";

const FormInput = ({
  type,
  placeholder,
  inputId,
  onInputChange,
  min,
  max,
  step
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
    />
  );
};

export default FormInput;
