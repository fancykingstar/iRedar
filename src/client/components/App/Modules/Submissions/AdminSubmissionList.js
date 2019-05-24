import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import Spinner from '../../../Elements/Spinner';
import {deleteSubmission} from "../../../../actions/submissionActions";

class AdminSubmissionList extends Component {

  componentDidUpdate() {
    window.$('#datatable1').DataTable({
      responsive: true,
      language: {
        searchPlaceholder: 'Search...',
        sSearch: '',
        lengthMenu: '_MENU_ items/page',
      }
    });
  }

  edit = event => {
    let formName = event.target.getAttribute('form_name');
    let submissionId = event.target.getAttribute('submission_id');
    this.props.history.push({
      pathname: '/forms/' + formName + '/' + submissionId,
      state: { edit: 'true' }
    });
  };

  detail = event => {
    let formName = event.target.getAttribute('form_name');
    let submissionId = event.target.getAttribute('submission_id');
    this.props.history.push({
      pathname: '/forms/' + formName + '/' + submissionId,
      state: { edit: 'false' }
    });
  };

  delete = event => {
      if (window.confirm('Do you want to delete the submission ?')) {
          let submissionId = event.target.getAttribute('submission_id');
          const {deleteSubmission, permissions} = this.props;
          const userData = {
              profileId: permissions[0].profile,
              organizationId: permissions[0].organization
          };
          deleteSubmission(userData, submissionId);
          this.props.history.push({
              pathname: '/dashboard'
          });
      }
  };

  share = event => {
    let submissionId = event.target.getAttribute('submission_id');
    this.props.history.push({
      pathname: '/referrals/' + submissionId
    });
  };

  render() {
    const { permissions } = this.props;
    const userRole = permissions[0].role;
    const isAllowedToEdit = (userRole === "admin" || userRole === "staff");
    const isAllowedToDelete = (userRole === "admin");
    const isAllowedToShare = (userRole === "admin" || userRole === "staff");
    const isAllowedDetail = (userRole === "admin" || userRole === "staff");

    let submissionList = this.props.submissionList;
    let loading = this.props.loading;

    for (let submission of submissionList) {
      let birthDate = submission.content.birthDate;
      if (birthDate == null) {
        submission.content.age = ''
      } else {
        let birthDate2 = new Date(birthDate);
        if (birthDate2 === "Invalid Date") {
          submission.content.age = ''
        } else {
          submission.content.age = Math.abs(birthDate2.getUTCFullYear() - new Date().getUTCFullYear());
        }
      }
    }

    let table =
      loading === true ? (
        <Spinner />
      ) : (
          <div className="table-responsive mg-t-0">

            <div className="section-wrapper">

              <table className="table table-invoice" id="datatable1">
                <thead>
                  <tr>
                    <th className="wd-5p">Id</th>
                    <th className="wd-10p">Last Name</th>
                    <th className="wd-10p">First Name</th>
                    <th className="wd-5p">Age</th>
                    <th className="wd-10p">City</th>
                    <th className="wd-10p">Country</th>
                    <th className="tx-center">Form Name</th>
                    <th className="wd-20p">Date Submitted</th>
                    <th className="tx-right"> </th>
                    <th className="tx-right"> </th>
                    <th className="tx-right"> </th>
                    <th className="tx-right"> </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    submissionList.map((submission, index) => {
                      const content = submission.content;
                      return (
                        <React.Fragment key={submission._id}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{content.lastName}</td>
                            <td className="tx-12">{content.firstName} </td>
                            <td className="tx-12">{content.age} </td>
                            <td className="tx-12">{content.city} </td>
                            <td className="tx-12">{content.nationality} </td>

                            <td className="tx-center">{content.fromForm} </td>
                            <td className="tx-right">
                              {moment(submission.dateSubmitted).format(
                                'MMM Do YYYY, h:mm a'
                              )}
                            </td>
                            <td className="tx-right">
                              <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToEdit} onClick={this.edit} form_name={content.fromForm} submission_id={submission._id} >Edit</button>
                            </td>
                            <td className="tx-right">
                              <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToDelete} onClick={this.delete} form_name={content.fromForm} submission_id={submission._id} >Delete</button>
                            </td>
                            <td className="tx-right">
                              <button type="button" className="btn btn-primary btn-sm" disabled={!isAllowedDetail} onClick={this.detail} form_name={content.fromForm} submission_id={submission._id} >Detail</button>
                            </td>
                            <td className="tx-right">
                              <button type="button" className="btn btn-primary btn-sm" disabled={!isAllowedToShare} onClick={this.share} form_name={content.fromForm} submission_id={submission._id} >Share</button>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        );
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{table}</div>
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

export default withRouter(connect(mapStateToProps, {deleteSubmission})(AdminSubmissionList));