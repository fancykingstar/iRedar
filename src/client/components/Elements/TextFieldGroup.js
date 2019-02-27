import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  style,
  inputStyle,
  onChange,
  required,
  disabled
}) => {
  return (
    <div className="form-group" style={style}>
      <label className="cols-sm-2 control-label m-0"> {label}</label>
      <input
        type={type}
        className={classnames('form-control form-control-md', {
          'is-invalid': error
        })}
        style={inputStyle}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback mt-0">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  info: propTypes.string,
  error: propTypes.string,
  style: propTypes.object,
  inputStyle: propTypes.object,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.string,
  required: propTypes.bool
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
