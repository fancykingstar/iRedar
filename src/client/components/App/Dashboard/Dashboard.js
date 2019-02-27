import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextFieldGroup from '../../Elements/TextFieldGroup';
import { inputStyleBackground } from './../../Elements/Variables';
import Alert from './../../Elements/Alert';
import Spinner from '../../Elements/Spinner';

import { joinOrganization } from '../../../actions/accessActions';

export class Dashboard extends Component {
  state = {
    name: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileId = this.props.profile._id;
    const userData = {
      name: this.state.name,
      profileId
    };
    console.log(profileId);
    this.props.joinOrganization(userData, profileId);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    const { permissions, loading } = this.props;

    let content;

    if (loading === true || permissions.length === 0) content = <Spinner />;

    if (loading === false && permissions.length > 0)
      content = <div>Cool Dashboard</div>;

    if (permissions.length === 0 && loading === false)
      content = (
        <form onSubmit={this.onSubmit}>
          <div className="signin-box">
            {errors.alert && (
              <Alert
                type="danger"
                title="Error!"
                close={false}
                detail={errors.alert}
                style={{ marginBottom: 15 }}
              />
            )}
            <h2 className="signin-title-primary">
              You are not belong to any organization yet
            </h2>
            <h3 className="signin-title-secondary">Join an organization now</h3>
            <TextFieldGroup
              style={{ marginBottom: 50 }}
              inputStyle={inputStyleBackground}
              placeholder="Enter your organization's name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
              required
            />
            <button
              className="btn btn-primary btn-block btn-signin"
              type="submit"
            >
              Join
            </button>
          </div>
        </form>
      );

    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  permissions: state.access.permissions,
  loading: state.access.loading,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(
  mapStateToProps,
  { joinOrganization }
)(Dashboard);
