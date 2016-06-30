import { combineReducers } from 'redux'
import intl from './intl'
import user from './user'
import notifications from './notifications'
import vacation from './vacation'

import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  intl,
  routing: routerReducer,
  user,
  notifications,
  vacation
})

export default rootReducer
