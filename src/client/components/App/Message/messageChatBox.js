import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { addMessage, getMessages } from '../../../actions/messageAction';
import { getInbox, getInboxes } from '../../../actions/inboxAction';
import './message.css';
import { deleteInbox } from '../../../actions/inboxAction';

class MessageChatBox extends Component {
  constructor () {
    super();
    this.state = {
      inbox: null,
      userProfile: null,
      message: '',
      users: null,
      sendTo: null
    };
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    const { inbox, profile, users, } = nextProps;

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

   delete = event => {
    if (window.confirm('Do you want to delete the message ?')) {
      const { deleteInbox } = this.props;

      deleteInbox(this.state.inbox);
      
    }
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
      this.props.getInboxes(this.state.userProfile._id);

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
              <a href="" className="dropdown-toggle" id="dropdownMenuButton11" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="icon ion-ios-trash-outline"/></a>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton11'
              >
                <a className='dropdown-item' href='#' onClick={this.delete}>
                  <i className='fa fa-trash'/> Delete Message
                </a>
              </div>
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

export default connect(mapStateToProps, { getMessages, addMessage, getInbox, getInboxes, deleteInbox })(MessageChatBox);
