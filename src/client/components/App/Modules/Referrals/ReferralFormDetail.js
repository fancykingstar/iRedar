import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Prompt } from 'react-router-dom'
import { getReferralForm, uploadReferralToServer } from '../../../../actions/referralActions'
import './ReferralForm.css'

class ReferralFormDetail extends Component {

    constructor(props) {
        super(props)
        this.state = { isBlocking: true }
    }

    disableBlocking() {
        this.readyForSubmit = true
        this.setState({ isBlocking: false })
    }

    componentDidMount() {
        window.$('#partnerList').tagsinput({
            allowDuplicates: false,
            confirmKeys: [13, 44]
        })

        if (JSON.stringify(this.props.referralForm) === '{}') {
            this.props.dispatch(getReferralForm(this.props.referralId))
        }
    }

    toString = partners => {
        return partners.map(partner => partner.firstName).join()
    }

    referralFormSubmit = async event => {
        if (event != null) event.preventDefault()
        await this.disableBlocking()

        let referral = {
            _id: this.props.referralId,
            firstName: this.firstName.value || '',
            lastName: this.lastName.value || '',
            formName: this.props.referralForm.formName || '',
            email: this.email.value || '',
            address: this.address.value || '',
            province: this.province.value || '',
            city: this.city.value || '',
            workExperience: this.workExperience.value || '',
            note: this.note.value || '',
            dateSubmitted: Date(),
            sender: this.props.sender,
            receivers: this.partnerList.value || ''
        }
        this.props.dispatch(uploadReferralToServer(referral))
        this.props.history.push('/modules/referrals');
    }

    shouldComponentUpdate(nextProps) {
        if (this.readyForSubmit === true) {
            return true
        }
        window.$('#partnerList').tagsinput('add', this.toString(nextProps.referralForm.receivers || []) || '')
        return true
    }

    render() {
        let { isBlocking } = this.state

        return (
            <div className="container" id="referral">
                <br />
                <h6 className="slim-pagetitle">Submission</h6>
                <p htmlFor="referralForm" className="text-center" >{this.props.referralForm.formName}</p>
                <br />
                <form id="referralForm" className="form-horizontal" onSubmit={this.referralFormSubmit}>
                    <Prompt when={isBlocking} message="Are you sure you want to leave, you will lose unsaved data" />
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
                            <input type="text" className="form-control" id="partnerList" data-role="tagsinput"
                                ref={input => this.partnerList = input}
                                defaultValue={this.toString(this.props.referralForm.receivers || []) || ''} />
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
    const { referralId } = ownProps.match.params
    let referralForm = state.referrals.referralForms.find(referralForm => referralForm._id === referralId) || {}
    return {
        referralId,
        referralForm,
        sender: state.auth.user.profileId,
    }
}

export default connect(
    mapStateToProps
)(ReferralFormDetail)