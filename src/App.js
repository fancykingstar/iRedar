import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './client/utils/store';
import checkAuth from './client/utils/checkAuth';

import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import PrivateRoute from './client/utils/PrivateRoute';
import ScrollToTop from './client/utils/ScrollToTop';
import LoginPage from './client/components/Landing/Login';
import RegisterPage from './client/components/Landing/Register';
import ResetPasswordPage from './client/components/Landing/ResetPassword';
import UpdatePasswordPage from './client/components/Landing/UpdatePassword';
import DashboardPage from './client/components/App/Dashboard';
import TasksPage from './client/components/App/Tasks';
import ContactsPage from './client/components/App/Contacts';
import FormsPage from './client/components/App/Forms';
import ModulesPage from './client/components/App/Modules';
import ReportsPage from './client/components/App/Reports';
import AdminSettings from './client/components/App/Settings/AdminSettings';
import AddNewUsers from './client/components/App/Settings/AddNewUsers';
import ClientAction from './client/components/App/Forms/AllForms/ClientAction';
import IARAssessment from './client/components/App/Forms/AllForms/IARAssessment';
import FCRPLoan from './client/components/App/Forms/AllForms/FCRPLoan';
import Registration from './client/components/App/Forms/AllForms/Registration';

import Referrals from './client/components/App/Modules/Referrals';
import ClientActionSubmission from './client/components/App/Forms/Submissions/ClientAction';
import IARAssessmentSubmission from './client/components/App/Forms/Submissions/IARAssessment';
import FCRPLoanSubmission from './client/components/App/Forms/Submissions/FCRPLoan';
import RegistrationSubmission from './client/components/App/Forms/Submissions/Registration';
import SubmissionSuccess from './client/components/App/Forms/Submissions/SubmissionSuccess';

// Check for authentication
checkAuth(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <Route exact path="/" component={LoginPage} />
            {/* <Route exact path="/" component={FormsPage} /> */}
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/reset-password" component={ResetPasswordPage} />
            <Route
              exact
              path="/reset-password/:confirmToken"
              component={UpdatePasswordPage}
            />
            <div className="App">
              <Switch>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={DashboardPage}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/tasks" component={TasksPage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/contacts" component={ContactsPage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/forms" component={FormsPage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/modules" component={ModulesPage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/reports" component={ReportsPage} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/settings/admin-settings"
                  component={AdminSettings}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                    exact
                    path="/settings/add-new-users"
                    component={AddNewUsers}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/modules/submissions"
                  component={Referrals}
                />
              </Switch>

              <Switch>
                <Route
                  exact
                  path="/forms/all-forms/client-action"
                  component={ClientAction}
                />
              </Switch>
              <Switch>
                <Route
                  exact
                  path="/forms/all-forms/iar-assessment"
                  component={IARAssessment}
                />
              </Switch>
              <Switch>
                <Route
                  exact
                  path="/forms/all-forms/fcrp-loan"
                  component={FCRPLoan}
                />
              </Switch>
              <Switch>
                <Route
                  exact
                  path="/forms/all-forms/registration"
                  component={Registration}
                />
              </Switch>


              <Switch>
                <Route
                  exact
                  path="/forms/submission-success"
                  component={SubmissionSuccess}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/forms/client-action/:submissionId"
                  component={ClientActionSubmission}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/forms/iar-assessment/:submissionId"
                  component={IARAssessmentSubmission}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/forms/fcrp-loan/:submissionId"
                  component={FCRPLoanSubmission}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/forms/registration/:submissionId"
                  component={RegistrationSubmission}
                />
              </Switch>
              
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
