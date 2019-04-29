import React, { Component } from 'react';
import { connect } from 'react-redux'
import Spinner from '../../../../Elements/Spinner';

class IARAssessmentSubmission extends Component {
    componentDidUpdate() {
        var self = this
        window.$('#wizard6').steps({
            headerTag: 'h3',
            bodyTag: 'section',
            autoFocus: true,
            titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
            cssClass: 'wizard wizard-style-2',
            onFinished: async function (event, currentIndex) {
                self.props.history.push('/modules/submissions')
            }
        })
    }

    render() {
        let submission = this.props.submission
        if (Object.keys(submission.content).length === 0) {
            return (
                <Spinner />
            )
        }
        return (
            <div className="slim-mainpanel">
                <div className="container">
                    <div id="google_translate_element" />

                    <div className="section-wrapper mg-t-20">
                        <label className="section-title">Assessment (All Clients)</label>
                        <p className="mg-b-20 mg-sm-b-40">Please fill out the following information. </p>

                        <form id="immigrationForm" method="post" action="/forms">

                            <div className="form-group col-md-2">
                                <input type="hidden" name="fromForm" value="5bedaa96f65be80016ef5a1a" />
                            </div>

                            <div id="wizard6">
                                <h3>Employment</h3>
                                <section id="wizard6-p-0" role="tabpanel" aria-labelledby="wizard6-h-0" className="body current" aria-hidden="false">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCity">First Name</label>
                                            <input type="text" className="form-control" id="firstName" name="firstName" readOnly value={submission.content.firstName} placeholder="First Name" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCity">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" name="lastName" readOnly value={submission.content.lastName} placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="serviceRequested">Service Requested</label>
                                            <select className="form-control" id="serviceRequested" name="serviceRequested" readOnly defaultValue={submission.content.serviceRequested}>
                                                <option value="">--</option>
                                                <option>Employment Support</option>
                                                <option>Language Training</option>
                                                <option>Settlement</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="serviceRequested_other">If Other, specify</label>
                                            <input type="text" className="form-control" id="serviceRequested_other" name="serviceRequested_other" readOnly value={submission.content.serviceRequested_other} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="employmentStatus">Currently Employed?</label>
                                            <select className="form-control" id="employmentStatus" name="employmentStatus" readOnly defaultValue={submission.content.employmentStatus}>
                                                <option value="">--</option>
                                                <option>Yes, full-time</option>
                                                <option>Yes, part-time</option>
                                                <option>Yes, casual/on call</option>
                                                <option>Yes, several jobs</option>
                                                <option>No</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="employmentField">If currently employed</label>
                                            <select className="form-control" id="employmentField" name="employmentField" readOnly defaultValue={submission.content.employmentField}>
                                                <option value="">--</option>
                                                <option>In field</option>
                                                <option>In a related field</option>
                                                <option>Outside work field</option>
                                                <option>N/A</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputCity">Employer</label>
                                            <input type="text" className="form-control" id="employer" name="employer" readOnly defaultValue={submission.content.employer} />
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="confirmEmail">Job Title</label>
                                            <input type="email" className="form-control" id="jobTitle" name="jobTitle" readOnly defaultValue={submission.content.jobTitle} />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputAddress">Start Date</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                    </div>
                                                </div>
                                                <input id="emplymentStartDate" type="text" className="form-control"
                                                    placeholder="MM/DD/YYYY" name="emplymentStartDate" readOnly defaultValue={submission.content.emplymentStartDate} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <div className="row">
                                                <label className="col-form-label text-md-left pt-sm-0">Are You Currently Looking for Employment and/or Applying for Jobs?</label>
                                                <div className="col">
                                                    <div className="custom-controls-stacked">
                                                        <label className="custom-control custom-radio">
                                                            <input type="radio" className="custom-control-input"
                                                                id="seekingEmployment" name="seekingEmployment" readOnly checked={submission.content.seekingEmployment} />
                                                            <span className="custom-control-label">Yes</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input type="radio" className="custom-control-input" id="notSeekingEmployment" name="seekingEmployment" readOnly checked={submission.content.notSeekingEmployment} />
                                                            <span className="custom-control-label">No</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="barrierToJobs">What Barriers are Preventing You From Applying for Jobs or Getting A Job?</label>
                                            <select id="barrierToJobs" className="form-control" name="barrierToJobs" readOnly defaultValue={submission.content.barrierToJobs}>
                                                <option value="">--</option>
                                                <option>ChildCare</option>
                                                <option>Lack of information</option>
                                                <option>No job opportunities</option>
                                                <option>Transportation</option>
                                                <option>Health</option>
                                                <option>Low computer skills</option>
                                                <option>No occupational goal</option>
                                                <option>Lack of CND experience</option>
                                                <option>Interviews</option>
                                                <option>Low language skills</option>
                                                <option>Over-qualified</option>
                                                <option>Lack of network</option>
                                                <option>Resume</option>
                                                <option>No French skills</option>
                                                <option>Settlement issues</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="barrierToJobs_other">If Other, specify</label>
                                            <input type="text" className="form-control" id="barrierToJobs_other" name="barrierToJobs_other" readOnly defaultValue={submission.content.barrierToJobs_other} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="col-form-label text-md-left pt-sm-0">Attended Any Job Search Programs?</label>
                                            <div className="col">
                                                <div className="custom-controls-stacked">
                                                    <label className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input"
                                                            id="attendedJobSearchWorkshop_yes" name="attendedJobSearchWorkshop" readOnly checked={submission.content.attendedJobSearchWorkshop_yes} />
                                                        <span className="custom-control-label">Yes</span>
                                                    </label>
                                                    <label className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="attendedJobSearchWorkshop_no" name="attendedJobSearchWorkshop" readOnly checked={submission.content.attendedJobSearchWorkshop_no} />
                                                        <span className="custom-control-label">No</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="nameOfJobSearchProgram">Name of the Job Search Program</label>
                                            <input type="text" className="form-control" id="nameOfJobSearchProgram" name="nameOfJobSearchProgram" readOnly defaultValue={submission.content.nameOfJobSearchProgram} />
                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputState">What is Your Current Availability?</label>
                                            <div className="col">
                                                <div className="custom-controls-stacked">
                                                    <label className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input"
                                                            id="currentAvailability_anytime" name="currentAvailability" readOnly checked={submission.content.currentAvailability_anytime} />
                                                        <span className="custom-control-label">Anytime</span>
                                                    </label>
                                                    <label className="custom-control custom-radio">
                                                        <input id="currentAvailability_mornings" name="currentAvailability" type="radio" className="custom-control-input" readOnly checked={submission.content.currentAvailability_mornings} />
                                                        <span className="custom-control-label">Mornings</span>
                                                    </label>
                                                    <label className="custom-control custom-radio">
                                                        <input id="currentAvailability_afternoons" name="currentAvailability" type="radio" className="custom-control-input" readOnly checked={submission.content.currentAvailability_afternoons} />
                                                        <span className="custom-control-label">Afternoons</span>
                                                    </label>
                                                    <label className="custom-control custom-radio">
                                                        <input id="currentAvailability_evenings" name="currentAvailability" type="radio" className="custom-control-input" readOnly checked={submission.content.currentAvailability_evenings} />
                                                        <span className="custom-control-label">Evenings or weekends</span>
                                                    </label>
                                                    <label className="custom-control custom-radio">
                                                        <input id="currentAvailability_none" name="currentAvailability" type="radio" className="custom-control-input" readOnly checked={submission.content.currentAvailability_none} />
                                                        <span className="custom-control-label">Not currently available</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="inputAddress">If currently unavailable, will be available as of:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                    </div>
                                                </div>
                                                <input name="whenWillBeAvailable" id="whenWillBeAvailable" readOnly defaultValue={submission.content.whenWillBeAvailable} type="text" className="form-control" placeholder="MM/DD/YYYY" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <h3>Skills</h3>
                                <section id="wizard6-p-1" role="tabpanel" aria-labelledby="wizard6-h-1" className="body current"
                                    aria-hidden="false" >
                                    <h5>Language Skills</h5>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <p>Working fluency in the following languages (list also native language)</p>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <input type="text" className="form-control" id="workFluency_firstLanguage" name="workFluency_firstLanguage" readOnly defaultValue={submission.content.workFluency_firstLanguage} />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input type="text" className="form-control" id="workFluency_secondLanguage" name="workFluency_secondLanguage" readOnly defaultValue={submission.content.workFluency_secondLanguage} />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input type="text" className="form-control" id="workFluency_thirdLanguage" name="workFluency_thirdLanguage" readOnly defaultValue={submission.content.workFluency_thirdLanguage} />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input type="text" className="form-control" id="workFluency_fourthLanguage" name="workFluency_fourthLanguage" readOnly defaultValue={submission.content.workFluency_fourthLanguage} />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input type="text" className="form-control" id="workFluency_fifthLanguage" name="workFluency_fifthLanguage" readOnly defaultValue={submission.content.workFluency_fifthLanguage} />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input type="text" className="form-control" id="workFluency_sixthLanguage" name="workFluency_sixthLanguage" readOnly defaultValue={submission.content.workFluency_sixthLanguage} />
                                        </div>
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
                                    <div className="form-row">
                                        <p>Canadian Language Benchmark (1-12)</p>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <label htmlFor="exampleFormControlSelect1">Listening</label>
                                            <select className="form-control" id="englishLanguageAssessmentScore_listening" name="englishLanguageAssessmentScore_listening" readOnly defaultValue={submission.content.englishLanguageAssessmentScore_listening}>
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
                                        <div className="form-group col-md-2">
                                            <label htmlFor="exampleFormControlSelect1">Speaking</label>
                                            <select className="form-control" id="englishLanguageAssessmentScore_speaking" name="englishLanguageAssessmentScore_speaking" readOnly defaultValue={submission.content.englishLanguageAssessmentScore_speaking}>
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
                                        <div className="form-group col-md-2">
                                            <label htmlFor="exampleFormControlSelect1">Reading</label>
                                            <select className="form-control" id="englishLanguageAssessmentScore_reading" name="englishLanguageAssessmentScore_reading" readOnly defaultValue={submission.content.englishLanguageAssessmentScore_reading}>
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
                                        <div className="form-group col-md-2">
                                            <label htmlFor="exampleFormControlSelect1">Writing</label>
                                            <select className="form-control" id="englishLanguageAssessmentScore_writing" name="englishLanguageAssessmentScore_writing" readOnly defaultValue={submission.content.englishLanguageAssessmentScore_writing}>
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
                                            <label htmlFor="inputAddress">Date of Assessment</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                    </div>
                                                </div>
                                                <input name="englishLanguageAssessmentScore_assessmentDate" id="englishLanguageAssessmentScore_assessmentDate" type="text" className="form-control" placeholder="MM/DD/YYYY" readOnly defaultValue={submission.content.englishLanguageAssessmentScore_assessmentDate} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label className="col-form-label text-md-left pt-sm-0">French Language Assessed (CLB)?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="frenchLanguageAssessed_yes" name="frenchLanguageAssessed" type="radio" className="custom-control-input" readOnly checked={submission.content.frenchLanguageAssessed_yes}
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="frenchLanguageAssessed_no" name="frenchLanguageAssessed" type="radio" className="custom-control-input" readOnly checked={submission.content.frenchLanguageAssessed_no} />
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <p>Canadian Language Benchmark (1-12)</p>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <label htmlFor="exampleFormControlSelect1">Listening</label>
                                            <select className="form-control" id="frenchLanguageAssessment_listening" name="frenchLanguageAssessment_listening" readOnly defaultValue={submission.content.frenchLanguageAssessment_listening}>
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
                                        <div className="form-group col-md-2">
                                            <label htmlFor="exampleFormControlSelect1">Speaking</label>
                                            <select className="form-control" id="frenchLanguageAssessment_speaking" name="frenchLanguageAssessment_speaking" readOnly defaultValue={submission.content.frenchLanguageAssessment_speaking}>
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
                                        <div className="form-group col-md-2">
                                            <label htmlFor="exampleFormControlSelect1">Reading</label>
                                            <select className="form-control" id="frenchLanguageAssessment_reading" name="frenchLanguageAssessment_reading" readOnly defaultValue={submission.content.frenchLanguageAssessment_reading}>
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
                                        <div className="form-group col-md-2">
                                            <label htmlFor="exampleFormControlSelect1">Writing</label>
                                            <select className="form-control" id="frenchLanguageAssessment_writing" name="frenchLanguageAssessment_writing" readOnly defaultValue={submission.content.frenchLanguageAssessment_writing}>
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
                                            <label htmlFor="inputAddress">Date of Assessment</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                    </div>
                                                </div>
                                                <input name="frenchLanguageAssessment_assessmentDate" id="frenchLanguageAssessment_assessmentDate" readOnly defaultValue={submission.content.frenchLanguageAssessment_assessmentDate} type="text" className="form-control" placeholder="MM/DD/YYYY" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                    </div>
                                    <h5>Computer Skills</h5>
                                    <p>(for workshops / WLT courses intermediate level is required) </p>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="exampleFormControlSelect1">MS Word</label>
                                            <select className="form-control" id="msWord_skillLevel" name="msWord_skillLevel" readOnly defaultValue={submission.content.msWord_skillLevel}>
                                                <option>N/A</option>
                                                <option>Basic</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="exampleFormControlSelect1">Email</label>
                                            <select className="form-control" id="email_skillLevel" name="email_skillLevel" readOnly defaultValue={submission.content.email_skillLevel}>
                                                <option>N/A</option>
                                                <option>Basic</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="exampleFormControlSelect1">Internet</label>
                                            <select className="form-control" id="internet_skillLevel" name="internet_skillLevel" readOnly defaultValue={submission.content.internet_skillLevel}>
                                                <option>N/A</option>
                                                <option>Basic</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                <h3>Profession</h3>
                                <section id="wizard6-p-2" role="tabpanel" aria-labelledby="wizard6-h-2" className="body current"
                                    aria-hidden="false">
                                    <h5>Resume</h5>
                                    <div className="form-row">
                                        <label className="col-form-label text-md-left pt-sm-0">Did client bring resume?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="resumeBrought_yes" name="resumeBrought" readOnly checked={submission.content.resumeBrought_yes} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="resumeBrought_no" name="resumeBrought" readOnly checked={submission.content.resumeBrought_no} type="radio" className="custom-control-input" />
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputCity">Notes for improvement on resume:</label>
                                            <input type="text" className="form-control" id="improvementToResume" name="improvementToResume" readOnly defaultValue={submission.content.improvementToResume} />
                                        </div>
                                    </div>
                                    <h5>Work Experience</h5>
                                    <p>Describe work experience (or education if no work experience):</p>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="exampleFormControlSelect1">Years of experience in your primary profession/occupation:
                              </label>
                                            <select className="form-control" id="yearsOfExperience_primaryOccupation" name="yearsOfExperience_primaryOccupation" readOnly defaultValue={submission.content.yearsOfExperience_primaryOccupation}>
                                                <option value="">--</option>
                                                <option>&lt; 3 years</option>
                                                <option>3-5 years</option>
                                                <option>6-10 years</option>
                                                <option>11-20 years</option>
                                                <option>21+ years</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="exampleFormControlSelect1">Secondary occupation or more, if applicable:</label>
                                            <select className="form-control" id="yearsOfExperience_secondaryOccupation" name="yearsOfExperience_secondaryOccupation" readOnly defaultValue={submission.content.yearsOfExperience_secondaryOccupation}>
                                                <option value="">--</option>
                                                <option>&#60; 3 years</option>
                                                <option>3-5 years</option>
                                                <option>6-10 years</option>
                                                <option>11-20 years</option>
                                                <option>21+ years</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="exampleFormControlSelect1">Length of time in Canada not working in field?</label>
                                            <select className="form-control" id="periodInCanadaWithoutWorkInPrimaryField" name="periodInCanadaWithoutWorkInPrimaryField" readOnly defaultValue={submission.content.periodInCanadaWithoutWorkInPrimaryField}>
                                                <option value="">--</option>
                                                <option>&#60; 1 year</option>
                                                <option>1-3 years</option>
                                                <option>4-5 years</option>
                                                <option>5+ years</option>
                                            </select>
                                        </div>
                                    </div>
                                    <h5>Career Goals in Canada</h5>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputCity">Short-term Goals</label>
                                            <input type="text" className="form-control" id="shortTermGoals" name="shortTermGoals" readOnly defaultValue={submission.content.shortTermGoals} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputCity">Long-term Goals</label>
                                            <input type="text" className="form-control" id="longTermGoals" name="longTermGoals" readOnly defaultValue={submission.content.longTermGoals} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputCity">Intended Occupation</label>
                                            <input type="text" className="form-control" id="intendedOccupation" name="intendedOccupation" readOnly defaultValue={submission.content.intendedOccupation} />
                                        </div>
                                    </div>
                                    <h5>Knowledge of Labour Market</h5>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputCity">Where (geographical location) currently looking for work opportunities in field?</label>
                                            <input type="text" className="form-control" id="desiredJobLocation" name="desiredJobLocation" readOnly defaultValue={submission.content.desiredJobLocation} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputCity">What level of knowledge about the occupation / industry in Ottawa? (names of companies, labour market demand, salary, etc)</label>
                                            <input type="text" className="form-control" id="levelOfKnowledgeOfIndustry" name="levelOfKnowledgeOfIndustry" readOnly defaultValue={submission.content.levelOfKnowledgeOfIndustry} />
                                        </div>
                                    </div>
                                    <h5>Job Search Methods and Networking</h5>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputCity">What job search methods are currently in use?</label>
                                            <input type="text" className="form-control" id="usedJobSearchMethods" name="usedJobSearchMethods" readOnly defaultValue={submission.content.usedJobSearchMethods} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label className="col-form-label text-md-left pt-sm-0">Have you been able to connect with people in field in Ottawa/Ontario?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="connectedWithPeopleInDesiredField_yes" name="connectedWithPeopleInDesiredField" readOnly checked={submission.content.connectedWithPeopleInDesiredField_yes} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="connectedWithPeopleInDesiredField_no" name="connectedWithPeopleInDesiredField" readOnly checked={submission.content.connectedWithPeopleInDesiredField_no} type="radio" className="custom-control-input" />
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <h5>Interviewing: Getting the Job</h5>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="exampleFormControlSelect1">Number of job application (in the past month)</label>
                                            <select className="form-control" id="numberOfJobApplication" name="numberOfJobApplication" readOnly defaultValue={submission.content.numberOfJobApplication}>
                                                <option value="">--</option>
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <label className="col-form-label text-md-left pt-sm-0">Any interviews?</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="interviews_yes" name="interviews" readOnly checked={submission.content.interviews_yes} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="interviews_no" name="interviews" readOnly checked={submission.content.interviews_no} type="radio" className="custom-control-input" />
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="exampleFormControlSelect1">Numbers of interviews:</label>
                                            <select className="form-control" id="numberOfInterviews" name="numberOfInterviews" readOnly defaultValue={submission.content.numberOfInterviews}>
                                                <option value="">--</option>
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10+</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputCity">Thoughts / Comments / Concerns regarding interviews??</label>
                                            <input type="text" className="form-control" id="thoughtsAndComments" name="thoughtsAndComments" readOnly defaultValue={submission.content.thoughtsAndComments} />
                                        </div>
                                    </div>
                                    <h5>Optional</h5>
                                    <p>(For clients who you feel are job ready and can be referred to OJMN directly from IAR)</p>

                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="hasResearchedTheField" name="hasResearchedTheField"  checked={submission.content.hasResearchedTheField} />
                                        <label className="form-check-label" htmlFor="hasResearchedTheField">
                                            has researched the field/industry
                              </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="isSearching" name="isSearching"  checked={submission.content.isSearching} />
                                        <label className="form-check-label" htmlFor="isSearching">
                                            is searching for a comparable job in his/her field in Canada
                            </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="hasTransferableSkills" name="hasTransferableSkills"  checked={submission.content.hasTransferableSkills} />
                                        <label className="form-check-label" htmlFor="hasTransferableSkills">
                                            has transferable skills and demonstrates a willingness to learn
                            </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="hasStrongResume" name="hasStrongResume"  checked={submission.content.hasStrongResume} />
                                        <label className="form-check-label" htmlFor="hasStrongResume">
                                            has a strong resume detailing qualifications and competencies
                            </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="ableToTargetResumeforOpportunities" name="ableToTargetResumeforOpportunities"  checked={submission.content.ableToTargetResumeforOpportunities} />
                                        <label className="form-check-label" htmlFor="ableToTargetResumeforOpportunities">
                                            is able to target his/her resume for posted job opportunities
                            </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="canUseSTAR" name="canUseSTAR"  checked={submission.content.canUseSTAR} />
                                        <label className="form-check-label" htmlFor="canUseSTAR">
                                            can use STAR technique when answering interview questions
                            </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="positiveAttitude" name="positiveAttitude"  checked={submission.content.positiveAttitude} />
                                        <label className="form-check-label" htmlFor="positiveAttitude">
                                            demonstrates a positive attitude
                            </label>
                                    </div>
                                </section>

                                <h3>Overall Assessment</h3>
                                <section id="wizard6-p-2" role="tabpanel" aria-labelledby="wizard6-h-2" className="body current"
                                    aria-hidden="false" >

                                    <h5>Overall Client Assessment: Assess client’s current job search status using the points below.</h5>
                                    <p>Check one of the three options below and create the client action plan:</p>
                                    <div className="form-row">
                                        <div className="form-check form-group">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="elegibleForJobSearchWorkshop" name="elegibleForJobSearchWorkshop"  checked={submission.content.elegibleForJobSearchWorkshop} />
                                            <label className="form-check-label" htmlFor="elegibleForJobSearchWorkshop">
                                                Client is eligible and suitable for Job Search Workshop (JSW) and will be referred
                            </label>
                                        </div>
                                    </div>
                                    <p>If NOT referred to JSW, please indicate why:</p>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="referredToCareerAccessForNewcomers" name="referredToCareerAccessForNewcomers"  checked={submission.content.referredToCareerAccessForNewcomers} />
                                        <label className="form-check-label" htmlFor="referredToCareerAccessForNewcomers">
                                            Client is not eligible for JSW, but will be referred to Career Access for Newcomers (CAN)
                            </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="referredToRoadmapToEmployment" name="referredToRoadmapToEmployment"  checked={submission.content.referredToRoadmapToEmployment} />
                                        <label className="form-check-label" htmlFor="referredToRoadmapToEmployment">
                                            Client is not suitable for JSW or CAN, but will be referred to Roadmap to Employment (RTE)
                            </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred" name="clientNotReferred"  checked={submission.content.clientNotReferred} />
                                        <label className="form-check-label" htmlFor="clientNotReferred">
                                            Client will not be referred to JSW, CAN, or RTE because …
                            </label>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-check form-group col-md-2">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_attendingSchool" name="clientNotReferred_attendingSchool"  checked={submission.content.clientNotReferred_attendingSchool} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_attendingSchool">
                                                Attending school
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-2">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_languageSkills" name="clientNotReferred_languageSkills"  checked={submission.content.clientNotReferred_languageSkills} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_languageSkills">
                                                Language skills
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-2">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_childCare" name="clientNotReferred_childCare"  checked={submission.content.clientNotReferred_childCare} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_childCare">
                                                Childcare needs
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-3">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_noOccupationGoal" name="clientNotReferred_noOccupationGoal"  checked={submission.content.clientNotReferred_noOccupationGoal} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_noOccupationGoal">
                                                No occupational goal
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-2">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_transportation" name="clientNotReferred_transportation"  checked={submission.content.clientNotReferred_transportation} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_transportation">
                                                Transportation
                            </label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-check form-group col-md-2">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_health" name="clientNotReferred_health"  checked={submission.content.clientNotReferred_health} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_health">
                                                Health
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-3">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_unsuitableExpectation" name="clientNotReferred_unsuitableExpectation"  checked={submission.content.clientNotReferred_unsuitableExpectation} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_unsuitableExpectation">
                                                Unsuitable expectations
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-3">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_noTimeForAssignments" name="clientNotReferred_noTimeForAssignments"  checked={submission.content.clientNotReferred_noTimeForAssignments} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_noTimeForAssignments">
                                                No time for assignments
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-2">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_needsJobQuickly" name="clientNotReferred_needsJobQuickly"  checked={submission.content.clientNotReferred_needsJobQuickly} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_needsJobQuickly">
                                                Needs job quickly
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-2">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_lowComputerSkills" name="clientNotReferred_lowComputerSkills"  checked={submission.content.clientNotReferred_lowComputerSkills} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_lowComputerSkills">
                                                No/low computer skills
                            </label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-check form-group col-md-6">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_limitedInterests" name="clientNotReferred_limitedInterests"  checked={submission.content.clientNotReferred_limitedInterests} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_limitedInterests">
                                                Only interested in specific referrals (OJMN, FINP, WLT, etc.)
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-4">
                                            <input className="form-check-input" type="checkbox" readOnly disabled="true" value="" id="clientNotReferred_directReferrals" name="clientNotReferred_directReferrals"  checked={submission.content.clientNotReferred_directReferrals} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_directReferrals">
                                                Direct referral to OJMN and/or NEEP
                            </label>
                                        </div>
                                        <div className="form-check form-group  col-md-2">
                                            <input className="form-check-input" type="checkbox " readOnly disabled="true" value="" id="clientNotReferred_other" name="clientNotReferred_other" checked={submission.content.clientNotReferred_other} />
                                            <label className="form-check-label" htmlFor="clientNotReferred_other">
                                                Other (please specify):
                            </label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label className="col-form-label text-md-left pt-sm-0">In order to access World Skills services, client needs childcare services (for children 19 months old to 13 years old)</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="childCareRequested_yes" name="childCareRequested" type="radio" className="custom-control-input" readOnly checked={submission.content.childCareRequested_yes}
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="childCareRequested_no" name="childCareRequested" type="radio" className="custom-control-input" readOnly checked={submission.content.childCareRequested_no} />
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label className="col-form-label text-md-left pt-sm-0">Client is eligible for FINP</label>
                                        <div className="col">
                                            <div className="custom-controls-stacked">
                                                <label className="custom-control custom-radio">
                                                    <input id="eligibleForFINP_yes" name="eligibleForFINP" readOnly checked={submission.content.eligibleForFINP_yes} type="radio" className="custom-control-input"
                                                    />
                                                    <span className="custom-control-label">Yes</span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input id="eligibleForFINP_no" name="eligibleForFINP" readOnly checked={submission.content.eligibleForFINP_no} type="radio" className="custom-control-input" />
                                                    <span className="custom-control-label">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <h3>Action Plan</h3>
                                <section id="wizard6-p-2" role="tabpanel" aria-labelledby="wizard6-h-2" className="body current"
                                    aria-hidden="false" >
                                    <h5>While completing the Action plan:</h5>
                                    <div className="form-check form-group">
                                        <input id="actionPlanCheckBox_one" name="actionPlanCheckBox_one" readOnly disabled="true" className="form-check-input" type="checkbox"  value="" checked={submission.content.actionPlanCheckBox_one} />
                                        <label className="form-check-label" htmlFor="actionPlanCheckBox_one">
                                            Clarify the services our organization provides and the level of time and commitment necessary for successful program completion.
                            </label>
                                    </div>
                                    <div className="form-check form-group">
                                        <input id="actionPlanCheckBox_two" name="actionPlanCheckBox_two" readOnly disabled="true" className="form-check-input" type="checkbox" value="" checked={submission.content.actionPlanCheckBox_two} />
                                        <label className="form-check-label" htmlFor="actionPlanCheckBox_two">
                                            Ensure that client is clear about the information they received and they are satisfied with the Action Plan.
                            </label>
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

export default connect()(IARAssessmentSubmission)
