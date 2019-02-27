import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updatePassword } from '../../../actions/authActions';
import Alert from '../../Elements/Alert';
import TextFieldGroup from '../../Elements/TextFieldGroup';
import { inputStyleBackground } from '../../Elements/Variables';

class UpdatePassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      passwordConfirmation: '',
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
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
      confirmToken: this.props.match.params.confirmToken
    };

    this.props.updatePassword(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="signin-right">
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="signin-box">
              {errors.alert && (
                <Alert
                  type="danger"
                  title={errors.alert.title}
                  close={false}
                  detail={errors.alert.detail}
                  style={{ marginBottom: 15 }}
                />
              )}

              <h2 className="signin-title-primary">Forgot your Password</h2>
              <h3 className="signin-title-secondary">
                Update new password now.
              </h3>
              <TextFieldGroup
                inputStyle={inputStyleBackground}
                placeholder="Enter your password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                required
              />
              <TextFieldGroup
                style={{ marginBottom: 50 }}
                inputStyle={inputStyleBackground}
                placeholder="Confirm your password"
                name="passwordConfirmation"
                type="password"
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
                error={errors.passwordConfirmation}
                required
              />

              <button
                className="btn btn-primary btn-block btn-signin"
                type="submit"
              >
                Update
              </button>
              <p className="mg-b-0">
                Remember now ? <Link to="/register">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

UpdatePassword.propTypes = {
  updatePassword: propTypes.func.isRequired,
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
    { updatePassword }
  )(UpdatePassword)
);
