import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInbox, getInboxes, clearInbox } from '../../../actions/inboxAction';
import io from 'socket.io-client';
import { API_URL } from '../../../actions/types';

class MessageList extends Component {
  constructor () {
    super();
    this.socket = io.connect(API_URL);

    this.state = {
      allInboxes: [],
      forceRender: false
    };
  }

  componentWillUnmount () {
    this.socket.off(`has-new-conversation/${this.props.profile._id}`);
  }

  componentWillMount () {
    const { profile: { _id }, getInboxes } = this.props;

    getInboxes(_id);
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const { inbox, allInboxes } = nextProps;

    this.setState({
      allInboxes: allInboxes
    });

    this.socket.on(`has-new-conversation/${this.props.profile._id}`, ({ hasNewMessage }) => {
      this.setState(oldState => ({
        ...oldState,
        forceRender: !this.state.forceRender
      }));
    });
  }

  handleClick = (id) => {
    this.props.getInbox(id);
  };

  listInboxes (allInboxes) {
    return allInboxes.map((value, key) => {
      let { to, from, updated_at, _id } = value;
      let messageHeader;

      if (from._id === this.props.profile._id) {
        messageHeader = `${to ? to.firstName : 'N/A'} ${to ? to.lastName : 'N/A'}`;
      } else {
        messageHeader = `${from ? from.firstName : 'N/A'} ${from ? from.lastName : 'N/A'}`;
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
    }).reverse();
  }

  handleNewMessage () {
    this.props.clearInbox();
  }

  render () {
    return (
      <div className="messages-left">
        <div className="slim-pageheader">
          <h6 className="slim-pagetitle">Messages</h6>
          <a onClick={() => this.handleNewMessage()} className="messages-compose"><i className="icon ion-compose"/></a>
        </div>
        <div className="messages-list ps ps--theme_default ps--active-y"
             data-ps-id="68565780-3c6e-a8ec-0c22-2a40a868e860">
          {this.listInboxes(this.state.allInboxes)}
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
