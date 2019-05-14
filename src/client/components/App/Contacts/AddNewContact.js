import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../../Elements/TextFieldGroup';
import Select from 'react-select';
import SelectGroup from '../../Elements/SelectGroup';

export class AddNewContact extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      company: '',
      profession: '',
      type: '',
      language: '',
      group: '',
      email_addresses: [
        {
          email_for: '',
          email_address: ''
        }
      ],
      addresses: [
        {
          address_for: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          country: ''
        }
      ],
      phone_numbers: [
        {
          phone_number_for: '',
          phone_number: ''
        }
      ]
    };
  }

  /**
   * We use window.$ here to call the jQuery instance inside our react app
   * because jQuery select2() overrides onChange event in select html
   */
  componentDidMount() {
    window.$('.select2:not(.row-select)').change(e => {
      this.setState({ [e.target.name]: e.target.value });
    });
  }

  /**
   * We reinitialize select2 after adding new row with select
   */
  componentDidUpdate() {
    window.$('.select2').select2({
      minimumResultsForSearch: Infinity
    });
  }

  onChange = event => {
    //access event in an asynchronous way
    event.persist();

    this.setState(previousState => ({ ...previousState, [event.target.name]: event.target.value }));
  };

  onSelectChange = (key, value) => {
    // event.persist();
    this.setState(previousState => ({ ...previousState, [key]: value }));
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  addRow = (parentKey, object) => {
    this.setState(previousState => ({ ...previousState, [parentKey]: [ ...this.state[parentKey], object ] }));
  };

  removeRow = (parentKey, indexKey) => {
    this.setState(previousState => ({
      ...previousState,
      [parentKey]: this.state[parentKey].filter((value, index) => index != indexKey)
    }));
  };

  onChageRowValue = (parentKey, childKey, value, index) => {
    this.state[parentKey][index][childKey] = value;

    this.setState(previousState => ({
      ...previousState,
      [parentKey]: this.state[parentKey]
    }));
  };

  render() {
    const contactTypes = [
      { label: 'Select type', value: '', disabled: true },
      { label: 'Client', value: 'CLIENT' },
      { label: 'Partner', value: 'PARTNER' },
      { label: 'Staff', value: 'STAFF' }
    ];

    const languages = [
      { label: 'Select language', value: '', disabled: true },
      { label: 'English', value: 'english' }
    ];

    const groups = [ { label: 'Select group', value: '', disabled: true } ];

    const selectCustomStyle = {
      container: provided => {
        return { ...provided, marginBottom: '1rem' };
      },
      menu: provided => {
        return { ...provided, zIndex: '100000' };
      }
    };

    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <ol className='breadcrumb slim-breadcrumb' />
              <h6 className='slim-pagetitle'>Add new contact</h6>
            </div>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className='section-wrapper mg-b-20'>
              <label className='section-title mg-b-20'>Personal Information</label>
              <div className='row'>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup name='firstname' placeholder='First Name' onChange={this.onChange} />
                </div>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <TextFieldGroup name='lastname' placeholder='Last Name' onChange={this.onChange} />
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
                  <Select
                    styles={selectCustomStyle}
                    options={contactTypes}
                    name='type'
                    onChange={e => {
                      this.onSelectChange('type', e.value);
                    }}
                  />
                </div>
                <div className='col-lg mg-t-10 mg-lg-t-0'>
                  <Select
                    styles={selectCustomStyle}
                    options={languages}
                    name='language'
                    onChange={e => {
                      this.onSelectChange('language', e.value);
                    }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-6 mg-t-10 mg-lg-t-0'>
                  <Select
                    styles={selectCustomStyle}
                    options={groups}
                    name='group'
                    onChange={e => {
                      this.onSelectChange('group', e.value);
                    }}
                  />
                  {/* <SelectGroup name='group' options={groups} value={this.state.group} /> */}
                </div>
              </div>
            </div>
            <div className='card '>
              <div className='card-header'>
                <ul className='nav nav-tabs card-header-tabs'>
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
              <div className='card-body'>
                <div className='tab-content'>
                  <div className='tab-pane active show' id='email_addresses'>
                    {this.state.email_addresses.map((value, key) => {
                      let parentKey = 'email_addresses';
                      console.log(value.email_for);
                      return (
                        <div className='row'>
                          <div className='col-lg'>
                            <Select
                              options={contactTypes}
                              name='email_for'
                              onChange={e => {
                                this.onChageRowValue(parentKey, 'email_for', e.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='email_address'
                              placeholder='Email Address'
                              value={value.email_address}
                              onChange={e => {
                                this.onChageRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
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
                        this.addRow('email_addresses', { email_for: '', email_address: '' });
                      }}
                    >
                      Add row
                    </button>
                  </div>
                  <div className='tab-pane' id='addresses'>
                    {this.state.addresses.map((value, key) => {
                      let parentKey = 'addresses';
                      return (
                        <div className='row'>
                          <div className='col-lg'>
                            <Select
                              options={contactTypes}
                              name='address_for'
                              onChange={e => {
                                this.onChageRowValue(parentKey, 'address_for', e.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='address'
                              placeholder='Address'
                              value={value.address}
                              onChange={e => {
                                this.onChageRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='city'
                              placeholder='City'
                              value={value.city}
                              onChange={e => {
                                this.onChageRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='state'
                              placeholder='State'
                              value={value.state}
                              onChange={e => {
                                this.onChageRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='zip_code'
                              placeholder='Zip Code'
                              value={value.zip_code}
                              onChange={e => {
                                this.onChageRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <Select
                              options={contactTypes}
                              name='country'
                              onChange={e => {
                                this.onChageRowValue(parentKey, 'country', e.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
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
                          address_for: '',
                          address: '',
                          city: '',
                          state: '',
                          zip_code: '',
                          country: ''
                        });
                      }}
                    >
                      Add row
                    </button>
                  </div>
                  <div className='tab-pane ' id='phone_numbers'>
                    {this.state.phone_numbers.map((value, key) => {
                      let parentKey = 'phone_numbers';
                      return (
                        <div className='row'>
                          <div className='col-lg'>
                            <Select
                              options={contactTypes}
                              name='phone_number_for'
                              onChange={e => {
                                this.onChageRowValue(parentKey, 'phone_number_for', e.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
                            <TextFieldGroup
                              name='phone_number'
                              placeholder='Phone number'
                              value={value.phone_number}
                              onChange={e => {
                                this.onChageRowValue(parentKey, e.target.name, e.target.value, key);
                              }}
                            />
                          </div>
                          <div className='col-lg'>
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
                        this.addRow('phone_numbers', {
                          phone_number_for: '',
                          phone_number: ''
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
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(AddNewContact);
