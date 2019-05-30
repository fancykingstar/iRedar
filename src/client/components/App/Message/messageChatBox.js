import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMessages, addMessage} from '../../../actions/messageAction';

class MessageChatBox extends Component {
  state = { 
    inbox: null,
    userProfile: null,
    message: ''
  }

  componentWillReceiveProps(nextProps) {
    const {inbox, profile} = nextProps;

    this.setState({
      inbox: inbox,
      userProfile: profile
    })
  }
  
  listMessages(inbox, profile) {
    if(!inbox){
      return
    }

    console.log(inbox)

    const { messages } = inbox;

    return messages.map((message, key) => {      
      let messageType = message.sentBy == profile._id ? 'media-body reverse' : 'media-body' ;
  
      return (
        <div className="media" key={key}>
          { message.sentBy !== profile._id ? <img src="http://via.placeholder.com/500x500" alt=""/> : null}
          <div className={messageType}>
            <div className="msg">
              <p>{message.message}</p>
            </div>
          </div>
          { message.sentBy === profile._id ? <img src="http://via.placeholder.com/500x500" alt=""/> : null}
        </div>
      );
    })
  }

  handleChange = ({target}) => {
    this.setState({
      message: target.value
    });
  }

  handleEnter = ({key}) => {
    if(key === 'Enter'){      
      this.props.addMessage({
        inboxId: this.props.inbox._id,
        message: this.state.message,
        sentBy: this.state.userProfile._id
      });

      this.setState({
        message: ' '
      })
    }
  }

  getChatBoxName(){
    
  }

  render() {
    return (
      <div className="messages-right">
        <div className="message-header">
          <a href="" className="message-back"><i className="fa fa-angle-left"/></a>
          <div className="media">
            <img src="http://via.placeholder.com/500x500" alt=""/>`
            <div className="media-body">
              <h6>
                {this.state.inbox ? `${this.state.inbox.to.firstName} ${this.state.inbox.to.lastName}` : null}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.auth.profile,
  messages: state.message.allMessages,
  inbox: state.inbox.inbox,
});

export default connect(mapStateToProps, { getMessages, addMessage })(MessageChatBox);