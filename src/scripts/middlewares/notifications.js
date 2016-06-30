import {
  showNotification,
  dismissNotification,
  SHOW_NOTIFICATION,
  DISMISS_NOTIFICATION
} from '../actions/notifications'

/**
 * Notification middleware
 *
 * Middleware allows notification actions to be dispatched from other
 * actions.
 * For all non explicit notification actions if there's a meta object
 * with a nested notification object.
 * An example action:
 * {
 *   type: ADD_TODO
 *   payload: 'write documentation'
 *   meta: {
 *     notification: {
 *       message: 'Adding todo...'
 *     }
 *   }
 * }
 *
 * This middleware will dispatch a SHOW_NOTIFICATION action for the example
 * action shown above.
 * The real beauty of the middleware is the ability to give notification
 * IDs and dismiss in the meta of another action. This is extremely useful
 * for async operations.
 * To demonstrate this, lets enhance the first example with such functionality
 * The first action would look like this:
 * {
 *   type: ADD_TODO
 *   payload: 'write documentation'
 *   meta: {
 *     notification: {
 *       message: 'Adding todo...',
 *       id: ADD_TODO
 *     }
 *   }
 * }
 *
 * The addition of id will not change any of the behaviour from the original
 * example.
 *
 * When the response comes back from the API and we trigger the following action:
 *
 * {
 *   type: ADD_TODO_SUCCESS
 * }
 *
 * We can add the following to ensure the notification is dismissed
 * {
 *   type: ADD_TODO_SUCCESS
 *   meta: {
 *     notification: {
 *       dismiss: ADD_TODO
 *     }
 *   }
 * }
 *
 * The ID we chose in this example was the action type. This won't scale well
 * if there are multiple notifications with the same id because all of them will
 * be dismissed.
 * If that's the case and you wish to have finer control, you can simply
 * generate random ids e.g. Date.now()
 *
 */
export const notificationMiddleware = store => next => action => {
  const { type, meta } = action
  if (type !== SHOW_NOTIFICATION &&
      type !== DISMISS_NOTIFICATION &&
      meta && meta.notification) {
    const { message, id, dismiss } = meta.notification
    if(message) {
      // If id is undefined the action creator will generate an id
      store.dispatch(showNotification(message, undefined, id))
    }
    if(dismiss) {
      store.dispatch(dismissNotification(dismiss))
    }
  }
  next(action)
}
