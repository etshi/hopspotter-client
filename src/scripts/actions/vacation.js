import config from '../config'
import { CALL_API } from 'redux-api-middleware'
import { getUserSession } from './user'

const apiUrl = `http://192.168.2.100:8080/api/users/${getUserSession().password}/vacations`

export const REQUEST_VACATIONS = 'REQUEST_VACATIONS'
export const RECEIVE_VACATIONS = 'RECEIVE_VACATIONS'
export const FAILURE_VACATIONS = 'FAILURE_VACATIONS'

export const REQUEST_VACATION = 'REQUEST_VACATION'
export const RECEIVE_VACATION = 'RECEIVE_VACATION'
export const FAILURE_VACATION = 'FAILURE_VACATION'

export const REQUEST_POST_VACATION = 'REQUEST_POST_VACATION'
export const RECEIVE_POST_VACATION = 'RECEIVE_POST_VACATION'
export const FAILURE_POST_VACATION = 'FAILURE_POST_VACATION'

export const REQUEST_PUT_VACATION = 'REQUEST_PUT_VACATION'
export const RECEIVE_PUT_VACATION = 'RECEIVE_PUT_VACATION'
export const FAILURE_PUT_VACATION = 'FAILURE_PUT_VACATION'

export const CLEAR_VACATION = 'CLEAR_VACATION'

export const UPDATE_VACATION = 'UPDATE_VACATION'
export const UPDATE_HINTTEXT = 'UPDATE_HINTTEXT'
export const CLEAR_HINTTEXT = 'CLEAR_HINTTEXT'

export const SELECT_VACATION_ID = 'SELECT_VACATION_ID'

export function fetchVacations() {
  return dispatch => {
    dispatch({
      [CALL_API]: {
        endpoint: apiUrl,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          {
            type: REQUEST_VACATIONS,
            meta: {
              notification: {
                message: 'Loading vacations list',
                id: REQUEST_VACATIONS
              }
            }
          }, {
            type: RECEIVE_VACATIONS,
            meta: {
              notification: {
                message: 'Successfully loaded vacations list!',
                dismiss: REQUEST_VACATIONS
              }
            },
            payload: (action, state, res) => {
              return res.json().then( json => {
                return json
              })
            }
          }, {
            type: FAILURE_VACATIONS,
            meta: (action, state, res) => ({
              notification: {
                message: `Error Loading vacations list: ${res.statusText}`,
                dismiss: REQUEST_VACATIONS
              }
            })
          }
        ]
      }
    })
  }
}

export function fetchVacation(id) {
  return dispatch => {
    dispatch({
      [CALL_API]: {
        endpoint: apiUrl,
        method: 'GET',
        types: [
          {
            type: REQUEST_VACATION,
            meta: {
              notification: {
                message: 'Loading vacation Data for ...',
                id: REQUEST_VACATION
              }
            }
          }, {
            type: RECEIVE_VACATION,
            meta: {
              notification: {
                message: 'Successfully loaded vacation Data!',
                dismiss: REQUEST_VACATION
              }
            },
            payload: (action, state, res) => {
              return res.json().then( json => {
                return json
              })
            }
          }, {
            type: FAILURE_VACATION,
            meta: (action, state, res) => ({
              notification: {
                message: `Error Loading vacation Data: ${res.statusText}`,
                dismiss: REQUEST_VACATION
              }
            })
          }
        ]
      }
    })
  }
}

export function createVacation(vacation) {
  return {
    [CALL_API]: {
      endpoint: apiUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vacation),
      types: [
        {
          type: REQUEST_POST_VACATION,
          meta: {
            notification: {
              message: 'Saving vacation',
              id: REQUEST_POST_VACATION
            }
          }
        }, {
          type: RECEIVE_POST_VACATION,
          meta: {
            notification: {
              message: 'Vacation saved!',
              dismiss: REQUEST_POST_VACATION
            }
          },
          payload: (action, state, res) => {
            return res.json().then(json => {
              console.log('response', json)
              return json
            })
          }
        }, {
          type: FAILURE_POST_VACATION,
          meta: {
            notification: {
              message: 'Error saving vacation',
              dismiss: REQUEST_POST_VACATION
            }
          }
        }
      ]
    }
  }
}

export function updateVacation(vacation) {
  return {
    [CALL_API]: {
      endpoint: apiUrl,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vacation),
      types: [
        {
          type: REQUEST_PUT_VACATION,
          meta: {
            notification: {
              message: 'Saving vacation',
              id: REQUEST_PUT_VACATION
            }
          }
        }, {
          type: RECEIVE_PUT_VACATION,
          meta: {
            notification: {
              message: 'Vacation saved!',
              dismiss: REQUEST_PUT_VACATION
            }
          },
          payload: (action, state, res) => {
            return res.json().then(json => {
              console.log('response', json)
              return json
            })
          }
        }, {
          type: FAILURE_PUT_VACATION,
          meta: {
            notification: {
              message: 'Error saving vacation',
              dismiss: REQUEST_PUT_VACATION
            }
          }
        }
      ]
    }
  }
}

export function selectVacationID(id) {
  return {
    type: SELECT_VACATION_ID,
    payload: {
      id
    }
  }
}

export function clearVacation() {
  return {
    type: CLEAR_VACATION,
    payload: {}
  }
}


export function updateHintText(text) {
  return {
    type: UPDATE_HINTTEXT,
    payload: {
      text
    }
  }
}
export function clearHintText() {
  return {
    type: CLEAR_HINTTEXT,
    payload: ''
  }
}
