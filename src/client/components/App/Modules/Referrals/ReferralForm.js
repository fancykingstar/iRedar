import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadReferralToServer } from '../../../../actions/referralActions'

class ReferralForm extends Component {

    referralFormSubmit = event => {
        if (event != null) event.preventDefault()
        let referral = {
            firstName: this.firstName.value || "",
            lastName: this.lastName.value || "",
            formName: this.props.referralForm.formName || "",
            email: this.email.value || "",
            address: this.address.value || "",
            province: this.province.value || "",
            city: this.city.value || "",
            workExperience: this.workExperience.value || "",
            note: this.note.value || "",
            dateSubmitted: Date(),
            sender: this.props.referralForm.sender,
            receivers: this.needchange.value || ""
        }
        this.props.dispatch(uploadReferralToServer(referral))
        this.props.history.push('/modules/referrals');
    }

    render() {
        return (
            <div className="container" id="referral">
                <form id="referralForm" onSubmit={this.referralFormSubmit} onKeyDown={event => { if (event.key === 'Enter') event.preventDefault() }}>
                    <h1 className="form-group">{this.props.referralForm.formName}</h1>
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName" ref={input => this.firstName = input} defaultValue={this.props.referralForm.firstName || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName" ref={input => this.lastName = input} defaultValue={this.props.referralForm.lastName || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" ref={input => this.email = input} defaultValue={this.props.referralForm.email || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" ref={input => this.address = input} defaultValue={this.props.referralForm.address || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="province">Province</label>
                        <input type="text" className="form-control" id="province" ref={input => this.province = input} defaultValue={this.props.referralForm.province || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" id="city" ref={input => this.city = input} defaultValue={this.props.referralForm.city || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workExperience">workExperience</label>
                        <textarea className="form-control" id="workExperience" ref={input => this.workExperience = input} defaultValue={this.props.referralForm.workExperience || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">note</label>
                        <textarea className="form-control" id="note" ref={input => this.note = input} defaultValue={this.props.referralForm.note || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="needchange">need change</label>
                        <input type="text" className="form-control" id="needchange" ref={input => this.needchange = input} defaultValue={this.props.referralForm.needchange || ''} />
                    </div>
                    <button type="SubmitButton" className="btn btn-primary mr-2">Refer</button>
                </form>
                <br />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { submissionId } = ownProps.match.params
    let submission = state.submissions.allSubmissions.find(submission => submission._id == submissionId) || {}
    return {
        referralForm: {
            firstName: submission.content.firstName || "",
            lastName: submission.content.lastName || "",
            formName: submission.content.fromForm || "",
            sender: state.auth.user.profileId,
        }
    }
}

export default connect(
    mapStateToProps
)(ReferralForm)