import React, { Component } from 'react'
import UploadForm from './UploadForm'

export default class FormList extends Component {

  render() {
    return <UploadForm filterType={this.props.match.params.filterType} />
  }
}