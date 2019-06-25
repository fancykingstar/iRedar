import React from "react";
import { CSVLink, CSVDownload } from "react-csv";

export default class Download extends React.Component {
    render() {
        return (
            <CSVLink data={this.props.csvData}>Download</CSVLink>
        );
    }
}