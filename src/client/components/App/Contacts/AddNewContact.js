import React, {Component} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../../Elements/TextFieldGroup';
import Select from 'react-select';
import {addContact} from '../../../actions/contactAction';

export class AddNewContact extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      form: {
        firstName: '',
        lastName: '',
        company: '',
        profession: '',
        type: '',
        language: '',
        group: '',
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
  
  componentWillReceiveProps(nextProps, nextContext) {
    const {errors} = nextProps;
    
    this.state.errors = [];
    
    if (Object.keys(errors).length) {
      let receivedErrors = [];
      const {data: {details}} = errors;
      
      details.forEach(value => {
        receivedErrors.push(value.message);
      });
      
      this.setState(oldState => ({...oldState, errors: receivedErrors}));
    }
  }
  
  onSubmit = e => {
    e.preventDefault();
    const {addContact} = this.props;
    
    addContact(this.state.form, this.props.history);
  };
  
  onChange = event => {
    //access event in an asynchronous way
    event.persist();
    
    this.setState(
      previousState => ({...previousState, form: {...this.state.form, [event.target.name]: event.target.value}}));
  };
  
  onSelectChange = (key, value) => {
    // event.persist();
    this.setState(previousState => ({...previousState, form: {...this.state.form, [key]: value}}));
  };
  
  onChangeRowValue = (parentKey, childKey, value, index) => {
    this.state.form[parentKey][index][childKey] = value;
    //console.log(this.state.form[parentKey][index][childKey]);
    this.setState(previousState => ({
      ...previousState,
      form: {...this.state.form, [parentKey]: this.state.form[parentKey]}
    }));
  };
  
  addRow = (parentKey, object) => {
    this.setState(previousState => ({
      ...previousState,
      form: {...this.state.form, [parentKey]: [...this.state[parentKey], object]}
    }));
  };
  
  removeRow = (parentKey, indexKey) => {
    this.setState(previousState => ({
      ...previousState,
      form: {...this.state.form, [parentKey]: this.state[parentKey].filter((value, index) => index != indexKey)}
    }));
  };
  
  render() {
    const {errors, form} = this.state;
    
    const contactTypes = [
      {label: 'Select type', value: '', disabled: true},
      {label: 'Client', value: 'CLIENT'},
      {label: 'Partner', value: 'PARTNER'},
      {label: 'Staff', value: 'STAFF'}
    ];
    
    const languages = [
      {label: 'Select language', value: '', disabled: true},
      {label: 'English', value: 'English'}
    ];
    
    const groups = [
      {label: 'Select group', value: '', disabled: true},
      {label: 'Zester', value: 'Zester', disabled: true},
      {label: 'Albano', value: 'Albano', disabled: true}
    ];
    
    const selectCustomStyle = {
      container: provided => {
        return {...provided, marginBottom: '1rem'};
      },
      menu: provided => {
        return {...provided, zIndex: '100000'};
      }
    };
    
    console.log(errors);
    
    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <ol className='breadcrumb slim-breadcrumb'/>
              <h6 className='slim-pagetitle'>Add new contact</h6>
            </div>
          </div>
          {errors.length ? <div className="alert alert-danger mg-b-20" role="alert">
            <strong>Oh snap!</strong> Change a few things up and try submitting again.
            <ol className="mg-t-10">
              {errors.map(value => (
                <li>{value}</li>
              ))}
            </ol>
          </div> : null}
          <form onSubmit={this.onSubmit}>
            <div className='section-wrapper mg-b-20'>
              <label className='section-title mg-b-20'>Personal Information</label>
              <div className='row'>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup
                    name='firstName'
                    placeholder='First Name'
                    onChange={this.onChange}
                  />
                </div>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup
                    name='lastName'
                    placeholder='Last Name'
                    onChange={this.onChange}/>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup
                    name='company'
                    placeholder='Company'
                    onChange={this.onChange}/>
                </div>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup
                    name='profession'
                    placeholder='Profession'
                    onChange={this.onChange}/>
                </div>
              </div>
            </div>
            <div className='section-wrapper mg-b-20'>
              <label className='section-title mg-b-20'>Other Information</label>
              <div className='row'>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <div className="form-group">
                    <label className="cols-sm-2 control-label m-0"/>
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
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <div className="form-group">
                    <label className="cols-sm-2 control-label m-0"/>
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
                  <div className="form-group">
                    <label className="cols-sm-2 control-label m-0"/>
                    <Select
                      styles={selectCustomStyle}
                      options={groups}
                      name='group'
                      placeholder={'Select group'}
                      onChange={e => {
                        this.onSelectChange('group', e.value);
                      }}
                    /> {/* <SelectGroup name='group' options={groups} value={this.state.group} /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='card '>
              <div className='card-header'>
                <ul className='nav nav-tabs card-header-tabs'>
                  <li className='nav-item'>
                    <a className='nav-link active show' href='#emailAddresses' data-toggle='tab'> Emails Addresses </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#addresses' data-toggle='tab'> Addresses </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#phoneNumbers' data-toggle='tab'> Phone Numbers </a>
                  </li>
                </ul>
              </div>
              <div className='card-body'>
                <div className='tab-content'>
                  <div className='tab-pane active show' id='emailAddresses'>
                    {form.emailAddresses.map((value, key) => {
                      let parentKey = 'emailAddresses';
                      console.log(value.emailFor);
                      return (
                        <div className='row'>
                          <div className='col-lg mg-t-20'>
                            <Select
                              options={contactTypes}
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
                              <span className='fa fa-times'/>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className='btn btn-sm btn-success'
                      onClick={() => {
                        this.addRow('emailAddresses', {emailFor: '', emailAddress: ''});
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
                              options={contactTypes}
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
                              <span className='fa fa-times'/>
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
                              options={contactTypes}
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
                              <span className='fa fa-times'/>
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

export default connect(mapStateToProps, {addContact})(AddNewContact);
