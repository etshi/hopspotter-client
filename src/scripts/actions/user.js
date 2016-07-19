import config from '../config'
import { CALL_API } from 'redux-api-middleware'

// const { apiUrl } = config
const apiUrl = 'http://192.168.2.100:8080/api/user'

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

export function getNewUserAuthentication(payload = {}) {
  return {
    [CALL_API]: {
      endpoint: apiUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      types: [
        {
          type: REQUEST_AUTHENTICATION,
          payload: { username: payload.email }
        },
        {
          type: RECEIVE_AUTHENTICATION,
          payload: (action, state, res) => {
            return res.json().then(json => {
              const authentication = json.token
              saveUserSession(state.user.username, authentication)
              return { authentication: authentication }
            })
          }
        },
        FAILURE_AUTHENTICATION
      ]
    }
  }
}

export function getExsistingUserAuthentication(payload = {}) {
  return {
    [CALL_API]: {
      endpoint: `${apiUrl}/token`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      types: [
        {
          type: REQUEST_AUTHENTICATION,
          payload: { username: payload.email }
        },
        {
          type: RECEIVE_AUTHENTICATION,
          payload: (action, state, res) => {
            return res.json().then(json => {
              const authentication = json.token
              saveUserSession(state.user.username, authentication)
              return { authentication: authentication }
            })
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

export function getUserSession() {
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
