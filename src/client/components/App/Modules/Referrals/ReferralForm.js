import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Prompt } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead'

import { uploadReferralToServer } from '../../../../actions/referralActions'
import { getAdminPermissions } from '../../../../actions/accessActions'
import './ReferralForm.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

class ReferralForm extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            isBlocking: true,
            receivers: [] 
        }
    }

    disableBlocking() {
        this.setState({ isBlocking: false })
    }

    componentDidMount() {
        const { adminPermissions, permissions } = this.props;
        this.props.dispatch(getAdminPermissions(permissions[0].organization, permissions[0].profile))
        window.$('#partnerList').tagsinput({
            allowDuplicates: false,
            confirmKeys: [13, 44]
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    }

    toString = partners => {
        return partners.map(partner => partner.firstName).join()
    }

    referralFormSubmit = async event => {
        if (event != null) event.preventDefault()
        await this.disableBlocking()

        let referral = {
            submissionId: this.props.submissionId,
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
            receivers: this.state.receivers.map(receiver => receiver.value)
        }
        this.props.dispatch(uploadReferralToServer(referral))
        this.props.history.push('/modules/referrals');
    }

    render() {
        let { isBlocking, receivers } = this.state
        const { adminPermissions, permissions } = this.props;

        const options = adminPermissions.filter(permission => permission.role.toUpperCase() === "PARTNER")
        .map(permission => {
            return {
                label: `${permission.profile.firstName} ${permission.profile.lastName}`,
                value: permission.profile._id
            }
        });

        return (
            <div className="container" id="referral">
                <br />
                <h6 className="slim-pagetitle">Submission</h6>
                <p htmlFor="referralForm" className="text-center" >{this.props.referralForm.formName}</p>
                <Prompt when={isBlocking} message="Are you sure you want to leave, you will lose unsaved data" />
                <br />
                <form id="referralForm" className="form-horizontal" onSubmit={this.referralFormSubmit}>
                    <br />
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="firstName">Firstname</label>
                            <input type="text" className="form-control" id="firstName" ref={input => this.firstName = input} defaultValue={this.props.referralForm.firstName || ''} required />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="lastName">Lastname</label>
                            <input type="text" className="form-control" id="lastName" ref={input => this.lastName = input} defaultValue={this.props.referralForm.lastName || ''} required />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" ref={input => this.email = input} defaultValue={this.props.referralForm.email || ''} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" ref={input => this.address = input} defaultValue={this.props.referralForm.address || ''} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="province">Province</label>
                            <input type="text" className="form-control" id="province" ref={input => this.province = input} defaultValue={this.props.referralForm.province || ''} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" ref={input => this.city = input} defaultValue={this.props.referralForm.city || ''} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="workExperience">Work experience</label>
                            <textarea className="form-control" id="workExperience" ref={input => this.workExperience = input} defaultValue={this.props.referralForm.workExperience || ''} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <textarea className="form-control" id="note" ref={input => this.note = input} defaultValue={this.props.referralForm.note || ''} placeholder="Note" />
                        </div>
                        <div className="form-group col-md-5">
                            
                            <Typeahead
                                multiple={true}
                                options={options}
                                placeholder="Choose a state..."
                                onChange={(value) => this.setState({ receivers: value })}
                                value={receivers}
                            />
                        </div>
                        <div className="form-group col-md-1">
                            <button type="SubmitButton" className="btn btn-primary">Refer</button>
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
    const { submissionId } = ownProps.match.params
    let submission = state.submissions.allSubmissions.find(submission => submission._id === submissionId) || {}
    let fromForm = submission.content.fromForm || ''
    let email = fromForm === 'registration' ? (submission.content.email || '') : (submission.content.emailAddress || '')
    return {
        permissions: state.access.permissions,
        adminPermissions: state.access.admin,
        submissionId: submissionId,
        referralForm: {
            firstName: submission.content.firstName || '',
            lastName: submission.content.lastName || '',
            formName: fromForm,
            email: email,
            address: submission.content.streetAddress || '',
            province: submission.content.province || '',
            city: submission.content.city || '',
            workExperience: submission.content.workExperience || '',
            note: submission.content.note || '',
            sender: state.auth.user.profileId,
        }
    }
}

export default connect(
    mapStateToProps
)(ReferralForm)