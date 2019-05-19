import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Alert from "../../Elements/Alert";
import TextFieldGroup from "../../Elements/TextFieldGroup";

import {registerUser} from "../../../actions/authActions";

export class AddNewUsers extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      errors: {}
    };
  }

    componentDidMount() {
    }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  OnSelectChange = e => {
    this.setState({ role: e.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ submitTime: this.state.submitTime + 1 });
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    };

    this.props.registerUser(newUser, this.props.history);
  };
  render() {

    const { adminCount, staffCount, partnerCount, clientCount } = this.props.location;
    let countAll = adminCount + staffCount + partnerCount + clientCount;

    const roleOfUser = [
      {label: "User", value: "user"},
      {label: "Staff", value: "staff"},
      {label: "Partner", value: "partner"},
      {label: "Admin", value: "admin"}
    ];

    let { errors } = this.state;
    return (
      <div className="slim-mainpanel">
        <div className="container">
          <div className="manager-header">
            <div className="slim-pageheader">
              <ol className="breadcrumb slim-breadcrumb" />
              <h6 className="slim-pagetitle">Admin Settings</h6>
            </div>
          </div>
          <div className="manager-wrapper">
            <div className="manager-right">
              <div className="section-wrapper">
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
                    <h6 className="slim-pagetitle">User Details</h6>
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
                    <div>
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
                      <Select options={roleOfUser}
                              style={{ marginTop: 5 }}
                              placeholder="Select The Role"
                              name="role"
                              value={this.state.label}
                              onChange={this.OnSelectChange}
                              error={errors.role}
                              required
                      /><br />
                      <button
                          className="btn btn-primary btn-block btn-signin"
                          type="submit">
                        Add New User
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="manager-left">
              <Link
                to="/settings/admin-settings"
                className="btn btn-contact-new"
              >
                Back to Admin Settings
              </Link>
              <nav className="nav">
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>All Contacts</span>
                  <span>{countAll}</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>Admin</span>
                  <span>{adminCount}</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>Staff</span>
                  <span>{staffCount}</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>Partner</span>
                  <span>{partnerCount}</span>
                </div>
                <div style={{ cursor: 'pointer' }} className="nav-link">
                  <span>Client</span>
                  <span>{clientCount}</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddNewUsers.propTypes = {
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
      {registerUser}
  )(AddNewUsers)
);