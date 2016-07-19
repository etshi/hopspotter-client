import React, { Component, PropTypes } from 'react' //eslint-disable-line no-unused-vars
import { IntlProvider, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { fetchMessages } from '../actions/intl'
import {
  getExsistingUserAuthentication,
  getNewUserAuthentication,
  restoreSession,
  discardSession
} from '../actions/user'
import Login from '../components/Login'
import Button from 'material-ui/RaisedButton'
import Notifications from './Notifications'
// material-ui components
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { AppBar } from 'material-ui'

class App extends Component {
  constructor(props) {
    super(props)
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) }
  }
  componentWillMount() {
    const { fetchLocalesMessages, restoreSession, locale } = this.props
    fetchLocalesMessages(locale)
    restoreSession()
  }
  render() {
    const {
      locale,
      messages,
      user,
      onUserLogin,
      onUserRegister
    } = this.props

    const styles = {
      button: {
        color: '#fff',
        backgroundColor: '#FF6565',
        borderRadius: '3px',
        padding: '0.3rem'
      }
    }

    return messages && (
      <IntlProvider locale={locale} messages={messages}>
        <div>
          <Notifications />
          <AppBar
            title={<FormattedMessage id="app" defaultMessage="Hopspotter" />}
            iconElementLeft={<span></span>}
            iconElementRight={(true || user.isAuthenticated) ?
              <Button label={<FormattedMessage id="myVacations.add" defaultMessage="Add vacation" />}
                onClick={(name) => this.context.router.push({pathname: 'vacation'})}
                backgroundColor={styles.button.backgroundColor}
                labelColor={styles.button.color}
                style={styles.button} />
            : null } />
              { (true || user.isAuthenticated) ? this.props.children
                : <Login onUserLogin={onUserLogin} onRegister={onUserRegister} />
              }
        </div>
      </IntlProvider>
    )
  }
}
App.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchLocalesMessages: PropTypes.func,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
  onUserLogin: PropTypes.func,
  onUserLogout: PropTypes.func,
  onUserRegister: PropTypes.func,
  restoreSession: PropTypes.func,
  user: PropTypes.object.isRequired
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    locale: 'en',
    messages: Object.keys(state.intl).length ? state.intl : false,
    user: state.user,
    hintText: state.vacation.hintText
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLocalesMessages: (locale) => dispatch(fetchMessages(locale)),
    restoreSession: () => dispatch(restoreSession()),
    onUserLogin: (data) => dispatch(getExsistingUserAuthentication({
      email: data.email,
      password: data.password
    })),
    onUserLogout: () => dispatch(discardSession()),
    onUserRegister: (data) => dispatch(getNewUserAuthentication({
      name: data.name,
      email: data.email,
      password: data.password
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
