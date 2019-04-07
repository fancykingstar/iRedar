import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'
import { API_URL, GET_ERRORS } from './types'

export const SET_ALL_UPLOAD_FORMS = 'uploadForm/SET_ALL_UPLOAD_FORMS'

export const uploadFormToServer = forms => async dispatch => {
  try {
    setAuthToken(localStorage.jwtToken)
    await axios.post(
      `${API_URL}/api/upload-forms`,
      forms
    )
    dispatch(getAllUploadForms())

  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
    throw new Error(error);
  }
}

export const getAllUploadForms = _ => async dispatch => {
  try {
    const res = await axios.get(
      `${API_URL}/api/upload-forms`
    )
    dispatch(setAllUploadForms(res.data))
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
    throw new Error(error);
  }
}

export const setAllUploadForms = payload => (
  {
    type: SET_ALL_UPLOAD_FORMS,
    payload
  }
)