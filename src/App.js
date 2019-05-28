import axios from 'axios';
import React, {Component} from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import {GET_ERRORS} from './client/actions/types';
import ContactsPage from './client/components/App/Contacts';
import AddNewContact from './client/components/App/Contacts/AddNewContact';
import EditContact from './client/components/App/Contacts/EditContact';
import ViewContact from './client/components/App/Contacts/ViewContact';
import DashboardPage from './client/components/App/Dashboard';
import FormsPage from './client/components/App/Forms';
import ViewClientSubmission from './client/components/App/Forms/AllForms/ViewClientSubmission';
import ViewFCRPSubmission from './client/components/App/Forms/AllForms/ViewFCRPSubmission';
import ViewIARSubmission from './client/components/App/Forms/AllForms/ViewIARSubmission';
import ViewRegistrationSubmission from './client/components/App/Forms/AllForms/ViewRegistrationSubmission';
import ClientAction from './client/components/App/Forms/AllForms/ClientAction';
import IARAssessment from './client/components/App/Forms/AllForms/IARAssessment';
import FCRPLoan from './client/components/App/Forms/AllForms/FCRPLoan';
import ClientActionSubmission from './client/components/App/Forms/Submissions/ClientAction';
import FCRPLoanSubmission from './client/components/App/Forms/Submissions/FCRPLoan';
import IARAssessmentSubmission from './client/components/App/Forms/Submissions/IARAssessment';
import RegistrationSubmission from './client/components/App/Forms/Submissions/Registration';
import SubmissionSuccess from './client/components/App/Forms/Submissions/SubmissionSuccess';
import UploadFormList from './client/components/App/Forms/UploadForm';
import LogsPage from './client/components/App/Logs';
import ModulesPage from './client/components/App/Modules';
import ReferralForm from './client/components/App/Modules/Referrals/ReferralForm';
import ReferralFormDetail from './client/components/App/Modules/Referrals/ReferralFormDetail';

import Submissions from './client/components/App/Modules/Submissions';
import Referrals from './client/components/App/Modules/Referrals';
import NotificationsPage from './client/components/App/Notifications';
import AddNewNotification from './client/components/App/Notifications/AddNewNotification';
import ViewNotification from './client/components/App/Notifications/ViewNotification';
import ReportsPage from './client/components/App/Reports';
import AddNewUsers from './client/components/App/Settings/AddNewUsers';
import AdminSettings from './client/components/App/Settings/AdminSettings';
import Payment from './client/components/App/Settings/Payment';
import Settings from './client/components/App/Settings/Settings';
import UpdatePassword from './client/components/App/Settings/UpdatePassword';
//import TasksPage from './client/components/App/Tasks';
import LoginPage from './client/components/Landing/Login';
import RegisterPage from './client/components/Landing/Register';
import ResetPasswordPage from './client/components/Landing/ResetPassword';
import UpdatePasswordPage from './client/components/Landing/UpdatePassword';
import checkAuth from './client/utils/checkAuth';
import PrivateRoute from './client/utils/PrivateRoute';
import ScrollToTop from './client/utils/ScrollToTop';

import store from './client/utils/store';

// Check for authentication
checkAuth(store);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    store.dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    return Promise.reject(error);
  }
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <Route exact path='/' component={LoginPage}/>
            {/* <Route exact path="/" component={FormsPage} /> */}
            <Route exact path='/register' component={RegisterPage}/>
            <Route exact path='/reset-password' component={ResetPasswordPage}/>
            <Route exact path='/reset-password/:confirmToken' component={UpdatePasswordPage}/>
            <div className='App'>
              <Switch>
                <PrivateRoute exact path='/dashboard' component={DashboardPage}/>
              </Switch>
              <Switch>
                {/*<PrivateRoute exact path='/tasks' component={TasksPage}/>*/}
                <PrivateRoute exact path='/logs' component={LogsPage}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/contacts' component={ContactsPage}/>
              </Switch>
              <Switch>
                <PrivateRoute exact strict path='/contacts/view/:contactId' component={ViewContact}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/contacts/edit/:contactId' component={EditContact}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/contacts/add-new-contact' component={AddNewContact}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path='/notifications' component={NotificationsPage}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/settings/settings' component={Settings}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/notifications/add-new-notification' component={AddNewNotification}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/notifications/view/:notificationId' component={ViewNotification}/>
                <PrivateRoute exact path='/settings/update-admin-password' component={UpdatePassword}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/settings/payment' component={Payment}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/modules/submissions' component={Submissions}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/modules/referrals" component={Referrals}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path='/forms' component={FormsPage}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/modules' component={ModulesPage}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/reports' component={ReportsPage}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/settings/admin-settings' component={AdminSettings}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/settings/add-new-users' component={AddNewUsers}/>
              </Switch>
              <Switch>
                <Route exact path="/forms/all-forms/client-action" component={ClientAction}/>
              </Switch>
              <Switch>
                <Route exact path="/forms/all-forms/iar-assessment" component={IARAssessment}/>
              </Switch>
              <Switch>
                <Route exact path="/forms/all-forms/fcrp-loan" component={FCRPLoan}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/forms/all-forms/view-client-submission' component={ViewClientSubmission}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path='/forms/all-forms/view-iar-submission' component={ViewIARSubmission}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path='/forms/all-forms/view-fcrp-submission' component={ViewFCRPSubmission}/>
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path='/forms/all-forms/view-registration-submission'
                  component={ViewRegistrationSubmission}
                />
              </Switch>
              <Switch>
                <Route exact path='/forms/submission-success' component={SubmissionSuccess}/>
              </Switch>
              <Switch>
                <Route exact path='/forms/client-action/:submissionId' component={ClientActionSubmission}/>
              </Switch>
              <Switch>
                <Route exact path='/forms/iar-assessment/:submissionId' component={IARAssessmentSubmission}/>
              </Switch>
              <Switch>
                <Route exact path='/forms/fcrp-loan/:submissionId' component={FCRPLoanSubmission}/>
              </Switch>
              <Switch>
                <Route exact path='/forms/registration/:submissionId' component={RegistrationSubmission}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/forms/upload-forms/:filterType' component={UploadFormList}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/referrals/:submissionId' component={ReferralForm}/>
              </Switch>
              <Switch>
                <Route exact path='/referrals/detail/:referralId' component={ReferralFormDetail}/>
              </Switch>
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
