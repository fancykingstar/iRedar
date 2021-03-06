import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteNotifications, getNotifications} from '../../../actions/notificationAction';
import NotificationTable from '../Components/NotificationDataTable';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

class Notifications extends Component {
  state = {
    notifications: []
  };
  
  componentWillMount() {
    const {getNotifications, profile} = this.props;
    console.log(profile);
    getNotifications(profile._id);
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    const {notifications} = nextProps;
    let data = notifications.map(({_id, title, sentBy, created_at}) => {
      return {
        _id,
        title,
        sentBy,
        created_at
      };
    });
    this.setState({notifications: data});
  }
  
  getData = (data) => {
    this.deleteItems = data;
  };
  
  removeNotifications = (ids) => {
    const {deleteNotifications, getNotifications} = this.props;
    const {profile} = this.props;
    deleteNotifications(ids, profile._id);
  };
  
  render() {
    const { permissions } = this.props;
    let isClient = false;
    const userType = permissions[0].role;
    if (permissions.length === 1 && userType === 'client') isClient = true;
    return <div className='slim-mainpanel'>
      <div className='container'>
        <div className='manager-header'>
          <div className='slim-pageheader' style={{paddingBottom: 0}}>
            <Breadcrumb>
              <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Notifications</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='slim-pageheader' style={{ paddingTop: 0}} >
            {
              !isClient &&
              <ol className='breadcrumb slim-breadcrumb'>
                <Link
                  to={{
                    pathname: '/notifications/add-new-notification'
                  }}
                  className='btn btn-success btn-sm  mg-r-5'
                >
                  <i className='fa fa-plus'/> Add
                </Link>
              </ol>
            }
            <h6 className='slim-pagetitle'>Notifications - Received/Sent</h6>
          </div>
        </div>
        <div className='section-wrapper'>
          <NotificationTable
            data={this.state.notifications}
            isClient={isClient}
            onSelected={this.getData}
            deleteNotifications={(ids) => {this.removeNotifications(ids);}}
          />
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
  permissions: state.access.permissions,
  notifications: state.notifications.allNotifications,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, {
  getNotifications,
  deleteNotifications
})(Notifications);
