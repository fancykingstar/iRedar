import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

import './DataTable.css';
import { editAdminPermissions } from '../../../../actions/accessActions';

export class DataTable extends Component {
  render() {
    const { SearchBar } = Search;
    const columns = [
      {
        dataField: 'permissionId',
        text: 'iD',
        hidden: true
      },
      {
        dataField: 'lastName',
        text: 'Lastname',
        sort: true,
        editable: false
      },
      {
        dataField: 'firstName',
        text: 'Firstname',
        sort: true,
        editable: false
      },
      {
        dataField: 'phoneNumber',
        text: 'Phone #',
        sort: true,
        editable: false
      },
      {
        dataField: 'email',
        text: 'Email',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '25%' };
        }
      },
      {
        dataField: 'role',
        text: 'Role',
        sort: true,
        classes: (cell, row, rowIndex, colIndex) => {
          return 'table-role-row';
        },
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: 'admin',
              label: 'Admin'
            },
            {
              value: 'staff',
              label: 'Staff'
            },
            {
              value: 'partner',
              label: 'Partner'
            },
            {
              value: 'client',
              label: 'Client'
            }
          ]
        }
      }
    ];
    const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
      <li key={text} role="presentation" className="dropdown-item">
        <div
          href="#"
          tabIndex="-1"
          role="menuitem"
          data-page={page}
          onMouseDown={e => {
            e.preventDefault();
            onSizePerPageChange(page);
          }}
          style={{ display: 'block', cursor: 'pointer' }}
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

    // NOTE: Have to use arrow function to access "this"
    const beforeSaveCell = (oldValue, newValue, row, column, done) => {
      //eslint-disable-next-line
      if (confirm('Do you want to accep this change?')) {
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

      return { async: true };
    };

    // const beforeSaveCell = this.beforeSaveCell;
    const { data } = this.props;

    return (
      <ToolkitProvider
        keyField="permissionId"
        data={data}
        columns={columns}
        search
      >
        {props => (
          <div>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable
              bootstrap4
              hover
              defaultSorted={defaultSorted}
              bordered={false}
              cellEdit={cellEditFactory({
                mode: 'click',
                beforeSaveCell,
                blurToSave: true
              })}
              {...props.baseProps}
              pagination={paginationFactory(options)}
            />
          </div>
        )}
      </ToolkitProvider>
    );
  }
}

export default connect(
  null,
  { editAdminPermissions }
)(DataTable);
