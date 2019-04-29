import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminPermissions } from '../../../../actions/accessActions';
import {SubmissionDataTable} from "../../Components/DataTables/SubmissionDataTable";
import {getSubmissionView} from "../../../../actions/submissionActions";


export class ViewClientSubmission extends Component {

    componentDidMount() {
        const { getSubmissionView } = this.props;
        getSubmissionView("registration");
    }
    render() {
        const { submissions, permissions } = this.props;
        if (permissions[0].role !== 'admin') {
            this.props.history.push('/dashboard');
            return
        }
        let data = [];
        let i = 0;
        submissions.allSubmissions.forEach(submission => {
            data.push({
                submissionId: submission._id,
                id: i+1,
                lastName: submission.content.lastName,
                firstName: submission.content.firstName,
                phoneNumber: submission.content.phoneNumber,
                email: submission.content.email
            });
            i = i+1;
        });
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
                text: 'Last name',
                sort: true,
                editable: true
            },
            {
                dataField: 'firstName',
                text: 'Firstname',
                sort: true,
                editable: true
            },
            {
                dataField: 'phoneNumber',
                text: 'Phone #',
                sort: true,
                editable: true
            },
            {
                dataField: 'email',
                text: 'Email',
                sort: true,
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '25%' };
                }
            }
        ];

        return (
        <div className="slim-mainpanel">
            <div className="container">
                <div className="manager-header">
                    <div className="slim-pageheader">
                        <ol className="breadcrumb slim-breadcrumb" />
                        <h6 className="slim-pagetitle">View all Client Forms </h6>
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
)(ViewClientSubmission);