import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { logoutUser } from '../../../actions/authActions';
import classnames from 'classnames';

class AdminNavbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

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
                active: this.props.location.pathname === '/tasks'
              })}
            >
              <Link className="nav-link" to="/tasks">
                <i className="icon ion-ios-browsers-outline" />
                <span>Tasks</span>
                <span className="square-8" />
              </Link>
            </li>

            <li
              className={classnames('nav-item', {
                active: this.props.location.pathname === '/contacts'
              })}
            >
              <Link className="nav-link" to="/contacts">
                <i className="icon ion-ios-book-outline" />
                <span>Contacts</span>
              </Link>
            </li>
            <li
              className={classnames('nav-item with-sub', {
                active: this.props.location.pathname === '/forms'
              })}
            >
              <Link className="nav-link" to="/forms">
                <i className="icon ion-ios-gear-outline" />
                <span>Forms</span>
              </Link>
              <div className="sub-item">
                <ul>
                  <li>
                    <Link to="/forms">All Forms</Link>
                  </li>
                  <li>
                    <Link to="/forms/build-forms">Build Forms</Link>
                  </li>
                  <li>
                    <Link to="/forms/upload-forms">Upload Forms</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li
              className={classnames('nav-item with-sub', {
                active: this.props.location.pathname === '/modules'
              })}
            >
              <Link className="nav-link" to="/modules">
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

            <li
              className={classnames('nav-item with-sub', {
                active: this.props.location.pathname === '/reports'
              })}
            >
              <Link className="nav-link" to="/reports">
                <i className="icon ion-ios-analytics-outline" />
                <span>Report</span>
              </Link>
              <div className="sub-item">
                <ul>
                  <li>
                    <Link to="/reports">All reports</Link>
                  </li>
                  <li>
                    <Link to="/reports/build">Build reports</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

AdminNavbar.propTypes = {
  logoutUser: propTypes.func.isRequired
};

// const mapPropsToState = state => ({
//   user: state.auth.user
// });

export default connect(
  null,
  { logoutUser }
)(AdminNavbar);

// export default withRouter(
//   connect(
//     null,
//     { logoutUser }
//   )(AdminNavbar)
// );
