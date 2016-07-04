import React, { Component, PropTypes } from 'react' //eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store/configureStore'

import Routes from './routes'

// Plugin needed by 'material-ui' to inject tap events
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()


// Fix for IE11 in combination with polyfill.io. For some reason polyfill.io was not
// returning the promise polyfill in IE11. This enforces it.
import promisePolyfill from 'es6-promise'
promisePolyfill.polyfill()

render(
  <Provider store={store}>
    <Routes {...store} />
  </Provider>,
  document.getElementById('app-container')
)
