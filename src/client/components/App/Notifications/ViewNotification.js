import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {getNotification} from '../../../actions/notificationAction';

class ViewNotification extends Component {
  state = {
    notification: {},
    loading: true
  };
  
  componentDidMount() {
    const {getNotification, match: {params: {notificationId}}} = this.props;
    getNotification(notificationId);
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    const {notification, loading} = nextProps;
    this.setState({
      notification,
      loading
    });
  }
  
  showSubtitle = () => {
    let {auth} = this.props;
    if (this.state.notification.sentBy._id !== auth.profile._id) {
      return `${this.state.notification.sentBy.lastName}, ${this.state.notification.sentBy.firstName}`;
    } else {
      return this.state.notification.recipients.map(({firstName, lastName}) => {
        return <span className={'mg-r-5 tx-dark'}>{lastName}, {firstName} | </span>;
      });
    }
    
  };
  
  render() {
    const { notification, loading } = this.state;

    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <ol className='breadcrumb slim-breadcrumb'/>
              <h6 className='slim-pagetitle'>
                <Link to={'/notifications'}>
                  <span>Notifications</span>
                </Link>
                &nbsp;/&nbsp;
                View Notifications
              </h6>
            </div>
          </div>
          {loading ?
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1 bg-gray-800"/>
              <div className="sk-child sk-bounce2 bg-gray-800"/>
              <div className="sk-child sk-bounce3 bg-gray-800"/>
            </div> :
            <div className='section-wrapper'>
              <h3 className="card-title">{notification.title}</h3>
              <p className="card-subtitle">{this.showSubtitle()}</p>
              <div className={'row mg-t-20'}>
                <div className={'col-8 tx-dark'}>
                  {notification.message}
                </div>
                <div className={'col-4'}>
                  <p className={'tx-dark tx-bold'}>Attachments:</p>
                  <ul>
                    {
                      notification.files.map(file => {
                        return (
                          <li><a href={file.content} download={file.fileName}>{file.fileName}</a></li>
                        );
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          }
        
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notifications.notification,
  loading: state.notifications.loading,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {getNotification})(ViewNotification);
