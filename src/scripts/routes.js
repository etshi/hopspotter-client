import React from 'react'
import {
  hashHistory,
  IndexRedirect,
  Route,
  Router
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App'
import Center from './containers/Center'
import Vacation from './containers/Vacation'
import Media from './containers/Media'
import Pricing from './containers/Pricing'

export default (store) => {
  return (
    <Router history={syncHistoryWithStore(hashHistory, store)}>
      <Route path="/" component={App}>
        <IndexRedirect to="center" />
        <Route path="center" component={Center} />
        <Route path="vacation" component={Vacation} />
        <Route path="media" component={Media} />
        <Route path="pricing" component={Pricing} />
      </Route>
    </Router>
  )
}
