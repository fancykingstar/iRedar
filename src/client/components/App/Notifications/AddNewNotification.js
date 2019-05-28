import propTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {getContacts} from '../../../actions/contactAction';
import {addNotification} from '../../../actions/notificationAction';
import TextFieldGroup from '../../Elements/TextFieldGroup';

class AddNewNotification extends Component {
  state = {
    contacts: [],
    form: {
      recipients: [],
      title: null,
      message: null,
      files: []
    }
  };
  
  componentWillReceiveProps(nextProps, nextContext) {
    const {contacts} = nextProps;
    let data = contacts.map(({firstName, lastName, _id}) => {
      return {
        label: `${lastName}, ${firstName}`,
        value: _id
      };
    });
    
    this.setState(oldState => ({
      ...oldState,
      contacts: [
        {
          label: 'Select contacts',
          value: '',
          isDisabled: true
        }, ...data]
    }));
  }
  
  componentDidMount() {
    const {getContacts} = this.props;
    getContacts();
  }
  
  onChangeFiles = ({target: {files}}) => {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...this.state.form,
        files: [...this.state.form.files, files[0]]
      }
    }));
  };
  
  onSelectChange = (key, value) => {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...this.state.form,
        [key]: value
      }
    }));
  };
  
  onChange = (key) => ({target: {value}}) => {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...this.state.form,
        [key]: value
      }
    }));
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    const {addNotification, history, auth} = this.props;
    const {title, message, recipients} = this.state.form;
    console.log(this.state.form);
    addNotification({
      title,
      message,
      recipients,
      sentBy: auth.profile._id
    }, history);
  };
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state);
  }
  
  render() {
    const selectCustomStyle = {
      container: provided => {
        return {
          ...provided,
          marginBottom: '1rem'
        };
      },
      menu: provided => {
        return {
          ...provided,
          zIndex: '100000'
        };
      }
    };
    
    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className='manager-header'>
            <div className='slim-pageheader'>
              <ol className='breadcrumb slim-breadcrumb'/>
              <h6 className='slim-pagetitle'>Add New Notifications</h6>
            </div>
          </div>
          <div className='section-wrapper'>
            <form onSubmit={this.onSubmit}>
              <Select styles={selectCustomStyle}
                isMulti
                placeholder={'Recipients'}
                options={this.state.contacts}
                onChange={(e) => {this.onSelectChange('recipients', e.map(({value}) => value));}}/>
              <TextFieldGroup onChange={this.onChange('title')}
                placeholder={'Subject'}
                name={'Title'}
                value={this.state.form.title}/>
              <div className={'row'}>
                <div className={'col-8'}>
                  <div className={'form-group'}>
                    <textarea className={'form-control'}
                      rows={10}
                      placeholder={'Message'}
                      onChange={this.onChange('message')}/>
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
                    {this.state.form.files.map(({name}, key) => (
                      <li key={key}>{name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button type={'submit'} className={'btn btn-success'}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddNewNotification.propTypes = {
  getContacts: propTypes.func.isRequired,
  addNotification: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contacts.allContacts,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  addNotification,
  getContacts
})(AddNewNotification);
