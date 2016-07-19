import React from 'react'
import {
  useRouterHistory,
  IndexRedirect,
  Route,
  Router
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App'
import VacationList from './containers/VacationList'
import Success from './containers/Success'
import * as Vacation from './containers/vacation'
import { createHashHistory } from 'history'

let history = useRouterHistory(createHashHistory)({ queryKey: false })

export default (store) => {
  return (
    <Router history={syncHistoryWithStore(history, store)}>
      <Route path="/" component={App}>
        <Route path="list" component={VacationList} />
        <Route path="success" component={Success} />
        <Route path="vacation" component={Vacation.index}>
          <Route path="center/:id" component={Vacation.CenterDetails} />
          <Route path="vacation/:id" component={Vacation.VacationDetails} />
          <Route path="media/:id" component={Vacation.MediaDetails} />
          <Route path="pricing/:id" component={Vacation.PricingDetails} />
          <IndexRedirect to="center/new" />
        </Route>
        <IndexRedirect to="list" />
      </Route>
    </Router>
  )
}
