import React from 'react';

import LandingIntro from '../LandingIntro';
import ResetPassword from './ResetPassword';

export default function ResetPasswordPage() {
  return (
    <div className="d-md-flex flex-row-reverse">
      <ResetPassword />
      <LandingIntro />
    </div>
  );
}
