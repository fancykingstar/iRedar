import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Prompt} from 'react-router-dom'
import axios from 'axios';
import {API_URL} from '../../../../actions/types';

class Registration extends Component {

    constructor(props) {
        super(props)
        this.state = {isBlocking: true}
    }

    disableBlocking() {
        this.setState({isBlocking: false})
    }

    componentDidMount() {
        const self = this;
        const isEditable = (this.props.location.state.edit && this.props.location.state.edit === "true");
        window.$('#wizard6').steps({
            headerTag: 'h3',
            bodyTag: 'section',
            autoFocus: true,
            titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
            cssClass: 'wizard wizard-style-2',
            onFinished: async function (event, currentIndex) {
                if (isEditable) {
                    await self.disableBlocking()

                    let content = {
                        fromForm: 'registration',
                        salutation: window.$('#salutation').val(),
                        firstName: window.$('#firstName').val(),
                        lastName: window.$('#lastName').val(),
                        preferredName: window.$('#preferredName').val(),
                        streetAddress: window.$('#streetAddress').val(),
                        city: window.$('#city').val(),
                        province: window.$('#province').val(),
                        postalCode: window.$('#postalCode').val(),
                        primaryPhoneNumber: window.$('#primaryPhoneNumber').val(),
                        primaryPhoneNumber_voicemail: window.$('#primaryPhoneNumber_voicemail').val(),
                        secondaryPhoneNumber: window.$('#secondaryPhoneNumber').val(),
                        secondaryPhoneNumber_voicemail: window.$('#secondaryPhoneNumber_voicemail').val(),
                        email: window.$('#email').val(),
                        confirmEmail: window.$('#confirmEmail').val(),
                        birthDate: window.$('#birthDate').val(),
                        gender: window.$('#gender').val(),
                        countryOfOrigin: window.$('#countryOfOrigin').val(),
                        nationality: window.$('#nationality').val(),
                        nativeLanguage: window.$('#nativeLanguage').val(),

                        occupation: window.$('#occupation').val(),
                        occupation_other: window.$('#occupation_other').val(),
                        primaryOccupation: window.$('#primaryOccupation').val(),
                        regulatedProfession_yes: window.$('#regulatedProfession_yes').prop("checked"),
                        regulatedProfession_no: window.$('#regulatedProfession_no').prop("checked"),
                        regulatedProfession_unknown: window.$('#regulatedProfession_unknown').prop("checked"),
                        licensed_yes: window.$('#licensed_yes').prop("checked"),
                        licensed_no: window.$('#licensed_no').prop("checked"),
                        licensed_inProgress: window.$('#licensed_inProgress').prop("checked"),
                        licensed_unknown: window.$('#licensed_unknown').prop("checked"),
                        licensed_na: window.$('#licensed_na').prop("checked"),
                        degree: window.$('#degree').val(),
                        degree_other: window.$('#degree_other').val(),
                        fieldOfStudy: window.$('#fieldOfStudy').val(),
                        nameOfMajor: window.$('#nameOfMajor').val(),
                        postSecondaryOutsideCanada_yesSame: window.$('#postSecondaryOutsideCanada_yesSame').prop("checked"),
                        postSecondaryOutsideCanada_yesOther: window.$('#postSecondaryOutsideCanada_yesOther').prop("checked"),
                        postSecondaryOutsideCanada_no: window.$('#postSecondaryOutsideCanada_no').prop("checked"),
                        degreeEvaluated_yes: window.$('#degreeEvaluated_yes').prop("checked"),
                        degreeEvaluated_no: window.$('#degreeEvaluated_no').prop("checked"),
                        degreeEvaluated_na: window.$('#degreeEvaluated_na').prop("checked"),
                        degreeEvaluated_inProgress: window.$('#degreeEvaluated_inProgress').prop("checked"),
                        securityClearance_yes: window.$('#securityClearance_yes').prop("checked"),
                        securityClearance_no: window.$('#securityClearance_no').prop("checked"),

                        foreignBornCanadian: window.$('#foreignBornCanadian').val(),
                        landingDate_citizen: window.$('#landingDate_citizen').val(),
                        yearOfCitizenship: window.$('#yearOfCitizenship').val(),
                        permanentResidencyClass: window.$('#permanentResidencyClass').val(),
                        landingDate_permanentResident: window.$('#landingDate_permanentResident').val(),
                        conventionRefugee: window.$('#conventionRefugee').val(),
                        temporaryResident_inlandRefugeeClaimant: window.$('#temporaryResident_inlandRefugeeClaimant').prop("checked"),
                        temporaryResident_foreignWorker: window.$('#temporaryResident_foreignWorker').prop("checked"),
                        temporaryResident_liveInCaregiver: window.$('#temporaryResident_liveInCaregiver').prop("checked"),
                        temporaryResident_protectedResident: window.$('#temporaryResident_protectedResident').prop("checked"),
                        temporaryResident_student: window.$('#temporaryResident_student').prop("checked"),
                        temporaryResident_other: window.$('#temporaryResident_other').prop("checked"),
                        temporaryResident_diplomat: window.$('#temporaryResident_diplomat').prop("checked"),
                        temporaryResident_noWorkPermit_inlandRefugee: window.$('#temporaryResident_noWorkPermit_inlandRefugee').prop("checked"),
                        temporaryResident_noWorkPermit_internationalStudent: window.$('#temporaryResident_noWorkPermit_internationalStudent').prop("checked"),
                        temporaryResident_noWorkPermit_visitorVisa: window.$('#temporaryResident_noWorkPermit_visitorVisa').prop("checked"),
                        temporaryResident_noWorkPermit_diplomat: window.$('#temporaryResident_noWorkPermit_diplomat').prop("checked"),
                        temporaryResident_noWorkPermit_other: window.$('#temporaryResident_noWorkPermit_other').prop("checked"),
                        immigrationStatus_other: window.$('#immigrationStatus_other').val(),
                        immigrationDocumentNumber: window.$('#immigrationDocumentNumber').val(),
                        periodInCanada: window.$('#periodInCanada').val(),

                        legallyWorkInCanada_yes: window.$('#legallyWorkInCanada_yes').prop("checked"),
                        legallyWorkInCanada_no: window.$('#legallyWorkInCanada_no').prop("checked"),
                        legallyWorkInCanada_unknown: window.$('#legallyWorkInCanada_unknown').val(),
                        heardAboutUs: window.$('#heardAboutUs').val(),
                        heardAboutUs_other: window.$('#heardAboutUs_other').val(),
                        addEmailToDistributionList_yes: window.$('#addEmailToDistributionList_yes').prop("checked"),
                        addEmailToDistributionList_no: window.$('#addEmailToDistributionList_no').prop("checked"),
                        sourceOfIncome: window.$('#sourceOfIncome').val(),
                        sourceOfIncome_other: window.$('#sourceOfIncome_other').val(),

                    }

                    try {
                        await axios.post(API_URL + '/api/submissions', content);
                        self.props.history.push({
                            // pathname: '/forms/submission-success'
                            pathname: '/forms/'

                        });

                        console.log('OK');
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    self.props.history.push({
                        // pathname: '/forms/submission-success'
                        pathname: '/forms/'

                    });
                }
            }
        })
    }

    render() {
        let {isBlocking} = this.state
        let isEditable = false;
        if (this.props.location.state.edit && this.props.location.state.edit === "true") {
            isEditable = true;
        }
        return (
            <div className="slim-mainpanel">
                <div className="container">
                    <div id="google_translate_element"/>

                    <div className="section-wrapper mg-t-20">
                        <label className="section-title">Registration Form</label>
                        <p className="mg-b-20 mg-sm-b-40">Please fill out the following information. </p>

                        <form id="immigrationForm" method="post" action="/forms">
                            <Prompt when={isBlocking}
                                    message="Are you sure you want to leave, you will lose unsaved data"/>
                            <div className="form-group col-md-2">
                                <input type="hidden" name="fromForm" value="5bedaa68f65be80016ef5a19"/>
                            </div>

                            <div id="wizard6">
                                <h3>Client Information</h3>
                                <section>
                                    <div className="form-row">
                                        <div className="form-group col-md-1">
                                            <label htmlFor="salutation">Salutation</label>
                                            <select className="form-control" id="salutation" name="salutation"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Mr</option>
                                                <option>Mrs</option>
                                                <option>Ms.</option>
                                                <option>Dr.</option>
                                            </select>
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text" className="form-control" id="firstName" name="firstName"
                                                   placeholder="First Name" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>


                                        <div className="form-group col-md-4">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" name="lastName"
                                                   placeholder="Last Name" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="preferredName">Preferred Name (if different from First
                                                Name)</label>
                                            <input type="text" className="form-control" id="preferredName"
                                                   name="preferredName" placeholder="Preferred First Name"
                                                   readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="streetAddress">Street Address</label>
                                            <input type="text" className="form-control" id="streetAddress"
                                                   name="streetAddress" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="city">City</label>
                                            <input type="text" className="form-control" id="city" name="city"
                                                   readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="province">Province</label>
                                            <select id="province" className="form-control" name="province"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">Province</option>
                                                <option>Alberta</option>
                                                <option>British Columbia</option>
                                                <option>Manitoba</option>
                                                <option>New Brunswick</option>
                                                <option>Newfoundland and Labrador</option>
                                                <option>Northwest Territories</option>
                                                <option>Nova Scotia</option>
                                                <option>Nunavut</option>
                                                <option>Ontario</option>
                                                <option>Prince Edward Island</option>
                                                <option>Quebec</option>
                                                <option>Saskatchewan</option>
                                                <option>Yukon</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="postalCode">Postal Code</label>
                                            <input type="text" className="form-control" id="postalCode"
                                                   name="postalCode" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="primaryPhoneNumber">Primary Phone Number</label>
                                            <input type="text" className="form-control" id="primaryPhoneNumber"
                                                   name="primaryPhoneNumber" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                        <div className="form-group col-md-1">
                                            <label htmlFor="primaryPhoneNumber_voicemail">Voicemail?</label>
                                            <select id="primaryPhoneNumber_voicemail" className="form-control"
                                                    name="primaryPhoneNumber_voicemail" readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="secondaryPhoneNumber">Secondary Phone Number</label>
                                            <input type="text" className="form-control" id="secondaryPhoneNumber"
                                                   name="secondaryPhoneNumber" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                        <div className="form-group col-md-1">
                                            <label htmlFor="secondaryPhoneNumber_voicemail">Voicemail?</label>
                                            <select id="secondaryPhoneNumber_voicemail" className="form-control"
                                                    name="secondaryPhoneNumber_voicemail" readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email" className="form-control" id="email" name="email"
                                                   placeholder="name@example.com" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="confirmEmail">Confirm Email</label>
                                            <input type="email" className="form-control" id="confirmEmail"
                                                   name="confirmEmail" placeholder="name@example.com"
                                                   readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="birthDate">Date of Birth</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                </div>
                                            </div>
                                            <input name="birthDate" id="birthDate" type="text" className="form-control"
                                                   placeholder="MM/DD/YYYY" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <label htmlFor="gender">Gender</label>
                                            <select id="gender" className="form-control" name="gender"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Prefer not to disclose</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="countryOfOrigin">Country of Origin</label>
                                            <select id="countryOfOrigin" className="form-control" name="countryOfOrigin"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Afghanistan</option>
                                                <option>Albania</option>
                                                <option>Algeria</option>
                                                <option>Andorra</option>
                                                <option>Angola</option>
                                                <option>Antigua and Barbuda</option>
                                                <option>Argentina</option>
                                                <option>Armenia</option>
                                                <option>Australia</option>
                                                <option>Austria</option>
                                                <option>Azerbaijan</option>
                                                <option>The Bahamas</option>
                                                <option>Bahrain</option>
                                                <option>Bangladesh</option>
                                                <option>Barbados</option>
                                                <option>Belarus</option>
                                                <option>Belgium</option>
                                                <option>Belize</option>
                                                <option>Benin</option>
                                                <option>Bhutan</option>
                                                <option>Bolivia</option>
                                                <option>Bosnia and Herzegovina</option>
                                                <option>Botswana</option>
                                                <option>Brazil</option>
                                                <option>Brunei</option>
                                                <option>Bulgaria</option>
                                                <option>Burkina Faso</option>
                                                <option>Burundi</option>
                                                <option>Cabo Verde</option>
                                                <option>Cambodia</option>
                                                <option>Cameroon</option>
                                                <option>Canada</option>
                                                <option>Central African Republic</option>
                                                <option>Chad</option>
                                                <option>Chile</option>
                                                <option>China</option>
                                                <option>Colombia</option>
                                                <option>Comoros</option>
                                                <option>Congo, Democratic Republic of the</option>
                                                <option>Congo, Republic of the</option>
                                                <option>Costa Rica</option>
                                                <option>Côte d’Ivoire</option>
                                                <option>Croatia</option>
                                                <option>Cuba</option>
                                                <option>Cyprus</option>
                                                <option>Czech Republic</option>
                                                <option>D</option>
                                                <option>Denmark</option>
                                                <option>Djibouti</option>
                                                <option>Dominica</option>
                                                <option>Dominican Republic</option>
                                                <option>East Timor (Timor-Leste)</option>
                                                <option>Ecuador</option>
                                                <option>Egypt</option>
                                                <option>El Salvador</option>
                                                <option>Equatorial Guinea</option>
                                                <option>Eritrea</option>
                                                <option>Estonia</option>
                                                <option>Ethiopia</option>
                                                <option>Fiji</option>
                                                <option>Finland</option>
                                                <option>France</option>
                                                <option>Gabon</option>
                                                <option>The Gambia</option>
                                                <option>Georgia</option>
                                                <option>Germany</option>
                                                <option>Ghana</option>
                                                <option>Greece</option>
                                                <option>Grenada</option>
                                                <option>Guatemala</option>
                                                <option>Guinea</option>
                                                <option>Guinea-Bissau</option>
                                                <option>Guyana</option>
                                                <option>Haiti</option>
                                                <option>Honduras</option>
                                                <option>Hungary</option>
                                                <option>Iceland</option>
                                                <option>India</option>
                                                <option>Indonesia</option>
                                                <option>Iran</option>
                                                <option>Iraq</option>
                                                <option>Ireland</option>
                                                <option>Israel</option>
                                                <option>Italy</option>
                                                <option>Jamaica</option>
                                                <option>Japan</option>
                                                <option>Jordan</option>
                                                <option>Kazakhstan</option>
                                                <option>Kenya</option>
                                                <option>Kiribati</option>
                                                <option>Korea, North</option>
                                                <option>Korea, South</option>
                                                <option>Kosovo</option>
                                                <option>Kuwait</option>
                                                <option>Kyrgyzstan</option>
                                                <option>Laos</option>
                                                <option>Latvia</option>
                                                <option>Lebanon</option>
                                                <option>Lesotho</option>
                                                <option>Liberia</option>
                                                <option>Libya</option>
                                                <option>Liechtenstein</option>
                                                <option>Lithuania</option>
                                                <option>Luxembourg</option>
                                                <option>Macedonia</option>
                                                <option>Madagascar</option>
                                                <option>Malawi</option>
                                                <option>Malaysia</option>
                                                <option>Maldives</option>
                                                <option>Mali</option>
                                                <option>Malta</option>
                                                <option>Marshall Islands</option>
                                                <option>Mauritania</option>
                                                <option>Mauritius</option>
                                                <option>Mexico</option>
                                                <option>Micronesia, Federated States of</option>
                                                <option>Moldova</option>
                                                <option>Monaco</option>
                                                <option>Mongolia</option>
                                                <option>Montenegro</option>
                                                <option>Morocco</option>
                                                <option>Mozambique</option>
                                                <option>Myanmar (Burma)</option>
                                                <option>Namibia</option>
                                                <option>Nauru</option>
                                                <option>Nepal</option>
                                                <option>Netherlands</option>
                                                <option>New Zealand</option>
                                                <option>Nicaragua</option>
                                                <option>Niger</option>
                                                <option>Nigeria</option>
                                                <option>Norway</option>
                                                <option>Oman</option>
                                                <option>Pakistan</option>
                                                <option>Palau</option>
                                                <option>Palestine</option>
                                                <option>Panama</option>
                                                <option>Papua New Guinea</option>
                                                <option>Paraguay</option>
                                                <option>Peru</option>
                                                <option>Philippines</option>
                                                <option>Poland</option>
                                                <option>Portugal</option>
                                                <option>Qatar</option>
                                                <option>Romania</option>
                                                <option>Russia</option>
                                                <option>Rwanda</option>
                                                <option>Saint Kitts and Nevis</option>
                                                <option>Saint Lucia</option>
                                                <option>Saint Vincent and the Grenadines</option>
                                                <option>Samoa</option>
                                                <option>San Marino</option>
                                                <option>Sao Tome and Principe</option>
                                                <option>Saudi Arabia</option>
                                                <option>Senegal</option>
                                                <option>Serbia</option>
                                                <option>Seychelles</option>
                                                <option>Sierra Leone</option>
                                                <option>Singapore</option>
                                                <option>Slovakia</option>
                                                <option>Slovenia</option>
                                                <option>Solomon Islands</option>
                                                <option>Somalia</option>
                                                <option>South Africa</option>
                                                <option>Spain</option>
                                                <option>Sri Lanka</option>
                                                <option>Sudan</option>
                                                <option>Sudan, South</option>
                                                <option>Suriname</option>
                                                <option>Swaziland</option>
                                                <option>Sweden</option>
                                                <option>Switzerland</option>
                                                <option>Syria</option>
                                                <option>Taiwan</option>
                                                <option>Tajikistan</option>
                                                <option>Tanzania</option>
                                                <option>Thailand</option>
                                                <option>Togo</option>
                                                <option>Tonga</option>
                                                <option>Trinidad and Tobago</option>
                                                <option>Tunisia</option>
                                                <option>Turkey</option>
                                                <option>Turkmenistan</option>
                                                <option>Tuvalu</option>
                                                <option>Uganda</option>
                                                <option>Ukraine</option>
                                                <option>United Arab Emirates</option>
                                                <option>United Kingdom</option>
                                                <option>United States</option>
                                                <option>Uruguay</option>
                                                <option>Uzbekistan</option>
                                                <option>Vanuatu</option>
                                                <option>Vatican City</option>
                                                <option>Venezuela</option>
                                                <option>Vietnam</option>
                                                <option>Yemen</option>
                                                <option>Zambia</option>
                                                <option>Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="nationality">Nationality</label>
                                            <select id="nationality" className="form-control" name="nationality"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Afghanistan</option>
                                                <option>Albania</option>
                                                <option>Algeria</option>
                                                <option>Andorra</option>
                                                <option>Angola</option>
                                                <option>Antigua and Barbuda</option>
                                                <option>Argentina</option>
                                                <option>Armenia</option>
                                                <option>Australia</option>
                                                <option>Austria</option>
                                                <option>Azerbaijan</option>
                                                <option>The Bahamas</option>
                                                <option>Bahrain</option>
                                                <option>Bangladesh</option>
                                                <option>Barbados</option>
                                                <option>Belarus</option>
                                                <option>Belgium</option>
                                                <option>Belize</option>
                                                <option>Benin</option>
                                                <option>Bhutan</option>
                                                <option>Bolivia</option>
                                                <option>Bosnia and Herzegovina</option>
                                                <option>Botswana</option>
                                                <option>Brazil</option>
                                                <option>Brunei</option>
                                                <option>Bulgaria</option>
                                                <option>Burkina Faso</option>
                                                <option>Burundi</option>
                                                <option>Cabo Verde</option>
                                                <option>Cambodia</option>
                                                <option>Cameroon</option>
                                                <option>Canada</option>
                                                <option>Central African Republic</option>
                                                <option>Chad</option>
                                                <option>Chile</option>
                                                <option>China</option>
                                                <option>Colombia</option>
                                                <option>Comoros</option>
                                                <option>Congo, Democratic Republic of the</option>
                                                <option>Congo, Republic of the</option>
                                                <option>Costa Rica</option>
                                                <option>Côte d’Ivoire</option>
                                                <option>Croatia</option>
                                                <option>Cuba</option>
                                                <option>Cyprus</option>
                                                <option>Czech Republic</option>
                                                <option>D</option>
                                                <option>Denmark</option>
                                                <option>Djibouti</option>
                                                <option>Dominica</option>
                                                <option>Dominican Republic</option>
                                                <option>East Timor (Timor-Leste)</option>
                                                <option>Ecuador</option>
                                                <option>Egypt</option>
                                                <option>El Salvador</option>
                                                <option>Equatorial Guinea</option>
                                                <option>Eritrea</option>
                                                <option>Estonia</option>
                                                <option>Ethiopia</option>
                                                <option>Fiji</option>
                                                <option>Finland</option>
                                                <option>France</option>
                                                <option>Gabon</option>
                                                <option>The Gambia</option>
                                                <option>Georgia</option>
                                                <option>Germany</option>
                                                <option>Ghana</option>
                                                <option>Greece</option>
                                                <option>Grenada</option>
                                                <option>Guatemala</option>
                                                <option>Guinea</option>
                                                <option>Guinea-Bissau</option>
                                                <option>Guyana</option>
                                                <option>Haiti</option>
                                                <option>Honduras</option>
                                                <option>Hungary</option>
                                                <option>Iceland</option>
                                                <option>India</option>
                                                <option>Indonesia</option>
                                                <option>Iran</option>
                                                <option>Iraq</option>
                                                <option>Ireland</option>
                                                <option>Israel</option>
                                                <option>Italy</option>
                                                <option>Jamaica</option>
                                                <option>Japan</option>
                                                <option>Jordan</option>
                                                <option>Kazakhstan</option>
                                                <option>Kenya</option>
                                                <option>Kiribati</option>
                                                <option>Korea, North</option>
                                                <option>Korea, South</option>
                                                <option>Kosovo</option>
                                                <option>Kuwait</option>
                                                <option>Kyrgyzstan</option>
                                                <option>Laos</option>
                                                <option>Latvia</option>
                                                <option>Lebanon</option>
                                                <option>Lesotho</option>
                                                <option>Liberia</option>
                                                <option>Libya</option>
                                                <option>Liechtenstein</option>
                                                <option>Lithuania</option>
                                                <option>Luxembourg</option>
                                                <option>Macedonia</option>
                                                <option>Madagascar</option>
                                                <option>Malawi</option>
                                                <option>Malaysia</option>
                                                <option>Maldives</option>
                                                <option>Mali</option>
                                                <option>Malta</option>
                                                <option>Marshall Islands</option>
                                                <option>Mauritania</option>
                                                <option>Mauritius</option>
                                                <option>Mexico</option>
                                                <option>Micronesia, Federated States of</option>
                                                <option>Moldova</option>
                                                <option>Monaco</option>
                                                <option>Mongolia</option>
                                                <option>Montenegro</option>
                                                <option>Morocco</option>
                                                <option>Mozambique</option>
                                                <option>Myanmar (Burma)</option>
                                                <option>Namibia</option>
                                                <option>Nauru</option>
                                                <option>Nepal</option>
                                                <option>Netherlands</option>
                                                <option>New Zealand</option>
                                                <option>Nicaragua</option>
                                                <option>Niger</option>
                                                <option>Nigeria</option>
                                                <option>Norway</option>
                                                <option>Oman</option>
                                                <option>Pakistan</option>
                                                <option>Palau</option>
                                                <option>Palestine</option>
                                                <option>Panama</option>
                                                <option>Papua New Guinea</option>
                                                <option>Paraguay</option>
                                                <option>Peru</option>
                                                <option>Philippines</option>
                                                <option>Poland</option>
                                                <option>Portugal</option>
                                                <option>Qatar</option>
                                                <option>Romania</option>
                                                <option>Russia</option>
                                                <option>Rwanda</option>
                                                <option>Saint Kitts and Nevis</option>
                                                <option>Saint Lucia</option>
                                                <option>Saint Vincent and the Grenadines</option>
                                                <option>Samoa</option>
                                                <option>San Marino</option>
                                                <option>Sao Tome and Principe</option>
                                                <option>Saudi Arabia</option>
                                                <option>Senegal</option>
                                                <option>Serbia</option>
                                                <option>Seychelles</option>
                                                <option>Sierra Leone</option>
                                                <option>Singapore</option>
                                                <option>Slovakia</option>
                                                <option>Slovenia</option>
                                                <option>Solomon Islands</option>
                                                <option>Somalia</option>
                                                <option>South Africa</option>
                                                <option>Spain</option>
                                                <option>Sri Lanka</option>
                                                <option>Sudan</option>
                                                <option>Sudan, South</option>
                                                <option>Suriname</option>
                                                <option>Swaziland</option>
                                                <option>Sweden</option>
                                                <option>Switzerland</option>
                                                <option>Syria</option>
                                                <option>Taiwan</option>
                                                <option>Tajikistan</option>
                                                <option>Tanzania</option>
                                                <option>Thailand</option>
                                                <option>Togo</option>
                                                <option>Tonga</option>
                                                <option>Trinidad and Tobago</option>
                                                <option>Tunisia</option>
                                                <option>Turkey</option>
                                                <option>Turkmenistan</option>
                                                <option>Tuvalu</option>
                                                <option>Uganda</option>
                                                <option>Ukraine</option>
                                                <option>United Arab Emirates</option>
                                                <option>United Kingdom</option>
                                                <option>United States</option>
                                                <option>Uruguay</option>
                                                <option>Uzbekistan</option>
                                                <option>Vanuatu</option>
                                                <option>Vatican City</option>
                                                <option>Venezuela</option>
                                                <option>Vietnam</option>
                                                <option>Yemen</option>
                                                <option>Zambia</option>
                                                <option>Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="nativeLanguage">Native Language</label>
                                            <input type="text" id="nativeLanguage" className="form-control"
                                                   name="nativeLanguage" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                </section>


                                <h3>Profession & Education</h3>
                                <section>
                                    <div className="form-row">
                                        <div className="form-group col-md-7">
                                            <label htmlFor="occupation">
                                                Please select your professional occupation or field from the selection
                                                below
                                            </label>
                                            <select className="form-control" id="occupation" name="occupation"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Management</option>
                                                <option>Business, Finance & Administration</option>
                                                <option>Natural & Applied Sciences and Related Technical Jobs</option>
                                                <option>Health Occupations</option>
                                                <option>Education, Law, Social, Community & Government Services</option>
                                                <option>Art, Culture, Recreation, Sports</option>
                                                <option> Trades, Transport, Equipment Operators and Related Jobs
                                                </option>
                                                <option>Sales and Service Occupations</option>
                                                <option>Natural Resources, Agriculture and Related Jobs</option>
                                                <option>Manufacturing and Utilities Jobs</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label htmlFor="occupation_other">If Other, Specify</label>
                                            <input type="email" className="form-control" id="occupation_other"
                                                   name="occupation_other" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="primaryOccupation">Name of Primary Profession</label>
                                            <input type="text" className="form-control" id="primaryOccupation"
                                                   name="primaryOccupation" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <div className="row">
                                                <label className="col-form-label col-sm-4 text-md-left pt-sm-0">Is this
                                                    a
                                                    regulated profession?</label>
                                                <div className="col">
                                                    <div className="custom-controls-stacked">
                                                        <label className="custom-control custom-radio">
                                                            <input id="regulatedProfession_yes"
                                                                   name="regulatedProfession" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Yes</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="regulatedProfession_no"
                                                                   name="regulatedProfession" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">No</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="regulatedProfession_unknown"
                                                                   name="regulatedProfession" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Unknown</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <label className="col-form-label col-sm-4 text-md-left pt-sm-0">Are you licensed
                                            to practice in Canada ?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_yes" name="licensed" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_no" name="licensed" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_inProgress" name="licensed" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}
                                                    />
                                                    <span className="custom-control-label">Licensing in Progress</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_unknown" name="licensed" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}
                                                    />
                                                    <span className="custom-control-label">Unknown</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_na" name="licensed" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}
                                                    />
                                                    <span className="custom-control-label">N/A</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="degree">
                                                Please select your highest level of education
                                            </label>
                                            <select className="form-control" id="degree" name="degree"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option value="phD">PhD</option>
                                                <option value="masters">Masters</option>
                                                <option value="bachelor">Bachelor</option>
                                                <option value="certificate">Certificate</option>
                                                <option value="diploma">Diploma</option>
                                                <option value="highSchool">High School</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="degree_other">If Other, Specify</label>
                                            <input type="email" className="form-control" id="degree_other"
                                                   name="degree_other" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fieldOfStudy">
                                                What is your field of study?
                                            </label>
                                            <select className="form-control" id="fieldOfStudy" name="fieldOfStudy"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Education (e.g. teacher training)</option>
                                                <option>Visual & performing arts (e.g. music, art)</option>
                                                <option>Humanities (e.g. literature, religion)</option>
                                                <option>Social & Behavioural Sciences (e.g. law, economics,
                                                    journalism)
                                                </option>
                                                <option>Business, Management, & Public Administration (e.g. finance)
                                                </option>
                                                <option>Physical & Life Sciences (e.g. geology, biology, science
                                                    technology)
                                                </option>
                                                <option>Math, IT/computer science, library science</option>
                                                <option>Architecture & Engineering (incl. construction, mechanical
                                                    repair)
                                                </option>
                                                <option> Agriculture, environment & resources</option>
                                                <option>Health & Fitness (e.g. medicine, dental, veterinary,
                                                    recreation)
                                                </option>
                                                <option>Other (e.g. interdisciplinary program)</option>
                                                <option>Personal, Protection, Transport Services (e.g. culinary,
                                                    military)
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="nameOfMajor">Name of your major, field of study, or
                                                specialization:</label>
                                            <input type="text" className="form-control" id="nameOfMajor"
                                                   name="nameOfMajor" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label className="col-form-label col-sm-4 text-md-left pt-sm-0">Do you have
                                            post-secondary education outside of Canada?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="postSecondaryOutsideCanada_yesSame"
                                                           name="postSecondaryOutsideCanada" type="radio"
                                                           className="custom-control-input"
                                                           readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">YES (same as above)</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="postSecondaryOutsideCanada_yesOther"
                                                           name="postSecondaryOutsideCanada" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">YES (other)</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="postSecondaryOutsideCanada_no"
                                                           name="postSecondaryOutsideCanada" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">NO</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label className="col-form-label col-sm-6 text-md-left pt-sm-0">Have you had the
                                            above degree(s) evaluated in Canada?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="degreeEvaluated_yes" name="degreeEvaluated" type="radio"
                                                           className="custom-control-input"
                                                           readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">YES</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="degreeEvaluated_no" name="degreeEvaluated" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">NO</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="degreeEvaluated_na" name="degreeEvaluated" type="radio"
                                                           className="custom-control-input" readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">N/A</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="degreeEvaluated_inProgress" name="degreeEvaluated"
                                                           type="radio" className="custom-control-input"
                                                           readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">In progress</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <label className="col-form-label col-sm-6 text-md-left pt-sm-0">Do you have
                                            Federal Government security clearance?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="securityClearance_yes" name="securityClearance"
                                                           type="radio" className="custom-control-input"
                                                           readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">YES</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="securityClearance_no" name="securityClearance"
                                                           type="radio" className="custom-control-input"
                                                           readOnly={!isEditable}
                                                           disabled={!isEditable}
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">NO</span>
                                                </label>

                                            </div>
                                        </div>
                                    </div>


                                </section>

                                <h3>Immigration Status</h3>
                                <section>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="foreignBornCanadian">Foreign born Canadian?</label>
                                            <select className="form-control" id="foreignBornCanadian"
                                                    name="foreignBornCanadian" readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="landingDate_citizen">Date of Landing</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                    </div>
                                                </div>
                                                <input name="landingDate_citizen" id="landingDate_citizen" type="text"
                                                       className="form-control" placeholder="MM/DD/YYYY"
                                                       readOnly={!isEditable}
                                                       disabled={!isEditable}
                                                       onChange={(e) => {
                                                       }}/>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="yearOfCitizenship">Year of Citizenship</label>
                                            <input type="text" className="form-control" id="yearOfCitizenship"
                                                   name="yearOfCitizenship" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <h5>OR</h5>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="permanentResidencyClass">Permanent Residence Class</label>
                                            <select className="form-control" id="permanentResidencyClass"
                                                    name="permanentResidencyClass" readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Skilled Worker</option>
                                                <option>Family Class</option>
                                                <option>Refugee Class</option>
                                                <option>Live-in-Caregiver</option>
                                                <option>Economic Class</option>
                                                <option>Approved in principle</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="landingDate_permanentResident">Date of Landing</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                    </div>
                                                </div>
                                                <input name="landingDate_permanentResident"
                                                       id="landingDate_permanentResident" type="text"
                                                       className="form-control" placeholder="MM/DD/YYYY"
                                                       readOnly={!isEditable}
                                                       disabled={!isEditable}
                                                       onChange={(e) => {
                                                       }}/>
                                            </div>
                                        </div>
                                    </div>
                                    <h5>OR</h5>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="conventionRefugee">Are you A Convention Refugee?</label>
                                            <select className="form-control" id="conventionRefugee"
                                                    name="conventionRefugee" readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <h5>OR</h5>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <div className="row">
                                                <label className="col-form-label col-sm-4 text-md-left pt-sm-0">Temporary
                                                    Resident with Work Permit:</label>
                                                <div className="col">
                                                    <div className="custom-controls-stacked">
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_inlandRefugeeClaimant"
                                                                   name="temporaryResident" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Inland Refugee Claimant</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_foreignWorker"
                                                                   name="temporaryResident" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Temporary Foreign Worker (Employer Sponsored)</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_liveInCaregiver"
                                                                   name="temporaryResident" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span
                                                                className="custom-control-label">Live-In Caregiver</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_protectedResident"
                                                                   name="temporaryResident" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Temporary Protected Resident</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_student"
                                                                   name="temporaryResident" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Student or Graduate Work Permit</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_other" name="temporaryResident"
                                                                   type="radio" className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Other</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_diplomat"
                                                                   name="temporaryResident" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Diplomat</span>
                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5>OR</h5>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <div className="row">
                                                <label className="col-form-label col-sm-4 text-md-left pt-sm-0">Temporary
                                                    Resident with No Work Permit:</label>
                                                <div className="col">
                                                    <div className="custom-controls-stacked">
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_noWorkPermit_inlandRefugee"
                                                                   name="temporaryResident_noWorkPermit" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Inland Refugee Claimant</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input
                                                                id="temporaryResident_noWorkPermit_internationalStudent"
                                                                name="temporaryResident_noWorkPermit" type="radio"
                                                                className="custom-control-input" readOnly={!isEditable}
                                                                disabled={!isEditable}
                                                                onChange={(e) => {
                                                                }}/>
                                                            <span
                                                                className="custom-control-label">International Student</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_noWorkPermit_visitorVisa"
                                                                   name="temporaryResident_noWorkPermit" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Visitor Visa</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_noWorkPermit_diplomat"
                                                                   name="temporaryResident_noWorkPermit" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Diplomat</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_noWorkPermit_other"
                                                                   name="temporaryResident_noWorkPermit" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Other</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-8">
                                            <label htmlFor="immigrationStatus_other">If Other, Specify</label>
                                            <input type="email" className="form-control" id="immigrationStatus_other"
                                                   name="immigrationStatus_other" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-8">
                                            <label htmlFor="immigrationDocumentNumber">Immigration Document
                                                Number:</label>
                                            <input type="email" className="form-control" id="immigrationDocumentNumber"
                                                   name="immigrationDocumentNumber" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="periodInCanada">How long have you been in Canada?</label>
                                            <select className="form-control" id="periodInCanada" name="periodInCanada"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>0-12 months</option>
                                                <option>1-3 years</option>
                                                <option>3+ years</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                <h3>Other</h3>
                                <section>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <div className="row">
                                                <label className="col-form-label col-sm-4 text-md-left pt-sm-0">Are you
                                                    legally entitled to work in Canada:</label>
                                                <div className="col">
                                                    <div className="custom-controls-stacked">
                                                        <label className="custom-control custom-radio">
                                                            <input id="legallyWorkInCanada_yes"
                                                                   name="legallyWorkInCanada" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">YES</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="legallyWorkInCanada_no"
                                                                   name="legallyWorkInCanada" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">NO</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="legallyWorkInCanada_unknown"
                                                                   name="legallyWorkInCanada" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">UNKNOWN</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="heardAboutUs">How did you hear about World Skills Employment
                                                Centre?</label>
                                            <select className="form-control" id="heardAboutUs" name="heardAboutUs"
                                                    readOnly={!isEditable}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>Immigrant serving organization (CCI, IWSO, JFS, OCCSC, SCFS,
                                                    OCISO, LASSA, YMCA, PQHC, YSB etc.)
                                                </option>
                                                <option>Reception House</option>
                                                <option>Employment Ontario</option>
                                                <option>LINC/CLIC or ESL / FSL classes</option>
                                                <option>LARC</option>
                                                <option>ELT and OSLT classes</option>
                                                <option>Internet, fliers, promotion</option>
                                                <option>Libraries and schools</option>
                                                <option>Training</option>
                                                <option>Friends and family</option>
                                                <option>Ontario Works</option>
                                                <option>Government of Canada website</option>
                                                <option>Recruiting agency</option>
                                                <option> Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="heardAboutUs_other">If Other, Specify</label>
                                            <input type="email" className="form-control" id="heardAboutUs_other"
                                                   name="heardAboutUs_other" readOnly={!isEditable}
                                                   disabled={!isEditable}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <div className="row">
                                                <label className="col-form-label text-md-left pt-sm-0">Would you like to
                                                    be placed on our email distribution list?</label>
                                                <div className="col">
                                                    <div className="custom-controls-stacked">
                                                        <label className="custom-control custom-radio">
                                                            <input id="addEmailToDistributionList_yes"
                                                                   name="addEmailToDistributionList" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">YES</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="addEmailToDistributionList_no"
                                                                   name="addEmailToDistributionList" type="radio"
                                                                   className="custom-control-input"
                                                                   readOnly={!isEditable}
                                                                   disabled={!isEditable}
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">NO</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="sourceOfIncome">Source of income (optional):</label>
                                                <select className="form-control" id="sourceOfIncome"
                                                        name="sourceOfIncome" readOnly={!isEditable}
                                                        disabled={!isEditable}
                                                        onChange={(e) => {
                                                        }}>
                                                    <option value="">--</option>
                                                    <option>EI</option>
                                                    <option>ODSP</option>
                                                    <option>Ontario Works</option>
                                                    <option>GARs</option>
                                                    <option>LARC</option>
                                                    <option>Family</option>
                                                    <option>Self-employed</option>
                                                    <option>Work</option>
                                                    <option>Savings</option>
                                                    <option>Prefer not to answer</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="sourceOfIncome_other">If Other, Specify</label>
                                                <input type="email" className="form-control" id="sourceOfIncome_other"
                                                       name="sourceOfIncome_other" readOnly={!isEditable}
                                                       disabled={!isEditable}
                                                       onChange={(e) => {
                                                       }}/>
                                            </div>
                                        </div>
                                    </div>

                                </section>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        )
    }

}

export default connect()(Registration)
