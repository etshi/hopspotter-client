import {
  DISCARD_USER_SESSION,
  RECEIVE_AUTHENTICATION,
  REQUEST_AUTHENTICATION,
  RESTORE_USER_SESSION
} from '../actions/user'

const initialUserState = {
  isFetching: false,
  isAuthenticated: false,
  token: ''
}

function user(state = initialUserState, action = {}) {
  switch (action.type) {
    case RESTORE_USER_SESSION:
      const user = action.payload
      return Object.assign({}, state, {
        isAuthenticated: !!user,
        token: user ? user.token : '',
        username: user ? user.email : ''
      })
    case REQUEST_AUTHENTICATION:
      return Object.assign({}, state, {
        isFetching: true,
        username: action.payload.username
      })
    case RECEIVE_AUTHENTICATION:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: action.payload && !!action.payload.authentication,
        token: action.payload.authentication
      })
    case DISCARD_USER_SESSION:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: '',
        username: ''
      })
    default:
      return state
  }
}

export default user
