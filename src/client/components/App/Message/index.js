import React, {Component} from 'react';
import {connect} from 'react-redux';
import MessageList from './messageList'
import MessageChatBox from './messageChatBox';
import {getUsers} from '../../../actions/userActions';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

class MessagePage extends Component {
  componentDidMount() {
    const {getUsers} = this.props;
    getUsers();    
  }

  render() {
    return (
      <div className={'slim-mainpanel'}>
        <div className="container">
          <div className="slim-pageheader" style={{ paddingBottom: 0}}>
            <Breadcrumb>
              <Breadcrumb.Item href="../dashboard">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Messages</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="container container-messages" style={{height: '75vh', marginTop: 60}}>
          <MessageList />     
          <MessageChatBox />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.auth.profile
});

export default connect(mapStateToProps, { getUsers })(MessagePage);
