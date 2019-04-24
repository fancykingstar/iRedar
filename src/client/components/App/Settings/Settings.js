import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable from '../Components/DataTables/DataTable';

export class Settings extends Component {

    render() {
        const { profile, permissions } = this.props;
        let data = [];

        data.push({
            permissionId: permissions[0]._id,
            role: permissions[0].role,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phoneNumber: profile.phoneNumber
        });

        return (
            <div className="slim-mainpanel">
                <div className="container">
                    <div className="manager-header">
                        <div className="slim-pageheader">
                            <ol className="breadcrumb slim-breadcrumb" />
                            <h6 className="slim-pagetitle">Settings</h6>
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
    access: state.access,
    errors: state.errors,
    profile: state.auth.profile
});

export default connect(
    mapStateToProps,
    { }
)(Settings);
