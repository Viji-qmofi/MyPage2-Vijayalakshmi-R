import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ id, name, label, type, value, handleChange, placeholder, required }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}

        <input
          id={id}
          name={name}
          type={type || "text"}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          ref={ref}   
          required={required}
        />
      </>
    );
  }
);

export default Input;
