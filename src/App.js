import axios from 'axios';
import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import { GET_ERRORS } from './client/actions/types';
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
import Registration from './client/components/App/Forms/AllForms/Registration';
import ClientActionSubmission from './client/components/App/Forms/Submissions/ClientAction';
import FCRPLoanSubmission from './client/components/App/Forms/Submissions/FCRPLoan';
import IARAssessmentSubmission from './client/components/App/Forms/Submissions/IARAssessment';
import RegistrationSubmission from './client/components/App/Forms/Submissions/Registration';
import SubmissionSuccess from './client/components/App/Forms/Submissions/SubmissionSuccess';
import UploadFormList from './client/components/App/Forms/UploadForm';
import LogsPage from './client/components/App/Logs';
import MessagePage from './client/components/App/Message';
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

import AppLoading from './client/components/Elements/Loading';
import store from './client/utils/store';
import Socket from './client/components/App/socket';

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
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    // Check for authentication
    try {
      await checkAuth(store);
      this.setState({ loading: false });
    } catch(err) {
      // Handle auth error
    }
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <Route exact path='/' component={LoginPage} />
            {/* <Route exact path="/" component={FormsPage} /> */}
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/reset-password' component={ResetPasswordPage} />
            <Route exact path='/reset-password/:confirmToken' component={UpdatePasswordPage} />
            <div className='App'>
              <Switch>
                <PrivateRoute exact path='/dashboard' component={DashboardPage} />
                {/*<PrivateRoute exact path='/tasks' component={TasksPage}/>*/}
                <PrivateRoute exact path='/logs' component={LogsPage} />
                <PrivateRoute exact path='/contacts' component={ContactsPage} />
                <PrivateRoute exact strict path='/contacts/view/:contactId' component={ViewContact} />
                <PrivateRoute exact path='/contacts/edit/:contactId' component={EditContact} />
                <PrivateRoute exact path='/contacts/add-new-contact' component={AddNewContact} />
                <PrivateRoute exact path='/notifications' component={NotificationsPage} />
                <PrivateRoute exact path='/notifications/add-new-notification' component={AddNewNotification} />
                <PrivateRoute exact path='/notifications/view/:notificationId' component={ViewNotification} />
                <PrivateRoute exact path='/messages' component={MessagePage} />
                <PrivateRoute exact path='/settings/settings' component={Settings} />
                <PrivateRoute exact path='/settings/update-admin-password' component={UpdatePassword} />
                <PrivateRoute exact path='/settings/payment' component={Payment} />
                <PrivateRoute exact path='/modules/submissions' component={Submissions} />
                <PrivateRoute exact path='/modules/referrals' component={Referrals} />
                <PrivateRoute exact path='/forms' component={FormsPage} />
                <PrivateRoute exact path='/modules' component={ModulesPage} />
                <PrivateRoute exact path='/reports' component={ReportsPage} />
                <PrivateRoute exact path='/settings/admin-settings' component={AdminSettings} />
                <PrivateRoute exact path='/settings/add-new-users' component={AddNewUsers} />
                <PrivateRoute exact path='/forms/all-forms/view-client-submission' component={ViewClientSubmission} />
                <PrivateRoute exact path='/forms/all-forms/view-iar-submission' component={ViewIARSubmission} />
                <PrivateRoute exact path='/forms/all-forms/view-fcrp-submission' component={ViewFCRPSubmission} />
                <PrivateRoute
                  exact
                  path='/forms/all-forms/view-registration-submission'
                  component={ViewRegistrationSubmission}
                />
                <PrivateRoute exact path='/forms/upload-forms/:filterType' component={UploadFormList} />
                <PrivateRoute exact path='/referrals/:submissionId' component={ReferralForm} />

                <Route exact path='/referrals/detail/:referralId' component={ReferralFormDetail} />
                <Route exact path='/forms/all-forms/client-action' component={ClientAction} />
                <Route exact path='/forms/all-forms/iar-assessment' component={IARAssessment} />
                <Route exact path='/forms/all-forms/fcrp-loan' component={FCRPLoan} />
                <Route exact path='/forms/all-forms/registration' component={Registration} />
                <Route exact path='/forms/submission-success' component={SubmissionSuccess} />
                <Route exact path='/forms/client-action/:submissionId' component={ClientActionSubmission} />
                <Route exact path='/forms/iar-assessment/:submissionId' component={IARAssessmentSubmission} />
                <Route exact path='/forms/fcrp-loan/:submissionId' component={FCRPLoanSubmission} />
                <Route exact path='/forms/registration/:submissionId' component={RegistrationSubmission} />
              </Switch>
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
