import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { decoded } from './checkAuth';
import store from '../utils/store';
import { logoutUser } from '../actions/authActions';
import AdminNavbar from '../components/App/Layouts/AdminNavbar';
import Header from '../components/App/Layouts/Header';
import Footer from '../components/App/Layouts/Footer';
import ClientNavbar from '../components/App/Layouts/ClientNavbar';
import PartnerNavbar from '../components/App/Layouts/PartnerNavbar';

class PrivateRoute extends Component {
  componentDidUpdate() {
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
    }
  }

  render() {
    const { component: Component, auth, permissions, ...rest } = this.props;

    let navbar = null;

    const role = permissions.length > 0 ? permissions[0].role : '';

    if (role === 'client') navbar = <ClientNavbar />;
    if (role === 'user') navbar = <ClientNavbar />;
    if (role === 'staff') navbar = <AdminNavbar location={this.props.location} />;
    if (role === 'admin') navbar = <AdminNavbar location={this.props.location} />;
    if (role === 'partner') navbar = <PartnerNavbar />;

    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated === true ? (
            <div>
              <Header permissions={permissions} auth={auth} />
              {navbar}
              <Component {...props} />
              <Footer />
            </div>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  permissions: state.access.permissions
});

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
