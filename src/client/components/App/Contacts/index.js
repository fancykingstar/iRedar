import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteContacts, getContacts} from '../../../actions/contactAction';
import ContactTable from '../Components/ContactDataTable';

class ContactsPage extends React.Component {
  componentDidMount() {
    const {getContacts} = this.props;
    getContacts();
  }
  
  getData = (data) => {
    console.log(data);
    this.deleteItems = data;
  };
  
  removeContacts = (ids) => {
    const {deleteContacts, getContacts} = this.props;
    deleteContacts(ids, this.props.history);
    getContacts();
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
                    <a className='dropdown-item' href='#'>
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
              permissions={{}}
              onSelected={this.getData}
              deleteContacts={() => {this.removeContacts(this.deleteItems);}}
              archiveContacts={() => {this.removeContacts(this.deleteItems);}}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.allContacts,
  loading: state.contacts.loading,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, {
  getContacts,
  deleteContacts
})(ContactsPage);
