import config from '../config'
import { CALL_API } from 'redux-api-middleware'

// const { apiUrl } = config
const apiUrl = '/fixtures/loginSuccess.json'

export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION'
export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION'
export const FAILURE_AUTHENTICATION = 'FAILURE_AUTHENTICATION'

export const RESTORE_USER_SESSION = 'RESTORE_USER_SESSION'
export const DISCARD_USER_SESSION = 'DISCARD_USER_SESSION'

export function restoreSession() {
  return {
    type: RESTORE_USER_SESSION,
    payload: getUserSession()
  }
}

export function discardSession() {
  removeUserSession()
  return {
    type: DISCARD_USER_SESSION
  }
}

export function getUserAuthentication(payload = {}) {
  return {
    [CALL_API]: {
      endpoint: apiUrl,
      headers: {
        'Authorization': `Basic ${btoa(`${payload.username}:${payload.password}`)}`
      },
      method: 'GET',
      types: [
        {
          type: REQUEST_AUTHENTICATION,
          payload: { username: payload.username }
        },
        {
          type: RECEIVE_AUTHENTICATION,
          payload: (action, state, res) => {
            const authentication = res.headers.get('Hopspotter-Authentication')
            saveUserSession(state.user.username, authentication)
            return { authentication: authentication }
          }
        },
        FAILURE_AUTHENTICATION
      ]
    }
  }
}

// persist credentials in sessionStorage
function saveUserSession(username, authentication) {
  if (authentication) {
    sessionStorage.setItem('hsa', `${username}:${authentication}`)
  }
}

function getUserSession() {
  let userInSession = sessionStorage.getItem('hsa')
  if (userInSession) {
    userInSession = userInSession.split(':')
    return {
      username: userInSession[0],
      password: userInSession[1]
    }
  }
  return false
}

function removeUserSession() {
  sessionStorage.removeItem('hsa')
}
