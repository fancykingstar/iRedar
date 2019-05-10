import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const Options = ({ options }) => {
  return options.map(({ label, value, disabled }, key) => (
    <option disabled={disabled} key={key} value={value}>
      {label}
    </option>
  ));
};

export const SelectGroup = props => {
  let { options, value, onChange, name, label, style } = props;

  return (
    <div className="form-group">
      {label && <label class="cols-sm-2 control-label m-1">{label}</label>}
      <select style={style} value={value || ''} name={name} class="form-control select2">
        <Options options={options} />
      </select>
      <div className="invalid-feedback mt-0">lol</div>
    </div>
  );
};

SelectGroup.propTypes = {
  options: propTypes.array.isRequired,
  value: [ propTypes.string, propTypes.number ],
  onChange: propTypes.func,
  name: propTypes.string.isRequired,
  label: propTypes.string,
  style: propTypes.object
};

export default SelectGroup;
