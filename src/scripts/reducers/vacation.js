import {
  RECEIVE_VACATION,
  FAILURE_POST_VACATION,
  UPDATE_VACATION
} from '../actions/vacation'

const initialUserState = {
  vacation: {}
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
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default vacation
