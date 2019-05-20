import moment from 'moment';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getContact} from '../../../actions/contactAction';

class EditContact extends React.Component {
  state = {
    _id: '',
    loading: true,
    firstName: '',
    lastName: '',
    type: '',
    profession: '',
    company: '',
    group: '',
    language: '',
    created_at: '',
    updated_at: '',
    phoneNumbers: [],
    addresses: [],
    emailAddresses: []
  };
  
  componentDidMount() {
    const {getContact, match: {params: {contactId}}} = this.props;
    
    getContact(contactId);
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      ...nextProps.contact,
      loading: nextProps.loading
    });
  }
  
  render() {
    let {_id, firstName, lastName, type, profession, company, group, language, created_at, updated_at, emailAddresses, phoneNumbers, addresses, loading} = this.state;
    
    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <div className='breadcrumb slim-breadcrumb'>
                <Link to={`/contacts/edit/${_id}`}
                      className={'btn btn-primary btn-sm'}>
                  <i className={'fa fa-pencil'}/> Edit</Link>
              </div>
              <h6 className='slim-pagetitle'>View Contact</h6>
            </div>
          </div>
          {loading ? <div className="sk-three-bounce">
            <div className="sk-child sk-bounce1 bg-gray-800"/>
            <div className="sk-child sk-bounce2 bg-gray-800"/>
            <div className="sk-child sk-bounce3 bg-gray-800"/>
          </div> : <div className='row'>
            <div className='col-8'>
              <div className='card card-profile'>
                <div className='card-body'>
                  <div className='media'>
                    <img src='http://via.placeholder.com/500x500' alt=''/>
                    <div className='media-body'>
                      <p className='card-profile-position'>{type}</p>
                      <h3 className='card-profile-name'>{`${firstName} ${lastName}`}</h3>
                      <p className='card-profile-position'>
                        {profession} at <a href=''>{company}</a>
                      </p>
                      <p className='mg-b-0'>
                        <button className='btn btn-outline-success btn-sm mg-r-5' disabled>
                          {group}
                        </button>
                        <button className='btn btn-outline-primary btn-sm' disabled>
                          {language}
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-4'>
                      <div className='media mg-t-25'>
                        <div>
                          <i className='fa fa-plus tx-24 tx-success lh-0'/>
                        </div>
                        <div className='media-body mg-t-4' style={{marginLeft: '15px'}}>
                          <h6 className='tx-14 tx-gray-700'>Created At</h6>
                          <span className='d-block'>{moment(created_at).format('LLL')}</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='media mg-t-25'>
                        <div>
                          <i className='fa fa-pencil tx-24 tx-primary lh-0'/>
                        </div>
                        <div className='media-body mg-t-4' style={{marginLeft: '15px'}}>
                          <h6 className='tx-14 tx-gray-700'>Modified At</h6>
                          <span className='d-block'>{moment(updated_at).format('LLL')}</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='media mg-t-25'>
                        <div>
                          <i className='fa fa-user tx-24 tx-danger lh-0'/>
                        </div>
                        <div className='media-body mg-t-4' style={{marginLeft: '15px'}}>
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
                        {emailAddresses.length ? emailAddresses.map((value, key) => {
                          return <div className='list-group-item' key={key}>
                            <div className='user-name-address'>
                              <p>{value.emailAddress}</p>
                              <span>
                              Client Portal: <b className='tx-success'>Confirmed Access</b> |{' '}
                                <b className='tx-primary'>
                                <a href='#'>Revoke Access</a>
                              </b>
                            </span>
                            </div>
                            <div className='user-btn-wrapper'>
                              <button className='btn btn-outline-primary btn-sm' disabled>
                                {value.emailFor}
                              </button>
                            </div>
                          </div>;
                        }) : <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>{'N/A'}</p>
                          </div>
                        </div>}
                      </div>
                    </div>
                    <div className='tab-pane' id='addresses'>
                      <div className='list-group  list-group-user'>
                        {addresses.length ? addresses.map((value, key) => {
                          return <div className='list-group-item' key={key}>
                            <div className='user-name-address'>
                              <p>{value.country}, {value.zipCode}</p>
                              <span>{value.address}, {value.city}, {value.state}</span>
                            </div>
                            <div className='user-btn-wrapper'>
                              <button className='btn btn-outline-primary btn-sm' disabled>
                                {value.addressFor}
                              </button>
                            </div>
                          </div>;
                        }) : <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>{'N/A'}</p>
                          </div>
                        </div>}
                      </div>
                    </div>
                    <div className='tab-pane' id='phone_numbers'>
                      <div className='list-group  list-group-user'>
                        {phoneNumbers.length ? phoneNumbers.map((value, key) => {
                          return <div className='list-group-item' key={key}>
                            <div className='user-name-address'>
                              <p>{value.phoneNumber}</p>
                            </div>
                            <div className='user-btn-wrapper'>
                              <button className='btn btn-outline-primary btn-sm' disabled>
                                {value.phoneNumberFor}
                              </button>
                            </div>
                          </div>;
                        }) : <div className='list-group-item'>
                          <div className='user-name-address'>
                            <p>{'N/A'}</p>
                          </div>
                        </div>}
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
              <div className='card-contact mg-b-20'>
                <div className='tx-center'>
                  <h5 className='mg-t-10 mg-b-5'>
                    <a href='' className='contact-name'>
                      Client Portal
                    </a>
                  </h5>
                  <p>The contact is invite to the client portal</p>
                </div>
                
                <p className='contact-item'>
                  <span>Portal URL:</span>
                  <a href=''>http://thmpxls.me</a>
                </p>
                <p className='contact-item'>
                  <span>Last client login:</span>
                  <a href=''>May 15 2019 10:53:36</a>
                </p>
              </div>
              <div className='card card-recommendation'>
                <div className='card-body pd-25'>
                  <div className='slim-card-title'>Private notes</div>
                  <p className='tx-13 mg-b-0'>
                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                    enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus
                    ut,
                    imperdiet a, venenatis vitae, justo.
                  </p>
                </div>
              </div>
            </div>
          </div>}
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
  contact: state.contacts.contact,
  loading: state.contacts.loading,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {getContact})(EditContact);
