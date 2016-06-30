export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION'


/**
 * @param  {string} message
 * @param  {string} id for the notification, defaults to timestamp
 * @param  {integer} time afterwhich to dismiss
 * @return {thunk} thunk dispatching the show and
 */
export function showNotification(message, dismissAfter = 3000, id = Date.now()) {
  return (dispatch) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        message,
        id
      }
    })

    setTimeout(() => dispatch(dismissNotification(id)), dismissAfter)
  }
}

export function dismissNotification(id) {
  return {
    type: DISMISS_NOTIFICATION,
    payload: id
  }
}
