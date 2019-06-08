
import React, { Component } from 'react';
import './loading.css';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading-container">
        <img src="http://localhost:3000/assets/img/ajax-loader.gif" />
      </div>
    );
  }
}
