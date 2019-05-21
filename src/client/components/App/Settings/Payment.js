import {connect} from "react-redux";
import propTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import React, {Component} from "react";
import CheckoutForm from "../Components/CheckoutForm";
import {Elements, StripeProvider} from "react-stripe-elements";
import Alert from "../../Elements/Alert";

export class Payment extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    render() {
        const {adminCount, staffCount, partnerCount, clientCount} = this.props.location;
        let countAll = adminCount + staffCount + partnerCount + clientCount;
        let {errors} = this.state;
        return (
            <div className="slim-mainpanel">
                <div className="container">
                    <div className="manager-header">
                        <div className="slim-pageheader">
                            <ol className="breadcrumb slim-breadcrumb"/>
                            <h6 className="slim-pagetitle">Admin Settings</h6>
                        </div>
                    </div>
                    <div className="manager-wrapper">
                        <div className="manager-right">
                            <div className="section-wrapper">
                                <div className="signin-box">
                                    {errors.alert && (
                                        <Alert
                                            type="danger"
                                            title={errors.alert.title}
                                            close={false}
                                            detail={errors.alert.detail}
                                            style={{marginBottom: 15}}
                                        />
                                    )}
                                    <h6 className="slim-pagetitle">Payment Details</h6>
                                    <br/>
                                    <div className="container">
                                        <div className="row row-xs mg-b-10">
                                            <div className="col-sm">
                                                <StripeProvider apiKey="pk_test_7H1zrBLZ6IP5FtXsTRCDww53">
                                                    <Elements>
                                                        <CheckoutForm fontSize={"18px"}/>
                                                    </Elements>
                                                </StripeProvider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <div style={{cursor: 'pointer'}} className="nav-link">
                                    <span>All Contacts</span>
                                    <span>{countAll}</span>
                                </div>
                                <div style={{cursor: 'pointer'}} className="nav-link">
                                    <span>Admin</span>
                                    <span>{adminCount}</span>
                                </div>
                                <div style={{cursor: 'pointer'}} className="nav-link">
                                    <span>Staff</span>
                                    <span>{staffCount}</span>
                                </div>
                                <div style={{cursor: 'pointer'}} className="nav-link">
                                    <span>Partner</span>
                                    <span>{partnerCount}</span>
                                </div>
                                <div style={{cursor: 'pointer'}} className="nav-link">
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

Payment.propTypes = {
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
    )(Payment)
);