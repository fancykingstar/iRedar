import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReferralFormReadOnly extends Component {

    render() {
        return (
            <div className="container" id="referral">
                <form id="referralFormReadOnly">
                    <h1 className="form-group">{this.props.referralForm.formName}</h1>
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName" defaultValue={this.props.referralForm.firstName || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName" defaultValue={this.props.referralForm.lastName || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" defaultValue={this.props.referralForm.email || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" defaultValue={this.props.referralForm.address || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="province">Province</label>
                        <input type="text" className="form-control" id="province" defaultValue={this.props.referralForm.province || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" id="city" defaultValue={this.props.referralForm.city || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workExperience">workExperience</label>
                        <textarea className="form-control" id="workExperience" defaultValue={this.props.referralForm.workExperience || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">note</label>
                        <textarea className="form-control" id="note" defaultValue={this.props.referralForm.note || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="needchange">need change</label>
                        <input type="text" className="form-control" id="needchange" defaultValue={this.props.referralForm.needchange || ''} readOnly />
                    </div>
                </form>
                <br />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { referralId } = ownProps.match.params
    let referralForm = state.referrals.referralForms.find(referralForm => referralForm._id == referralId) || {}
    return {
        referralForm
    }
}

export default connect(
    mapStateToProps
)(ReferralFormReadOnly)