import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

import './DataTable.css';
import { updateuser } from "../../../../actions/authActions";

export class DataTable extends Component {
  render() {
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
        editable: true
      },
      {
        dataField: 'firstName',
        text: 'Firstname',
        sort: true,
        editable: true
      },
      {
        dataField: 'phoneNumber',
        text: 'Phone #',
        sort: true,
        editable: true
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
        hidden: true,
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

    const defaultSorted = [
      {
        dataField: 'role',
        order: 'asc'
      }
    ];

    // NOTE: Have to use arrow function to access "this"
    const beforeSaveCell = (oldValue, newValue, row, column, done) => {
      //eslint-disable-next-line
      if (confirm('Do you want to accept change for the user ?')) {
        if (column.dataField !== "role") {
          const userData = {
            permissionId: row.permissionId,
            [column.dataField]: newValue
          };
          this.props.updateuser(userData);
          done(true);
        } else {
          done(false);
        }
      } else {
        done(false);
      }
      return { async: true };
    };
    // const beforeSaveCell = this.beforeSaveCell;
    let { data } = this.props;
    return (
      <ToolkitProvider
        keyField="permissionId"
        data={data}
        columns={columns}
        search
      >
        {props => (
          <div>
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
            />
          </div>
        )}
      </ToolkitProvider>
    );
  }
}

export default connect(
    null,
  { updateuser }
)(DataTable);
