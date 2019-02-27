import React from 'react';
import { Link } from 'react-router-dom';

export default function PartnerNavbar() {
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
            <Link className="nav-link" to="/tasks">
              <i className="icon ion-ios-browsers-outline" />
              <span>Tasks</span>
              <span className="square-8" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/forms">
              <i className="icon ion-ios-gear-outline" />
              <span>Forms</span>
            </Link>
          </li>

          <li className="nav-item with-sub">
            <Link className="nav-link" to="#">
              <i className="icon ion-ios-filing-outline" />
              <span>Modules</span>
            </Link>
            <div className="sub-item">
              <ul>
                <li>
                  <Link to="/modules/referrals">Referrals</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
