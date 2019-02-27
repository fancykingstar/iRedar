import React from 'react';

import LandingIntro from '../LandingIntro';
import Register from './Register';

export default function RegisterPage() {
  return (
    <div className="d-md-flex flex-row-reverse">
      <Register />
      <LandingIntro />
    </div>
  );
}
