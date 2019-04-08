import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ReferralForm.css'

class ReferralFormReadOnly extends Component {

    componentDidMount() {
        window.$('#partnerList').tagsinput({
            readOnly: true
        })
    }

    toString = partners => {
        return partners.map(partner => partner.firstName).join()
    }

    render() {
        return (
            <div className="container" id="referral">
                <br />
                <h1 htmlFor="referralForm" className="text-center">{this.props.referralForm.formName}</h1>
                <br />
                <form id="referralForm" className="form-horizontal">
                    <br />
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="firstName">Firstname</label>
                            <input type="text" className="form-control" id="firstName" value={this.props.referralForm.firstName || ''} readOnly />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="lastName">Lastname</label>
                            <input type="text" className="form-control" id="lastName" value={this.props.referralForm.lastName || ''} readOnly />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" value={this.props.referralForm.email || ''} readOnly />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" value={this.props.referralForm.address || ''} readOnly />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="province">Province</label>
                            <input type="text" className="form-control" id="province" value={this.props.referralForm.province || ''} readOnly />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" value={this.props.referralForm.city || ''} readOnly />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="workExperience">Work experience</label>
                            <textarea className="form-control" id="workExperience" value={this.props.referralForm.workExperience || ''} readOnly />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="note">Note</label>
                            <textarea className="form-control" id="note" value={this.props.referralForm.note || ''} readOnly />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="partnerList">Partner</label>
                            <input type="text" className="form-control" id="partnerList"
                                data-role="tagsinput"
                                value={this.toString(this.props.referralForm.receivers) || ''} disabled />
                        </div>
                    </div>
                    <br />
                </form>
                <br />
            </div >
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