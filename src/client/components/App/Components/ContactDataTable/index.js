import React, {Component} from 'react';
import {connect} from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Select from 'react-select';

import './index.css';
import {editAdminPermissions} from '../../../../actions/accessActions';

export class DataTable extends Component {
  state = {
    showFilterDropdown: false
  };

  componentDidMount() {
    window.$('.select2').select2({
      minimumResultsForSearch: Infinity
    });
    window.$('.filter-dropdown-button').click(function() {
      if (!window.$('.filter-dropdown-menu').hasClass('show')) {
        window.$('.filter-dropdown-menu').addClass('show');
      } else {
        window.$('.filter-dropdown-menu.show').removeClass('show');
      }
    });
  }

  render() {
    const deletedItems = new Set();
    const selectRowProp = {
      mode: 'checkbox',
      onSelect: (row, isSelect, rowIndex, e) => {
        if (isSelect) {
          deletedItems.add(row.permissionId);
        } else {
          if (deletedItems.has(row.permissionId)) {
            deletedItems.delete(row.permissionId);
          }
        }
        this.props.onSelected(deletedItems);
      },
      onSelectAll: (isSelect, rows, e) => {
        if (isSelect) {
          rows.forEach(function(row) {
            deletedItems.add(row.permissionId);
          });
        } else {
          rows.forEach(function(row) {
            if (deletedItems.has(row.permissionId)) {
              deletedItems.delete(row.permissionId);
            }
          });
        }
        this.props.sendData(deletedItems);
      }
    };
    const {SearchBar} = Search;
    const columns = [
      {
        dataField: 'permissionId',
        text: 'iD',
        hidden: true
      },
      {
        dataField: 'contact',
        text: 'Contact',
        sort: true,
        editable: false
      },
      {
        dataField: 'company',
        text: 'Company',
        sort: true,
        editable: false
      },
      {
        dataField: 'email_addresses',
        text: 'Email Addresses',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
          return {width: '25%'};
        }
      },
      {
        dataField: 'phone_numbers',
        text: 'Phone Numbers',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
          return {width: '25%'};
        }
      }
    ];
    const sizePerPageOptionRenderer = ({text, page, onSizePerPageChange}) => (
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
          style={{display: 'block', cursor: 'pointer'}}
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
        return {...provided, marginBottom: '1rem'};
      },
      menu: provided => {
        return {...provided, zIndex: '100000'};
      }
    };

    // NOTE: Have to use arrow function to access "this"
    const beforeSaveCell = (oldValue, newValue, row, column, done) => {
      //eslint-disable-next-line
      if (confirm('Do you want to accept this change?')) {
        const userData = {
          permissionId: row.permissionId,
          role: newValue
        };

        this.props.editAdminPermissions(
          userData,
          this.props.permissions[0].organization,
          this.props.permissions[0].profile
        );
        done(true);
      } else {
        done(false);
      }

      return {async: true};
    };

    // const beforeSaveCell = this.beforeSaveCell;
    let {data} = this.props;

    let contactData = data.map(value => {
      return {...value, contact: `${value.lastName}, ${value.firstName}`};
    });

    return (
      <ToolkitProvider keyField='permissionId' data={contactData} columns={columns} search>
        {props => (
          <div>
            <div className='row'>
              <div className='col-6 d-sm-flex'>
                <div class='dropdown filter-dropdown'>
                  <button
                    class='btn btn-primary btn-sm mg-l-5 dropdown-toggle filter-dropdown-button'
                    type='button'
                    id='dropdownMenuButton2'
                    // data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    onClick={this.handleShowFilterDropdown}
                  >
                    <i className='fa fa-filter'/> Filters
                  </button>
                  <div
                    class='dropdown-menu filter-dropdown-menu pd-30 pd-sm-20 wd-sm-400'
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
                    <div className='row'>
                      <div className='col-6'>
                        <Select options={[]} styles={selectCustomStyle} placeholder='Alphabetic' name='role'/>
                      </div>
                      <div className='col-6'>
                        <Select options={[]} styles={selectCustomStyle} placeholder='Type' name='role'/>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <Select options={[]} styles={selectCustomStyle} placeholder='Profession' name='role'/>
                      </div>
                      <div className='col-6'>
                        <Select options={[]} styles={selectCustomStyle} placeholder='Company' name='role'/>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <button className='btn btn-info btn-sm'>Apply</button>
                      </div>
                      <div className='col-6 text-right'>
                        <a href='#'>Clear filters</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='dropdown'>
                  <button
                    class='btn btn-primary btn-sm dropdown-toggle  mg-l-5'
                    type='button'
                    id='dropdownMenuButton2'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i className='fa fa-bolt'/> Actions
                  </button>
                  <div
                    class='dropdown-menu'
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
                    <a class='dropdown-item' href='#'>
                      <i className='fa fa-file'/> Microsoft Excel or CSV file
                    </a>
                    <a class='dropdown-item' href='#'>
                      <i className='fa fa-google'/> Google contacts
                    </a>
                  </div>
                </div>
                <div class='dropdown'>
                  <button
                    class='btn btn-primary btn-sm dropdown-toggle mg-l-5'
                    type='button'
                    id='dropdownMenuButton2'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i className='fa fa-columns'/> Columns
                  </button>
                  <div
                    class='dropdown-menu'
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
                    <a class='dropdown-item' href='#'>
                      <i className='fa fa-file'/> Microsoft Excel or CSV file
                    </a>
                    <a class='dropdown-item' href='#'>
                      <i className='fa fa-google'/> Google contacts
                    </a>
                  </div>
                </div>
              </div>
              <div className='col-6 '>
                <SearchBar {...props.searchProps} />
              </div>
            </div>
            <hr/>
            <BootstrapTable
              bootstrap4
              hover
              defaultSorted={defaultSorted}
              bordered={false}
              selectRow={selectRowProp}
              // cellEdit={cellEditFactory({
              //   mode: 'click',
              //   beforeSaveCell,
              //   blurToSave: true
              // })}
              {...props.baseProps}
              pagination={paginationFactory(options)}
            />
          </div>
        )}
      </ToolkitProvider>
    );
  }
}

export default connect(null, {editAdminPermissions})(DataTable);
