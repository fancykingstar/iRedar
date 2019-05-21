import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminPermissions } from '../../../../actions/accessActions';
import {SubmissionDataTable} from "../../Components/DataTables/SubmissionDataTable";
import {getSubmissionView} from "../../../../actions/submissionActions";


export class ViewIARSubmission extends Component {
    getSubmissionData() {
        const {submissions} = this.props;
        let data = [];
        let i = 0;
        submissions.allSubmissions.forEach(submission => {
            data.push({
                submissionId: submission._id,
                id: i+1,
                lastName: submission.content.lastName,
                firstName: submission.content.firstName,
                employer: submission.content.employer,
                jobTitle: submission.content.jobTitle,
                serviceRequested: submission.content.serviceRequested,
                employmentStatus: submission.content.employmentStatus,
                employmentField: submission.content.employmentField
            });
            i = i+1;
        });
    }

    componentDidMount() {
        const {getSubmissionView} = this.props;
        const {permissions} = this.props;
        if (!(permissions[0].role === 'admin' || permissions[0].role === 'staff')) {
            this.props.history.push('/dashboard');
            return;
        }
        getSubmissionView("registration");
    }

    render() {
        const data = this.getSubmissionData();
        const columns = [
            {
                dataField: 'submissionId',
                text: 'submissionId',
                hidden: true
            },
            {
                dataField: 'id',
                text: 'Id',
                editable: false
            },
            {
                dataField: 'lastName',
                text: 'Lastname',
                sort: true,
                editable: false
            },
            {
                dataField: 'firstName',
                text: 'Firstname',
                sort: true,
                editable: false
            },
            {
                dataField: 'employer',
                text: 'Employer #',
                sort: true,
                editable: false
            },

            {
                dataField: 'jobTitle',
                text: 'Job Title #',
                sort: true,
                editable: false
            },
            {
                dataField: 'serviceRequested',
                text: 'Service Requested #',
                sort: true,
                editable: false
            },
            {
                dataField: 'employmentStatus',
                text: 'Employment Status #',
                sort: true,
                editable: false
            },
            {
                dataField: 'employmentField',
                text: 'Employment Field #',
                sort: true,
                editable: false
            }
        ];

        return (
            <div className="slim-mainpanel">
                <div className="container">
                    <div className="manager-header">
                        <div className="slim-pageheader">
                            <ol className="breadcrumb slim-breadcrumb" />
                            <h6 className="slim-pagetitle">View All Registration Forms</h6>
                        </div>
                    </div>
                    <div className="manager-wrapper">
                        <div className="section-wrapper">
                            <div className="table-wrapper">
                                <SubmissionDataTable columns={columns} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    permissions: state.access.permissions,
    adminPermissions: state.access.admin,
    submissions: state.submissions,
    loading: state.access.loading,
    errors: state.errors,
    profile: state.auth.profile
});

export default connect(
    mapStateToProps,
    { getAdminPermissions, getSubmissionView }
)(ViewIARSubmission);