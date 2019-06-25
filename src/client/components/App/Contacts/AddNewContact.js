import axios from 'axios';
import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { addContact } from '../../../actions/contactAction';
import { API_URL } from '../../../actions/types';
import TextFieldGroup from '../../Elements/TextFieldGroup';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export class AddNewContact extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      groups: [],
      form: {
        firstName: '',
        lastName: '',
        company: '',
        profession: '',
        type: [],
        language: '',
        groups: [],
        emailAddresses: [
          {
            emailFor: '',
            emailAddress: ''
          }
        ],
        addresses: [
          {
            addressFor: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          }
        ],
        phoneNumbers: [
          {
            phoneNumberFor: '',
            phoneNumber: ''
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { errors } = nextProps;

    this.state.errors = [];

    /*
    * NOT YET CLEAR IF WE DISPLAY ERRORS IN ALERT OR PER INPUT
    * */
    //if (Object.keys(errors).length) {
    //  let receivedErrors = [];
    //  const {data: {details}} = errors;
    //
    //  details.forEach(value => {
    //    receivedErrors.push(value.message);
    //  });
    //
    //  this.setState(oldState => ({
    //    ...oldState,
    //    errors: receivedErrors
    //  }));
    //}
  }

  getGroups = async () => {
    const { data: { data } } = await axios.get(`${API_URL}/api/groups`);

    this.setState(oldState => ({
      ...oldState,
      groups: [
        {
          label: 'Select group',
          value: '',
          isDisabled: true
        },
        ...data.map(({ name, _id }) => ({
          label: name,
          value: _id
        }))
      ]
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { addContact } = this.props;

    addContact(this.state.form, this.props.history);
  };

  onChange = event => {
    //access event in an asynchronous way
    event.persist();

    this.setState(previousState => ({
      ...previousState,
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    }));
  };

  onSelectChange = (key, value) => {
    // event.persist();
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...this.state.form,
        [key]: value
      }
    }));
  };

  onChangeRowValue = (parentKey, childKey, value, index) => {
    this.state.form[parentKey][index][childKey] = value;

    this.setState(previousState => ({
      ...previousState,
      form: {
        ...this.state.form,
        [parentKey]: this.state.form[parentKey]
      }
    }));
  };

  addRow = (parentKey, object) => {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...this.state.form,
        [parentKey]: [ ...this.state.form[parentKey], object ]
      }
    }));
  };

  removeRow = (parentKey, indexKey) => {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...this.state.form,
        [parentKey]: this.state.formt[parentKey].filter((value, index) => index != indexKey)
      }
    }));
  };

  render() {
    const { errors, form } = this.state;

    const contactTypes = [
      {
        label: 'Select type',
        value: '',
        isDisabled: true
      },
      {
        label: 'Client',
        value: 'Client'
      },
      {
        label: 'Partner',
        value: 'Partner'
      },
      {
        label: 'Staff',
        value: 'Staff'
      }
    ];

    const languages = [
      {
        label: 'Select language',
        value: '',
        isDisabled: true
      },
      {
        label: 'English',
        value: 'English'
      }
    ];

    let type = [
      {
        label: 'Select for',
        value: '',
        isDisabled: true
      },
      {
        label: 'Billing',
        value: 'Billing'
      },
      {
        label: 'Shipping',
        value: 'Shipping'
      },
      {
        label: 'Other',
        value: 'Other'
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
            <div className='slim-pageheader' style={{paddingBottom: 0}}>
              <Breadcrumb>
                <Breadcrumb.Item href="../dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="../contacts">Contacts</Breadcrumb.Item>
                <Breadcrumb.Item active>Add New Contacts</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className='slim-pageheader'>
              <h6 className='slim-pagetitle'>
                <Link to={'/contacts'}>
                  <span>CONTACTS</span>
                </Link>
                &nbsp;/&nbsp;
                Add new contact
              </h6>
            </div>
          </div>
          {errors.length ? (
            <div className='alert alert-danger mg-b-20' role='alert'>
              <strong>Oh snap!</strong> Change a few things up and try submitting again.
              <ol className='mg-t-10'>{errors.map(value => <li>{value}</li>)}</ol>
            </div>
          ) : null}
          <form onSubmit={this.onSubmit}>
            <div className='section-wrapper mg-b-20'>
              <label className='section-title mg-b-20'>Personal Information</label>
              <div className='row'>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup name='firstName' placeholder='First Name' onChange={this.onChange} />
                </div>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup name='lastName' placeholder='Last Name' onChange={this.onChange} />
                </div>
              </div>
              <div className='row'>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup name='company' placeholder='Company' onChange={this.onChange} />
                </div>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup name='profession' placeholder='Profession' onChange={this.onChange} />
                </div>
              </div>
            </div>
            <div className='section-wrapper mg-b-20'>
              <label className='section-title mg-b-20'>Other Information</label>
              <div className='row'>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <div className='form-group'>
                    <label className='cols-sm-2 control-label m-0' />
                    <Select
                      styles={selectCustomStyle}
                      options={contactTypes}
                      isMulti
                      name='type'
                      placeholder={'Select type'}
                      onChange={e => {
                        this.onSelectChange('type', e.map(({ value }) => value));
                      }}
                    />
                  </div>
                </div>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <div className='form-group'>
                    <label className='cols-sm-2 control-label m-0' />
                    <Select
                      styles={selectCustomStyle}
                      options={languages}
                      name='language'
                      placeholder={'Select language'}
                      onChange={e => {
                        this.onSelectChange('language', e.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-6 mg-t-10 mg-lg-t-0'>
                  <div className='form-group'>
                    <label className='cols-sm-2 control-label m-0' />
                    <Select
                      styles={selectCustomStyle}
                      options={this.state.groups}
                      name='group'
                      isMulti
                      placeholder={'Select group'}
                      onChange={e => {
                        this.onSelectChange('groups', e.map(({ value }) => value));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='card '>
              <div className='card-header'>
                <ul className='nav nav-tabs card-header-tabs'>
                  <li className='nav-item'>
                    <a className='nav-link active show' href='#emailAddresses' data-toggle='tab'>
                      {' '}
                      Email Addresses{' '}
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#addresses' data-toggle='tab'>
                      {' '}
                      Addresses{' '}
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#phoneNumbers' data-toggle='tab'>
                      {' '}
                      Phone Numbers{' '}
                    </a>
                  </li>
                </ul>
              </div>
              <div className='card-body'>
                <div className='tab-content'>
                  <div className='tab-pane active show' id='emailAddresses'>
                    {form.emailAddresses.map((value, key) => {
                      let parentKey = 'emailAddresses';
                      return (
                        <div className='row'>
                          <div className='col-lg mg-t-20'>
                            <Select
                              options={type}
                              name='emailFor'
                              onChange={e => {
                                this.onChangeRowValue(parentKey, 'emailFor', e.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='emailAddress'
                              placeholder='Email Address'
                              value={value.emailAddress}
                              onChange={e => {
                                this.onChangeRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg mg-t-20'>
                            <button
                              className='btn btn-danger'
                              onClick={() => {
                                this.removeRow(parentKey, key);
                              }}
                            >
                              <span className='fa fa-times' />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className='btn btn-sm btn-success'
                      onClick={() => {
                        this.addRow('emailAddresses', {
                          emailFor: '',
                          emailAddress: ''
                        });
                      }}
                    >
                      Add row
                    </button>
                  </div>
                  <div className='tab-pane' id='addresses'>
                    {form.addresses.map((value, key) => {
                      let parentKey = 'addresses';
                      return (
                        <div className='row'>
                          <div className='col-lg mg-t-20'>
                            <Select
                              options={type}
                              name='addressFor'
                              onChange={e => {
                                this.onChangeRowValue(parentKey, 'addressFor', e.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='address'
                              placeholder='Address'
                              value={value.address}
                              onChange={e => {
                                this.onChangeRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='city'
                              placeholder='City'
                              value={value.city}
                              onChange={e => {
                                this.onChangeRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='state'
                              placeholder='State'
                              value={value.state}
                              onChange={e => {
                                this.onChangeRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='zipCode'
                              placeholder='Zip Code'
                              value={value.zipCode}
                              onChange={e => {
                                this.onChangeRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg mg-t-20'>
                            <Select
                              options={contactTypes}
                              name='country'
                              onChange={e => {
                                this.onChangeRowValue(parentKey, 'country', e.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg mg-t-20'>
                            <button
                              className='btn btn-danger'
                              onClick={() => {
                                this.removeRow(parentKey, key);
                              }}
                            >
                              <span className='fa fa-times' />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className='btn btn-sm btn-success'
                      onClick={() => {
                        this.addRow('addresses', {
                          addressFor: '',
                          address: '',
                          city: '',
                          state: '',
                          zipCode: '',
                          country: ''
                        });
                      }}
                    >
                      Add row
                    </button>
                  </div>
                  <div className='tab-pane ' id='phoneNumbers'>
                    {form.phoneNumbers.map((value, key) => {
                      let parentKey = 'phoneNumbers';
                      return (
                        <div className='row'>
                          <div className='col-lg mg-t-20'>
                            <Select
                              options={type}
                              name='phoneNumberFor'
                              onChange={e => {
                                this.onChangeRowValue(parentKey, 'phoneNumberFor', e.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='phoneNumber'
                              placeholder='Phone number'
                              value={value.phoneNumber}
                              onChange={e => {
                                this.onChangeRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg mg-t-20'>
                            <button
                              className='btn btn-danger'
                              onClick={() => {
                                this.removeRow(parentKey, key);
                              }}
                            >
                              <span className='fa fa-times' />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className='btn btn-sm btn-success'
                      onClick={() => {
                        this.addRow('phoneNumbers', {
                          phoneNumberFor: '',
                          phoneNumber: ''
                        });
                      }}
                    >
                      Add row
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button htmlType='submit' className='btn btn-success float-right mg-t-20'>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddNewContact.propTypes = {
  addContact: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addContact })(AddNewContact);
