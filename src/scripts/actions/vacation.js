import config from '../config'
import { CALL_API } from 'redux-api-middleware'

const apiUrl = '/fixtures/vacation.json'

export const REQUEST_VACATION = 'REQUEST_VACATION'
export const RECEIVE_VACATION = 'RECEIVE_VACATION'
export const FAILURE_VACATION = 'FAILURE_VACATION'

export const REQUEST_POST_VACATION = 'REQUEST_POST_VACATION'
export const RECEIVE_POST_VACATION = 'RECEIVE_POST_VACATION'
export const FAILURE_POST_VACATION = 'FAILURE_POST_VACATION'

export const UPDATE_VACATION = 'UPDATE_VACATION'

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
  console.log("NEW VACATION ADDED: ", vacation)
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
    type: UPDATE_VACATION,
    payload: {
      vacation
    }
  }
}
