import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import NotificationTable from '../Components/NotificationDataTable';

class Notifications extends Component {
  getData = async () => {
  
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
            data={[]}
            onSelected={this.getData}
          />
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, {})(Notifications);
