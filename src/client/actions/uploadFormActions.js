import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'
import { API_URL, GET_ERRORS, GET_UPLOADED_FORM } from './types'

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
    type: GET_UPLOADED_FORM,
    payload
  }
)