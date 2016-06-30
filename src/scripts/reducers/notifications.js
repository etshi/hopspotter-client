import { SHOW_NOTIFICATION, DISMISS_NOTIFICATION } from '../actions/notifications'


/**
 * initialState
 * @type {Array of Objects} [{ message: 'hello world', id: '1466078527607' }]
 */
const initialState = []

export default function notifications(state = initialState, action = {}) {

  switch (action.type) {
    case SHOW_NOTIFICATION:
      return [action.payload, ...state]
    case DISMISS_NOTIFICATION:
      return state.filter(notification => notification.id !== action.payload)
    default:
      return state
  }
}
