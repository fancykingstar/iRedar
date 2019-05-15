import React from 'react';
import { connect } from 'react-redux';
import ContactTable from '../Components/ContactDataTable';
import queryString from 'query-string';
import { getAdminPermissions } from './../../../actions/accessActions';
import { deleteUsers } from '../../../actions/authActions';
import { Link } from 'react-router-dom';

class ContactsPage extends React.Component {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.selectedUsers = new Set();
  }

  componentDidMount() {
    const { getAdminPermissions, permissions } = this.props;
    getAdminPermissions(permissions[0].organization, permissions[0].profile);
  }

  getData(data) {
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
    let filterRole = 'all';

    // if filterRole is found set it
    if (parsedHash.role) {
      filterRole = parsedHash.role;
    }

    adminPermissions.map(permission => {
      if (permission.role.toUpperCase() === 'ADMIN') {
        adminCount++;
      }
      if (permission.role.toUpperCase() === 'STAFF') {
        staffCount++;
      }
      if (permission.role.toUpperCase() === 'PARTNER') {
        partnerCount++;
      }
      if (permission.role.toUpperCase() === 'CLIENT') {
        clientCount++;
      }
      if (filterRole !== 'all') {
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

    const handleFilter = option => {
      this.props.history.push('/settings/admin-settings#role=' + option);
    };

    const handleDelete = () => {
      if (window.confirm('Do you want to delete these users?')) {
        this.props.deleteUsers(this.selectedUsers, this.props.history);
      }
    };

    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <ol className='breadcrumb slim-breadcrumb'>
                <Link
                  to={{
                    pathname: '/contacts/add-new-contact'
                  }}
                  className='btn btn-success btn-sm  mg-r-5'
                >
                  <i className='fa fa-plus' /> Add
                </Link>
                <div class='dropdown'>
                  <button
                    class='btn btn-primary btn-sm dropdown-toggle '
                    type='button'
                    id='dropdownMenuButton2'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Import
                  </button>
                  <div
                    class='dropdown-menu'
                    aria-labelledby='dropdownMenuButton2'
                    x-placement='bottom-start'
                    style={{
                      position: 'absolute',
                      transform: 'translate3d(0px, 42px, 0px)',
                      top: '0px',
                      left: '0px',
                      'will-change': 'transform'
                    }}
                  >
                    <a class='dropdown-item' href='#'>
                      <i className='fa fa-file' /> Microsoft Excel or CSV file
                    </a>
                    <a class='dropdown-item' href='#'>
                      <i className='fa fa-google' /> Google contacts
                    </a>
                  </div>
                </div>
              </ol>
              <h6 className='slim-pagetitle'>Contacts</h6>
            </div>
          </div>
          <div className='section-wrapper'>
            <ContactTable data={[]} permissions={permissions} onSelected={this.getData} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  adminPermissions: state.access.admin,
  permissions: state.access.permissions,
  loading: state.access.loading,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, { getAdminPermissions, deleteUsers })(ContactsPage);
