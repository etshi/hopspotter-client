import React, { Component, PropTypes } from 'react' //eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store/configureStore'

import Routes from './routes'

// Plugin needed by 'material-ui' to inject tap events
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

render(
  <Provider store={store}>
    <Routes {...store} />
  </Provider>,
  document.getElementById('app-container')
)
