import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSubmission } from '../../../../../actions/submissionActions';
import ClientAction from './ClientAction';

class ClientActionSubmission extends Component {
  state = {
    submission: {
      submissionId: '',
      content: {},
      dateSubmitted: ''
    }
  };
  componentDidMount() {
    const { getSubmission, permissions } = this.props;
    const { submissionId } = this.props.match.params;

    const userData = {
      profileId: permissions[0].profile,
      organizationId: permissions[0].organization
    };
    getSubmission(userData, submissionId);
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submissions.submission) {
      this.setState({ submission: nextProps.submissions.submission });
      
    }
    
  }

  render() {
    return <ClientAction submission={this.state.submission} />;
  }
}

const mapStateToProps = state => ({
  permissions: state.access.permissions,
  loading: state.submissions.loading,
  errors: state.errors,
  submissions: state.submissions
});

export default connect(
  mapStateToProps,
  { getSubmission }
)(ClientActionSubmission);
