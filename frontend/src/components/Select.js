// frontend/src/components/Select.js
import React from 'react';
import './Select.css'; // We'll create this CSS file

// This component wraps a standard select element
// It accepts all the standard props for a <select>
const Select = ({ id, label, value, onChange, children, className = '', ...rest }) => {
  return (
    <div className={`custom-select-wrapper ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="custom-select-container">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="custom-select-input"
          {...rest} // Pass down any other props like 'required'
        >
          {children} {/* Renders the <option> elements passed in */}
        </select>
        <span className="custom-select-arrow" aria-hidden="true">▼</span>
      </div>
    </div>
  );
};

export default Select;
