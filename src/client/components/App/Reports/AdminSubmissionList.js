import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import Spinner from '../../Elements/Spinner';
import {deleteSubmission} from "../../../actions/submissionActions";
import { CSVLink, CSVDownload } from "react-csv";

let idcount = 0;

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
    const isAllowedDetail = (userRole === "admin" || userRole === "staff" || userRole === "client");

    let submissionList = this.props.submissionList;
    let loading = this.props.loading;
    let csvData = [['FCRP Eligible', 'Intake Person', 'Referred by', 'Client Name', 'Need Assessment Date - Only 1 date',  'Date of Birth', 'Native Language', 'Preferred Offical Language',  'Gender',  'Immigration Status', 'Country of Origin', 'Immigration Document Number', 'Landing Date', 'Intake Agency', 'Length of Time in Canada', 'Name of Primary Profession', 'Intended Occupation', 'Highest Level of Education', 'Obtained a post-secondary outside of Canada', 'Credentials assessed', 'Address', 'City', 'Postal Code', 'Phone', 'Email', 'Short term goals', 'Long term goals', '24 Occupations', 'Consent Signed', 'Registered for an identified occupation specific bridge training program', 'Participated in JSS-Name', 'Referred to 2 or more services WS', 'Date', 'Referred to LASSA (Multiple choices)', 'Date', 'Referred to OCISO', 'Date', 'Referred to OCLF (Multiple choices)', 'Date', 'Referred to Other', 'Date', 'Referrals', 'Participated in Job Search Skills Training - DATE', 'Sector Specialist', 'Sector Specialist Intervention Date', 'Employment counselling intervention (BARB)', 'Employment counselling intervention date', 'Accreditation Plan',  'Completed Licencing', 'Completed CA',  'Mentorship',  'Loan Consultation', 'Loan Application',  'Approved for Loan-OCLF',  'Loan Disbursed-Desjardins', 'Loan Amount', 'Financial Empowerment Training', 'Employed' , 'IF/RF/AC',  'Title' ,'Company', 'Salary Range',  'Employment starting date',  'Notes',   'Provided with FCRP Information',  'Opportunity to Register for a Sector Specific Bridge training' ]]

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
      let csvD = ["", "", "", "", "", submission.content.birthDate, submission.content.nativeLanguage, "", submission.content.gender, "", submission.content.countryOfOrigin, "", submission.content.landingDate, "", submission.content.yearOfCitizenship, "", submission.content.intendedOccupation, submission.content.highestDegree, "", "", submission.content.streetAddress, submission.content.city, submission.content.postalCode, submission.content.primaryPhoneNumber, submission.content.emailAddress, submission.content.shortTermGoals, submission.content.longTermGoals, "", submission.content.signature, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
      csvData = [...csvData, csvD];
    }
    console.log("--------------", submissionList);

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
                      if (content.fromForm == "fcrp-loan") {
                        return (
                          <React.Fragment key={submission._id}>
                            <tr>
                              <td>{idcount + 1}</td>
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
                                {
                                  isAllowedToEdit && 
                                    <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToEdit} onClick={this.edit} form_name={content.fromForm} submission_id={submission._id} >Edit</button>
                                }
                              </td>
                              <td className="tx-right">
                                {
                                  isAllowedToDelete && 
                                    <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToDelete} onClick={this.delete} form_name={content.fromForm} submission_id={submission._id} >Delete</button>
                                }
                              </td>
                              <td className="tx-right">
                                <button type="button" className="btn btn-primary btn-sm" disabled={!isAllowedDetail} onClick={this.detail} form_name={content.fromForm} submission_id={submission._id} >Detail</button>
                              </td>
                              <td className="tx-right">
                                {
                                  isAllowedToShare &&
                                    <button type="button" className="btn btn-primary btn-sm" disabled={!isAllowedToShare} onClick={this.share} form_name={content.fromForm} submission_id={submission._id} >Share</button>
                                }
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                        idcount = idcount + 1;
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        );
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="report">
        <CSVLink data={csvData}>Download</CSVLink>
        {table}
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

export default withRouter(connect(mapStateToProps, {deleteSubmission})(AdminSubmissionList));