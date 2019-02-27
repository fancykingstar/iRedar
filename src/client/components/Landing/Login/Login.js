import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser } from '../../../actions/authActions';
import Alert from '../../Elements/Alert';
import TextFieldGroup from '../../Elements/TextFieldGroup';
import { inputStyleBackground } from '../../Elements/Variables';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;

    const isSuccess =
      this.props.location.isRegistered || this.props.location.isReset || null;

    const detail = this.props.location.detail || null;

    return (
      <div className="signin-right">
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="signin-box">
              {isSuccess && (
                <Alert
                  type="success"
                  title="Success!"
                  detail={detail}
                  style={{ marginBottom: 15 }}
                />
              )}

              {errors.alert && (
                <Alert
                  type="danger"
                  title={errors.alert.title}
                  close={false}
                  detail={errors.alert.detail}
                  style={{ marginBottom: 15 }}
                />
              )}

              <h2 className="signin-title-primary">Welcome to iAuto!</h2>
              <h3 className="signin-title-secondary">Sign in to continue.</h3>
              <TextFieldGroup
                inputStyle={inputStyleBackground}
                placeholder="Enter your email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                required
              />

              <TextFieldGroup
                style={{ marginBottom: 50 }}
                inputStyle={inputStyleBackground}
                placeholder="Enter your password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                required
              />

              <button
                className="btn btn-primary btn-block btn-signin"
                type="submit"
              >
                Sign In
              </button>
              <p className="mg-b-0">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
              <p className="mg-b-0">
                Forgot password ?
                <Link to="/reset-password"> Reset Password</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: propTypes.func.isRequired,
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
    { loginUser }
  )(Login)
);
