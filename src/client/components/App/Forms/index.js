import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { HOST_URL } from '../../../actions/types';



// export default function FormsPage() {
class FormsPage extends Component {
  componentDidMount() {
    window.history2 = this.props.history
    // alert(JSON.stringify(this.props))

  }

  // componentDidUpdate() {
  //   window.$('#datatable2').DataTable({
  //     responsive: true,
  //     language: {
  //       searchPlaceholder: 'Search...',
  //       sSearch: '',
  //       lengthMenu: '_MENU_ items/page',
  //     }
  //   });
  // }

  copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  viewForm = event => {
    let formName = event.target.getAttribute('form_name')
    this.props.history.push({
      pathname: '/forms/all-forms/' + formName
    });
  }

  shareForm = event => {
    let formName = event.target.getAttribute('form_name')
    let url = window.location.protocol + "//" + window.location.host+'/forms/all-forms/' + formName
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

          <div className="table-responsive mg-t-0">
            <div className="section-wrapper">

              <table className="table table-invoice" id="datatable2">
                <thead>
                  <tr>
                    <th className="wd-5p">Id</th>
                    <th className="wd-20p">Name</th>
                    {/* <th className="wd-40p">Link</th> */}
                    <th className="wd-20p">Date Created</th>
                    <th className="wd-20p">Date Modified</th>

                    <th className="tx-center"> </th>
                    <th className="tx-right"> </th>
                    <th className="tx-right"> </th>
                    <th className="tx-right"> </th>
                    <th className="tx-right"> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td> Client Action Plan</td>
                    {/* <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td> */}
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.viewForm} form_name='client-action' >View</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.viewForm} form_name='client-action' >Edit</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.shareForm} form_name='client-action' >Share</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-primary btn-sm" onClick={this.shareForm} form_name='registration' >Submissions</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td> IAR Assessment</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    {/* <td className="tx-12">{`${HOST_URL}/forms/all-forms/2`}</td> */}
                    {/* <td className="tx-center"> </td> */}
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.viewForm} form_name='iar-assessment' >View</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.viewForm} form_name='iar-assessment' >Edit</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.shareForm} form_name='iar-assessment' >Share</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-primary btn-sm" onClick={this.shareForm} form_name='registration' >Submissions</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td> FCRP Loan</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    {/* <td className="tx-12">{`${HOST_URL}/forms/all-forms/3`}</td> */}
                    {/* <td className="tx-center"> </td> */}
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.viewForm} form_name='fcrp-loan' >View</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.viewForm} form_name='fcrp-loan' >Edit</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.shareForm} form_name='fcrp-loan' >Share</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-primary btn-sm" onClick={this.shareForm} form_name='registration' >Submissions</button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Registration</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    {/* <td className="tx-12">{`${HOST_URL}/forms/all-forms/4`}</td> */}
                    {/* <td className="tx-center"> </td> */}
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.viewForm} form_name='registration' >View</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.viewForm} form_name='registration' >Edit</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={this.shareForm} form_name='registration' >Share</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-primary btn-sm" onClick={this.shareForm} form_name='registration' >Submissions</button>
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
      </div>
    );
  }
}
export default connect()(FormsPage)
