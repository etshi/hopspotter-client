import {
  RECEIVE_VACATION,
  FAILURE_POST_VACATION,
  UPDATE_VACATION,
  UPDATE_HINTTEXT,
  CLEAR_HINTTEXT
} from '../actions/vacation'

const initialUserState = {
  vacation: {},
  hintText: ''
}

function vacation(state = initialUserState, action = {}) {
  switch (action.type) {
    case RECEIVE_VACATION:
      return Object.assign({}, state, {
        vacation: action.payload
      })
    case FAILURE_POST_VACATION:
      return Object.assign(
        {},
        state,
        { error: action.payload.response && action.payload.response.message
          ? action.payload.response.message
          : action.payload.message
        }
      )
    case UPDATE_VACATION:
      return Object.assign({}, state, {
        vacation: action.payload
      })
    case UPDATE_HINTTEXT:
      return Object.assign({}, state, {
        hintText: action.payload.text
      })
    case CLEAR_HINTTEXT:
      return Object.assign({}, state, {
        hintText: ''
      })
    default:
      return state
  }
}

export default vacation
