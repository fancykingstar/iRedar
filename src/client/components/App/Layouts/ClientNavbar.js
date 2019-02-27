import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientNavbar() {
  return (
    <div className="slim-navbar">
      <div className="container">
        <ul className="nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              <i className="icon ion-ios-home-outline" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="#">
              <i className="icon ion-ios-filing-outline" />
              <span>Submissions</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
