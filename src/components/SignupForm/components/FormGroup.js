import React from "react";

const FormGroup = ({ children, inputId, label }) => {
  return (
    <div className="form_group">
      <label htmlFor={inputId} className="form_group_label">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
