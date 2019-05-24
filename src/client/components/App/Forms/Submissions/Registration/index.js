import React, {Component} from 'react';
import {connect} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {getSubmission} from '../../../../../actions/submissionActions';
import Registration from './Registration';

class RegistrationSubmission extends Component {
    state = {
        submission: {
            submissionId: '',
            content: {},
            dateSubmitted: ''
        }
    };
    edit = false;

    componentDidMount() {
        const {getSubmission, permissions} = this.props;

        let profile;
        if (permissions.length === 0) {
            let token = localStorage.getItem('jwtToken');
            if (token == null) {
                this.props.history.push('/dashboard');
                return
            }
            const decoded = jwt_decode(token);
            profile = decoded.profileId
        } else {
            profile = permissions[0].profile
        }

        const userData = {
            profileId: profile,
            //organizationId: permissions[0].organization
        };
        const {submissionId} = this.props.match.params;
        getSubmission(userData, submissionId);

        let edit = this.props.location.state.edit;
        if (typeof edit === "undefined") {
            edit = false;
        }
        this.edit = edit;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.submissions.submission) {
            this.setState({submission: nextProps.submissions.submission});
        }
    }

    render() {
        return <Registration permissions={this.props.permissions} submission={this.state.submission}
                             history={this.props.history} edit={this.edit}/>;
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
    {getSubmission}
)(RegistrationSubmission);