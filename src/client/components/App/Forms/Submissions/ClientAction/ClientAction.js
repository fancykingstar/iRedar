import React, { Component } from 'react';
import { connect } from 'react-redux'
import Spinner from '../../../../Elements/Spinner';

class ClientActionSubmission extends Component {
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
    const {
      firstName,
      lastName,
      fromForm,
      workshopOne,
      workshopTwo,
      workshopThree,
      workshopFour,
      workshopFive,
      workshopSix,
      workshopSeven,
      workshopEight,
      workshopNine,
      workshopTen,
      workshopTen1,
      workshopTen2,
      workshopTen3,
      workshopTen4,
      workshopEleven,
      workshopTwelve,
      workshopThirteen,
      workshopFourteen,
      workshopFifteen,
      workshopSixteen,
      workshopSeventeen,
      workshopEighteen,
      workshopNineteen,
      workshopTwenty,
      workshopTwentyOne,
      workshopTwentyTwo,
      workshopTwentyThree,
      workshopTwentyFour,
      workshopTwentyFive,
      workshopTwentySix,
      workshopTwentySeven,
      workshopTwentyEight,
      workshopTwentyNine,
      workshopThirty,
      workshopThirtyOne,
      workshopThirtyTwo,
      workshopThirtyThree,
      workshopThirtyFour,
      workshopThirtyFive,
      workshopThirtySix,
      workshopThirtySeven
    } = submission.content;

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
            <label className="section-title">Client Action Plan</label>
            <p className="mg-b-20 mg-sm-b-40">
              Based on your assessment, the following programs have been
              recommended for you:
        </p>

            <form>
              <div className="form-group col-md-2">
                <input
                  readOnly
                  type="hidden"
                  name="fromForm"
                  value={fromForm}
                />
              </div>

              <div id="wizard6" className="wizard wizard-style-2">
                <h3>SERVICES PROVIDED BY WORLD SKILLS</h3>
                <section
                  id="wizard6-p-0"
                  role="tabpanel"
                  aria-labelledby="wizard6-h-0"
                  className="body current"
                  aria-hidden="false"
                >
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputFirstName">First Name</label>
                      <input
                        readOnly
                        disabled="true"
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={firstName}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputLastName">Last Name</label>
                      <input
                        readOnly
                        disabled="true"
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={lastName}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <h5>
                    Based on your assessment, the following programs have been
                    recommended for you:
              </h5>
                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      id="workshopOne"
                      name="workshopOne"
                      checked={workshopOne}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Job Search Workshop (JSW) in English by CCI & IWSO, JFS
                        & OCISO, LASSA & SCFS. Module 1 – 1 week, 4 consecutive
                        half days.
                  </strong>
                      <p>
                        (If you have been referred to any of these workshops,
                        will receive an email invitation to the next scheduled
                        workshop from World Skills.)
                  </p>
                    </label>
                  </div>
                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwo}
                      id="workshopTwo"
                      name="workshopTwo"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Job Search Workshop (JSW) in English by CCI & IWSO, JFS
                        & OCISO, LASSA & SCFS. Module 2 – 1 week, 4 consecutive
                        half days.
                  </strong>
                      <p>
                        (If you have been referred to any of these workshops,
                        will receive an email invitation to the next scheduled
                        workshop from World Skills.)
                  </p>
                    </label>
                  </div>
                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThree}
                      id="workshopThree"
                      name="workshopThree"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Job Search Workshop (JSW) in English by OCCSC. Module 1
                        – 2 weeks, 2 afternoons each week.
                  </strong>
                      <p>
                        (If you have been referred to any of these workshops,
                        will receive an email invitation to the next scheduled
                        workshop from World Skills.)
                  </p>
                    </label>
                  </div>
                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopFour}
                      id="workshopFour"
                      name="workshopFour"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Job Search Workshop (JSW) in English by OCCSC. Module 2
                        – 2 weeks, 2 afternoons each week.
                  </strong>
                      <p>
                        (If you have been referred to any of these workshops,
                        will receive an email invitation to the next scheduled
                        workshop from World Skills.)
                  </p>
                    </label>
                  </div>
                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopFive}
                      id="workshopFive"
                      name="workshopFive"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Job Search Workshop (JSW) in French at 219 Argyle Ave.
                        Module 1 – 1 week, 4 consecutive afternoons.
                  </strong>
                      <p>
                        (If you have been referred to any of these workshops,
                        will receive an email invitation to the next scheduled
                        workshop from World Skills.)
                  </p>
                    </label>
                  </div>
                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopSix}
                      id="workshopSix"
                      name="workshopSix"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Job Search Workshop (JSW) in French at 219 Argyle Ave.
                        Module 2 – 1 week, 4 consecutive afternoons.
                  </strong>
                      <p>
                        (If you have been referred to any of these workshops,
                        will receive an email invitation to the next scheduled
                        workshop from World Skills.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopSeven}
                      id="workshopSeven"
                      name="workshopSeven"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Career Access for Newcomers (CAN) in English only at
                        Argyle Avenue, 3rd floor. 5 half days.
                  </strong>
                      <p>
                        (If you have been referred to any of these workshops,
                        will receive an email invitation to the next scheduled
                        workshop from World Skills.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopEight}
                      id="workshopEight"
                      name="workshopEight"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Roadmap to Employment (RTE) workshops for clients with
                        CLB 4 –.
                  </strong>
                      <p>
                        (You have been referred and you will be invited to the
                        next scheduled workshop.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopNine}
                      id="workshopNine"
                      name="workshopNine"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Employment Counselling – English or French at 219 Argyle
                        Avenue, 3rd floor.
                  </strong>
                      <p>
                        (If you have been referred, you will receive a phone
                        call or email directly from the Employment Counsellor.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTen}
                      id="workshopTen"
                      name="workshopTen"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Enhanced Language Training at World Skills, 219 Argyle
                        Avenue, 3rd floor.
                  </strong>
                      <p>
                        (If you have been referred, you will receive an email
                        invitation to the next scheduled ELT from World Skills.)
                  </p>
                    </label>
                  </div>
                  <div className="form-row">
                    <div className="form-check form-group col-md-2">
                      <input
                          readOnly
                          disabled="true"
                        className="form-check-input"
                        type="checkbox"
                        checked={workshopTen1}
                        id="workshopTen1"
                        name="workshopTen1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="workshopTen1"
                      >
                        Office Administration
                  </label>
                    </div>
                    <div className="form-check form-group  col-md-2">
                      <input
                          readOnly
                          disabled="true"
                        className="form-check-input"
                        type="checkbox"
                        checked={workshopTen2}
                        id="workshopTen2"
                        name="workshopTen2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="workshopTen2"
                      >
                        Entrepreneurs
                  </label>
                    </div>
                    <div className="form-check form-group  col-md-4">
                      <input
                          readOnly
                          disabled="true"
                        className="form-check-input"
                        type="checkbox"
                        checked={workshopTen3}
                        id="workshopTen3"
                        name="workshopTen3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="workshopTen3"
                      >
                        Professional Writing and Oral Communication Skills Part
                        I
                  </label>
                    </div>
                    <div className="form-check form-group  col-md-4">
                      <input
                          readOnly
                          disabled="true"
                        className="form-check-input"
                        type="checkbox"
                        checked={workshopTen4}
                        id="workshopTen4"
                        name="workshopTen4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="workshopTen4"
                      >
                        Professional Writing and Oral Communication Skills Part
                        II
                  </label>
                    </div>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopEleven}
                      id="workshopEleven"
                      name="workshopEleven"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Sector Specialist at 219 Argyle Ave, 1st floor or 100
                        Constellation Cr, 2nd floor East.
                  </strong>
                      <p>
                        (If you have been referred, you will receive an email or
                        phone call from the Sector Specialist.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwelve}
                      id="workshopTwelve"
                      name="workshopTwelve"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Career Transitions for International Health
                        Professionals (IHP).
                  </strong>
                      <p>
                        (If you have been referred, you will receive an email or
                        phone call from IHP program staff.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThirteen}
                      id="workshopThirteen"
                      name="workshopThirteen"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Ottawa Job Match Network (OJMN).</strong>
                      <p>
                        (If you have been referred, you will receive an email or
                        phone call from a Job Match Specialist (JMS).)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopFourteen}
                      id="workshopFourteen"
                      name="workshopFourteen"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Federal Internships for Newcomers Program (FINP).
                  </strong>
                      <p>
                        (If you have been referred, you will receive an email or
                        phone call from the FINP Specialist.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopFifteen}
                      id="workshopFifteen"
                      name="workshopFifteen"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Workshop “Introduction to Public Service.</strong>
                      <p>
                        (If you have been referred, you will receive an email or
                        phone call from the FINP Specialist.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopSixteen}
                      id="workshopSixteen"
                      name="workshopSixteen"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Professional and Employer Events.</strong>
                      <p>
                        (If you have been referred, you will receive event
                        invitations and info via email from the our staff.)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopSeventeen}
                      id="workshopSeventeen"
                      name="workshopSeventeen"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Employment Resource Centre (ERC) at 219 Argyle Ave,
                        ground floor.
                  </strong>
                      <p>
                        (The ERC is open Monday-Friday from 9:00 am-4:30 pm.
                        (Closed for lunch from noon-1pm).)
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopEighteen}
                      id="workshopEighteen"
                      name="workshopEighteen"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Resume Clinic.</strong>
                      <p>
                        If you have been referred, you will receive an email or
                        phone call from the Coordinator of Volunteer Services.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopNineteen}
                      id="workshopNineteen"
                      name="workshopNineteen"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Interview Roulette.</strong>
                      <p>
                        If you have been referred, you will receive an email or
                        phone call from the Coordinator of Volunteer Services.
                  </p>
                    </label>
                  </div>
                </section>

                <h3>
                  SERVICES PROVIDED BY LASI PARTNERS AND OTHER COMMUNITY
                  AGENCIES
            </h3>
                <section
                  id="wizard6-p-2"
                  role="tabpanel"
                  aria-labelledby="wizard6-h-2"
                  className="body current"
                  aria-hidden="false"
                  style={{ display: 'block' }}
                >
                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwenty}
                      id="workshopTwenty"
                      name="workshopTwenty"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        OCISO Mentorship Program OCISO, 945 Wellington Street
                        West.
                  </strong>
                      <p>
                        Please contact Mika Chen Meisner, Mentorship Facilitator
                        | 945 Wellington St. West Tel: 613-725-0202, Direct:
                        613-725-5671 ext. 332 | Email: mmeisner@ociso.org.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentyOne}
                      id="workshopTwentyOne"
                      name="workshopTwentyOne"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        MAPLE Project (Mentorship in Action – M.I.A.) OCCSC, 400
                        Cooper St., suite 2000.
                  </strong>
                      <p>
                        Please contact Lydia U Phone: 613-235-4875 ext. 151.
                        Email: Lydia.u@in-tac.ca.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentyTwo}
                      id="workshopTwentyTwo"
                      name="workshopTwentyTwo"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Bridging Programs for IT & Accounting Professionals
                        In-Tac, 400 Cooper St., suite 2000
                  </strong>
                      <p>
                        Please contact Song Guo, Training Coordinator Phone:
                        613-235-4875 ext. 138. Email: song.guo@in-tac.ca.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentyThree}
                      id="workshopTwentyThree"
                      name="workshopTwentyThree"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Ottawa Community Loan Fund (OCLF), 308 - 2211 Riverside
                        Drive, Ottawa, Ontario.
                  </strong>
                      <p>
                        Please visit OCLF website at http://oclf.org or contact
                        OCLF Phone: 613-366-2159. Email: info@oclf.org.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentyFour}
                      id="workshopTwentyFour"
                      name="workshopTwentyFour"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Y Employment Access Centre (YEAC), 180 Argyle Avenue,
                        4th floor. 1642 Merivale Rd.
                  </strong>
                      <p>
                        Please contact YEAC to book an appointment 180 Argyle
                        Ave. 613-788-5001 ext. 5123 1642 Merivale Rd.
                        613-688-2150.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentyFive}
                      id="workshopTwentyFive"
                      name="workshopTwentyFive"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Language Assessment and Referral Centre (LARC) Central
                        location, 240 Catherine St., 3rd Floor West Location
                        1642 Merivale Road, 2nd Floor (Merivale Mall).
                  </strong>
                      <p>
                        Please contact LARC Phone: 613-238-5462 (Catherine St.)
                        & 613-688-2150 (Merivale) Based on your assessment
                        results and your language needs, you will be referred to
                        language training courses.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentySix}
                      id="workshopTwentySix"
                      name="workshopTwentySix"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Suit his Style – Professional attires for men.
                  </strong>
                      <p>
                        You need to be referred and the agency will contact you.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentySeven}
                      id="workshopTwentySeven"
                      name="workshopTwentySeven"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Dress for Success – Professional attire for women.
                  </strong>
                      <p>
                        You need to be referred and the agency will contact you.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentyEight}
                      id="workshopTwentyEight"
                      name="workshopTwentyEight"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Volunteering.</strong>
                      <p>
                        Visit Volunteer Ottawa website for listings
                        www.volunteerottawa.ca.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopTwentyNine}
                      id="workshopTwentyNine"
                      name="workshopTwentyNine"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Job Search Websites.</strong>
                      <p>
                        Multiple options, for example: Charity Village:
                        www.charityvillage.org, Workopolis: www.workopolis.com,
                        Monster: www.monster.ca, Job Bank: www.jobbank.gc.ca,
                        Peter’s New Jobs: www.petersnewjobs.com, Working in
                        Canada tool: www.workingincanada.gc.ca, Eluta:
                        www.eluta.ca
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThirty}
                      id="workshopThirty"
                      name="workshopThirty"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Employment Ontario (EO).</strong>
                      <p>
                        Please visit EO website to find the nearest location:
                        https://www.ontario.ca/page/employment-ontario.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThirtyOne}
                      id="workshopThirtyOne"
                      name="workshopThirtyOne"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Networking.</strong>
                      <p>
                        Multiple options in Ottawa, for example:
                        www.eventbrite.ca/directory/Canada/Ottawa/meetings/.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThirtyTwo}
                      id="workshopThirtyTwo"
                      name="workshopThirtyTwo"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>College or University.</strong>
                      <p>
                        Multiple options, please contact the chosen institution.
                  </p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThirtyThree}
                      id="workshopThirtyThree"
                      name="workshopThirtyThree"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Computer Courses.</strong>
                      <p>Multiple options, please contact the chosen agency</p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThirtyFour}
                      id="workshopThirtyFour"
                      name="workshopThirtyFour"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Settlement Services.</strong>
                      <p>Multiple options, please contact the chosen agency.</p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThirtyFive}
                      id="workshopThirtyFive"
                      name="workshopThirtyFive"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>Recruitment Agencies.</strong>
                      <p>Multiple options, please contact the chosen agency.</p>
                    </label>
                  </div>

                  <div className="form-check form-group">
                    <input
                        readOnly
                        disabled="true"
                      className="form-check-input"
                      type="checkbox"
                      checked={workshopThirtySix}
                      id="workshopThirtySix"
                      name="workshopThirtySix"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <strong>
                        Self-employment/entrepreneur programs & services.
                  </strong>
                      <p>Multiple options, please contact the chosen agency.</p>
                    </label>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputCity">Other</label>
                    <input
                      readOnly
                      type="text"
                      value={workshopThirtySeven}
                      className="form-control"
                      id="workshopThirtySeven"
                      name="workshopThirtySeven"
                    />
                  </div>
                </section>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }

}

export default connect()(ClientActionSubmission)

