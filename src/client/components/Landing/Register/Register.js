import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerUser } from '../../../actions/authActions';
import TextFieldGroup from '../../Elements/TextFieldGroup';
import Alert from '../../Elements/Alert';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ submitTime: this.state.submitTime + 1 });
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };

    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    let { errors } = this.state;

    return (
      <div className="signin-right">
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
            <h3 className="signin-title-primary">Get Started!</h3>
            <h5 className="signin-title-secondary lh-4">
              It's free to signup and only takes a minute.
            </h5>

            <div className="row row-xs mg-b-10">
              <div className="col-sm">
                <TextFieldGroup
                  placeholder="Firstname"
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  error={errors.firstName}
                  required
                />
              </div>
              <div className="col-sm mg-t-10 mg-sm-t-0">
                <TextFieldGroup
                  placeholder="Lastname"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                  required
                />
              </div>
            </div>

            <TextFieldGroup
              placeholder="Enter your email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              required
            />

            <TextFieldGroup
              style={{ marginTop: 5 }}
              placeholder="Enter your password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
              required
            />
            <TextFieldGroup
              style={{ marginBottom: 50, marginTop: 5 }}
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
              Sign Up
            </button>
            <p className="mg-b-0">
              Already have an account? <Link to="/">Sign In</Link>
            </p>
            <p className="mg-b-0">
              Forgot password ?<Link to="/reset-password"> Reset Password</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
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
    { registerUser }
  )(Register)
);
