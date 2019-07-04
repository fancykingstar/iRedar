import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

export default class PartnerNavbar extends Component {
  render() {
  return (
    <div className="slim-navbar">
      <div className="container">
        <ul className="nav">
          <li
              className={classnames('nav-item', {
                active: this.props.location.pathname === '/dashboard'
              })}
            >
            <Link className="nav-link" to="/dashboard">
              <i className="icon ion-ios-home-outline" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li
              className={classnames('nav-item', {
                active: this.props.location.pathname === '/logs'
              })}
            >
              <Link className="nav-link" to="/logs">
              <i className="icon ion-ios-browsers-outline" />
                  <span>Logs</span>
            </Link>
          </li>
          <li
              className={classnames('nav-item', {
                active: this.props.location.pathname === '/forms'
              })}
            >
            <Link className="nav-link" to="/forms">
              <i className="icon ion-ios-gear-outline" />
              <span>Forms</span>
            </Link>
          </li>

          <li
              className={classnames('nav-item', {
                active: this.props.location.pathname === '/notifications'
              })}
            >
            <Link className="nav-link" to="/notifications">
              <i className="icon ion-ios-gear-outline" />
              <span>Notification</span>
            </Link>
          </li>

          <li
              className={classnames('nav-item with-sub', {
                active: this.props.location.pathname === '/modules'
              })} style={{borderRight: "1px solid #dee2e6"}}
            >
            <Link className="nav-link" to="#">
              <i className="icon ion-ios-filing-outline" />
              <span>Modules</span>
            </Link>
            <div className="sub-item">
              <ul>
                <li>
                  <Link to="/modules/submissions">Submissions</Link>
                </li>
                <li>
                  <Link to="/modules/referrals">Referrals</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );}
}
