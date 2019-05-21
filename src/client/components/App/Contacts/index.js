import Papa from 'papaparse';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addContact, deleteContacts, getContacts} from '../../../actions/contactAction';
import ContactTable from '../Components/ContactDataTable';

class ContactsPage extends React.Component {
  componentDidMount() {
    const {getContacts, addContact, history} = this.props;
    getContacts();
    
    window.$('input[type=file]').change(function () {
      Papa.parse(this.files[0], {
        complete: (results, file) => {
          console.log(results, file);
          let {data} = results;
          let contact = [];
          
          data.forEach((value, key) => {
            if (data[key + 1]) {
              let type = [];
              let client = data[key + 1][5];
              let staff = data[key + 1][6];
              let partner = data[key + 1][7];
              
              if (String(client).toLowerCase() === 'yes') {
                type.push('Client');
              }
              
              if (String(staff).toLowerCase() === 'yes') {
                type.push('Staff');
              }
              
              if (String(partner).toLowerCase() === 'yes') {
                type.push('Partner');
              }
              
              contact.push({
                firstName: data[key + 1][0],
                lastName: data[key + 1][1],
                company: data[key + 1][2],
                profession: data[key + 1][3],
                notes: data[key + 1][4],
                type,
                group: 'Zester',
                language: data[key + 1][8],
                addresses: [
                  {
                    address: data[key + 1][9],
                    city: data[key + 1][10],
                    state: data[key + 1][11],
                    zipCode: data[key + 1][12],
                    country: data[key + 1][13],
                    addressFor: data[key + 1][14]
                  },
                  {
                    address: data[key + 1][15],
                    city: data[key + 1][16],
                    state: data[key + 1][17],
                    zipCode: data[key + 1][18],
                    country: data[key + 1][19],
                    addressFor: data[key + 1][20]
                  }
                ],
                emailAddresses: [
                  {
                    emailFor: data[key + 1][21],
                    emailAddress: data[key + 1][22]
                  },
                  {
                    emailFor: data[key + 1][23],
                    emailAddress: data[key + 1][24]
                  }
                ],
                phoneNumbers: [
                  {
                    phoneNumberFor: data[key + 1][25],
                    phoneNumber: data[key + 1][26]
                  },
                  {
                    phoneNumberFor: data[key + 1][27],
                    phoneNumber: data[key + 1][28]
                  }
                ]
              });
            }
          });
          addContact(contact, history);
          getContacts();
        }
      });
    }).bind(this);
  }
  
  getData = (data) => {
    this.deleteItems = data;
  };
  
  removeContacts = (ids) => {
    const {deleteContacts, getContacts} = this.props;
    deleteContacts(ids);
    getContacts();
  };
  
  openFileDIR = () => {
    window.$('#import-file').click();
  };
  
  render() {
    const {contacts} = this.props;
    
    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <ol className='breadcrumb slim-breadcrumb'>
                <Link
                  to={{
                    pathname: '/contacts/add-new-contact'
                  }}
                  className='btn btn-success btn-sm  mg-r-5'
                >
                  <i className='fa fa-plus'/> Add
                </Link>
                <div className='dropdown'>
                  <button
                    className='btn btn-primary btn-sm dropdown-toggle '
                    type='button'
                    id='dropdownMenuButton2'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Import
                  </button>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton2'
                    x-placement='bottom-start'
                    style={{
                      position: 'absolute',
                      transform: 'translate3d(0px, 42px, 0px)',
                      top: '0px',
                      left: '0px',
                      'will-change': 'transform'
                    }}
                  >
                    <input id={'import-file'} type={'file'} hidden/>
                    <a className='dropdown-item' href='#' onClick={this.openFileDIR}>
                      <i className='fa fa-file'/> Microsoft Excel or CSV file
                    </a>
                    <a className='dropdown-item' href='#'>
                      <i className='fa fa-google'/> Google contacts
                    </a>
                  </div>
                </div>
              </ol>
              <h6 className='slim-pagetitle'>Contacts</h6>
            </div>
          </div>
          <div className='section-wrapper'>
            <ContactTable
              data={contacts}
              onSelected={this.getData}
              deleteContacts={() => {this.removeContacts(this.deleteItems);}}
              archiveContacts={() => {this.removeContacts(this.deleteItems);}}/>
          </div>
        </div>
      </div>
    );
  }
}

ContactsPage.propTypes = {
  addContact: propTypes.func.isRequired,
  deleteContacts: propTypes.func.isRequired,
  getContacts: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contacts.allContacts,
  loading: state.contacts.loading,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, {
  getContacts,
  deleteContacts,
  addContact
})(ContactsPage);
