import moment from 'moment';
import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Modal, ModalBody } from 'react-bootstrap';
import Select from 'react-select';
import TextFieldGroup from '../../Elements/TextFieldGroup';
import getRouteBaseUrl from '../../../utils/getRouteBaseUrl';
import {
  getContact,
  updateContactPrivateNotes,
  uploadProfileImage,
  inviteToAccessClientPortal
} from '../../../actions/contactAction';
import { resolve } from 'q';

class ViewContact extends React.Component {
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
    notes: '',
    created_at: '',
    updated_at: '',
    phoneNumbers: [],
    addresses: [],
    emailAddresses: [],
    avatar: '',
    showInviteDialog: false,
    invite: {
      email: '',
      password: '',
      type: ''
    },
    lastLogin_at: ''
  };

  componentDidMount() {
    this.textarea = false;
    const { getContact, match: { params: { contactId } } } = this.props;

    getContact(contactId);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      ...nextProps.contact,
      loading: nextProps.loading
    });
  }

  onInviteDialogShow = (emailAddress) => {
    this.setState(oldState => ({
      ...oldState,
      invite: {
        ...this.state.invite,
        email: emailAddress
      },
      showInviteDialog: true
    }));
  }

  onInviteDialogHide = () => {
    this.setState({
      showInviteDialog: false
    });
  }

  updatePrivateNotes = notes => {
    const { updateContactPrivateNotes } = this.props;
    updateContactPrivateNotes({
      _id: this.state._id,
      notes
    });
  };

  showTextarea = () => {
    const { getContact } = this.props;
    this.textarea = !this.textarea;

    if (!this.textarea) {
      this.updatePrivateNotes(this.state.notes);
      getContact(this.state._id);
    }
  };

  onChange = event => {
    event.persist();

    this.setState(oldState => ({
      ...oldState,
      notes: event.target.value
    }));
  };

  onInviteInputChange = event => {
    event.persist();

    this.setState(oldState => ({
      ...oldState,
      invite: {
        ...this.state.invite,
        [event.target.name]: event.target.value
      }
    }));
  };

  onSelectChange = (key, value) => {
    // event.persist();
    this.setState(previousState => ({
      ...previousState,
      invite: {
        ...this.state.invite,
        [key]: value
      }
    }));
  };

  onInviteSubmit = e => {
    e.preventDefault();
    const { invite, firstName, lastName } = this.state;
    const { inviteToAccessClientPortal } = this.props;
    const inviteData = {
      ...this.state.invite,
      username: this.state.firstName + ' ' + this.state.lastName
    };
    const profileData = {
      email: invite.email,
      firstName,
      lastName
    };

    const payload = {
      inviteData,
      profileData,
      baseUrl: getRouteBaseUrl()
    };
    inviteToAccessClientPortal(this.state._id, payload);
    this.onInviteDialogHide();
  }

  textareaComponent = () => (
    <textarea
      rows='3'
      value={this.state.notes}
      className='form-control'
      placeholder='Textarea'
      onChange={this.onChange}
    />
  );

  handleProfilePhotoUpload = _ => {
    var files = this.uploadInput.files
    if (!files) return
    this.uploadMultipleFiles(files)
  }

  uploadMultipleFiles = files => {
    const { uploadProfileImage } = this.props
    if (files.length === 1) {
      let file = files[0];
      let promise = new Promise(resolve => {
        let reader = new FileReader()
        reader.onload = _ => {
          let form = {
            content: reader.result,
            fileName: file.name,
            type: file.name.substr(file.name.lastIndexOf('.') + 1),
            dateUpdated: Date(),
            size: file.size,
          }
          resolve(form)
        }
        reader.readAsDataURL(file)
      })
      Promise.all([promise]).then(content => {
        let data = {
          avatar: content[0].content
        }
        uploadProfileImage(this.state._id, data)
      })
    }
  }

  render() {
    let {
      _id,
      firstName,
      lastName,
      type,
      profession,
      company,
      groups,
      language,
      created_at,
      updated_at,
      emailAddresses,
      phoneNumbers,
      addresses,
      avatar,
      loading,
      invite,
      lastLogin_at,
      created_by
    } = this.state;

    const { auth } = this.props;
    const contactTypes = [
      {
        label: 'Select type',
        value: '',
        isDisabled: true
      },
      {
        label: 'Client',
        value: 'client'
      },
      {
        label: 'Partner',
        value: 'partner'
      },
      {
        label: 'Staff',
        value: 'staff'
      }
    ];

    const selectCustomStyle = {
      container: provided => {
        return {
          ...provided,
          marginBottom: '1rem'
        };
      },
      menu: provided => {
        return {
          ...provided,
          zIndex: '100000'
        };
      }
    };

    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <div className='breadcrumb slim-breadcrumb'>
                <Link to={`/contacts/edit/${_id}`} className={'btn btn-primary btn-sm'}>
                  <i className={'fa fa-pencil'} /> Edit
                </Link>
              </div>
              <h6 className='slim-pagetitle'>
                <Link to={'/contacts'}>
                  <span>CONTACTS</span>
                </Link>
                &nbsp;/&nbsp;
                <span>{`${firstName} ${lastName}`}</span>
              </h6>
            </div>
          </div>
          {loading ? (
            <div className='sk-three-bounce'>
              <div className='sk-child sk-bounce1 bg-gray-800' />
              <div className='sk-child sk-bounce2 bg-gray-800' />
              <div className='sk-child sk-bounce3 bg-gray-800' />
            </div>
          ) : (
            <div className='row'>
              <div className='col-8'>
                <div className='card card-profile'>
                  <div className='card-body'>
                    <div className='media'>
                      <label htmlFor="uploadProfilePhoto">
                        <img src={avatar === '' ? 'http://via.placeholder.com/500x500' : avatar} alt='' />
                      </label>
                      <input
                        type="file"
                        id="uploadProfilePhoto"
                        name="uploadProfilePhoto"
                        style={{ opacity: 0 }}
                        ref={(ref) => { this.uploadInput = ref }}
                        onChange={this.handleProfilePhotoUpload}
                      />
                      <div className='media-body'>
                        <h3 className='card-profile-name'>{`${firstName} ${lastName}`}</h3>
                        <p className='card-profile-position'>
                          {profession} at <a href=''>{company}</a>
                        </p>
                        <p className='mg-b-0'>
                          {groups.map(({ name }) => {
                            return (
                              <button className='btn btn-outline-success btn-sm mg-r-5' disabled>
                                {name}
                              </button>
                            );
                          })}
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
                            <i className='fa fa-plus tx-24 tx-success lh-0' />
                          </div>
                          <div className='media-body mg-t-4' style={{ marginLeft: '15px' }}>
                            <h6 className='tx-14 tx-gray-700'>Created At</h6>
                            <span className='d-block'>{moment(created_at).format('LLL')}</span>
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
                            <span className='d-block'>{moment(updated_at).format('LLL')}</span>
                          </div>
                        </div>
                      </div>
                      <div className='col-4'>
                        <div className='media mg-t-25'>
                          <div>
                            <i className='fa fa-user tx-24 tx-danger lh-0' />
                          </div>
                          <div className='media-body mg-t-4' style={{ marginLeft: '15px' }}>
                            <h6 className='tx-14 tx-gray-700'>
                              Created By <strong>{`${auth.profile.firstName} ${auth.profile.lastName}`}</strong>
                            </h6>
                            <span className='d-block'>{auth.profile.email}</span>
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
                          {emailAddresses.length ? (
                            emailAddresses.map((value, key) => (
                              <div className='list-group-item' key={key}>
                                <div className='user-name-address'>
                                  <p>{value.emailAddress}</p>
                                  { 
                                    value.inviteStatus === 'noaccess' && 
                                      <span>
                                        {' '}
                                        Client Portal: <b className='tx-black'>No access</b> |{' '}
                                        <b className='tx-primary'>
                                          <a href='#' onClick={() => this.onInviteDialogShow(value.emailAddress)}>Invite</a>
                                        </b>
                                      </span>
                                  }
                                  { 
                                    value.inviteStatus === 'pending' && 
                                      <span>
                                        {' '}
                                        Client Portal:
                                        <b className='tx-black'>pending</b> |{' '}
                                        <b className='tx-primary'>
                                          <a href='#' onClick={() => this.onInviteDialogShow(value.emailAddress)}>Reinvite</a>
                                        </b> |{' '}
                                        <b className='tx-primary'>
                                          <a href='#'>Revoke access</a>
                                        </b>
                                      </span>
                                  }
                                  { 
                                    value.inviteStatus === 'confirmed' && 
                                      <span>
                                        {' '}
                                        Client Portal:
                                        <b className='tx-success'>Confirmed Access</b> |{' '}
                                        <b className='tx-primary'>
                                          <a href='#'>Revoke access</a>
                                        </b>
                                      </span>
                                  }
                                </div>
                                <div className='user-btn-wrapper'>
                                  <button className='btn btn-outline-primary btn-sm' disabled>
                                    {value.emailFor}
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className='list-group-item'>
                              <div className='user-name-address'>
                                <p>{'N/A'}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='tab-pane' id='addresses'>
                        <div className='list-group  list-group-user'>
                          {addresses.length ? (
                            addresses.map((value, key) => (
                              <div className='list-group-item' key={key}>
                                <div className='user-name-address'>
                                  <p>
                                    {value.country}, {value.zipCode}
                                  </p>
                                  <span>
                                    {value.address}, {value.city}, {value.state}
                                  </span>
                                </div>
                                <div className='user-btn-wrapper'>
                                  <button className='btn btn-outline-primary btn-sm' disabled>
                                    {value.addressFor}
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className='list-group-item'>
                              <div className='user-name-address'>
                                <p>{'N/A'}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='tab-pane' id='phone_numbers'>
                        <div className='list-group  list-group-user'>
                          {phoneNumbers.length ? (
                            phoneNumbers.map((value, key) => (
                              <div className='list-group-item' key={key}>
                                <div className='user-name-address'>
                                  <p>{value.phoneNumber}</p>
                                </div>
                                <div className='user-btn-wrapper'>
                                  <button className='btn btn-outline-primary btn-sm' disabled>
                                    {value.phoneNumberFor}
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className='list-group-item'>
                              <div className='user-name-address'>
                                <p>{'N/A'}</p>
                              </div>
                            </div>
                          )}
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
                    <a href=''>{lastLogin_at}</a>
                  </p>
                </div>
                <div className='card card-recommendation'>
                  <div className='card-body pd-25'>
                    <div className='slim-card-title'>
                      Private notes
                      <a href='#' onClick={this.showTextarea}>
                        <i className={'fa fa-pencil float-right'} />
                      </a>
                    </div>
                    {this.textarea ? (
                      this.textareaComponent()
                    ) : (
                      <p className='tx-13 mg-b-0'>{this.state.notes || 'N/A'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Modal
          show={this.state.showInviteDialog}
          onHide={this.onInviteDialogHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className='slim-pageheader'>
                <h6 className='slim-invite-modaltitle'>
                  Invite to the client portal
                </h6>
              </div>
            </Modal.Title>
          </Modal.Header>

          <ModalBody>
            <div className='slim-invite-modaldesc'>
              <p className='header'>If you proceed, an Invitation with Instructions will be sent to the client's email address.</p>
            </div>
            <form onSubmit={this.onInviteSubmit}>
              <div className='section-wrapper mg-b-20'>
                <div className='row'>
                  <div className='col-lg mg-t-10 mg-lg-t-0'>
                    <label className='section-title'>Email</label>
                    <TextFieldGroup
                      name='email'
                      placeholder='Email'
                      value={invite.email}
                      onChange={this.onInviteInputChange}
                      disabled
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg mg-t-10 mg-lg-t-0'>
                    <label className='section-title'>Password</label>
                    <TextFieldGroup
                      name='password'
                      placeholder='Original password'
                      value={invite.password}
                      onChange={this.onInviteInputChange}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg mg-t-10 mg-lg-t-0'>
                    <label className='section-title'>Contact Types</label>
                    <Select
                      styles={selectCustomStyle}
                      options={contactTypes}
                      name='type'
                      placeholder={'Select type'}
                      onChange={e => {
                        this.onSelectChange('type', e.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className='slim-invite-modaldesc'>
              <p className='footer'>Once the client visits, he will be able to access invoices and estimates, make online payments and review his full transaction history</p>
            </div>
          </ModalBody>
          <Modal.Footer
            className='slim-modal-footer'
          >
            <div className='container'>
              <button
                className='btn btn-info float-right mt-3 mb-3 ml-3'
                type='submit'
                onClick={this.onInviteSubmit}
              >
                Invite
              </button>
              <button
                className='btn btn-danger float-right mt-3 mb-3'
                onClick={this.onInviteDialogHide}
              >
                Cancel
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ViewContact.propTypes = {
  updateContactPrivateNotes: propTypes.func.isRequired,
  getContact: propTypes.func.isRequired,
  uploadProfileImage: propTypes.func.isRequired,
  inviteToAccessClientPortal: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  contact: state.contacts.contact,
  loading: state.contacts.loading,
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getContact,
      updateContactPrivateNotes,
      uploadProfileImage,
      inviteToAccessClientPortal
    }
  )(ViewContact)
);
