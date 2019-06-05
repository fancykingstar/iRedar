import React, {Component} from 'react';
import {connect} from 'react-redux';
import MessageList from './messageList'
import MessageChatBox from './messageChatBox';
import {getUsers} from '../../../actions/userActions';

class MessagePage extends Component {
  componentDidMount() {
    const {getUsers} = this.props;
    getUsers();    
  }

  render() {
    return (
      <div className={'slim-mainpanel'}>
        <div className="container container-messages" style={{height: '75vh'}}>
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
