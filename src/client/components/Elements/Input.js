import React from 'react';
import propTypes from 'prop-types';

export default function Input({
  name,
  placeholder,
  type,
  onChange,
  required,
  style
}) {
  return (
    <input
      style={style}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete="off"
      onChange={onChange}
      required={required}
    />
  );
}

Input.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  required: propTypes.bool,
  style: propTypes.object
};

Input.defaultProps = {
  type: 'text'
};
