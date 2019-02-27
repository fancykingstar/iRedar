import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

class ClientAction1 extends Component {
  componentDidMount() {
    window.history2 = this.props.history
    window.$('#wizard6').steps({
      headerTag: 'h3',
      bodyTag: 'section',
      autoFocus: true,
      titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
      cssClass: 'wizard wizard-style-2',
      onFinished: async function (event, currentIndex) {
        let firstName = window.$('#firstName').val()
        let lastName = window.$('#lastName').val()
        let fromForm = 'client-action'
        let workshopOne = window.$('#workshopOne').prop("checked")
        let workshopTwo = window.$('#workshopTwo').prop("checked")
        let workshopThree = window.$('#workshopThree').prop("checked")
        let workshopFour = window.$('#workshopFour').prop("checked")
        let workshopFive = window.$('#workshopFive').prop("checked")
        let workshopSix = window.$('#workshopSix').prop("checked")
        let workshopSeven = window.$('#workshopSeven').prop("checked")
        let workshopEight = window.$('#workshopEight').prop("checked")
        let workshopNine = window.$('#workshopNine').prop("checked")
        let workshopTen = window.$('#workshopTen').prop("checked")
        let workshopTen1 = window.$('#workshopTen1').prop("checked")
        let workshopTen2 = window.$('#workshopTen2').prop("checked")
        let workshopTen3 = window.$('#workshopTen3').prop("checked")
        let workshopTen4 = window.$('#workshopTen4').prop("checked")
        let workshopEleven = window.$('#workshopEleven').prop("checked")
        let workshopTwelve = window.$('#workshopTwelve').prop("checked")
        let workshopThirteen = window.$('#workshopThirteen').prop("checked")
        let workshopFourteen = window.$('#workshopFourteen').prop("checked")
        let workshopFifteen = window.$('#workshopFifteen').prop("checked")
        let workshopSixteen = window.$('#workshopSixteen').prop("checked")
        let workshopSeventeen = window.$('#workshopSeventeen').prop("checked")
        let workshopEighteen = window.$('#workshopEighteen').prop("checked")
        let workshopNineteen = window.$('#workshopNineteen').prop("checked")
        let workshopTwenty = window.$('#workshopTwenty').prop("checked")
        let workshopTwentyOne = window.$('#workshopTwentyOne').prop("checked")
        let workshopTwentyTwo = window.$('#workshopTwentyTwo').prop("checked")
        let workshopTwentyThree = window.$('#workshopTwentyThree').prop("checked")
        let workshopTwentyFour = window.$('#workshopTwentyFour').prop("checked")
        let workshopTwentyFive = window.$('#workshopTwentyFive').prop("checked")
        let workshopTwentySix = window.$('#workshopTwentySix').prop("checked")
        let workshopTwentySeven = window.$('#workshopTwentySeven').prop("checked")
        let workshopTwentyEight = window.$('#workshopTwentyEight').prop("checked")
        let workshopTwentyNine = window.$('#workshopTwentyNine').prop("checked")
        let workshopThirty = window.$('#workshopThirty').prop("checked")
        let workshopThirtyOne = window.$('#workshopThirtyOne').prop("checked")
        let workshopThirtyTwo = window.$('#workshopThirtyTwo').prop("checked")
        let workshopThirtyThree = window.$('#workshopThirtyThree').prop("checked")
        let workshopThirtyFour = window.$('#workshopThirtyFour').prop("checked")
        let workshopThirtyFive = window.$('#workshopThirtyFive').prop("checked")
        let workshopThirtySix = window.$('#workshopThirtySix').prop("checked")
        let workshopThirtySeven = window.$('#workshopThirtySeven').val()


        let content = {
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
        }

        try {
          await axios.post(`http://localhost:5000/api/submissions`, content);
          window.history2.push({
            pathname: '/forms/submission-success'
          });

          console.log('OK');
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  render() {
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
                  type="hidden"
                  name="fromForm"
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
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputLastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
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
                      className="form-check-input"
                      type="checkbox"
                      id="workshopOne"
                      name="workshopOne"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                        className="form-check-input"
                        type="checkbox"
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
                        className="form-check-input"
                        type="checkbox"
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
                        className="form-check-input"
                        type="checkbox"
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
                        className="form-check-input"
                        type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      className="form-check-input"
                      type="checkbox"
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
                      type="text"
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

export default connect()(ClientAction1)

