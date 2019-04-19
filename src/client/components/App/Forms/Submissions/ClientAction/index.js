import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
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

    let profile
    if (permissions.length === 0) {
      let token = localStorage.getItem('jwtToken')
      if (token == null) {
        this.props.history.push('/dashboard')
        return
      }
      const decoded = jwt_decode(token)
      profile = decoded.profileId
    } else {
      profile = permissions[0].profile
    }

    const userData = {
      profileId: profile,
      //organizationId: permissions[0].organization
    };
    const { submissionId } = this.props.match.params;
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
