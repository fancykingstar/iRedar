import React, {Component} from 'react';
import {connect} from 'react-redux'
import Spinner from '../../../../Elements/Spinner';
import {editSubmission} from "../../../../../actions/submissionActions";
import $ from "jquery";

class RegistrationSubmission extends Component {
    componentDidUpdate() {
        const self = this;
        const isEditable = (self.props.edit === "true");
        window.$('#wizard6').steps({
            headerTag: 'h3',
            bodyTag: 'section',
            autoFocus: true,
            titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
            cssClass: 'wizard wizard-style-2',
            onFinished: async function (event, currentIndex) {
                if (isEditable) {
                    let content = {
                        fromForm: self.props.submission.content.fromForm,
                        salutation: $("[name=salutation]").find(":selected").text(),
                        firstName: $("[name=firstName]").val(),
                        lastName: $("[name=lastName]").val(),
                        preferredName: $("[name=preferredName]").val(),
                        streetAddress: $("[name=streetAddress]").val(),
                        city: $("[name=city]").val(),
                        province: $("[name=province]").find(":selected").text(),
                        postalCode: $("[name=postalCode]").val(),
                        primaryPhoneNumber: $("[name=primaryPhoneNumber]").val(),
                        primaryPhoneNumber_voicemail: $("[name=primaryPhoneNumber_voiceMail]").find(":selected").text(),
                        secondaryPhoneNumber: $("[name=secondaryPhoneNumber]").val(),
                        secondaryPhoneNumber_voicemail: $("[name=secondaryPhoneNumber_voicemail]").find(":selected").text(),
                        email: $("[name=emailAddress]").val(),
                        confirmEmail: $("[name=confirmEmailAddress]").val(),
                        birthDate: $("[name=birthDate]").val(),
                        gender: $("[name=gender]").find(":selected").text(),
                        countryOfOrigin: $("[name=countryOfOrigin]").find(":selected").text(),
                        nationality: $("[name=nationality]").find(":selected").text(),
                        nativeLanguage: $("[name=nativeLanguage]").val(),
                        occupation: $("[name=occupation]").find(":selected").text(),
                        occupation_other: $("[name=occupation_other]").val(),
                        primaryOccupation: $("[name=primaryOccupation]").val(),
                        regulatedProfession_yes: $("#regulatedProfession_yes").is(":checked"),
                        regulatedProfession_no: $("#regulatedProfession_no").is(":checked"),
                        regulatedProfession_unknown: $("#regulatedProfession_unknown").is(":checked"),
                        licensed_yes: $("#licensed_yes").is(":checked"),
                        licensed_no: $("#licensed_no").is(":checked"),
                        licensed_inProgress: $("#licensed_inProgress").is(":checked"),
                        licensed_unknown: $("#licensed_unknown").is(":checked"),
                        licensed_na: $("#licensed_na").is(":checked"),
                        degree: $("[name=degree]").find(":selected").text(),
                        degree_other: $("[name=degree_other]").val(),
                        fieldOfStudy: $("[name=fieldOfStudy]").find(":selected").text(),
                        nameOfMajor: $("[name=nameOfMajor]").val(),
                        postSecondaryOutsideCanada_yesSame: $("#postSecondaryOutsideCanada_yesSame").is(":checked"),
                        postSecondaryOutsideCanada_yesOther: $("#postSecondaryOutsideCanada_yesOther").is(":checked"),
                        postSecondaryOutsideCanada_no: $("#postSecondaryOutsideCanada_no").is(":checked"),
                        degreeEvaluated_yes: $("#degreeEvaluated_yes").is(":checked"),
                        degreeEvaluated_no: $("#degreeEvaluated_no").is(":checked"),
                        degreeEvaluated_na: $("#degreeEvaluated_na").is(":checked"),
                        degreeEvaluated_inProgress: $("#degreeEvaluated_inProgress").is(":checked"),
                        securityClearance_yes: $("#securityClearance_yes").is(":checked"),
                        securityClearance_no: $("#securityClearance_no").is(":checked"),
                        foreignBornCanadian: $("[name=foreignBornCanadian]").find(":selected").text(),
                        landingDate_citizen: $("[name=landingDate_citizen]").val(),
                        yearOfCitizenship: $("[name=yearOfCitizenship]").val(),
                        permanentResidencyClass: $("[name=permanentResidencyClass]").find(":selected").text(),
                        landingDate_permanentResident: $("[name=landingDate_permanentResident]").val(),
                        conventionRefugee: $("[name=conventionRefugee]").find(":selected").text(),
                        temporaryResident_inlandRefugeeClaimant: $("#temporaryResident_inlandRefugeeClaimant").is(":checked"),
                        temporaryResident_foreignWorker: $("#temporaryResident_foreignWorker").is(":checked"),
                        temporaryResident_liveInCaregiver: $("#temporaryResident_liveInCaregiver").is(":checked"),
                        temporaryResident_protectedResident: $("#temporaryResident_protectedResident").is(":checked"),
                        temporaryResident_student: $("#temporaryResident_student").is(":checked"),
                        temporaryResident_other: $("#temporaryResident_other").is(":checked"),
                        temporaryResident_diplomat: $("#temporaryResident_diplomat").is(":checked"),
                        temporaryResident_noWorkPermit_inlandRefugee: $("#temporaryResident_noWorkPermit_inlandRefugee").is(":checked"),
                        temporaryResident_noWorkPermit_internationalStudent: $("#temporaryResident_noWorkPermit_internationalStudent").is(":checked"),
                        temporaryResident_noWorkPermit_visitorVisa: $("#temporaryResident_noWorkPermit_visitorVisa").is(":checked"),
                        temporaryResident_noWorkPermit_diplomat: $("#temporaryResident_noWorkPermit_diplomat").is(":checked"),
                        temporaryResident_noWorkPermit_other: $("#temporaryResident_noWorkPermit_other").is(":checked"),
                        immigrationStatus_other: $("[name=immigrationStatus_other]").val(),
                        immigrationDocumentNumber: $("[name=immigrationDocumentNumber]").val(),
                        periodInCanada: $("[name=periodInCanada]").find(":selected").text(),
                        legallyWorkInCanada_yes: $("#legallyWorkInCanada_yes").is(":checked"),
                        legallyWorkInCanada_no: $("#legallyWorkInCanada_no").is(":checked"),
                        legallyWorkInCanada_unknown: $("#legallyWorkInCanada_unknown").is(":checked"),
                        heardAboutUs: $("[name=heardAboutUs]").find(":selected").text(),
                        heardAboutUs_other: $("[name=heardAboutUs_other]").val(),
                        addEmailToDistributionList_yes: $("#addEmailToDistributionList_yes").is(":checked"),
                        addEmailToDistributionList_no: $("#addEmailToDistributionList_no").is(":checked"),
                        sourceOfIncome: $("[name=sourceOfIncome]").find(":selected").text(),
                        sourceOfIncome_other: $("[name=sourceOfIncome_other]").val()
                    };
                    console.log(content);
                    let permission = self.props.permissions[0];
                    if (permission.role === "admin" || permission.role === "staff") {
                        const profileId = permission.profile;
                        const submission = {
                            userId: self.props.submission.userId,
                            content
                        };
                        let response = self.props.editSubmission(
                            profileId,
                            submission,
                            self.props.submission._id
                        );
                        console.log(response);
                    }
                    self.props.history.push("/dashboard");
                } else {
                    self.props.history.push('/modules/submissions')
                }
            }
        })
    }

    render() {
        let isEditable = false;
        if (this.props.edit && this.props.edit === "true") {
            isEditable = true;
        }
        let submission = this.props.submission
        if (Object.keys(submission.content).length === 0) {
            return (
                <Spinner/>
            )
        }
        return (
            <div className="slim-mainpanel">
                <div className="container">
                    <div id="google_translate_element"/>

                    <div className="section-wrapper mg-t-20">
                        <label className="section-title">Registration Form</label>
                        <p className="mg-b-20 mg-sm-b-40">Please fill out the following information. </p>

                        <form id="immigrationForm" method="post" action="/forms">

                            <div className="form-group col-md-2">
                                <input readOnly type="hidden" name="fromForm" value={submission.content.fromForm}/>
                            </div>

                            <div id="wizard6">
                                <h3>Client Information</h3>
                                <section>
                                    <div className="form-row">
                                        <div className="form-group col-md-1">
                                            <label htmlFor="salutation">Salutation</label>
                                            <select className="form-control" id="salutation" name="salutation"
                                                    readOnly={!isEditable} defaultValue={submission.content.salutation}
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
                                                   defaultValue={submission.content.firstName} onChange={(e) => {
                                            }}/>
                                        </div>


                                        <div className="form-group col-md-4">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" name="lastName"
                                                   placeholder="Last Name" readOnly={!isEditable}
                                                   defaultValue={submission.content.lastName}/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="preferredName">Preferred Name (if different from First
                                                Name)</label>
                                            <input type="text" className="form-control" id="preferredName"
                                                   name="preferredName" readOnly={!isEditable}
                                                   defaultValue={submission.content.preferredName}
                                                   placeholder="Preferred First Name" onChange={(e) => {
                                            }}/>
                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="streetAddress">Street Address</label>
                                            <input type="text" className="form-control" id="streetAddress"
                                                   name="streetAddress" readOnly={!isEditable}
                                                   defaultValue={submission.content.streetAddress} onChange={(e) => {
                                            }}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="city">City</label>
                                            <input type="text" className="form-control" id="city" name="city"
                                                   readOnly={!isEditable} defaultValue={submission.content.city}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="province">Province</label>
                                            <select id="province" className="form-control" name="province"
                                                    readOnly={!isEditable} defaultValue={submission.content.province}
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
                                                   defaultValue={submission.content.postalCode} onChange={(e) => {
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="primaryPhoneNumber">Primary Phone Number</label>
                                            <input type="text" className="form-control" id="primaryPhoneNumber"
                                                   name="primaryPhoneNumber" readOnly={!isEditable}
                                                   defaultValue={submission.content.primaryPhoneNumber}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                        <div className="form-group col-md-1">
                                            <label htmlFor="primaryPhoneNumber_voicemail">Voicemail?</label>
                                            <select id="primaryPhoneNumber_voicemail" className="form-control"
                                                    name="primaryPhoneNumber_voicemail" readOnly={!isEditable}
                                                    defaultValue={submission.content.primaryPhoneNumber_voicemail}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="secondaryPhoneNumber">Secondary Phone Number</label>
                                            <input type="text" className="form-control" id="secondaryPhoneNumber"
                                                   name="secondaryPhoneNumber" readOnly={!isEditable}
                                                   defaultValue={submission.content.secondaryPhoneNumber}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                        <div className="form-group col-md-1">
                                            <label htmlFor="secondaryPhoneNumber_voicemail">Voicemail?</label>
                                            <select id="secondaryPhoneNumber_voicemail" className="form-control"
                                                    name="secondaryPhoneNumber_voicemail" readOnly={!isEditable}
                                                    defaultValue={submission.content.secondaryPhoneNumber_voicemail}
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
                                                   readOnly={!isEditable} defaultValue={submission.content.email}
                                                   placeholder="name@example.com" onChange={(e) => {
                                            }}/>

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="confirmEmail">Confirm Email</label>
                                            <input type="email" className="form-control" id="confirmEmail"
                                                   name="confirmEmail" readOnly={!isEditable}
                                                   defaultValue={submission.content.confirmEmail}
                                                   placeholder="name@example.com" onChange={(e) => {
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
                                            <input name="birthDate" id="birthDate" readOnly={!isEditable}
                                                   defaultValue={submission.content.birthDate} type="text"
                                                   className="form-control" placeholder="MM/DD/YYYY"
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <label htmlFor="gender">Gender</label>
                                            <select id="gender" className="form-control" name="gender"
                                                    readOnly={!isEditable} defaultValue={submission.content.gender}
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
                                                    defaultValue={submission.content.countryOfOrigin}
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
                                                    defaultValue={submission.content.nationality}
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
                                                   defaultValue={submission.content.nativeLanguage}
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
                                                    readOnly={!isEditable} defaultValue={submission.content.occupation}
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
                                            <input type="text" className="form-control" id="occupation_other"
                                                   name="occupation_other" readOnly={!isEditable}
                                                   defaultValue={submission.content.occupation_other}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="primaryOccupation">Name of Primary Profession</label>
                                            <input type="text" className="form-control" id="primaryOccupation"
                                                   name="primaryOccupation" readOnly={!isEditable}
                                                   defaultValue={submission.content.primaryOccupation}
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
                                                                   name="regulatedProfession" readOnly={!isEditable}
                                                                   checked={submission.content.regulatedProfession_yes}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">Yes</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="regulatedProfession_no"
                                                                   name="regulatedProfession" readOnly={!isEditable}
                                                                   checked={submission.content.regulatedProfession_no}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">No</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="regulatedProfession_unknown"
                                                                   name="regulatedProfession" readOnly={!isEditable}
                                                                   checked={submission.content.regulatedProfession_unknown}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
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
                                                    <input id="licensed_yes" name="licensed" readOnly={!isEditable}
                                                           checked={submission.content.licensed_yes} type="radio"
                                                           className="custom-control-input" onChange={(e) => {
                                                    }}
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_no" name="licensed" readOnly={!isEditable}
                                                           checked={submission.content.licensed_no} type="radio"
                                                           className="custom-control-input" onChange={(e) => {
                                                    }}/>
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_inProgress" name="licensed"
                                                           readOnly={!isEditable}
                                                           checked={submission.content.licensed_inProgress} type="radio"
                                                           className="custom-control-input" onChange={(e) => {
                                                    }}
                                                    />
                                                    <span className="custom-control-label">Licensing in Progress</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_unknown" name="licensed" readOnly={!isEditable}
                                                           checked={submission.content.licensed_unknown} type="radio"
                                                           className="custom-control-input" onChange={(e) => {
                                                    }}
                                                    />
                                                    <span className="custom-control-label">Unknown</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensed_na" name="licensed" readOnly={!isEditable}
                                                           checked={submission.content.licensed_na} type="radio"
                                                           className="custom-control-input" onChange={(e) => {
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
                                                    readOnly={!isEditable} defaultValue={submission.content.degree}
                                                    onChange={(e) => {
                                                    }}>
                                                <option value="">--</option>
                                                <option>PhD</option>
                                                <option>Masters</option>
                                                <option>Bachelor</option>
                                                <option>Certificate</option>
                                                <option>Diploma</option>
                                                <option>High School</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="degree_other">If Other, Specify</label>
                                            <input type="text" className="form-control" id="degree_other"
                                                   name="degree_other" readOnly={!isEditable}
                                                   defaultValue={submission.content.degree_other}
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
                                                    defaultValue={submission.content.fieldOfStudy}
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
                                                   defaultValue={submission.content.nameOfMajor}
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
                                                           name="postSecondaryOutsideCanada" readOnly={!isEditable}
                                                           checked={submission.content.postSecondaryOutsideCanada_yesSame}
                                                           type="radio" className="custom-control-input"
                                                           onChange={(e) => {
                                                           }}
                                                    />
                                                    <span className="custom-control-label">YES (same as above)</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="postSecondaryOutsideCanada_yesOther"
                                                           name="postSecondaryOutsideCanada" readOnly={!isEditable}
                                                           checked={submission.content.postSecondaryOutsideCanada_yesOther}
                                                           type="radio" className="custom-control-input"
                                                           onChange={(e) => {
                                                           }}/>
                                                    <span className="custom-control-label">YES (other)</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="postSecondaryOutsideCanada_no"
                                                           name="postSecondaryOutsideCanada" readOnly={!isEditable}
                                                           checked={submission.content.postSecondaryOutsideCanada_no}
                                                           type="radio" className="custom-control-input"
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
                                                    <input id="degreeEvaluated_yes" name="degreeEvaluated"
                                                           readOnly={!isEditable}
                                                           checked={submission.content.degreeEvaluated_yes} type="radio"
                                                           className="custom-control-input" onChange={(e) => {
                                                    }}
                                                    />
                                                    <span className="custom-control-label">YES</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="degreeEvaluated_no" name="degreeEvaluated"
                                                           readOnly={!isEditable}
                                                           checked={submission.content.degreeEvaluated_no} type="radio"
                                                           className="custom-control-input" onChange={(e) => {
                                                    }}/>
                                                    <span className="custom-control-label">NO</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="degreeEvaluated_na" name="degreeEvaluated"
                                                           readOnly={!isEditable}
                                                           checked={submission.content.degreeEvaluated_na} type="radio"
                                                           className="custom-control-input" onChange={(e) => {
                                                    }}/>
                                                    <span className="custom-control-label">N/A</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="degreeEvaluated_inProgress" name="degreeEvaluated"
                                                           readOnly={!isEditable}
                                                           checked={submission.content.degreeEvaluated_inProgress}
                                                           type="radio" className="custom-control-input"
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
                                                           readOnly={!isEditable}
                                                           checked={submission.content.securityClearance_yes}
                                                           type="radio" className="custom-control-input"
                                                           onChange={(e) => {
                                                           }}
                                                    />
                                                    <span className="custom-control-label">YES</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="securityClearance_no" name="securityClearance"
                                                           readOnly={!isEditable}
                                                           checked={submission.content.securityClearance_no}
                                                           type="radio" className="custom-control-input"
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
                                                    defaultValue={submission.content.foreignBornCanadian}
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
                                                <input name="landingDate_citizen" id="landingDate_citizen"
                                                       readOnly={!isEditable}
                                                       defaultValue={submission.content.landingDate_citizen} type="text"
                                                       className="form-control" placeholder="MM/DD/YYYY"
                                                       onChange={(e) => {
                                                       }}/>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="yearOfCitizenship">Year of Citizenship</label>
                                            <input type="text" className="form-control" id="yearOfCitizenship"
                                                   name="yearOfCitizenship" readOnly={!isEditable}
                                                   defaultValue={submission.content.yearOfCitizenship}
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
                                                    defaultValue={submission.content.permanentResidencyClass}
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
                                                       id="landingDate_permanentResident" readOnly={!isEditable}
                                                       defaultValue={submission.content.landingDate_permanentResident}
                                                       type="text" className="form-control" placeholder="MM/DD/YYYY"
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
                                                    defaultValue={submission.content.conventionRefugee}
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
                                                                   name="temporaryResident" readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_inlandRefugeeClaimant}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">Inland Refugee Claimant</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_foreignWorker"
                                                                   name="temporaryResident" readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_foreignWorker}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">Temporary Foreign Worker (Employer Sponsored)</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_liveInCaregiver"
                                                                   name="temporaryResident" readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_liveInCaregiver}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span
                                                                className="custom-control-label">Live-In Caregiver</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_protectedResident"
                                                                   name="temporaryResident" readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_protectedResident}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">Temporary Protected Resident</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_student"
                                                                   name="temporaryResident" readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_student}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">Student or Graduate Work Permit</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_other" name="temporaryResident"
                                                                   readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_other}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">Other</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_diplomat"
                                                                   name="temporaryResident" readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_diplomat}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
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
                                                                   name="temporaryResident_noWorkPermit"
                                                                   readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_noWorkPermit_inlandRefugee}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">Inland Refugee Claimant</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input
                                                                id="temporaryResident_noWorkPermit_internationalStudent"
                                                                name="temporaryResident_noWorkPermit"
                                                                readOnly={!isEditable}
                                                                checked={submission.content.temporaryResident_noWorkPermit_internationalStudent}
                                                                type="radio" className="custom-control-input"
                                                                onChange={(e) => {
                                                                }}/>
                                                            <span
                                                                className="custom-control-label">International Student</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_noWorkPermit_visitorVisa"
                                                                   name="temporaryResident_noWorkPermit"
                                                                   readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_noWorkPermit_visitorVisa}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">Visitor Visa</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_noWorkPermit_diplomat"
                                                                   name="temporaryResident_noWorkPermit"
                                                                   readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_noWorkPermit_diplomat}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">Diplomat</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="temporaryResident_noWorkPermit_other"
                                                                   name="temporaryResident_noWorkPermit"
                                                                   readOnly={!isEditable}
                                                                   checked={submission.content.temporaryResident_noWorkPermit_other}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
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
                                            <input type="text" className="form-control" id="immigrationStatus_other"
                                                   name="immigrationStatus_other" readOnly={!isEditable}
                                                   defaultValue={submission.content.immigrationStatus_other}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-8">
                                            <label htmlFor="immigrationDocumentNumber">Immigration Document
                                                Number:</label>
                                            <input type="text" className="form-control" id="immigrationDocumentNumber"
                                                   name="immigrationDocumentNumber" readOnly={!isEditable}
                                                   defaultValue={submission.content.immigrationDocumentNumber}
                                                   onChange={(e) => {
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="periodInCanada">How long have you been in Canada?</label>
                                            <select className="form-control" id="periodInCanada" name="periodInCanada"
                                                    readOnly={!isEditable}
                                                    defaultValue={submission.content.periodInCanada} onChange={(e) => {
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
                                                                   name="legallyWorkInCanada" readOnly={!isEditable}
                                                                   checked={submission.content.legallyWorkInCanada_yes}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">YES</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="legallyWorkInCanada_no"
                                                                   name="legallyWorkInCanada" readOnly={!isEditable}
                                                                   checked={submission.content.legallyWorkInCanada_no}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}/>
                                                            <span className="custom-control-label">NO</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="legallyWorkInCanada_unknown"
                                                                   name="legallyWorkInCanada" readOnly={!isEditable}
                                                                   checked={submission.content.legallyWorkInCanada_unknown}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
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
                                                    defaultValue={submission.content.heardAboutUs} onChange={(e) => {
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
                                            <input type="text" className="form-control" id="heardAboutUs_other"
                                                   name="heardAboutUs_other" readOnly={!isEditable}
                                                   defaultValue={submission.content.heardAboutUs_other}
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
                                                                   name="addEmailToDistributionList"
                                                                   readOnly={!isEditable}
                                                                   checked={submission.content.addEmailToDistributionList_yes}
                                                                   type="radio" className="custom-control-input"
                                                                   onChange={(e) => {
                                                                   }}
                                                            />
                                                            <span className="custom-control-label">YES</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="addEmailToDistributionList_no"
                                                                   name="addEmailToDistributionList"
                                                                   readOnly={!isEditable}
                                                                   checked={submission.content.addEmailToDistributionList_no}
                                                                   type="radio" className="custom-control-input"
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
                                                        defaultValue={submission.content.sourceOfIncome}
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
                                                <input type="text" className="form-control" id="sourceOfIncome_other"
                                                       name="sourceOfIncome_other" readOnly={!isEditable}
                                                       defaultValue={submission.content.sourceOfIncome_other}
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

export default connect(null, {editSubmission})(RegistrationSubmission)
