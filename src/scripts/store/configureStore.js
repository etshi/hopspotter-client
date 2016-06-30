import { createStore, applyMiddleware, compose } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import {
  authMiddleware,
  authErrorMiddleware
} from '../middlewares/auth'
import { notificationMiddleware } from '../middlewares/notifications'
import createLogger from 'redux-logger'
import { hashHistory } from 'react-router'
import rootReducer from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import config from '../config'

const middlewares = [
  authMiddleware,
  apiMiddleware,
  authErrorMiddleware,
  notificationMiddleware,
  thunkMiddleware,
  routerMiddleware(hashHistory)
]

if (config.env === 'development') {
  middlewares.push(createLogger())
}

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares)
  )
)
