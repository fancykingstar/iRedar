import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from 'prop-types';
import {registerClientUser} from "../../../actions/authActions";
import TextFieldGroup from "../../Elements/TextFieldGroup";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import 'react-phone-number-input/style.css'

class ClientRegistration extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
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
            this.setState({errors: nextProps.errors});
        }
    }

    onChangePhone = e => {
        if (e) {
            if (isValidPhoneNumber(e)) {
                this.setState({phone: e});
                this.setState({errors: {phone: ""}});
            } else {
                this.setState({errors: {phone: "Invalid phone number"}});
            }
        }
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({submitTime: this.state.submitTime + 1});
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        };
        this.props.registerClientUser(newUser, this.props.history);
    };

    render() {
        let {errors} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row row-xs mg-b-10">
                    <div className="col-sm">
                        <TextFieldGroup
                            placeholder="First name"
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
                            placeholder="Last name"
                            name="lastName"
                            type="text"
                            value={this.state.lastName}
                            onChange={this.onChange}
                            error={errors.lastName}
                            required
                        />
                    </div>
                </div>

                <PhoneInput
                    labels={en}
                    placeholder="+1 (000) 000-0000"
                    name="phone"
                    country={'CA'}
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    error={errors.phone}
                    required
                />

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
                    style={{marginTop: 5}}
                    placeholder="Enter your password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    required
                />
                <TextFieldGroup
                    style={{marginBottom: 50, marginTop: 5}}
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
            </form>
        );

    }

}

ClientRegistration.propTypes = {
    registerClientUser: propTypes.func.isRequired,
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
        {registerClientUser}
    )(ClientRegistration)
);
