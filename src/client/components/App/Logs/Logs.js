import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Logs extends Component {

  render() {
    const { user } = this.props;

    let content;

    let onlyAdminContent = this.props.user.role==="admin" ? <div><p>Obtain clarity through the detailed view of your staff activity and enhance the level of your organizations accountability.</p>
      <p>See how your staff interact with your clients on a day to day basis and view a detailed log of all submission activities and referrals made and received from your partners.</p></div> : <div></div>

    return (
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <div className="container container-dashboard">
          <h1>Coming Soon</h1>
          <div className="d-md-flex flex-row-reverse">

            <div className="signin-left" style={{minHeight: "491px"}}>
              <img src="/assets/img/Logs_Image.png" />
            </div>

            <div className="signin-right" style={{minHeight: "0px"}}>
              <div className="signin-box">
                
                <h3>Welcome to the Logs Module</h3>
                <p>From here you can see what activities you’ve been up to. Keep a credible account of anytime you login in to the platform, update your personal information or interact with other users of the platform.</p>

                <p>You can keep track of your activities like your form submissions, the notifications you receive and so much more.</p>
                {onlyAdminContent}
                <p>You can always reference logs anytime you want within the first 30 days. After which you will have to contact your administrator to get a log further back.</p>

                <p>Please note that your logs will be completely removed after 90 days.</p>

                <p>Check out some of our other features on the application and see how best Link2Settle works for you.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
)(Logs);
