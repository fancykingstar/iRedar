import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInbox, getInboxes, clearInbox } from '../../../actions/inboxAction';

class MessageList extends Component {
  state = {
    allInboxes: []
  };
  
  componentWillMount() {
    const { profile: { _id }, getInboxes } = this.props;
    
    getInboxes(_id);
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    const { inbox, allInboxes } = nextProps;
    
    this.setState({
      allInboxes: allInboxes
    });
  }
  
  handleClick = (id) => {
    this.props.getInbox(id);
  };
  
  listInboxes(allInboxes) {
    return allInboxes.map((value, key) => {
      let { to, from, updated_at, _id } = value;
      let messageHeader;
      
      if (from._id === this.props.profile._id) {
        messageHeader = `${to.firstName} ${to.lastName}`;
      } else {
        messageHeader = `${from.firstName} ${from.lastName}`;
      }
      
      return (
        <a onClick={() => this.handleClick(_id)} className="media" key={key}>
          <div className="media-left">
            <img src="http://via.placeholder.com/500x500" alt=""/>
            <span className="square-10 bg-success"/>
          </div>
          <div className="media-body">
            <div>
              <h6 style={{ overflow: 'visible' }}>{`${messageHeader}`}</h6>
              <p>Recent message...</p>
            </div>
            <div>
              <span>{moment(updated_at).format('lll')}</span>
            </div>
          </div>
        </a>
      );
    });
  }
  
  handleNewMessage() {
    this.props.clearInbox();
  }
  
  render() {
    return (
      <div className="messages-left">
        <div className="slim-pageheader">
          <h6 className="slim-pagetitle">Messages</h6>
          <a  onClick={() => this.handleNewMessage()} className="messages-compose"><i  className="icon ion-compose"/></a>
        </div>
        <div className="messages-list ps ps--theme_default ps--active-y"
          data-ps-id="68565780-3c6e-a8ec-0c22-2a40a868e860">
          {this.listInboxes(this.state.allInboxes)}
          {/* <a href="" className="media">
           <div className="media-left">
           <img src="http://via.placeholder.com/500x500" alt=""/>
           <span className="square-10 bg-success"/>
           </div>
           <div className="media-body">
           <div>
           <h6>Socrates Itumay</h6>
           <p>The new common language will be more simple and regular...</p>
           </div>
           <div>
           <span>Dec 14</span>
           </div>
           </div>
           </a>
           <a href="" className="media unread">
           <div className="media-left">
           <img src="http://via.placeholder.com/500x500" alt=""/>
           <span className="square-10 bg-success"/>
           </div>
           <div className="media-body">
           <div>
           <h6>Joyce Chua</h6>
           <p>To an English person, it will seem like simplified english...</p>
           </div>
           <div>
           <span>Dec 14</span>
           <span>1</span>
           </div>
           </div>
           </a>
           <a href="" className="media">
           <div className="media-left">
           <img src="http://via.placeholder.com/500x500" alt=""/>
           <span className="square-10 bg-success"/>
           </div>
           <div className="media-body">
           <div>
           <h6>Isidore Dilao</h6>
           <p>The new common language will be more simple and regular...</p>
           </div>
           <div>
           <span>Dec 12</span>
           </div>
           </div>
           </a>
           <a href="" className="media">
           <div className="media-left">
           <img src="http://via.placeholder.com/500x500" alt=""/>
           <span className="square-10 bg-gray-600"/>
           </div>
           <div className="media-body">
           <div>
           <h6>Dyanne Aceron</h6>
           <p>To an English person, it will seem like simplified english...</p>
           </div>
           <div>
           <span>Dec 10</span>
           </div>
           </div>
           </a>
           <a href="" className="media">
           <div className="media-left">
           <img src="http://via.placeholder.com/500x500" alt=""/>
           <span className="square-10 bg-gray-600"/>
           </div>
           <div className="media-body">
           <div>
           <h6>Roven Galeon</h6>
           <p>To an English person, it will seem like simplified english...</p>
           </div>
           <div>
           <span>Dec 08</span>
           </div>
           </div>
           </a>
           <a href="" className="media">
           <div className="media-left">
           <img src="http://via.placeholder.com/500x500" alt=""/>
           <span className="square-10 bg-success"/>
           </div>
           
           <div className="media-body">
           <div>
           <h6>Helder Bongcaras</h6>
           <p>The new common language will be more simple and regular...</p>
           </div>
           <div>
           <span>Dec 07</span>
           </div>
           </div>
           </a>
           <a href="" className="media">
           <div className="media-left">
           <img src="http://via.placeholder.com/500x500" alt=""/>
           <span className="square-10 bg-success"/>
           </div>
           <div className="media-body">
           <div>
           <h6>Maricel Villalon</h6>
           <p>The new common language will be more simple and regular...</p>
           </div>
           <div>
           <span>Dec 07</span>
           </div>
           </div>
           </a>
           <a href="" className="media">
           <div className="media-left">
           <img src="http://via.placeholder.com/500x500" alt=""/>
           <span className="square-10 bg-success"/>
           </div>
           <div className="media-body">
           <div>
           <h6>Maritte Rejas</h6>
           <p>To an English person, it will seem like simplified english...</p>
           </div>
           <div>
           <span>Dec 05</span>
           </div>
           </div>
           </a> */}
        </div>
        <div className="messages-left-footer">
          <button className="btn btn-slim btn-uppercase-sm btn-block">Load Older Messages</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.auth.profile,
  inbox: state.inbox.inbox,
  allInboxes: state.inbox.allInboxes
});

export default connect(mapStateToProps, { getInbox, getInboxes, clearInbox })(MessageList);
