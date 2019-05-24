import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../Elements/Alert';
import 'react-phone-number-input/style.css';
import ClientRegistration from "./ClientRegistration";
import BusinessRegistration from "./BusinessRegistration";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "business",
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

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  render() {
    let { errors } = this.state;
    let form = null;

    if (this.state.selectedOption === 'client') {
      form = <ClientRegistration/>;
    } else {
      form = <BusinessRegistration/>;
    }
    return (
      <div className="signin-right">
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
                <label className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input"
                         id="client" name="registration-user" value="client"
                         checked={this.state.selectedOption === 'client'}
                         onChange={this.handleOptionChange}/>
                  <span className="custom-control-label">Client</span>
                </label>
              </div>
              <div className="col-sm mg-t-10 mg-sm-t-0">
                <label className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input"
                         id="business" name="registration-user" value="business"
                         checked={this.state.selectedOption === 'business'}
                         onChange={this.handleOptionChange}/>
                  <span className="custom-control-label">Business</span>
                </label>
              </div>
            </div>
            {form}
            <p className="mg-b-0">
              Already have an account? <Link to="/">Sign In</Link>
            </p>
            <p className="mg-b-0">
              Forgot password ?<Link to="/reset-password"> Reset Password</Link>
            </p>
          </div>
      </div>
    );
  }
}

Register.propTypes = {
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
      {}
  )(Register)
);