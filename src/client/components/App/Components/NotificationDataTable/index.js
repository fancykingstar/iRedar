import moment from 'moment';
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editAdminPermissions } from '../../../../actions/accessActions';
import './index.css';
// import { deleteNotifications } from '../../../../actions/notificationActions';

export class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      showFilterDropdown: false,
      received: true,
      sent: true
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
          return { width: '25%' };
        },
        formatter: (text, record) => record.sentBy ? `${record.sentBy.lastName}, ${record.sentBy.firstName}` : 'N/A'
      },
      {
        dataField: 'actions',
        text: 'Actions',
        sort: true,
        editable: false,
        formatter: (text, record) => {
          return (
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
                      'willChange': 'transform'
                    }}
                  >
                    <a className='dropdown-item' href='#' onClick={() => {}}>
                      <i className='fa fa-file'/> Archive notifications
                    </a>
                    <a className='dropdown-item' href='#' onClick={() => {this.props.deleteNotifications(record._id);}}>
                      <i className='fa fa-trash'/> Delete notifications
                    </a>
                  </div>
                </div>
          )
        }
      },
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
  
  showRow = (row, rowIndex) => {
    let displayNone = 'd-none';
    const { isClient } = this.props;
    if (!isClient) {
      if (row.sentBy._id === this.props.profile._id && !this.state.sent) {
        return displayNone;
      }
      
      if (row.sentBy._id !== this.props.profile._id && !this.state.received) {
        return displayNone;
      }
    } else {
      if (row.sentBy._id === this.props.profile._id && isClient) {
        return displayNone;
      }
      
      if (row.sentBy._id !== this.props.profile._id && !this.state.received) {
        return displayNone;
      }
    }
  };
  
  showRows = (key, value) => () => {
    this.setState(oldState => ({ ...oldState, [key]: value }));
  };
  
  render() {
    const { SearchBar } = Search;
    let deletedItems = [];
    
    const selectRowProp = {
      mode: 'checkbox',
      onSelect: (row, isSelect, rowIndex, e) => {
        if (isSelect) {
          deletedItems.push(row._id);
        } else {
          if (deletedItems.find(value => value === row._id)) {
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
    
    let { data, isClient } = this.props;
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
                {
                  !isClient &&
                  <div className='dropdown'>
                    <button
                      className='btn btn-primary btn-sm dropdown-toggle mg-l-5'
                      type='button'
                      id='dropdownMenuButton2'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='fa fa-filter'/> Filter
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
                      <a className='dropdown-item' href='#' onClick={() => {}}>
                        <input
                          type='checkbox'
                          checked={this.state.received}
                          onChange={this.showRows('received', !this.state.received)}
                        /> Received notifications
                      </a>
                      <a className='dropdown-item' href='#' onClick={() => {}}>
                        <input
                          type='checkbox'
                          checked={this.state.sent}
                          onChange={this.showRows('sent', !this.state.sent)}
                        /> Sent notifications
                      </a>
                    </div>
                  </div>
                }
              </div>
              <div className='col-6 '>
                <SearchBar {...props.searchProps} />
              </div>
            </div>
            <hr/>
            <BootstrapTable
              rowClasses={this.showRow}
              bootstrap4
              hover
              defaultSorted={defaultSorted}
              bordered={false}
              {...props.baseProps}
              pagination={paginationFactory(options)}
            />
          </div>
        )}
      </ToolkitProvider>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile
});

export default connect(mapStateToProps, { editAdminPermissions })(DataTable);
