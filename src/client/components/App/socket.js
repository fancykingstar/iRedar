import React, { Component } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../../actions/types';
import ReactNotification from "react-notifications-component";
import {connect} from 'react-redux';
import "react-notifications-component/dist/theme.css";

export class Socket extends Component {
	constructor(props) {
		super(props)
		this.socket = io(API_URL);
		this.addNotification = this.addNotification.bind(this);
    	this.notificationDOMRef = React.createRef();
    	this.state = {
    		type: "",
    		sentBy: "",
    		content: "",
    		title: ""
    }
	}

	componentDidMount() {
		const profileId = this.props.profile._id;
		let self = this;
    	this.socket.on('has-new-conversation/', function(data) {
    		self.setState({
    			type: data.type,
    			sentBy: data.sentBy,
    			content: data.content,
    			title: data.title
    		});
        console.log(data);
    		if (profileId == data.to) {
    			window.$("#socketNotification").trigger("click");
    		}
   		})
    }

    addNotification() {
    	const title = this.state.type + " from " + this.state.sentBy;
    	const content = this.state.title === "" ? this.state.content : (this.state.title + ": " + this.state.content);
	    this.notificationDOMRef.current.addNotification({
			title: title,
			message: content,
			type: "success",
			insert: "top",
			container: "top-right",
			animationIn: ["animated", "fadeIn"],
			animationOut: ["animated", "fadeOut"],
			dismiss: { duration: 2000 },
			dismissable: { click: true }
	    });
	}
   	render() {
   		return (
   			<div className="app-content">
   				<ReactNotification ref={this.notificationDOMRef} />
   				<button style={{ display: "none" }} onClick={this.addNotification} className="btn btn-primary" id="socketNotification">notification</button>
   			</div>
   		)
   	}
}

const mapStateToProps = state => ({
  profile: state.auth.profile
});

export default connect(
  mapStateToProps,
  {}
)(Socket);