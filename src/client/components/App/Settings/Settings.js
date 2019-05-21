import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from "../../Elements/Alert";
import TextFieldGroup from "../../Elements/TextFieldGroup";
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {isValidPhoneNumber} from 'react-phone-number-input';

import {updatePassword, updateUser} from "../../../actions/authActions";

export class Settings extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            current_password: "",
            new_password: "",
            confirm_password: "",
            errors: {}
        };
        this.profileId = "";
    }

    componentDidMount() {}

    onChangePhone = e => {
        if (e) {
            if (isValidPhoneNumber(e)) {
                this.setState({ phone: e });
                console.log(e);
            }
        }
    };

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

    onSubmit = e => {
        e.preventDefault();
        this.setState({ submitTime: this.state.submitTime + 1 });
        const updateUser = {};
        updateUser["profileId"] = this.profileId.toString();
        if (this.state.firstName !== "") {
            updateUser["firstName"] = this.state.firstName;
        }
        if (this.state.lastName !== "") {
            updateUser["lastName"] = this.state.lastName;
        }
        if (this.state.email !== "") {
            updateUser["email"] = this.state.email;
        }
        if (this.state.phone !== "") {
            updateUser["phoneNumber"] = this.state.phone;
        }
        console.log(updateUser);
        this.props.updateUser(updateUser, this.props.history);
    };
    render() {
        const { profile, permissions } = this.props;
        let data = [];

        data.push({
            profileId: profile._id,
            permissionId: permissions[0]._id,
            role: permissions[0].role,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phoneNumber: profile.phoneNumber
        });

        this.profileId = data[0].profileId;
        this.phone = data[0].phoneNumber;

        let { errors } = this.state;

        return (
            <div className="slim-mainpanel">
                <div className="container">
                    <div className="manager-header">
                        <div className="slim-pageheader">
                            <ol className="breadcrumb slim-breadcrumb" />
                            <h6 className="slim-pagetitle">Settings</h6>
                        </div>
                    </div>

                    <div className="manager-wrapper">
                        <div className="manager-right">
                            <div className="section-wrapper">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
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
                                                    <h6 className="slim-pagetitle">Update User Information</h6>
                                                    <div className="row row-xs mg-b-10">
                                                        <div className="col-sm">
                                                            <TextFieldGroup
                                                                placeholder="Firstname"
                                                                name="firstName"
                                                                type="text"
                                                                value={(this.state.firstName === "") ? data[0].firstName : this.state.firstName}
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
                                                                value={(this.state.lastName === "") ? data[0].lastName : this.state.lastName}
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
                                                            value={(this.state.email === "") ? data[0].email : this.state.email}
                                                            onChange={this.onChange}
                                                            error={errors.email}
                                                            required
                                                        />
                                                        <br />
                                                        <PhoneInput
                                                            labels={ en }
                                                            placeholder="(000) 000-0000"
                                                            name="phone"
                                                            country={'CA'}
                                                            value={(this.state.phone === "") ? data[0].phoneNumber : this.state.phone}
                                                            onChange={this.onChangePhone}
                                                            error={ this.state.phone ? (isValidPhoneNumber(this.state.phone) ? undefined : 'Invalid phone number') : 'Phone number required' }
                                                            required
                                                        />
                                                        <br />
                                                        <button
                                                            className="btn btn-primary btn-block btn-signin"
                                                            type="submit">
                                                            Update User
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-sm">
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
                                </div>
                            </div>
                        </div>
                        <div className="manager-left">
                            <nav className="nav" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//   permissions: state.access
// });

const mapStateToProps = state => ({
    permissions: state.access.permissions,
    adminPermissions: state.access.admin,
    loading: state.access.loading,
    access: state.access,
    errors: state.errors,
    profile: state.auth.profile
});

export default connect(
    mapStateToProps,
    { updateUser, updatePassword }
)(Settings);
