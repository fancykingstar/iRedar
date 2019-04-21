import React, { Component } from 'react';
import { connect } from 'react-redux'
import Spinner from '../../../../Elements/Spinner';

class FCRPLoanSubmission extends Component {
    componentDidUpdate() {
        window.$('#wizard6').steps({
            headerTag: 'h3',
            bodyTag: 'section',
            autoFocus: true,
            titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
            cssClass: 'wizard wizard-style-2',
            onFinished: async function (event, currentIndex) {
            }
        })

        window.$('#downloadButton').click(function (event) {
            let filename = window.landingDocumentName
            let text = window.landingDocumentString

            // download
            var element = document.createElement('a');
            element.setAttribute('href', text);
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }

    render() {
        let submission = this.props.submission
        if (Object.keys(submission.content).length === 0) {
            return (
                <Spinner />
            )
        }

        window.landingDocumentString = submission.content.landingDocumentString
        window.landingDocumentName = submission.content.landingDocumentName

        return (
            <div className="slim-mainpanel">
                <div className="container">
                    <div id="google_translate_element" />

                    <div className="section-wrapper mg-t-20">
                        <label className="section-title">FCRP Loan Initiative Intake & Assessment Form</label>
                        <p className="mg-b-20 mg-sm-b-40">Please fill out the following information. </p>

                        <form id="immigrationForm" method="post" action="/forms">

                            <div className="form-group col-md-2" >
                                <input type="hidden" name="fromForm" value="5bedaa68f65be80016ef5a19" />
                            </div>

                            <div id="wizard6">
                                <h3>Client Information</h3>
                                <section>
                                    <div className="form-row">
                                        <div className="form-group col-md-1">
                                            <label htmlFor="salutation">Salutation</label>
                                            <select className="form-control" id="salutation" name="salutation" readOnly defaultValue={submission.content.salutation}>
                                                <option value="">--</option>
                                                <option>Mr</option>
                                                <option>Mrs</option>
                                                <option>Ms.</option>
                                                <option>Dr.</option>
                                            </select>
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text" className="form-control" id="firstName" name="firstName" readOnly defaultValue={submission.content.firstName} placeholder="First Name" />
                                        </div>


                                        <div className="form-group col-md-4">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" name="lastName" readOnly defaultValue={submission.content.lastName} placeholder="Last Name" />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="preferredName">Preferred Name (if different from First Name)</label>
                                            <input type="text" className="form-control" id="preferredName" name="preferredName" readOnly defaultValue={submission.content.preferredName} placeholder="Preferred First Name" />
                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="streetAddress">Street Address</label>
                                            <input type="text" className="form-control" id="streetAddress" name="streetAddress" readOnly defaultValue={submission.content.streetAddress} />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="city">City</label>
                                            <input type="text" className="form-control" id="city" name="city" readOnly defaultValue={submission.content.city} />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="province">Province</label>
                                            <select id="province" className="form-control" name="province" readOnly defaultValue={submission.content.province}>
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
                                            <input type="text" className="form-control" id="postalCode" name="postalCode" readOnly defaultValue={submission.content.postalCode} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="primaryPhoneNumber">Primary Phone Number</label>
                                            <input type="text" className="form-control" id="primaryPhoneNumber" name="primaryPhoneNumber" readOnly defaultValue={submission.content.primaryPhoneNumber} />
                                        </div>
                                        <div className="form-group col-md-1">
                                            <label htmlFor="primaryPhoneNumber_voiceMail">Voicemail?</label>
                                            <select id="primaryPhoneNumber_voiceMail" className="form-control" name="primaryPhoneNumber_voiceMail" readOnly defaultValue={submission.content.primaryPhoneNumber_voiceMail}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="secondaryPhoneNumber">Secondary Phone Number</label>
                                            <input type="text" className="form-control" id="secondaryPhoneNumber" name="secondaryPhoneNumber" readOnly defaultValue={submission.content.secondaryPhoneNumber} />
                                        </div>
                                        <div className="form-group col-md-1">
                                            <label htmlFor="secondaryPhoneNumber_voicemail">Voicemail?</label>
                                            <select id="secondaryPhoneNumber_voicemail" className="form-control" name="secondaryPhoneNumber_voicemail" readOnly defaultValue={submission.content.secondaryPhoneNumber_voicemail}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="emailAddress">Email address</label>
                                            <input type="email" className="form-control" id="emailAddress" name="emailAddress" placeholder="name@example.com" readOnly defaultValue={submission.content.emailAddress} />

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="confirmEmailAddress">Confirm Email</label>
                                            <input type="email" className="form-control" id="confirmEmailAddress" name="confirmEmailAddress" placeholder="name@example.com" readOnly defaultValue={submission.content.confirmEmailAddress} />
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
                                            <input name="birthDate" id="birthDate" type="text" className="form-control" placeholder="MM/DD/YYYY" readOnly defaultValue={submission.content.birthDate} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <label htmlFor="gender">Gender</label>
                                            <select id="gender" className="form-control" name="gender" readOnly defaultValue={submission.content.gender}>
                                                <option value="">--</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Prefer not to disclose</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="countryOfOrigin">Country of Origin</label>
                                            <select id="countryOfOrigin" className="form-control" name="countryOfOrigin" readOnly defaultValue={submission.content.countryOfOrigin}>
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
                                            <select id="nationality" className="form-control" name="nationality" readOnly defaultValue={submission.content.nationality}>
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
                                            <input type="text" id="nativeLanguage" className="form-control" name="nativeLanguage" readOnly defaultValue={submission.content.nativeLanguage} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="maritalStatus">Marital Status</label>
                                            <select className="form-control" id="maritalStatus" name="maritalStatus" readOnly defaultValue={submission.content.maritalStatus}>
                                                <option value="">--</option>
                                                <option>Married/Common Law</option>
                                                <option>Single</option>
                                                <option>Widow</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="maritalStatus_other">If Other, specify</label>
                                            <input type="text" className="form-control" id="maritalStatus_other" name="maritalStatus_other" readOnly defaultValue={submission.content.maritalStatus_other} />
                                        </div>

                                    </div>
                                </section>

                                <h3>Immigration Status</h3>
                                <section>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="foreignBornCanadian">Foreign born Canadian?</label>
                                            <select className="form-control" id="foreignBornCanadian" name="foreignBornCanadian" readOnly defaultValue={submission.content.foreignBornCanadian}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="landingDate">Date of Landing</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                    </div>
                                                </div>
                                                <input name="landingDate" id="landingDate" type="text" className="form-control" placeholder="MM/DD/YYYY" readOnly defaultValue={submission.content.landingDate} />
                                            </div>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="yearOfCitizenship">Year of Citizenship</label>
                                            <input type="text" className="form-control" id="yearOfCitizenship" name="yearOfCitizenship" readOnly defaultValue={submission.content.yearOfCitizenship} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="permanentResidencyClass">Permanent Residence Class</label>
                                            <select className="form-control" id="permanentResidencyClass" name="permanentResidencyClass" readOnly defaultValue={submission.content.permanentResidencyClass}>
                                                <option value="">--</option>
                                                <option>Skilled Worker</option>
                                                <option>Family Class</option>
                                                <option>Refugee Class</option>
                                                <option>Live-in-Caregiver</option>
                                                <option>Economic Class</option>
                                                <option>Approved in principle</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="conventionRefugee">Are you A Convention Refugee?</label>
                                            <select className="form-control" id="conventionRefugee" name="conventionRefugee" readOnly defaultValue={submission.content.conventionRefugee}>
                                                <option value="">--</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="howDidYouHearAboutUs">How did you hear about FCRP?</label>
                                            <input type="text" className="form-control" id="howDidYouHearAboutUs" name="howDidYouHearAboutUs" readOnly defaultValue={submission.content.howDidYouHearAboutUs} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            {/* <label className="btn btn-default">Upload a copy of your Long-form landing document<input type="file" id="landingDocument" name="landingDocument" /></label> */}
                                            <label>Upload a copy of your Long-form landing document</label><br></br>
                                            {(submission.content.landingDocumentString &&
                                                <button id="downloadButton" type="button" className="btn btn-primary">Download</button>

                                            )}
                                        </div>
                                    </div>
                                </section>
                                <h3>Profession & Education</h3>
                                <section>
                                    <div className="form-row">
                                        <div className="form-group col-md-8">
                                            <label htmlFor="occupation">
                                                Please select your professional occupation or field from the selection below
                                            </label>
                                            <select className="form-control" id="occupation" name="occupation" readOnly defaultValue={submission.content.occupation}>
                                                <option value="">--</option>
                                                <option>Accountants</option>
                                                <option>Architects</option>
                                                <option>Audiologists and speech language pathologists</option>
                                                <option>Carpenters</option>
                                                <option>Dentists</option>
                                                <option>Electricians</option>
                                                <option>Engineers/IT</option>
                                                <option>Engineer technicians</option>
                                                <option>Geoscientists</option>
                                                <option>Heavy duty equipment technicians/Truck drivers</option>
                                                <option>Heavy equipment operators</option>
                                                <option>Lawyers</option>
                                                <option>Medical lab technicians</option>
                                                <option>Medical radiation technologists</option>
                                                <option>Midwives</option>
                                                <option>Occupational therapists</option>
                                                <option>Pharmacists</option>
                                                <option>Physicians/Vet</option>
                                                <option>Physiotherapists</option>
                                                <option>Practical nurses</option>
                                                <option>Psychologists</option>
                                                <option>Registered nurses</option>
                                                <option>Teachers</option>
                                                <option>Welders</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="primaryOccupation">Name of Primary Profession</label>
                                            <input type="text" className="form-control" id="primaryOccupation" name="primaryOccupation" readOnly defaultValue={submission.content.primaryOccupation} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <div className="row">
                                                <label className="col-form-label col-sm-4 text-md-left pt-sm-0">Is this a
                                          regulated profession?</label>
                                                <div className="col">
                                                    <div className="custom-controls-stacked">
                                                        <label className="custom-control custom-radio">
                                                            <input id="regulatedProfession_yes" name="regulatedProfession" readOnly checked={submission.content.regulatedProfession_yes} type="radio" className="custom-control-input" />
                                                            <span className="custom-control-label">Yes</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="regulatedProfession_no" name="regulatedProfession" readOnly checked={submission.content.regulatedProfession_no} type="radio" className="custom-control-input" />
                                                            <span className="custom-control-label">No</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input id="regulatedProfession_unknown" name="regulatedProfession" readOnly checked={submission.content.regulatedProfession_unknown} type="radio" className="custom-control-input"
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
                                                    <input id="licensedToPracticeInCanada_yes" name="licensedToPracticeInCanada" readOnly checked={submission.content.licensedToPracticeInCanada_yes} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensedToPracticeInCanada_no" name="licensedToPracticeInCanada" readOnly checked={submission.content.licensedToPracticeInCanada_no} type="radio" className="custom-control-input" />
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensedToPracticeInCanada_inProgres" name="licensedToPracticeInCanada" readOnly checked={submission.content.licensedToPracticeInCanada_inProgres} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">Licensing in Progress</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensedToPracticeInCanada_unknown" name="licensedToPracticeInCanada" readOnly checked={submission.content.licensedToPracticeInCanada_unknown} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">Unknown</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="licensedToPracticeInCanada_na" name="licensedToPracticeInCanada" readOnly checked={submission.content.licensedToPracticeInCanada_na} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">N/A</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="helpRequestedDomain">
                                                Which of the following do you need help with?
                              </label>
                                            <select className="form-control" id="helpRequestedDomain" name="helpRequestedDomain" readOnly defaultValue={submission.content.helpRequestedDomain}>
                                                <option value="">--</option>
                                                <option>Credential Assessment</option>
                                                <option>Loan Assistance</option>
                                                <option>Licensing</option>
                                                <option>Mentorship</option>
                                                <option>Training</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="helpRequestedDomain_other">If Other, Specify</label>
                                            <input type="email" className="form-control" id="helpRequestedDomain_other" name="helpRequestedDomain_other" readOnly defaultValue={submission.content.helpRequestedDomain_other} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <h5>Career Goals in Canada</h5>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="shortTermGoals">Short-term Goals</label>
                                            <input type="text" className="form-control" id="shortTermGoals" name="shortTermGoals" readOnly defaultValue={submission.content.shortTermGoals} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="longTermGoals">Long-term Goals</label>
                                            <input type="text" className="form-control" id="longTermGoals" name="longTermGoals" readOnly defaultValue={submission.content.longTermGoals} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="intendedOccupation">Intended Occupation</label>
                                            <input type="text" className="form-control" id="intendedOccupation" name="intendedOccupation" readOnly defaultValue={submission.content.intendedOccupation} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label className="col-form-label col-sm-4 text-md-left pt-sm-0">Is your education acquired from outside Canada?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="occupationFromOutsideCanada_yes" name="occupationFromOutsideCanada" readOnly checked={submission.content.occupationFromOutsideCanada_yes} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="occupationFromOutsideCanada_no" name="occupationFromOutsideCanada" readOnly checked={submission.content.occupationFromOutsideCanada_no} type="radio" className="custom-control-input" />
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="highestDegree">
                                                Please select your highest level of education
                                  </label>
                                            <select className="form-control" id="highestDegree" name="highestDegree" readOnly defaultValue={submission.content.highestDegree}>
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
                                            <label htmlFor="highestDegree_other">If Other, Specify</label>
                                            <input type="email" className="form-control" id="highestDegree_other" name="highestDegree_other" readOnly defaultValue={submission.content.highestDegree_other} />
                                        </div>
                                        <div className="form-row">
                                            <label className="col-form-label text-md-left pt-sm-0">English Language Assessed (CLB)?</label>
                                            <div className="col">
                                                <div className="custom-controls-stacked">
                                                    <label className="custom-control custom-radio">
                                                        <input id="englishLanguageAssessed_yes" name="englishLanguageAssessed" readOnly checked={submission.content.englishLanguageAssessed_yes} type="radio" className="custom-control-input"
                                                        />
                                                        <span className="custom-control-label">Yes</span>
                                                    </label>
                                                    <label className="custom-control custom-radio">
                                                        <input id="englishLanguageAssessed_no" name="englishLanguageAssessed" readOnly checked={submission.content.englishLanguageAssessed_no} type="radio" className="custom-control-input" />
                                                        <span className="custom-control-label">No</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <p>Canadian Language Benchmark (1-12)</p>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="englishLanguageAssessment_listening">Listening</label>
                                            <select className="form-control" id="englishLanguageAssessment_listening" name="englishLanguageAssessment_listening" readOnly defaultValue={submission.content.englishLanguageAssessment_listening}>
                                                <option value="">--</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="englishLanguageAssessment_speaking">Speaking</label>
                                            <select className="form-control" id="englishLanguageAssessment_speaking" name="englishLanguageAssessment_speaking" readOnly defaultValue={submission.content.englishLanguageAssessment_speaking}>
                                                <option value="">--</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="englishLanguageAssessment_reading">Reading</label>
                                            <select className="form-control" id="englishLanguageAssessment_reading" name="englishLanguageAssessment_reading" readOnly defaultValue={submission.content.englishLanguageAssessment_reading}>
                                                <option value="">--</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="englishLanguageAssessment_writing">Writing</label>
                                            <select className="form-control" id="englishLanguageAssessment_writing" name="englishLanguageAssessment_writing" readOnly defaultValue={submission.content.englishLanguageAssessment_writing}>
                                                <option value="">--</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="englishLanguageAssessment_assessmentDate">Date of Assessment</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                    </div>
                                                </div>
                                                <input name="englishLanguageAssessment_assessmentDate" id="englishLanguageAssessment_assessmentDate" readOnly defaultValue={submission.content.englishLanguageAssessment_assessmentDate} type="text" className="form-control" placeholder="MM/DD/YYYY" />
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

export default connect()(FCRPLoanSubmission)
