import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextFieldGroup from '../../Elements/TextFieldGroup';
import { inputStyleBackground } from './../../Elements/Variables';
import Alert from './../../Elements/Alert';
import Spinner from '../../Elements/Spinner';

import { joinOrganization } from '../../../actions/accessActions';
import './dashboard.css';

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
    const { permissions, loading, user } = this.props;

    let content;

    if (loading === true || permissions.length === 0) content = <Spinner />;

    if (loading === false && permissions.length > 0)
      content = (
        <div className="container container-dashboard">
          <h1>Welcome to Link2Settle {this.props.user.username}</h1>

          <div className="d-md-flex flex-row-reverse">

            <div className="signin-left" style={{ minHeight: "491px"}}>
              <img src="/assets/img/dashboard_img2.png" />
            </div>

            <div className="signin-right" style={{minHeight: "0px"}}>
              <div className="signin-box">
                <h3>This is your personal dashboard.</h3>
                <p>We are pleased to offer you the best platform that helps coordinate services in the market. We hope to be your trusted companion from arrival in Canada to when you feel comfortably settled. Whether you need a job, want to learn English, or connect with your community, find all the information and services you need to get started in your new community. </p>
                <p>Oh, and we also offer our services in English, French, and Arabic to cater for people from all walks of life and so that you feel most comfortable. </p>
                <p>Find service providers near you that can help you through your settlement journey. Whether in Employment, Health Care, Money & Banking, Housing, Education, Legal & Immigration </p>
                <p>It’s available, in your language, and personalized for you.</p>
                <p>iRadar Canada (C) 2019. All rights reserved</p>
              </div>
            </div>

          </div>
        </div>
      );

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
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  permissions: state.access.permissions,
  loading: state.access.loading,
  errors: state.errors,
  profile: state.auth.profile,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { joinOrganization }
)(Dashboard);
