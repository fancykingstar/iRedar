import React from 'react';
import Alert from './Alert';

export default function ErrorList({ errors }) {
  return errors.map((error, index) => (
    <Alert
      key={index}
      close={false}
      type="danger"
      title={error.title}
      detail={error.detail}
      style={{ marginBottom: 15 }}
    />
  ));
}
