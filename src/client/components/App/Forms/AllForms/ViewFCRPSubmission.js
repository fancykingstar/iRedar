import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminPermissions } from '../../../../actions/accessActions';
import {SubmissionDataTable} from "../../Components/DataTables/SubmissionDataTable";
import {getSubmissionView} from "../../../../actions/submissionActions";


export class ViewFCRPSubmission extends Component {

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
                primaryPhoneNumber: submission.content.primaryPhoneNumber,
                email: submission.content.email,
                streetAddress: submission.content.streetAddress,
                city: submission.content.city,
                highestDegree: submission.content.highestDegree
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
                text: 'Last Name #',
                sort: true,
                editable: false
            },
            {
                dataField: 'firstName',
                text: 'First Name #',
                sort: true,
                editable: false
            },
            {
                dataField: 'primaryPhoneNumber',
                text: 'Phone #',
                sort: true,
                editable: false
            },
            {
                dataField: 'email',
                text: 'Email #',
                sort: true,
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '25%' };
                }
            },

            {
                dataField: 'streetAddress',
                text: 'Street Address #',
                sort: true,
                editable: false
            },
            {
                dataField: 'city',
                text: 'City #',
                sort: true,
                editable: false
            },
            {
                dataField: 'highestDegree',
                text: 'Highest Degree #',
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
                            <h6 className="slim-pagetitle">View All FCRP Loan Forms</h6>
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
)(ViewFCRPSubmission);