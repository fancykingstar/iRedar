import React from 'react';

export default function Spinner() {
  return (
    <div className="col-md-6 col-xl-4 mg-t-30" style={{ height: '100vh' }}>
      <div className="d-flex ht-300 pos-relative align-items-center">
        <div className="sk-three-bounce">
          <div
            className="sk-child sk-bounce1 bg-gray-800"
            style={{ backgroundColor: '#868ba1' }}
          />
          <div
            className="sk-child sk-bounce2 bg-gray-800"
            style={{ backgroundColor: '#868ba1' }}
          />
          <div
            className="sk-child sk-bounce3 bg-gray-800"
            style={{ backgroundColor: '#868ba1' }}
          />
        </div>
      </div>
    </div>
  );
}
