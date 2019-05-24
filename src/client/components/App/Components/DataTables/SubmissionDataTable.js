import './DataTable.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

export class SubmissionDataTable extends Component {
    render() {

        const { SearchBar } = Search;
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

        // const beforeSaveCell = this.beforeSaveCell;
        let { columns } = this.props;
        let { data } = this.props;
        return (
            <ToolkitProvider
                keyField="submissionId"
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

export default connect(
    null
)(SubmissionDataTable);