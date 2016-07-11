import {
  RECEIVE_VACATIONS,
  RECEIVE_VACATION,
  RECEIVE_POST_VACATION,
  RECEIVE_PUT_VACATION,
  FAILURE_POST_VACATION,
  CLEAR_VACATION,
  SELECT_VACATION_ID,
  UPDATE_HINTTEXT,
  CLEAR_HINTTEXT
} from '../actions/vacation'
import { default as defaultVacation } from '../schemas/vacationSchema'

const initialUserState = {
  vacation: defaultVacation,
  hintText: ''
}

function vacation(state = initialUserState, action = {}) {
  switch (action.type) {
    case RECEIVE_VACATIONS:
      return Object.assign({}, state, {
        vacations: action.payload
      })
    case RECEIVE_VACATION:
      return Object.assign({}, state, {
        vacation: action.payload
      })
    case RECEIVE_POST_VACATION:
      return Object.assign({}, state, {
        vacation: action.payload
      })
    case RECEIVE_PUT_VACATION:
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
    case CLEAR_VACATION:
      return Object.assign({}, state, {
        vacation: defaultVacation
      })
    case SELECT_VACATION_ID:
      return Object.assign({}, state, state.vacation, {
        id: action.payload.id
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
