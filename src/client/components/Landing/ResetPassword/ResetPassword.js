import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { resetPassword } from '../../../actions/authActions';
import Alert from '../../Elements/Alert';
import TextFieldGroup from '../../Elements/TextFieldGroup';
import { inputStyleBackground } from '../../Elements/Variables';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email
    };

    this.props.resetPassword(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;

    const isRequested = this.props.location.isRequested || null;

    let content = isRequested ? (
      <div className="signin-box">
        <h2 className="signin-title-primary">Forgot your Password</h2>
        <h3 className="signin-title-secondary">Just rest it.</h3>
        <Alert
          type="info"
          title="Success"
          close={false}
          detail="We've sent an email to reset password"
          style={{ marginBottom: 15 }}
        />
        <p className="mg-b-0">
          Back to <Link to="/">Sign In</Link>
        </p>
      </div>
    ) : (
      <form onSubmit={this.onSubmit}>
        <div className="signin-box">
          {errors.alert && (
            <Alert
                type="danger"
                title="Error!"
                close={false}
                detail={errors.alert.detail}
                style={{ marginBottom: 15 }}
            />
          )}
          <h2 className="signin-title-primary">Forgot your Password</h2>
          <h3 className="signin-title-secondary">Just reset it.</h3>
          <TextFieldGroup
            style={{ marginBottom: 50 }}
            inputStyle={inputStyleBackground}
            placeholder="Enter your email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            required
          />

          <button
            className="btn btn-primary btn-block btn-signin"
            type="submit"
          >
            Send Request
          </button>
          <p className="mg-b-0">
            Remember now ? <Link to="/">Sign In</Link>
          </p>
        </div>
      </form>
    );

    return <div className="signin-right">{content}</div>;
  }
}

ResetPassword.propTypes = {
  resetPassword: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { resetPassword }
  )(ResetPassword)
);
