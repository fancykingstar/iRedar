import React, { Component } from 'react';
import { connect } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

class FormsPage extends Component {
  copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  viewForm = event => {
    let formName = event.target.getAttribute('form_name');
    this.props.history.push({
        pathname: '/forms/all-forms/' + formName,
        state: {edit: 'false'}
    });
  };

    editForm = event => {
        let formName = event.target.getAttribute('form_name');
        this.props.history.push({
            pathname: '/forms/all-forms/' + formName,
            state: {edit: 'true'}
    });
  };

  shareForm = event => {
    let formName = event.target.getAttribute('form_name');
    let url = window.location.protocol + "//" + window.location.host + '/forms/all-forms/' + formName;
    this.copyToClipboard(url);
    alert('Copied the form URL to Clipboard')
  };

  viewSubmission = event => {
    let formName = event.target.getAttribute('form_name');
    if(formName === 'client-action'){
      this.props.history.push({
        pathname: '/forms/all-forms/view-client-submission'
      });
    }
    if(formName === 'iar-assessment'){
      this.props.history.push({
        pathname: '/forms/all-forms/view-iar-submission'
      });
    }
    if(formName === 'fcrp-loan'){
      this.props.history.push({
        pathname: '/forms/all-forms/view-fcrp-submission'
      });
    }
    if(formName === 'registration'){
      this.props.history.push({
        pathname: '/forms/all-forms/view-registration-submission'
      });
    }

  };

  render() {
    const { permissions } = this.props;
    const userRole = permissions[0].role;
    const isAllowedToEdit = (userRole === "admin");
    const isAllowedToView = (userRole === "admin" || userRole === "staff" || userRole === "partner");
    const isAllowedToShare = (userRole === "admin" || userRole === "staff" || userRole === "partner");
    const isAllowedToSubmission = (userRole === "partner");
    const isAllowedToForm = (userRole === "partner");

    return (
      <div className="slim-mainpanel">
        <div className="container">
          <div className='slim-pageheader' style={{paddingBottom: 0}}>
            <Breadcrumb>
              <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Forms</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="slim-pageheader" style={{ paddingTop: 0, display: "block" }}>
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

                  { !isAllowedToForm && <tr>
                    <td>1</td>
                    <td>Registration</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    {/* <td className="tx-12">{`${HOST_URL}/forms/all-forms/4`}</td> */}
                    {/* <td className="tx-center"> </td> */}
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToView} onClick={this.viewForm} form_name='registration' >View</button>
                    </td>
                    <td className="tx-right">
                        <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToEdit}
                                onClick={this.editForm} form_name='registration'>Edit
                        </button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToShare} onClick={this.shareForm} form_name='registration' >Share</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-primary btn-sm" disabled={isAllowedToSubmission} onClick={this.viewSubmission} form_name='registration'>Submissions</button>
                    </td>
                  </tr>
                }
                  {!isAllowedToForm && <tr>
                    <td>2</td>
                    <td> IAR Assessment</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    {/* <td className="tx-12">{`${HOST_URL}/forms/all-forms/2`}</td> */}
                    {/* <td className="tx-center"> </td> */}
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToView} onClick={this.viewForm} form_name='iar-assessment' >View</button>
                    </td>
                    <td className="tx-right">
                        <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToEdit}
                                onClick={this.editForm} form_name='iar-assessment'>Edit
                        </button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToShare} onClick={this.shareForm} form_name='iar-assessment' >Share</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-primary btn-sm" disabled={isAllowedToSubmission} onClick={this.viewSubmission} form_name='iar-assessment' >Submissions</button>
                    </td>
                  </tr>}
                  {!isAllowedToForm && <tr>
                    <td>3</td>
                    <td> Client Action Plan</td>
                    {/* <td className="tx-12">{`${HOST_URL}/forms/all-forms/1`}</td> */}
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToView} onClick={this.viewForm} form_name='client-action' >View</button>
                    </td>
                    <td className="tx-right">
                        <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToEdit}
                                onClick={this.editForm} form_name='client-action'>Edit
                        </button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToShare} onClick={this.shareForm} form_name='client-action' >Share</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-primary btn-sm" disabled={isAllowedToSubmission} onClick={this.viewSubmission} form_name='client-action'>Submissions</button>
                    </td>
                  </tr>}
                  <tr>
                    {isAllowedToForm ? <td>1</td> : <td>4</td>}
                    <td> FCRP Loan</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    <td>Jan 09, 2018 12:00 AM</td>
                    {/* <td className="tx-12">{`${HOST_URL}/forms/all-forms/3`}</td> */}
                    {/* <td className="tx-center"> </td> */}
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToView} onClick={this.viewForm} form_name='fcrp-loan' >View</button>
                    </td>
                    <td className="tx-right">
                        <button type="button" className="btn btn-secondary btn-sm"
                                onClick={this.editForm} form_name='fcrp-loan'>Edit
                        </button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-secondary btn-sm" disabled={!isAllowedToShare} onClick={this.shareForm} form_name='fcrp-loan' >Share</button>
                    </td>
                    <td className="tx-right">
                      <button type="button" className="btn btn-primary btn-sm" disabled={isAllowedToSubmission} onClick={this.viewSubmission} form_name='fcrp-loan'>Submissions</button>
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

const mapStateToProps = state => ({
  permissions: state.access.permissions,
  adminPermissions: state.access.admin,
  loading: state.access.loading,
  access: state.access,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, {})(FormsPage)
