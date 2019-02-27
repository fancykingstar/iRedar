import React from 'react';
import propTypes from 'prop-types';

export default function Alert({ type, title, detail, style, close }) {
  const closeDisplay = close ? 'inline' : 'none';

  return (
    <div className={`alert alert-${type} mg-b-0`} style={style} role="alert">
      <button
        style={{ display: closeDisplay }}
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>{title}</strong> {detail}
    </div>
  );
}

Alert.propTypes = {
  type: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  detail: propTypes.string.isRequired,
  style: propTypes.object,
  close: propTypes.bool
};

Alert.defaultProps = {
  type: 'warning',
  close: true
};
