import { SET_ALL_UPLOAD_FORMS } from '../actions/uploadFormActions'

const initialState = {
  loading: true,
  uploadForms: [
    {
      fileName: '',
      type: '',
      dateUpdated: null,
      size: ''
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_UPLOAD_FORMS:
      return {
        ...state,
        uploadForms: action.payload.uploadedForms,
        loading: false
      }
    default:
      return state
  }
}
