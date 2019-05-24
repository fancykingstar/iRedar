import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Alert from "../../Elements/Alert";
import TextFieldGroup from "../../Elements/TextFieldGroup";

import { updatePassword } from "../../../actions/authActions";

export class UpdatePassword extends Component {
    constructor() {
        super();
        this.state = {
            current_password: "",
            new_password: "",
            confirm_password: "",
            errors: {}
        };
    }
    componentDidMount() {}

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitPassword = e => {
        e.preventDefault();
        this.setState({ submitTime: this.state.submitTime + 1 });
        if (this.state.new_password === this.state.confirm_password) {
            const userData = {
                passwordCurrent: this.state.current_password,
                password: this.state.new_password,
                passwordConfirmation: this.state.confirm_password
            };
            console.log(userData);
            this.props.updatePassword(userData, this.props.history);
        }
    };

    render() {

        const { adminCount, staffCount, partnerCount, clientCount } = this.props.location;
        let countAll = adminCount + staffCount + partnerCount + clientCount;

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
                                <form onSubmit={this.onSubmitPassword}>
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
                                        <h6 className="slim-pagetitle">Change your Password</h6>
                                        <div>
                                            <TextFieldGroup
                                                style={{ marginTop: 5 }}
                                                placeholder="Enter your current password"
                                                name="current_password"
                                                type="password"
                                                value={this.state.current_password}
                                                onChange={this.onChange}
                                                error={errors.current_password}
                                                required
                                            />
                                            <br />
                                            <TextFieldGroup
                                                style={{ marginTop: 5 }}
                                                placeholder="Enter your new password"
                                                name="new_password"
                                                type="password"
                                                value={this.state.new_password}
                                                onChange={this.onChange}
                                                error={errors.new_password}
                                                required
                                            />
                                            <br />
                                            <TextFieldGroup
                                                style={{ marginTop: 5 }}
                                                placeholder="Confirm new password"
                                                name="confirm_password"
                                                type="password"
                                                value={this.state.confirm_password}
                                                onChange={this.onChange}
                                                error={errors.confirm_password}
                                                required
                                            />
                                            <br />
                                            <button
                                                className="btn btn-primary btn-block btn-signin"
                                                type="submit">
                                                Reset Password
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