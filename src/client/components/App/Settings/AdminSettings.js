import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminDataTable from '../Components/DataTables/AdminDataTable';
import { getAdminPermissions } from './../../../actions/accessActions';
import { deleteUsers } from "../../../actions/authActions";
import queryString from 'query-string';
export class AdminSettings extends Component {

  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.selectedUsers = new Set();
  }

  componentDidMount() {
    const { getAdminPermissions, permissions } = this.props;
    getAdminPermissions(permissions[0].organization, permissions[0].profile);
  }

  getData(data){
    // do not forget to bind getData in constructor
    this.selectedUsers = data;
  }

  render() {
    const parsedHash = queryString.parse(window.location.hash);
    const { adminPermissions, permissions } = this.props;
    let data = [];
    let adminCount = 0;
    let staffCount = 0;
    let partnerCount = 0;
    let clientCount = 0;
    let filterRole = "all";

    // if filterRole is found set it
    if(parsedHash.role) {
      filterRole = parsedHash.role;
    }

    adminPermissions.map(permission => {
      if (permission.role.toUpperCase() === "ADMIN") {
        adminCount++;
      }
      if (permission.role.toUpperCase() === "STAFF") {
        staffCount++;
      }
      if (permission.role.toUpperCase() === "PARTNER") {
        partnerCount++;
      }
      if (permission.role.toUpperCase() === "CLIENT") {
        clientCount++;
      }
      if (filterRole !== "all") {
        if (permission.role === filterRole) {
          data.push({
            permissionId: permission._id,
            role: permission.role,
            firstName: permission.profile.firstName,
            lastName: permission.profile.lastName,
            email: permission.profile.email,
            phoneNumber: permission.profile.phoneNumber
          });
        }
      } else {
        data.push({
          permissionId: permission._id,
          role: permission.role,
          firstName: permission.profile.firstName,
          lastName: permission.profile.lastName,
          email: permission.profile.email,
          phoneNumber: permission.profile.phoneNumber
        });
      }
      return true;
    });

    let countAll = adminCount + staffCount + partnerCount + clientCount;

    const handleFilter = (option) => {
      this.props.history.push('/settings/admin-settings#role=' + option);
    };

    const handleDelete = () => {
      if (window.confirm('Do you want to delete these users?')) {
        this.props.deleteUsers(
            this.selectedUsers,
            this.props.history
        );
      }
    };

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
                  <AdminDataTable data={data} permissions={permissions} onSelected={this.getData}
                  />
                </div>
              </div>
            </div>

            <div className="manager-left">
              <Link
                to={{
                  pathname: "/settings/add-new-users",
                  adminCount: adminCount,
                  staffCount: staffCount,
                  partnerCount: partnerCount,
                  clientCount: clientCount
                }}
                className="btn btn-contact-new"
              >
                Add New User
              </Link>
              <Link
                  to={{
                    pathname: "/settings/update-admin-password",
                    adminCount: adminCount,
                    staffCount: staffCount,
                    partnerCount: partnerCount,
                    clientCount: clientCount
                  }}
                  className="btn btn-contact-new"
              >
                Update Password
              </Link>
              <Link
                  to={{
                    pathname: "/settings/admin-settings",
                    adminCount: adminCount,
                    staffCount: staffCount,
                    partnerCount: partnerCount,
                    clientCount: clientCount
                  }}
                  className="btn btn-contact-new"
                  onClick={handleDelete}
              >
                Delete User
              </Link>
              <nav className="nav">
                <div style={{ cursor: 'pointer' }} className="nav-link" onClick={() => handleFilter("all")}>
                  <span>All Contacts</span>
                  <span>{countAll}</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link" onClick={() => handleFilter("admin")}>
                  <span>Admin</span>
                  <span>{adminCount}</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link" onClick={() => handleFilter("staff")}>
                  <span>Staff</span>
                  <span>{staffCount}</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link" onClick={() => handleFilter("partner")}>
                  <span>Partner</span>
                  <span>{partnerCount}</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link" onClick={() => handleFilter("client")}>
                  <span>Client</span>
                  <span>{clientCount}</span>
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
  { getAdminPermissions, deleteUsers }
)(AdminSettings);
