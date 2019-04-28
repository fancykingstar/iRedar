import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AdminSubmission from './AdminSubmission';
import PartnerSubmissions from './PartnerSubmission';

class SubmissionsPage extends Component {

  render() {
    let permissions = this.props.permissions
    const role = permissions.length > 0 ? permissions[0].role : '';

    return (
      <div className="slim-mainpanel">
        <div className="container">
          <div className="slim-pageheader">
            <ol className="breadcrumb slim-breadcrumb" />
            <h6 className="slim-pagetitle">Submissions</h6>
          </div>
          {role === 'admin' && <AdminSubmission />}
          {role === 'staff' && <AdminSubmission />}
          {role === 'partner' && <PartnerSubmissions />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  permissions: state.access.permissions,
  adminPermissions: state.access.admin,
  loading: state.access.loading,
  access: state.access,
  errors: state.errors,
  profile: state.auth.profile
});

export default withRouter(connect(mapStateToProps)(SubmissionsPage));