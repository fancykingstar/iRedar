import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../actions/authActions';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { API_URL } from '../../../actions/types';
import ReactNotification from "react-notifications-component";
import { getSocketNotification, editSocketNotification, deleteAllSocket } from '../../../actions/socketNotificationActions';

class Header extends Component {
  constructor(props) {
    super(props)
    this.socket = io(API_URL);
    this.addNotification = this.addNotification.bind(this);
      this.notificationDOMRef = React.createRef();
      this.state = {
        type: "",
        sentBy: "",
        content: "",
        title: "",
        id: "",
        once: false,
        delete: true
    }
  }

  // componentWillUpdate() {
  //   const profileId = this.props.profile._id;
  //   const { getSocketNotification } = this.props;
  //     getSocketNotification(profileId);
  // }

  componentDidMount() {
    const profileId = this.props.profile._id;
    console.log("profileId", profileId);
    const { getSocketNotification } = this.props;
    getSocketNotification(profileId);
    let self = this;
    this.socket.on('has-new-conversation/', function(data) {
      console.log(profileId);
      console.log(data.to);
      self.setState({
        type: data.type,
        sentBy: data.sentBy,
        content: data.content,
        title: data.title,
        id: data.id
      });
      if (profileId == data.to) {
        window.$("#socketNotification").trigger("click");
        getSocketNotification(profileId);
      }
    })
  } 

  addNotification() {
    const title = this.state.type + " from " + this.state.sentBy;
    const content = this.state.title === "" ? this.state.content : (this.state.title + ": " + this.state.content);
    this.notificationDOMRef.current.addNotification({
    title: title,
    message: content,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 2000 },
    dismissable: { click: true }
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  setRead = (_id, id) => {
    this.props.editSocketNotification(_id, id);
  }

  deleteSocket = () => {
    this.props.deleteAllSocket();
    this.setState({delete: true});
  }

  render() {
    const { permissions, auth } = this.props;
    const role = permissions.length > 0 ? permissions[0].role : '';
    const firstName = auth.profile.firstName;
    const { title, content, sentBy, type, id } = this.state;
    const { socketNotifications } = this.props;
    console.log(socketNotifications);
    let notifictions = socketNotifications.map((notification, index) => {
      let url = "/notifications/view/" + notification.id;
      if (notification.type == "Notification") {
        url = "/notifications/view/" + notification.id;
      }
      else if (notification.type == "Submission") {
        url = "/modules/referrals/"; 
      }
      return (
          <React.Fragment key={index}>
            <a href={url} className="dropdown-link" onClick={() => this.setRead(notification._id, notification.id)}>
              <div className="media">
                <img src="http://via.placeholder.com/500x500" alt="" />
                <div className="media-body">
                  <p>
                    <strong>{notification.type} from {notification.sentBy}</strong> 
                  </p>
                  <h6>{notification.title}</h6>
                  <span>{notification.content}</span>
                </div>
              </div>
            </a>
          </React.Fragment>
        )
    })

    return (
      <div className="slim-header">
        <div className="app-content">
          <ReactNotification ref={this.notificationDOMRef} />
          <button style={{ display: "none" }} onClick={this.addNotification} className="btn btn-primary" id="socketNotification">notification</button>
        </div>
        <div className="container">
          <div className="slim-header-left">
            <h2 className="slim-logo">
              <Link to="/">
                Link2Settle<span>.</span>
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
                {this.props.socketNotifications.length == 0 ? "" : <span className="indicator" /> }
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
                  {notifictions}
                  <div className="dropdown-list-footer">
                    <a href="/notifications" onClick={this.deleteSocket}>
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

const mapStateToProps = state => ({
  profile: state.auth.profile,
  socketNotifications : state.socketNotifications.allsocketNotifications
});

export default connect(
  mapStateToProps,
  { logoutUser, getSocketNotification, editSocketNotification, deleteAllSocket }
)(Header);
