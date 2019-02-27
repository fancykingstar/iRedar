import { GET_ALL_SUBMISSIONS, GET_SUBMISSION } from '../actions/types';

const initialState = {
  allSubmissions: [],
  submission: {
    submissionId: '',
    content: {},
    dateSubmitted: ''
  },
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUBMISSIONS:
      return {
        ...state,
        allSubmissions: action.payload.allSubmissions,
        loading: false
      };
    case GET_SUBMISSION:
      return {
        ...state,
        submission: action.payload.submission,
        loading: false
      };
    default:
      return state;
  }
}
