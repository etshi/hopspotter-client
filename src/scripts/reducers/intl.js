import { RECEIVE_I18N } from '../actions/intl'

const initialIntlState = {}

function setMessages(state = initialIntlState, action = {}) {
  switch (action.type) {
    case RECEIVE_I18N:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default setMessages
