import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingIntro() {
  return (
    <div className="signin-left">
      <div className="signin-box">
        <h2 className="slim-logo">
          <Link to="/">
            iAuto<span>.</span>
          </Link>
        </h2>

        <p>
          We are excited to launch our new product iAuto immigration. After
          working closely with different non-for-profit agencies helping
          immigrants, we know that iAuto solves a major problem. We hope to
          simplify and automate NFP core processes so that they can spend more
          time with their clients.
        </p>

        <p>Contact us for a free demo or create an account.</p>

        <p>
          <Link to="/" className="btn btn-outline-secondary pd-x-25">
            Learn More
          </Link>
        </p>

        <p className="tx-12">© Copyright 2018. All Rights Reserved.</p>
      </div>
    </div>
  );
}
