import { CALL_API, isRSAA } from 'redux-api-middleware'
import { DISCARD_USER_SESSION } from '../actions/user'

export const authMiddleware = store => next => action => {
  // add auth header to API calls
  if (isRSAA(action)) {
    action[CALL_API].headers = Object.assign(
      {},
      { 'Authorization': `Basic ${btoa(`${store.getState().user.token}:`)}` },
      action[CALL_API].headers
    )
  }
  return next(action)
}

export const authErrorMiddleware = store => next => action => {
  // when API return 401 discard session
  if (action.error && action.payload.status === 401) {
    sessionStorage.removeItem('hsa')
    action = {
      type: DISCARD_USER_SESSION
    }
  }
  next(action)
}
