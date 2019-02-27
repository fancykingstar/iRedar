import React from 'react';

import LandingIntro from '../LandingIntro';
import Login from './Login';

export default function LoginPage() {
  return (
    <div className="d-md-flex flex-row-reverse">
      <Login />
      <LandingIntro />
    </div>
  );
}
