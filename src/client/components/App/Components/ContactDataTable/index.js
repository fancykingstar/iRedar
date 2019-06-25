import React, { Component, Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import TextFieldGroup from '../../../Elements/TextFieldGroup';
import { editAdminPermissions } from '../../../../actions/accessActions';
import './index.css';
import { unescape } from 'querystring';

export class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      showFilterDropdown: false,
      columns: {
        contact: true,
        company: true,
        emailAddresses: true,
        phoneNumbers: true,
        type: true,
        group: false,
        profession: false,
        language: false
      },
      filter: {
        profession: '',
        company: '',
        type: ''
      }
    };
    this.columns = [
      {
        dataField: '_id',
        text: 'ID',
        hidden: true
      },
      {
        dataField: 'contact',
        text: 'Contact',
        sort: true,
        editable: false,
        hidden: !this.state.columns.contact,
        formatter: (text, record) => {
          return <Link to={`/contacts/view/${record._id}`}>{text}</Link>;
        }
      },
      {
        dataField: 'company',
        text: 'Company',
        sort: true,
        editable: false,
        hidden: !this.state.columns.company
      },
      {
        dataField: 'emailAddresses',
        text: 'Email Address',
        sort: true,
        editable: false,
        hidden: !this.state.columns.emailAddresses,
        headerStyle: (colum, colIndex) => {
          return { width: '25%' };
        },
        formatter: (text, record) => {
          let { emailAddresses } = record;

          switch (true) {
            case !emailAddresses.length:
              return 'N/A';
            case emailAddresses.length > 1:
              return (
                <Fragment>
                  <span>{emailAddresses[0].emailAddress}</span>{' '}
                  <button className={'btn btn-outline-primary btn-sm'} disabled>{`+${emailAddresses.length -
                    1}`}</button>
                </Fragment>
              );
            default:
              return <span>{emailAddresses[0].emailAddress}</span>;
          }
        }
      },
      {
        dataField: 'phoneNumbers',
        text: 'Phone Number',
        sort: true,
        editable: false,
        hidden: !this.state.columns.phoneNumbers,
        headerStyle: (colum, colIndex) => {
          return { width: '25%' };
        },
        formatter: (text, record) => {
          const { phoneNumbers } = record;

          switch (true) {
            case !phoneNumbers.length:
              return 'N/A';
            case phoneNumbers.length > 1:
              return (
                <Fragment>
                  <span>{phoneNumbers[0].phoneNumber}</span>{' '}
                  <button className={'btn btn-outline-primary btn-sm'} disabled>{`+${phoneNumbers.length - 1}`}</button>
                </Fragment>
              );
            default:
              return <span>{phoneNumbers[0].phoneNumber}</span>;
          }
        }
      },
      {
        dataField: 'type',
        text: 'Type',
        sort: true,
        editable: false,
        hidden: !this.state.columns.type,
        formatter: text => {
          return text.map(value => {
            switch (String(value).toLowerCase()) {
              case 'partner':
                return (
                  <button className={'btn btn-outline-success btn-sm mg-l-10'} disabled>
                    P
                  </button>
                );
              case 'staff':
                return (
                  <button className={'btn btn-outline-danger btn-sm mg-l-10'} disabled>
                    S
                  </button>
                );
              case 'client':
                return (
                  <button className={'btn btn-outline-primary btn-sm mg-l-10'} disabled>
                    C
                  </button>
                );
              default:
                return null;
            }
          });
        }
      },
      {
        dataField: 'group',
        text: 'Group',
        sort: true,
        editable: false,
        hidden: !this.state.columns.group
      },
      {
        dataField: 'language',
        text: 'Language',
        sort: true,
        editable: false,
        hidden: !this.state.columns.language
      },
      {
        dataField: 'profession',
        text: 'Profession',
        sort: true,
        editable: false,
        hidden: !this.state.columns.profession
      }
    ];
  }

  componentDidMount() {
    window.$('.filter-dropdown-button').click(function() {
      if (!window.$('.filter-dropdown-menu').hasClass('show')) {
        window.$('.filter-dropdown-menu').addClass('show');
      } else {
        window.$('.filter-dropdown-menu.show').removeClass('show');
      }
    });

    window.$('.columns-dropdown-button').click(function() {
      if (!window.$('.columns-dropdown-menu').hasClass('show')) {
        window.$('.columns-dropdown-menu').addClass('show');
      } else {
        window.$('.columns-dropdown-menu.show').removeClass('show');
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state.columns);
  }

  showColumns = (key, value) => () => {
    console.log(key, value);
    this.setState(oldState => ({
      ...oldState,
      columns: {
        ...this.state.columns,
        [key]: value
      }
    }));
  };

  onFilterInputChange = event => {
    //access event in an asynchronous way
    event.persist()
    this.setState(previousState => ({
      ...previousState,
      filter: {
        ...this.state.filter,
        [event.target.name]: event.target.value
      }
    }));
  }

  onSelectChange = e => {
    // event.persist();
    this.setState(previousState => ({
      ...previousState,
      filter: {
        ...this.state.filter,
        type: e
      }
    }));
  };

  onFilterTable = event => {
    event.preventDefault()

    const { onFilterSubmit } = this.props
    let filterData = {
      profession: this.state.filter.profession === '' ? 'init' : this.state.filter.profession,
      company: this.state.filter.company === '' ? 'init' : this.state.filter.company,
      type: this.state.filter.type.value === undefined ? 'init' : this.state.filter.type.value
    }
    onFilterSubmit(filterData)
  }

  onClearFilter = event => {
    event.preventDefault()
    this.setState(previousState => ({
      ...previousState,
      filter: {
        ...this.state.filter,
        profession: '',
        company: '',
        type: ''
      }
    }));
  }

  render() {
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
    const { SearchBar } = Search;
    const CustomToggleList = ({
      columns,
      onColumnToggle,
      toggles
    }) => (
      <div
        className='dropdown-menu columns-dropdown-menu pd-25 pd-sm-20 wd-sm-200'
        aria-labelledby='dropdownMenuButton2'
        x-placement='bottom-start'
        style={{
          position: 'absolute',
          transform: 'translate3d(0px, 42px, 0px)',
          top: '0px',
          left: '0px',
          'willChange': 'transform'
        }}
      >
        {
          columns
            .map(column => ({
              ...column,
              toggle: toggles[column.dataField]
            }))
            .map(column => (
              <label className='ckbox'>
                <input
                  key={ column.dataField }
                  type='checkbox'
                  checked={column.toggle ? true : false }
                  aria-pressed={ column.toggle ? 'true' : 'false' }
                  onClick={ () => onColumnToggle(column.dataField) }
                />
                <span>{ column.text }</span>
              </label>
            ))
        }
      </div>
    );
    let deletedItems = [];

    const selectRowProp = {
      mode: 'checkbox',
      onSelect: (row, isSelect, rowIndex, e) => {
        if (isSelect) {
          deletedItems.push(row._id);
        } else {
          if (deletedItems.find(value => value === row._id)) {
            deletedItems = deletedItems.filter(value => value !== row._id);
          }
        }
        this.props.onSelected(deletedItems);
      },
      onSelectAll: (isSelect, rows, e) => {
        if (isSelect) {
          rows.forEach(function(row) {
            deletedItems.push(row._id);
          });
        } else {
          rows.forEach(function(row) {
            if (deletedItems.find(value => value === row._id)) {
              deletedItems = deletedItems.filter(value => value !== row._id);
            }
          });
        }
        this.props.onSelected(deletedItems);
      }
    };

    const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
      <li key={text} role='presentation' className='dropdown-item'>
        <div
          href='#'
          tabIndex='-1'
          role='menuitem'
          data-page={page}
          onMouseDown={e => {
            e.preventDefault();
            onSizePerPageChange(page);
          }}
          style={{
            display: 'block',
            cursor: 'pointer'
          }}
        >
          {text}
        </div>
      </li>
    );

    const options = {
      sizePerPageOptionRenderer
    };

    const defaultSorted = [
      {
        dataField: 'role',
        order: 'asc'
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

    let { data } = this.props;

    let contactData = data.map(value => {
      return {
        ...value,
        contact: `${value.lastName}, ${value.firstName}`
      };
    });

    return (
      <ToolkitProvider keyField='_id' data={contactData} columns={this.columns} search columnToggle>
        {props => (
          <div>
            <div className='row'>
              <div className='col-6 d-sm-flex'>
                <div className='dropdown filter-dropdown'>
                  <button
                    className='btn btn-primary btn-sm mg-l-5 dropdown-toggle filter-dropdown-button'
                    type='button'
                    id='dropdownMenuButton2'
                    aria-haspopup='true'
                    aria-expanded='false'
                    onClick={this.handleShowFilterDropdown}
                  >
                    <i className='fa fa-filter' /> Filters
                  </button>
                  <div
                    className='dropdown-menu filter-dropdown-menu pd-30 pd-sm-20 wd-sm-400'
                    aria-labelledby='dropdownMenuButton2'
                    x-placement='bottom-start'
                    style={{
                      position: 'absolute',
                      transform: 'translate3d(0px, 42px, 0px)',
                      top: '0px',
                      left: '0px',
                      'willChange': 'transform'
                    }}
                  >
                    <div className='row'>
                      <div className='col-6'>
                        <TextFieldGroup
                          name='profession'
                          placeholder='Profession'
                          value={this.state.filter.profession}
                          onChange={this.onFilterInputChange}
                        />
                      </div>
                      <div className='col-6'>
                        <TextFieldGroup
                          name='company'
                          placeholder='Company'
                          value={this.state.filter.company}
                          onChange={this.onFilterInputChange}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        {console.log('filterType:', this.state.filter.type)}
                        <Select
                          options={contactTypes}
                          styles={selectCustomStyle}
                          placeholder='Type'
                          name='type'
                          value={this.state.filter.type}
                          // defaultValue={this.state.filter.type}
                          onChange={this.onSelectChange}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <button
                          className='btn btn-info btn-sm'
                          onClick={this.onFilterTable}
                        >
                          Apply
                        </button>
                      </div>
                      <div className='col-6 text-right'>
                        <a
                          href='#'
                          onClick={this.onClearFilter}
                        >
                          Clear filters
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='dropdown'>
                  <button
                    className='btn btn-primary btn-sm dropdown-toggle mg-l-5'
                    type='button'
                    id='dropdownMenuButton2'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i className='fa fa-bolt' /> Actions
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
                      'willChange': 'transform'
                    }}
                  >
                    <a
                      className='dropdown-item'
                      href='#'
                      onClick={() => {
                        this.props.archiveContacts();
                      }}
                    >
                      <i className='fa fa-file' /> Archive contacts
                    </a>
                    <a
                      className='dropdown-item'
                      href='#'
                      onClick={() => {
                        this.props.deleteContacts();
                      }}
                    >
                      <i className='fa fa-trash' /> Delete contacts
                    </a>
                  </div>
                </div>
                <div className='dropdown columns-dropdown'>
                  <button
                    className='btn btn-primary btn-sm mg-l-5 dropdown-toggle columns-dropdown-button'
                    type='button'
                    id='dropdownMenuButton2'
                    aria-haspopup='true'
                    aria-expanded='false'
                    onClick={this.handleShowFilterDropdown}
                  >
                    <i className='fa fa-filter' /> Columns
                  </button>
                  <CustomToggleList { ...props.columnToggleProps } />
                </div>
              </div>
              <div className='col-6 '>
                <SearchBar {...props.searchProps} />
              </div>
            </div>
            <hr />
            <BootstrapTable
              bootstrap4
              hover
              defaultSorted={defaultSorted}
              bordered={false}
              selectRow={selectRowProp}
              {...props.baseProps}
              pagination={paginationFactory(options)}
            />
          </div>
        )}
      </ToolkitProvider>
    );
  }
}

export default connect(null, { editAdminPermissions })(DataTable);
