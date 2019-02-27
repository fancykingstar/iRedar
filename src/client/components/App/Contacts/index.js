import React from 'react';
import { connect } from 'react-redux';

function ContactsPage(props) {
  console.log(props);
  return <div>Amazing Contact</div>;
}

const mapStateToProps = state => ({
  permissions: state.access.permissions,
  loading: state.access.loading,
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps)(ContactsPage);
