import moment from 'moment';
import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import {editAdminPermissions} from '../../../../actions/accessActions';
import './index.css';

export class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      showFilterDropdown: false
    };
    
    this.columns = [
      {
        dataField: '_id',
        text: 'ID',
        hidden: true
      },
      {
        dataField: 'title',
        text: 'Title',
        sort: true,
        editable: false,
        formatter: (text, record) => {
          return <Link to={`/notifications/view/${record._id}`}>{text}</Link>;
        }
      },
      {
        dataField: 'created_at',
        text: 'Date sent',
        sort: true,
        editable: false,
        formatter: (text, record) => text ? moment(text).format('LLL') : 'N/A'
      },
      {
        dataField: 'sentBy',
        text: 'Sent by',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
          return {width: '25%'};
        },
        formatter: (text, record) => record.sentBy ? `${record.sentBy.lastName}, ${record.sentBy.firstName}` : 'N/A'
      }
    ];
  }
  
  componentDidMount() {
    window.$('.filter-dropdown-button').click(function () {
      if (!window.$('.filter-dropdown-menu').hasClass('show')) {
        window.$('.filter-dropdown-menu').addClass('show');
      } else {
        window.$('.filter-dropdown-menu.show').removeClass('show');
      }
    });
  }
  
  render() {
    const {SearchBar} = Search;
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
          rows.forEach(function (row) {
            deletedItems.push(row._id);
          });
        } else {
          rows.forEach(function (row) {
            if (deletedItems.find(value => value === row._id)) {
              deletedItems = deletedItems.filter(value => value !== row._id);
            }
          });
        }
        this.props.onSelected(deletedItems);
      }
    };
    
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
    
    let {data} = this.props;
    
    let contactData = data.map(value => {
      return {
        ...value,
        contact: `${value.lastName}, ${value.firstName}`
      };
    });
    
    return (
      <ToolkitProvider keyField='_id' data={contactData} columns={this.columns} search>
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
                    <i className='fa fa-filter'/> Filters
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
                      'will-change': 'transform'
                    }}
                  >
                    <div className='row'>
                      <div className='col-6'>
                        <Select options={[]} styles={selectCustomStyle} placeholder='Profession' name='role'/>
                      </div>
                      <div className='col-6'>
                        <Select options={[]} styles={selectCustomStyle} placeholder='Type' name='role'/>
                      </div>
                    </div>
                    <div className='row'>
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
                <div className='dropdown'>
                  <button
                    className='btn btn-primary btn-sm dropdown-toggle mg-l-5'
                    type='button'
                    id='dropdownMenuButton2'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i className='fa fa-bolt'/> Actions
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
                    <a className='dropdown-item' href='#' onClick={() => {this.props.archiveContacts();}}>
                      <i className='fa fa-file'/> Archive contacts
                    </a>
                    <a className='dropdown-item' href='#' onClick={() => {this.props.deleteNotifications();}}>
                      <i className='fa fa-trash'/> Delete notifications
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
