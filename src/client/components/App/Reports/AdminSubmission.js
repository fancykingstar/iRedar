import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSubmissions } from '../../../actions/submissionActions';
import AdminSubmissionList from './AdminSubmissionList';

class AdminSubmission extends Component {
  state = {
    submissionList: []
  };

  render() {
    return (
      <AdminSubmissionList
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  permissions: state.access.permissions,
  loading: state.submissions.loading,
  submissions: state.submissions
});

export default connect(
  mapStateToProps,
  { getAllSubmissions }
)(AdminSubmission);