import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteNotifications, getNotifications} from '../../../actions/notificationAction';
import NotificationTable from '../Components/NotificationDataTable';

class Notifications extends Component {
  state = {
    notifications: []
  };
  
  componentWillMount() {
    const {getNotifications} = this.props;
    getNotifications();
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
    deleteNotifications(ids);
    getNotifications();
  };
  
  render() {
    return <div className='slim-mainpanel'>
      <div className='container'>
        <div className='manager-header'>
          <div className='slim-pageheader'>
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
            <h6 className='slim-pagetitle'>Notifications - Received/Sent</h6>
          </div>
        </div>
        <div className='section-wrapper'>
          <NotificationTable
            data={this.state.notifications}
            onSelected={this.getData}
            deleteNotifications={() => {this.removeNotifications(this.deleteItems);}}
          />
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications.allNotifications,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, {
  getNotifications,
  deleteNotifications
})(Notifications);
