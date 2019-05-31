import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { addMessage, getMessages } from '../../../actions/messageAction';
import { getInbox } from '../../../actions/inboxAction';
import io from 'socket.io-client';
import { API_URL } from '../../../actions/types';

class MessageChatBox extends Component {
  constructor () {
    super();
    this.socket = io.connect(API_URL);
    this.state = {
      inbox: null,
      userProfile: null,
      message: '',
      users: null,
      sendTo: null
    };

  }

  componentWillReceiveProps (nextProps) {
    const { inbox, profile, users, } = nextProps;

    this.socket.on(`has-new-message/${inbox._id}`, () => {
      this.props.getInbox(inbox._id);
    });

    this.setState({
      inbox: inbox,
      userProfile: profile,
      users: users.map(({ firstName, lastName, _id }) => {
        return {
          label: `${lastName}, ${firstName}`,
          value: _id
        };
      })
    });
  }

  listMessages (inbox, profile) {
    if (!inbox) {
      return;
    }

    const { messages } = inbox;

    return messages.map((message, key) => {
      let messageType = message.sentBy === profile._id ? 'media-body reverse' : 'media-body';

      return (
        <div className="media" key={key}>
          {message.sentBy !== profile._id ? <img src="http://via.placeholder.com/500x500" alt=""/> : null}
          <div className={messageType}>
            <div className="msg">
              <p>{message.message}</p>
            </div>
          </div>
          {message.sentBy === profile._id ? <img src="http://via.placeholder.com/500x500" alt=""/> : null}
        </div>
      );
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      message: target.value
    });
  };

  handleEnter = ({ key }) => {
    let sendObject = {
      inboxId: this.state.inbox._id,
      message: this.state.message,
      sentBy: this.state.userProfile._id
    };

    if (!this.state.inbox._id) {
      sendObject.to = this.state.sendTo;
      sendObject.from = this.state.userProfile._id;
    }

    if (key === 'Enter') {
      this.props.addMessage(sendObject);
      // this.props.inbox.messages.push(sendObject);
      //clear input box
      this.setState({
        message: ' ',
        sendTo: null
      });
    }
  };

  render () {
    const selectCustomStyle = {
      container: provided => {
        return {
          ...provided,
          marginBottom: '1rem',
          width: '500'
        };
      },
      menu: provided => {
        return {
          ...provided,
          zIndex: '100000',
          width: '500'
        };
      }
    };

    let messageHeader = null;

    if (this.state.inbox && this.state.inbox.to) {
      if (this.state.inbox.to._id === this.state.userProfile._id) {
        messageHeader = `${this.state.inbox.from.firstName} ${this.state.inbox.from.lastName}`;
      } else {
        messageHeader = `${this.state.inbox.to.firstName} ${this.state.inbox.to.lastName}`;
      }
    }

    return messageHeader ?
      <div className="messages-right">
        <div className="message-header">
          <a href="" className="message-back"><i className="fa fa-angle-left"/></a>
          <div className="media">
            <img src="http://via.placeholder.com/500x500" alt=""/>`
            <div className="media-body">
              <h6>
                {this.state.inbox ? messageHeader : null}
              </h6>
              <p>Last seen: 2 hours ago</p>
            </div>
          </div>
          <div className="message-option">
            <div className="d-none d-sm-flex">
              <a href=""><i className="icon ion-ios-telephone-outline"/></a>
              <a href=""><i className="icon ion-ios-videocam-outline"/></a>
              <a href=""><i className="icon ion-ios-gear-outline"/></a>
              <a href=""><i className="icon ion-ios-information-outline"/></a>
            </div>
            <div className="d-sm-none">
              <a href=""><i className="icon ion-more"/></a>
            </div>
          </div>
        </div>

        <div className="message-body ps ps--theme_default" data-ps-id="3ff62263-ab02-74be-33aa-7ffa0172d9da">
          <div className="media-list">
            {this.listMessages(this.state.inbox, this.state.userProfile)}
            {/* <div className="media">
             <img src="http://via.placeholder.com/500x500" alt=""/>
             <div className="media-body">
             <div className="msg">
             <p>Hi, there?</p>
             </div>
             <div className="msg">
             <p>Are you ready for our party tonight?</p>
             </div>
             </div>
             </div>
             
             <div className="media">
             <div className="media-body reverse">
             <div className="msg">
             <p>So this is where you plan to do it?</p>
             </div>
             </div>
             
             <img src="http://via.placeholder.com/500x500" className="wd-50 rounded-circle" alt=""/>
             </div>
             
             <div className="media">
             <img src="http://via.placeholder.com/500x500" alt=""/>
             <div className="media-body">
             <div className="msg">
             <p>As good a place as any.</p>
             </div>
             </div>
             </div>
             
             <div className="media">
             <div className="media-body reverse">
             <div className="msg">
             <p>At least have the balls to call this what it is: murder. You really believe if you walk back
             onto
             that farm alone, no me, no Randall... </p>
             </div>
             <div className="msg">
             <p>You really believe they're gonna buy whatever bullshit story you cook up?</p>
             </div>
             </div>
             
             <img src="http://via.placeholder.com/500x500" className="wd-50 rounded-circle" alt=""/>
             </div>
             
             <div className="media">
             <img src="http://via.placeholder.com/500x500" alt=""/>
             <div className="media-body">
             <div className="msg">
             <p>That's just it, it ain't no story. I saw that prisoner shoot you down. I ran after him, I
             snapped his neck. It ain't gonna be easy, but Lori and Carl, they'll get over you. They done it
             before. They just gonna have to.</p>
             </div>
             </div>
             </div> */}
          </div>
        </div>

        <div className="message-footer">
          <div className="row row-sm">
            <div className="col-9 col-sm-8 col-xl-9">
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                onKeyUp={this.handleEnter}
                value={this.state.message}
                placeholder="Type something here..."/>
            </div>
            <div className="col-3 col-sm-4 col-xl-3 tx-right">
              <div className="d-none d-sm-block">
                <a href=""><i className="icon ion-happy-outline"/></a>
                <a href=""><i className="icon ion-ios-game-controller-b-outline"/></a>
                <a href=""><i className="icon ion-ios-camera-outline"/></a>
                <a href=""><i className="icon ion-ios-mic-outline"/></a>
              </div>
              <div className="d-sm-none">
                <a href=""><i className="icon ion-more"/></a>
              </div>
            </div>
          </div>
        </div>
      </div> :
      <div className="messages-right">
        <div className="message-header">
          <a href="" className="message-back"><i className="fa fa-angle-left"/></a>
          <div className="media">
            <Select
              styles={selectCustomStyle}
              placeholder={'Select Recipient'}
              options={this.state.users ? this.state.users : []}
              onChange={({ value }) => {
                this.setState({
                  sendTo: value
                });
              }}/>
          </div>
          {/*<img src="http://via.placeholder.com/500x500" alt=""/>`*/}
        </div>

        <div className="message-body ps ps--theme_default" data-ps-id="3ff62263-ab02-74be-33aa-7ffa0172d9da">
          {/* empty place holder div */}
        </div>

        <div className="message-footer">
          <div className="row row-sm">
            <div className="col-9 col-sm-8 col-xl-9">
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                onKeyUp={this.handleEnter}
                value={this.state.message}
                disabled={!(this.state.inbox || this.state.sendTo)}
                placeholder="Type something here..."/>
            </div>
            <div className="col-3 col-sm-4 col-xl-3 tx-right">
              <div className="d-none d-sm-block">
                <a href=""><i className="icon ion-happy-outline"/></a>
                <a href=""><i className="icon ion-ios-game-controller-b-outline"/></a>
                <a href=""><i className="icon ion-ios-camera-outline"/></a>
                <a href=""><i className="icon ion-ios-mic-outline"/></a>
              </div>
              <div className="d-sm-none">
                <a href=""><i className="icon ion-more"/></a>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.auth.profile,
  messages: state.message.allMessages,
  inbox: state.inbox.inbox,
  users: state.users.allUsers
});

export default connect(mapStateToProps, { getMessages, addMessage, getInbox })(MessageChatBox);
