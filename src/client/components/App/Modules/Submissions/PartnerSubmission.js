import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HOST_URL } from '../../../../actions/types';

class PartnerSubmissions extends Component {
  render() {
    return (
      <div className="table-responsive mg-t-40">
        <table className="table table-invoice">
          <thead>
            <tr>
              <th className="wd-20p">Name</th>
              <th className="wd-40p">Link</th>
              <th className="tx-center"> </th>
              <th className="tx-right"> </th>
              <th className="tx-right"> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Registration Form</td>
              <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td>
              <td className="tx-center"> </td>
              <td className="tx-right">
                <Link to="/forms/all-forms/1" className="tx-right">
                  View
                </Link>
              </td>
            </tr>
            <tr>
              <td>IAR Assessment</td>
              <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td>
              <td className="tx-center"> </td>
              <td className="tx-right">
                <Link to="/forms/all-forms/1" className="tx-right">
                  View
                </Link>
              </td>
            </tr>
            <tr>
              <td> Client Action Plan</td>
              <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td>
              <td className="tx-center"> </td>
              <td className="tx-right">
                <Link to="/forms/all-forms/1" className="tx-right">
                  View
                </Link>
              </td>
            </tr>
            <tr>
              <td>FCRP Loan Initiative Intake</td>
              <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td>
              <td className="tx-center"> </td>
              <td className="tx-right">
                <Link to="/forms/all-forms/1" className="tx-right">
                  View
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PartnerSubmissions;