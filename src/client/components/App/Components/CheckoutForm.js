// CheckoutForm.js
import React, {Component} from "react";
import TextFieldGroup from "../../Elements/TextFieldGroup";
import {CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe} from "react-stripe-elements";
import en from "react-phone-number-input/locale/en";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import {registerPayment} from "../../../actions/paymentActions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from "prop-types";

class CheckoutForm extends Component {
    constructor() {
        super();
        this.state = {
            cardHolderName: "",
            email: "",
            phone: "",
            street1: "",
            street2: "",
            city: "",
            state: "",
            zipcode: "",
            country: "Canada",
            selectedPlan: "Smart",
            errors: {}
        };
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.setState({submitTime: this.state.submitTime + 1});
        // create source
        if (this.props.stripe) {
            this.props.stripe
                .createSource({
                    type: 'card',
                    owner: {
                        name: this.state.cardHolderName,
                        email: this.state.email,
                        phone: this.state.phone
                    },
                })
                .then((payload) => {
                    const paymentInformation = {
                        cardHolderName: this.state.cardHolderName,
                        email: this.state.email,
                        phone: this.state.phone,
                        street1: this.state.street1,
                        street2: this.state.street2,
                        city: this.state.city,
                        state: this.state.state,
                        zipcode: this.state.zipcode,
                        country: this.state.country,
                        source: payload.source
                    };
                    console.log(paymentInformation);
                    // handle payment to stripe by making backend calls
                    this.props.registerPayment(paymentInformation, this.props.history);
                });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

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

    onSelectChange = e => {
        this.setState({country: e.target.value});
    };

    onOptionChange = changeEvent => {
        this.setState({
            selectedPlan: changeEvent.target.value
        });
    };

    render() {
        let {errors} = this.state;

        return (
            <div className="payment">
                <form onSubmit={this.handleSubmit}>
                    <div className="row row-xs mg-b-5">
                        <div className="col-sm">
                            <label className="credit-card">Plan information</label>
                        </div>
                    </div>
                    <div className="row row-xs mg-b-5">
                        <div className="col-sm">
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
                            <label className="custom-control custom-radio">
                                <input
                                    className="custom-control-input"
                                    type="radio"
                                    name="planRadio"
                                    id="Unsubscribe"
                                    value="Unsubscribe"
                                    checked={this.state.selectedPlan === 'Unsubscribe'}
                                    onChange={this.onOptionChange}/>
                                <span className="custom-control-label">Unsubscribe</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <hr/>
                    </div>
                    <div className="row row-xs mg-b-5">
                        <div className="col-sm">
                            <label className="credit-card">Customer Information</label>
                        </div>
                    </div>
                    <div className="row row-xs mg-b-5">
                        <div className="col-sm">
                            <TextFieldGroup
                                name="cardHolderName"
                                type="text"
                                placeholder="Cardholder Name"
                                value={this.state.cardHolderName}
                                onChange={this.onChange}
                                error={errors.cardHolderName}
                                required
                            />
                            <TextFieldGroup
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
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
                        </div>
                    </div>
                    <div className="row row-xs mg-b-5">
                        <div className="col-sm">
                            <TextFieldGroup
                                name="street1"
                                className="form-control billingStreet"
                                type="text"
                                placeholder="Street Address line 1"
                                value={this.state.street1}
                                onChange={this.onChange}
                                error={errors.street1}
                                required
                            />
                            <TextFieldGroup
                                name="street2"
                                className="form-control billingStreet"
                                type="text"
                                placeholder="Street Address line 2"
                                value={this.state.street2}
                                onChange={this.onChange}
                                error={errors.street2}
                            />
                        </div>
                    </div>
                    <div className="row row-xs mg-b-5">
                        <div className="col-sm-4">
                            <TextFieldGroup
                                name="city"
                                className="form-control billingCity"
                                type="text"
                                placeholder="City"
                                value={this.state.city}
                                onChange={this.onChange}
                                error={errors.city}
                                required
                            />
                        </div>
                        <div className="col-sm-4">
                            <TextFieldGroup
                                name="state"
                                className="form-control billingProvince"
                                type="text"
                                placeholder="State/Province"
                                value={this.state.state}
                                onChange={this.onChange}
                                error={errors.state}
                                required
                            />
                        </div>
                        <div className="col-sm-4">
                            <TextFieldGroup
                                name="zipcode"
                                className="form-control billingZip"
                                type="text"
                                placeholder="Zip Code"
                                value={this.state.zipcode}
                                onChange={this.onChange}
                                error={errors.zipcode}
                                required
                            />
                        </div>
                    </div>
                    <div className="row row-xs mg-b-5">
                        <div className="col-sm">
                            <select
                                name="country"
                                className="form-control billingCountry"
                                placeholder="Country"
                                value={this.state.country}
                                onChange={this.onSelectChange}>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Canada">Canada</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="Egypt">Egypt</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran">Iran</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea">Korea</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Macao">Macao</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Mali">Mali</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Panama">Panama</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Romania">Romania</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Spain">Spain</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Taiwan">Taiwan, Province of China</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="United States of America">United States of America</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Yemen">Yemen</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <hr/>
                    </div>
                    <div className="row row-xs mg-b-6">
                        <div className="col-sm">
                            <label className="credit-card">Credit or Debit card Information</label>
                        </div>
                    </div>
                    <div className="row row-xs mg-b-6">
                        <div className="col-sm">
                            <label>Card number</label>
                            <CardNumberElement/>
                        </div>
                    </div>
                    <div className="row row-xs mg-b-6">
                        <div className="col-sm-6">
                            <label>Expiration date</label>
                            <CardExpiryElement/>
                        </div>
                        <div className="col-sm-6">
                            <label>CVC</label>
                            <CardCVCElement/>
                        </div>
                    </div>
                    <div className="row row-xs mg-b-6">
                        <button
                            className="btn btn-primary btn-block btn-signin"
                            type="submit">
                            Make Payment
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

CheckoutForm.propTypes = {
    registerPayment: propTypes.func.isRequired,
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
        {registerPayment}
    )(injectStripe(CheckoutForm))
);