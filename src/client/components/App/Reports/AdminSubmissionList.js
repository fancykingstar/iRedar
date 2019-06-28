import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import Spinner from '../../Elements/Spinner';
import {deleteSubmission, searchByDate} from "../../../actions/submissionActions";
import { getAllSubmissions } from '../../../actions/submissionActions';
import { CSVLink, CSVDownload } from "react-csv";
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class AdminSubmissionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submission: false,
      submissions: [],
      sub_list: false,
      fromDate: new Date(),
      toDate: new Date()
    };

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  componentWillMount() {
    window.$('#datatable1').DataTable({
      responsive: true,
      language: {
        searchPlaceholder: 'Search...',
        sSearch: '',
        lengthMenu: '_MENU_ items/page',
      }
    });
  }

  handleFromChange(date) {
      this.setState({
          fromDate: date
      });
  }

  handleToChange(date) {
      this.setState({
          toDate: date
      });
  }

  componentDidMount() {
    const { getAllSubmissions, permissions } = this.props;
    const userData = {
      profileId: permissions[0].profile,
      organizationId: permissions[0].organization
    };
    if (this.state.submission == false ) {
      getAllSubmissions(userData);
      this.setState({submission: true});
    }

    window.$('input[type="date"]').change(function() {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY/MM/DD")
            .format('YYYY/MM/DD')
        )
    })

    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

    window.$('input[type="date"]').val(new Date().toDateInputValue());
    window.$('input[type="date"]').trigger('change');
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
      }
  };

  share = event => {
    let submissionId = event.target.getAttribute('submission_id');
    this.props.history.push({
      pathname: '/referrals/' + submissionId
    });
  };

  handleSearch = event => {
    const { permissions } = this.props;
    const userRole = permissions[0].role;
    const isAllowedToEdit = (userRole === "admin" || userRole === "staff");
    const isAllowedToDelete = (userRole === "admin");
    const isAllowedToShare = (userRole === "admin" || userRole === "staff");
    const isAllowedDetail = (userRole === "admin" || userRole === "staff" || userRole === "client");
    console.log("--------------------", this.state.fromDate);
    let submissionList = this.props.submissions.allSubmissions;
    let from = new Date(this.state.fromDate);
    let fromdate = from.getFullYear() + '-' + (from.getMonth() + 1) + '-' + (from.getDate() + 1);
    let to = new Date(this.state.toDate);
    let todate = to.getFullYear() + '-' + (to.getMonth() + 1) + '-' + (to.getDate() + 1);
    let Submitted_List = [];
    let submission_list = submissionList.map((submission, index) => {
      let date = moment(submission.dateSubmitted).format('YYYY/MM/DD');
      const content = submission.content;
      if ((content.fromForm == "fcrp-loan") && (new Date(date) >= new Date(fromdate)) && (new Date(date) <= new Date(todate))) {
        Submitted_List.push(submission);
      }
    });
    // this.props.searchByDate(Submitted_List);
    this.setState({
      submissions: Submitted_List,
      sub_list: true
    })
  }

  render() {
    let idcount = 0;
    const { permissions } = this.props;
    const userRole = permissions[0].role;
    const isAllowedToEdit = (userRole === "admin" || userRole === "staff");
    const isAllowedToDelete = (userRole === "admin");
    const isAllowedToShare = (userRole === "admin" || userRole === "staff");
    const isAllowedDetail = (userRole === "admin" || userRole === "staff" || userRole === "client");
    let submissionList = this.props.submissions.allSubmissions;

    if (this.state.sub_list == true) {
      submissionList = this.state.submissions;
    }
    console.log(submissionList);
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
      let csvD = ["", "", "", "", submission.content.firstName + " " + submission.content.lastName, submission.content.birthDate, submission.content.nativeLanguage, "", submission.content.gender, submission.content.foreignBornCanadian, submission.content.countryOfOrigin, "", submission.content.landingDate, "", submission.content.yearOfCitizenship, "", submission.content.intendedOccupation, submission.content.highestDegree, "", "", submission.content.streetAddress, submission.content.city, submission.content.postalCode, submission.content.primaryPhoneNumber, submission.content.emailAddress, submission.content.shortTermGoals, submission.content.longTermGoals, "", submission.content.signature, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
      csvData = [...csvData, csvD];
    }

    let table =
      (loading === true) ? (
        <Spinner />
      ) : (
          <div className="table-responsive mg-t-0">
            <div className="section-wrapper" id="table-reponse">
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
                      if (submission.content.fromForm == "fcrp-loan") {
                        idcount ++;
                        return (
                          <React.Fragment key={submission._id}>
                            <tr>
                              <td>{idcount}</td>
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
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        );
    return (
      <div style={{ background: "white" }} className="report">
        <div className="row form-group" style={{ marginBottom: 0, paddingLeft: 50, paddingTop: 20}}>
          From
          <div className="input-group col-md-4 fromdate">
              <div className="input-group-prepend">
                  <div className="input-group-text">
                      <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                  </div>
              </div>
              <Datepicker selected={this.state.fromDate} onChange={this.handleFromChange} dateFormat="yyyy/MM/dd"/>
          </div>
          To
          <div className="input-group col-md-4 todate">
              <div className="input-group-prepend">
                  <div className="input-group-text">
                      <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                  </div>
              </div>
              <Datepicker selected={this.state.toDate} onChange={this.handleToChange} dateFormat="yyyy/MM/dd"/>
          </div>
          <div className="input-group col-md-3 download">
            <button className="btn btn-primary" onClick={this.handleSearch}>Search</button>
            <CSVLink data={csvData}>Download</CSVLink>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <React.Fragment>
            {table}
          </React.Fragment>
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
  profile: state.auth.profile,
  submissions: state.submissions
});

export default withRouter(connect(mapStateToProps, {deleteSubmission, searchByDate, getAllSubmissions})(AdminSubmissionList));