import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { HOST_URL } from '../../../actions/types';



// export default function FormsPage() {
class FormsPage extends Component {

  copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  shareForm = event => {
    let formName = event.target.getAttribute('form_name')
    let url = 'http://localhost:3000/forms/all-forms/'+formName
    this.copyToClipboard(url)
    alert('Copied the form URL to Clipboard')
  }

  render() {
    return (
      <div className="slim-mainpanel">
        <div className="container">
          <div className="slim-pageheader">
            <ol className="breadcrumb slim-breadcrumb" />
            <h6 className="slim-pagetitle">All Forms</h6>
          </div>

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
                {/* <tr>
                <td>Registration Form</td>
                <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td>
                <td className="tx-center"> </td>
                <td className="tx-right">
                  <Link to="/forms/all-forms/1" className="tx-right">
                    View
                  </Link>
                </td>
                 <td className="tx-right">
                  <Link to="/forms/all-forms/1" className="tx-right">
                    Submissions
                  </Link>
                </td> 
              </tr> */}
                {/* <tr>
                <td>IAR Assessment</td>
                <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td>
                <td className="tx-center"> </td>
                <td className="tx-right">
                  <Link to="/forms/all-forms/1" className="tx-right">
                    View
                  </Link>
                </td>
              <td className="tx-right">
                  <Link to="/forms/all-forms/1" className="tx-right">
                    Submissions
                  </Link>
                </td> 
              </tr> */}
                <tr>
                  <td> Client Action Plan</td>
                  <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td>
                  <td className="tx-center"> </td>
                  <td className="tx-right">
                    <Link
                      to="/forms/all-forms/client-action"
                      className="tx-right"
                    >
                      View
                  </Link>
                  </td>
                  <td className="tx-right">
                    <button id="downloadButton" type="button" className="btn btn-secondary btn-sm" onClick={this.shareForm} form_name='client-action' >Share</button>
                  </td>
                </tr>
                <tr>
                  <td> IAR Assessment</td>
                  <td className="tx-12">{`${HOST_URL}/forms/all-forms/2`}</td>
                  <td className="tx-center"> </td>
                  <td className="tx-right">
                    <Link
                      to="/forms/all-forms/iar-assessment"
                      className="tx-right"
                    >
                      View
                  </Link>
                  </td>
                  <td className="tx-right">
                    <button id="downloadButton" type="button" className="btn btn-secondary btn-sm" onClick={this.shareForm} form_name='iar-assessment' >Share</button>
                  </td>
                </tr>
                <tr>
                  <td> FCRP Loan</td>
                  <td className="tx-12">{`${HOST_URL}/forms/all-forms/3`}</td>
                  <td className="tx-center"> </td>
                  <td className="tx-right">
                    <Link
                      to="/forms/all-forms/fcrp-loan"
                      className="tx-right"
                    >
                      View
                  </Link>
                  </td>
                  <td className="tx-right">
                    <button id="downloadButton" type="button" className="btn btn-secondary btn-sm" onClick={this.shareForm} form_name='fcrp-loan' >Share</button>
                  </td>
                </tr>
                <tr>
                  <td>Registration</td>
                  <td className="tx-12">{`${HOST_URL}/forms/all-forms/4`}</td>
                  <td className="tx-center"> </td>
                  <td className="tx-right">
                    <Link
                      to="/forms/all-forms/registration"
                      className="tx-right"
                    >
                      View
                  </Link>
                  </td>
                  <td className="tx-right">
                    <button id="downloadButton" type="button" className="btn btn-secondary btn-sm" onClick={this.shareForm} form_name='registration' >Share</button>
                  </td>
                </tr>
                {/* <tr>
                <td>FCRP Loan Initiative Intake</td>
                <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td>
                <td className="tx-center"> </td>
                <td className="tx-right">
                  <Link to="/forms/all-forms/1" className="tx-right">
                    View
                  </Link>
                </td>
              <td className="tx-right">
                  <Link to="/forms/all-forms/1" className="tx-right">
                    Submissions
                  </Link>
                </td> 
              </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(FormsPage)
