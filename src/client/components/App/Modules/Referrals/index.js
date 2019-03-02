import React, { Component } from 'react';
import { connect } from 'react-redux'

import AdminReferral from './AdminReferral';
import PartnerReferral from './PartnerReferral';

// function ReferralsPage({ permissions }) {
class ReferralsPage extends Component {
  componentDidMount() {
    window.history2 = this.props.history
    // alert(JSON.stringify(this.props))
  }

  render() {
    let permissions = this.props.permissions
    const role = permissions.length > 0 ? permissions[0].role : '';

    return (
      <div className="slim-mainpanel">
        <div className="container">
          <div className="slim-pageheader">
            <ol className="breadcrumb slim-breadcrumb" />
            <h6 className="slim-pagetitle">Submissions</h6>
          </div>
          {role === 'admin' && <AdminReferral />}
          {role === 'partner' && <PartnerReferral />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  permissions: state.access.permissions
});

export default connect(mapStateToProps)(ReferralsPage);
