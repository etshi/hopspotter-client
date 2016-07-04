import { CALL_API } from 'redux-api-middleware'
import { flatten } from 'flatnest'
import config from '../config'

export const REQUEST_I18N = 'REQUEST_I18N'
export const RECEIVE_I18N = 'RECEIVE_I18N'
export const FAILURE_I18N = 'FAILURE_I18N'

export function fetchMessages(locale) {
  return {
    [CALL_API]: {
      endpoint: `/locales/${locale}.json?rev=${config.revShort}`,
      method: 'GET',
      types: [
        REQUEST_I18N,
        {
          type: RECEIVE_I18N,
          payload: (action, state, res) => {
            return res.json().then(json => {
              return flatten(json)
            })
          }
        },
        FAILURE_I18N]
    }
  }
}
