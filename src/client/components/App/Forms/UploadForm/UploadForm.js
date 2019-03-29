import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Spinner from '../../../Elements/Spinner'
import { NavLink } from 'react-router-dom'
import { uploadFormToServer, getAllUploadForms } from '../../../../actions/uploadFormActions'
import UploadFormTable from './UploadFormTable'

const isPdf = type => {
  return type == 'pdf'
}

const isWord = type => {
  return type == 'doc' || type == 'docx'
}

const isExcel = type => {
  return type == 'xls' || type == 'xlsx'
}

const isOther = type => {
  return !isPdf(type) && !isWord(type) && !isExcel(type)
}

class UploadForm extends Component {

  componentDidMount() {
    this.props.dispatch(getAllUploadForms())
  }

  handleChange = _ => {
    var files = window.$('#uploadFormButton').prop('files')
    if (!files) return
    this.uploadMultipleFiles(files)
  }

  uploadMultipleFiles = files => {
    let promises = []
    for (let file of files) {
      let promise = new Promise(resolve => {
        let reader = new FileReader()
        reader.onload = _ => {
          let form = {
            content: reader.result,
            fileName: file.name,
            type: file.name.substr(file.name.lastIndexOf('.') + 1),
            dateUpdated: Date(),
            size: file.size,
          }
          resolve(form)
        }
        reader.readAsDataURL(file)
      })
      promises.push(promise)
    }

    Promise.all(promises).then(contents => {
      this.props.dispatch(uploadFormToServer(contents))
    })
  }

  toArray = json => {
    return json.map((form, index) => {
      return ([
        index + 1,
        form.fileName,
        form.type,
        moment(form.dateUpdated).format('MMM Do YYYY, h:mm a'),
        form.size
      ])
    })
  }

  getFormArray = type => {
    switch (type) {
      case 'other':
        return this.toArray(this.props.uploadForms.filter(object => { return isOther(object.type) }))
      case 'pdf':
        return this.toArray(this.props.uploadForms.filter(object => { return isPdf(object.type) }))
      case 'word':
        return this.toArray(this.props.uploadForms.filter(object => { return isWord(object.type) }))
      case 'excel':
        return this.toArray(this.props.uploadForms.filter(object => { return isExcel(object.type) }))
      default:
        return this.toArray(this.props.uploadForms)
    }
  }

  render() {
    const { filterType } = this.props
    let formList = this.getFormArray(filterType)

    let table = this.props.loading === true ? (
      <Spinner />
    ) : (
        <div className="table-responsive mg-t-0">
          <div className="section-wrapper">
            <UploadFormTable data={formList} />
          </div>
        </div>
      )

    return (
      <div className="slim-mainpanel">
        <div className="container">
          <div className="manager-header">
            <div className="slim-pageheader">
              <ol className="breadcrumb slim-breadcrumb" />
              <h6 className="slim-pagetitle">FORM</h6>
            </div>
          </div>
          <div className="manager-wrapper">
            <div className="manager-right">
              <div className="section-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center' }}>{table}</div>
              </div>
            </div>
            <div className="manager-left">
              <label className="btn btn-contact-new" htmlFor="uploadFormButton">Upload Form</label>
              <input type="file" id="uploadFormButton" name="uploadFormButton" style={{ opacity: 0 }} onChange={this.handleChange} multiple />
              <nav className="nav">
                <NavLink className="nav-link" to="/forms/upload-forms/all">
                  <span>All File Type</span>
                  <span>{this.getFormArray('all').length}</span>
                </NavLink>
                <NavLink className="nav-link" to="/forms/upload-forms/pdf">
                  <span>PDF</span>
                  <span>{this.getFormArray('pdf').length}</span>
                </NavLink>
                <NavLink className="nav-link" to="/forms/upload-forms/word">
                  <span>Word</span>
                  <span>{this.getFormArray('word').length}</span>
                </NavLink>
                <NavLink className="nav-link" to="/forms/upload-forms/excel">
                  <span>Excel</span>
                  <span>{this.getFormArray('excel').length}</span>
                </NavLink>
                <NavLink className="nav-link" to="/forms/upload-forms/other">
                  <span>Other</span>
                  <span>{this.getFormArray('other').length}</span>
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  loading: state.uploadForms.loading ? state.uploadForms.loading : false,
  uploadForms: state.uploadForms.uploadForms ? state.uploadForms.uploadForms : []
})

export default connect(
  mapStateToProps
)(UploadForm)
