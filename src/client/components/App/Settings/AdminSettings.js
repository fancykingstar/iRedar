import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DataTable from '../Components/DataTables/DataTable';
import { getAdminPermissions } from './../../../actions/accessActions';

export class AdminSettings extends Component {
  componentDidMount() {
    const { getAdminPermissions, permissions } = this.props;
    getAdminPermissions(permissions[0].organization, permissions[0].profile);
  }

  render() {
    const { adminPermissions, permissions } = this.props;
    let data = [];
    adminPermissions.map(permission => {
      data.push({
        permissionId: permission._id,
        role: permission.role,
        firstName: permission.profile.firstName,
        lastName: permission.profile.lastName,
        email: permission.profile.email,
        phoneNumber: permission.profile.phoneNumber
      });
      return true;
    });

    return (
      <div className="slim-mainpanel">
        <div className="container">
          <div className="manager-header">
            <div className="slim-pageheader">
              <ol className="breadcrumb slim-breadcrumb" />
              <h6 className="slim-pagetitle">Admin Settings</h6>
            </div>
          </div>
          <div className="manager-wrapper">
            <div className="manager-right">
              <div className="section-wrapper">
                <div className="table-wrapper">
                  <DataTable data={data} permissions={permissions} />
                </div>
              </div>
            </div>

            <div className="manager-left">
              <Link
                to="/settings/admin-settings"
                className="btn btn-contact-new"
              >
                Add New
              </Link>
              <nav className="nav">
                <div style={{ cursor: 'pointer' }} className="nav-link active">
                  <span>All Contacts</span>
                  <span>120</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>Admin</span>
                  <span>16</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>Staff</span>
                  <span>68</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>Partner</span>
                  <span>38</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>Client</span>
                  <span>9</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   permissions: state.access
// });

const mapStateToProps = state => ({
  permissions: state.access.permissions,
  adminPermissions: state.access.admin,
  loading: state.access.loading,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(
  mapStateToProps,
  { getAdminPermissions }
)(AdminSettings);
