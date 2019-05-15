import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class EditContact extends React.Component {
  render() {
    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <ol className='breadcrumb slim-breadcrumb' />
              <h6 className='slim-pagetitle'>View Contact</h6>
            </div>
          </div>
          <div className='row'>
            <div className='col-8'>
              <div className='card card-profile'>
                <div className='card-body'>
                  <div className='media'>
                    <img src='http://via.placeholder.com/500x500' alt='' />
                    <div className='media-body'>
                      <p className='card-profile-position'>Client</p>
                      <h3 className='card-profile-name'>Katherine Lumaad</h3>
                      <p className='card-profile-position'>
                        Executive Director at <a href=''>ThemePixels, Inc.</a>
                      </p>
                      <p className='mg-b-0'>
                        <button className='btn btn-outline-success btn-sm mg-r-5' disabled>
                          Group
                        </button>
                        <button className='btn btn-outline-primary btn-sm' disabled>
                          Language
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-4'>
                      <div className='media mg-t-25'>
                        <div>
                          <i className='fa fa-plus tx-24 tx-success lh-0' />
                        </div>
                        <div className='media-body mg-t-4' style={{ marginLeft: '15px' }}>
                          <h6 className='tx-14 tx-gray-700'>Created At</h6>
                          <span className='d-block'>May 15 2019 10:53:36</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='media mg-t-25'>
                        <div>
                          <i className='fa fa-pencil tx-24 tx-primary lh-0' />
                        </div>
                        <div className='media-body mg-t-4' style={{ marginLeft: '15px' }}>
                          <h6 className='tx-14 tx-gray-700'>Modified At</h6>
                          <span className='d-block'>May 15 2019 10:53:36</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='media mg-t-25'>
                        <div>
                          <i className='fa fa-user tx-24 tx-danger lh-0' />
                        </div>
                        <div className='media-body mg-t-4' style={{ marginLeft: '15px' }}>
                          <h6 className='tx-14 tx-gray-700'>Created By</h6>
                          <span className='d-block'>yourname@sample.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card mg-t-20'>
                <div className='card-header'>
                  <ul className='nav nav-underline'>
                    <li className='nav-item'>
                      <a className='nav-link active show' href='#email_addresses' data-toggle='tab'>
                        Emails Addresses
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a className='nav-link' href='#addresses' data-toggle='tab'>
                        Addresses
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a className='nav-link' href='#phone_numbers' data-toggle='tab'>
                        Phone Numbers
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='card-body p-0'>
                  <div className='tab-content'>
                    <div className='tab-pane show active' id='email_addresses'>
                      <div className='list-group  list-group-user'>
                        <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>zesterquinn.albano@gmail.com</p>
                            <span>
                              Client Portal: <b className='tx-success'>Confirmed Access</b> |{' '}
                              <b className='tx-primary'>
                                <a href='#'>Revoke Access</a>
                              </b>
                            </span>
                          </div>
                          <div className='user-btn-wrapper'>
                            <button href='#' className='btn btn-outline-primary btn-sm' disabled>
                              Work
                            </button>
                          </div>
                        </div>
                        <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>zesterquinn@gmail.com</p>
                            <span>
                              Client Portal: <b className='tx-default'>No Access</b> |{' '}
                              <b className='tx-primary'>
                                <a href='#'>Invite</a>
                              </b>
                            </span>
                          </div>
                          <div className='user-btn-wrapper'>
                            <button href='#' className='btn btn-outline-primary btn-sm' disabled>
                              Work
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='tab-pane' id='addresses'>
                      <div className='list-group  list-group-user'>
                        <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>Cebu, 6000</p>
                            <span>B1, L43, Andalucia Cres, Gabi, Cordova</span>
                          </div>
                          <div className='user-btn-wrapper'>
                            <button href='#' className='btn btn-outline-primary btn-sm' disabled>
                              Work
                            </button>
                          </div>
                        </div>
                        <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>Cebu, 6000</p>
                            <span>B1, L43, Andalucia Cres, Gabi, Cordova</span>
                          </div>
                          <div className='user-btn-wrapper'>
                            <button href='#' className='btn btn-outline-primary btn-sm' disabled>
                              Work
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='tab-pane' id='phone_numbers'>
                      <div className='list-group  list-group-user'>
                        <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>09361350510</p>
                          </div>
                          <div className='user-btn-wrapper'>
                            <button href='#' className='btn btn-outline-primary btn-sm' disabled>
                              Work
                            </button>
                          </div>
                        </div>
                        <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>09152597171</p>
                          </div>
                          <div className='user-btn-wrapper'>
                            <button href='#' className='btn btn-outline-primary btn-sm' disabled>
                              Work
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card pd-20 mg-t-20'>
                <label className='slim-card-title'>Latest Activity</label>
                <div className='post-group'>
                  <div className='post-item'>
                    <span className='post-date'>Today, 3:30pm</span>
                    <p className='post-title'>
                      <a href=''>Maybe Just Don't Drink Coffee</a>
                    </p>
                    <p className='tx-12 mg-b-0'>
                      <a href=''>Elisse Joson</a> San Francisco, CA
                    </p>
                  </div>
                  <div className='post-item'>
                    <span className='post-date'>Yesterday, 10:00am</span>
                    <p className='post-title'>
                      <a href=''>Your Finances Don't Have to Be Perfect to Work</a>
                    </p>
                    <p className='tx-12 mg-b-10'>
                      <a href=''>Elisse Joson</a> San Francisco, CA
                    </p>
                    <p className='tx-12 mg-b-0'>
                      In this lesson, you create a layout in XML that includes a text field and a button...
                    </p>
                  </div>
                  <div className='post-item'>
                    <span className='post-date'>Dec 21, 2017 5:00am</span>
                    <p className='post-title'>
                      <a href=''>What Romance Really Means After 10 Years of Marriage</a>
                    </p>
                    <p className='tx-12 mg-b-10'>
                      <a href=''>Elisse Joson</a> San Francisco, CA
                    </p>
                    <p className='tx-12 mg-b-0'>
                      In this lesson, you create a layout in XML that includes a text field and a button...
                    </p>
                  </div>
                  <div className='post-item'>
                    <span className='post-date'>Dec 20, 2017 4:20am</span>
                    <p className='post-title'>
                      <a href=''>Buying organic veggies at the supermarket is a waste of money</a>
                    </p>
                    <p className='tx-12 mg-b-10'>
                      <a href=''>Elisse Joson</a> San Francisco, CA
                    </p>
                    <p className='tx-12 mg-b-0'>
                      In this lesson, you create a layout in XML that includes a text field and a button...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div class='card-contact mg-b-20'>
                <div class='tx-center'>
                  <h5 class='mg-t-10 mg-b-5'>
                    <a href='' class='contact-name'>
                      Client Portal
                    </a>
                  </h5>
                  <p>The contact is invite to the client portal</p>
                </div>

                <p class='contact-item'>
                  <span>Portal URL:</span>
                  <a href=''>http://thmpxls.me</a>
                </p>
                <p class='contact-item'>
                  <span>Last client login:</span>
                  <a href=''>May 15 2019 10:53:36</a>
                </p>
              </div>
              <div class='card card-recommendation'>
                <div class='card-body pd-25'>
                  <div class='slim-card-title'>Private notes</div>
                  <p class='tx-13 mg-b-0'>
                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                    enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                    imperdiet a, venenatis vitae, justo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(EditContact);
