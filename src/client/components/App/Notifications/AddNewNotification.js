import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import TextFieldGroup from '../../Elements/TextFieldGroup';

class AddNewNotification extends Component {
  state = {
    recipient: [],
    title: null,
    message: null,
    files: []
  };
  
  onChangeFiles = ({target: {files}}) => {
    this.setState(oldState => ({
      ...oldState,
      files: [...this.state.files, files[0]]
    }));
  };
  
  onChange = (key) => ({target: {value}}) => {
    this.setState(oldState => ({
      ...oldState,
      [key]: value
    }));
  };
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state);
  }
  
  render() {
    return <div className='slim-mainpanel'>
      <div className='container'>
        <div className='manager-header'>
          <div className='slim-pageheader'>
            <ol className='breadcrumb slim-breadcrumb'/>
            <h6 className='slim-pagetitle'>Add New Notifications</h6>
          </div>
        </div>
        <div className='section-wrapper'>
          <Select isMulti placeholder={'Recipients'}/>
          <TextFieldGroup onChange={() => {}} placeholder={'Subject'} name={'Title'} value={null}/>
          <div className={'row'}>
            <div className={'col-8'}>
              <div className={'form-group'}>
                <textarea className={'form-control'} rows={10} placeholder={'Message'}/>
              </div>
            </div>
            <div className={'col-4'}>
              <div className={'form-group'}>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFile" onChange={this.onChangeFiles}/>
                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
              </div>
              <ul>
                {this.state.files.map(({name}, key) => (
                  <li key={key}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
          <button className={'btn btn-success'}>Submit</button>
        </div>
      </div>
    </div>;
  }
}

//AddNewNotification.propTypes = {
//  auth: propTypes.object.isRequired,
//  errors: propTypes.object.isRequired
//};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})(AddNewNotification);
