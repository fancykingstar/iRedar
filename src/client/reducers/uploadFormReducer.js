import { GET_UPLOADED_FORM } from "../actions/types"

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
    case GET_UPLOADED_FORM:
      return {
        ...state,
        uploadForms: action.payload.uploadedForms,
        loading: false
      }
    default:
      return state
  }
}
