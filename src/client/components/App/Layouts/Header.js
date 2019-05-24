import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../actions/authActions';
import { connect } from 'react-redux';

class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { permissions, auth } = this.props;
    const role = permissions.length > 0 ? permissions[0].role : '';
    const firstName = auth.profile.firstName;

    return (
      <div className="slim-header">
        <div className="container">
          <div className="slim-header-left">
            <h2 className="slim-logo">
              <Link to="/">
                iAuto<span>.</span>
              </Link>
            </h2>

            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <button className="btn btn-primary">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
          <div className="slim-header-right">
            <div className="dropdown dropdown-b">
              <Link
                to=""
                className="header-notification"
                data-toggle="dropdown"
              >
                <i className="icon ion-ios-bell-outline" />
                <span className="indicator" />
              </Link>
              <div className="dropdown-menu">
                <div className="dropdown-menu-header">
                  <h6 className="dropdown-menu-title">Notifications</h6>
                  <div>
                    <Link to="/">Mark All as Read</Link>
                    <Link to="/">Settings</Link>
                  </div>
                </div>
                <div className="dropdown-list">
                  <Link to="/" className="dropdown-link">
                    <div className="media">
                      <img src="http://via.placeholder.com/500x500" alt="" />
                      <div className="media-body">
                        <p>
                          <strong>Suzzeth Bungaos</strong> tagged you and 18
                          others in a post.
                        </p>
                        <span>October 03, 2017 8:45am</span>
                      </div>
                    </div>
                  </Link>

                  <Link to="/" className="dropdown-link">
                    <div className="media">
                      <img src="http://via.placeholder.com/500x500" alt="" />
                      <div className="media-body">
                        <p>
                          <strong>Mellisa Brown</strong> appreciated your work{' '}
                          <strong>The Social Network</strong>
                        </p>
                        <span>October 02, 2017 12:44am</span>
                      </div>
                    </div>
                  </Link>
                  <Link to="/" className="dropdown-link read">
                    <div className="media">
                      <img src="http://via.placeholder.com/500x500" alt="" />
                      <div className="media-body">
                        <p>
                          20+ new items added are for sale in your{' '}
                          <strong>Sale Group</strong>
                        </p>
                        <span>October 01, 2017 10:20pm</span>
                      </div>
                    </div>
                  </Link>
                  <Link to="/" className="dropdown-link read">
                    <div className="media">
                      <img src="http://via.placeholder.com/500x500" alt="" />
                      <div className="media-body">
                        <p>
                          <strong>Julius Erving</strong> wants to connect with
                          you on your conversation with{' '}
                          <strong>Ronnie Mara</strong>
                        </p>
                        <span>October 01, 2017 6:08pm</span>
                      </div>
                    </div>
                  </Link>
                  <div className="dropdown-list-footer">
                    <a href="page-notifications.html">
                      <i className="fa fa-angle-down" /> Show All Notifications
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-c">
              <Link to="/" className="logged-user" data-toggle="dropdown">
                <img src="http://via.placeholder.com/500x500" alt="" />
                <span>{firstName}</span>
                <i className="fa fa-angle-down" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <nav className="nav">
                  {/* <a href="page-profile.html" className="nav-link">
                    <i className="icon ion-person" /> View Profile
                  </a>
                  <a href="page-edit-profile.html" className="nav-link">
                    <i className="icon ion-compose" /> Edit Profile
                  </a>
                  <a href="page-activity.html" className="nav-link">
                    <i className="icon ion-ios-bolt" /> Activity Log
                  </a> */}
                  {role === 'admin' && (
                    <Link to="/settings/admin-settings" className="nav-link">
                      <i className="icon ion-ios-gear" /> Admin Settings
                    </Link>
                  )}
                  {role !== 'admin' && (
                      <Link to="/settings/settings" className="nav-link">
                        <i className="icon ion-ios-gear" /> Settings
                      </Link>
                  )}

                  <Link to="" className="nav-link" onClick={this.onLogoutClick}>
                    <i className="icon ion-forward" /> Sign Out
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Header);
