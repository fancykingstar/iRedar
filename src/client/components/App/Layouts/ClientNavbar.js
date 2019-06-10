import React, {Component} from 'react';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

class ClientNavbar extends Component {
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
                active: this.props.location.pathname === '/notifications'
              })}
            >
              <Link className="nav-link" to="/notifications">
                <i className="icon ion-ios-email-outline"/>
                <span>Notifications</span>
              </Link>
            </li>
  
            <li
              className={classnames('nav-item', {
                active: this.props.location.pathname === '/modules/submissions'
              })}
            >
              <Link className="nav-link" to="/modules/submissions">
                <i className="icon ion-ios-filing-outline" />
                <span>Submissions</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(ClientNavbar);
