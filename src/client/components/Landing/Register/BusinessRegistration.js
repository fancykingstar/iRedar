import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from 'prop-types';
import {registerBusiness} from "../../../actions/businessActions";
import TextFieldGroup from "../../Elements/TextFieldGroup";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";

class BusinessRegistration extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            businessName: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            selectedPlan: "Smart",
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

    onOptionChange = changeEvent => {
        this.setState({
            selectedPlan: changeEvent.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({submitTime: this.state.submitTime + 1});
        const newBusiness = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            name: this.state.businessName,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation,
            selectedPlan: this.state.selectedPlan
        };

        this.props.registerBusiness(newBusiness, this.props.history);
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
                <TextFieldGroup
                    placeholder="Business Name"
                    name="businessName"
                    type="text"
                    value={this.state.businessName}
                    onChange={this.onChange}
                    error={errors.businessName}
                    required
                />
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

                <div className="row row-xs mg-b-5">
                    <div className="col-sm">
                        <label className="custom-control custom-radio">
                            Start your 30 days trial today by selecting appropriate plan for your business ...
                        </label>
                        <label className="custom-control custom-radio">
                            <input
                                className="custom-control-input"
                                type="radio"
                                name="planRadio"
                                id="Smart"
                                value="Smart"
                                checked={this.state.selectedPlan === 'Smart'}
                                onChange={this.onOptionChange}/>
                            <span className="custom-control-label">Smart ($75.00 user / month)</span>
                        </label>
                        <label className="custom-control custom-radio">
                            <input
                                className="custom-control-input"
                                type="radio"
                                name="planRadio"
                                id="Business"
                                value="Business"
                                checked={this.state.selectedPlan === 'Business'}
                                onChange={this.onOptionChange}/>
                            <span className="custom-control-label">Business ($150.00 user / month)</span>
                        </label>
                        <label className="custom-control custom-radio">
                            <input
                                className="custom-control-input"
                                type="radio"
                                name="planRadio"
                                id="Enterprise"
                                value="Enterprise"
                                checked={this.state.selectedPlan === 'Enterprise'}
                                onChange={this.onOptionChange}/>
                            <span className="custom-control-label">Enterprise ($250.00 user / month)</span>
                        </label>
                    </div>
                </div>

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

BusinessRegistration.propTypes = {
    registerBusiness: propTypes.func.isRequired,
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
        {registerBusiness}
    )(BusinessRegistration)
);
