import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSubmissions } from '../../../../actions/submissionActions';
import AdminSubmissionList from './AdminSubmissionList';

class PartnerSubmission extends Component {
  state = {
    submissionList: []
  };

  componentDidMount() {
    const { getAllSubmissions, permissions } = this.props;
    const userData = {
      profileId: permissions[0].profile,
      organizationId: permissions[0].organization
    };
    getAllSubmissions(userData);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.submissions.allSubmissions.length !==
      this.state.submissionList.length
    ) {
      let submissionList = nextProps.submissions.allSubmissions.filter(submission => submission.content.fromForm == "fcrp-loan")
      this.setState({ submissionList: submissionList });
    }
  }

  render() {
    return (
      <AdminSubmissionList
        submissionList={this.state.submissionList}
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
)(PartnerSubmission);