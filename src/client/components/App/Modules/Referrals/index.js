import React from 'react';
import { connect } from 'react-redux';

import AdminReferral from './AdminReferral';
import PartnerReferral from './PartnerReferral';

function ReferralsPage({ permissions }) {
  const role = permissions.length > 0 ? permissions[0].role : '';

  return (
    <div className="slim-mainpanel">
      <div className="container">
        <div className="slim-pageheader">
          <ol className="breadcrumb slim-breadcrumb" />
          <h6 className="slim-pagetitle">Referrals</h6>
        </div>
        {role === 'admin' && <AdminReferral />}
        {role === 'partner' && <PartnerReferral />}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  permissions: state.access.permissions
});

export default connect(mapStateToProps)(ReferralsPage);
