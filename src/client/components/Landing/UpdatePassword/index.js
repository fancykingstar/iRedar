import React from 'react';

import LandingIntro from '../LandingIntro';
import UpdatePassword from './UpdatePassword';

export default function UpdatePasswordPage() {
  return (
    <div className="d-md-flex flex-row-reverse">
      <UpdatePassword />
      <LandingIntro />
    </div>
  );
}
