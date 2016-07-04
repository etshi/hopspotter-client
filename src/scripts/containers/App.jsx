import React, { Component, PropTypes } from 'react' //eslint-disable-line no-unused-vars
import { IntlProvider, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { fetchMessages } from '../actions/intl'
import {
  getUserToken,
  restoreSession,
  discardSession
} from '../actions/user'
import Login from '../components/Login'
import { StepperBar } from '../components/Stepper'
import { PromptBox } from '../components/PromptBox'
import Button from 'material-ui/RaisedButton'
import Notifications from './Notifications'
// material-ui components
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { AppBar } from 'material-ui'

class App extends Component {
  constructor(props) {
    super(props)
    this.onIsRouteActive = this.onIsRouteActive.bind(this)
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) }
  }
  componentWillMount() {
    const { fetchLocalesMessages, restoreSession, locale } = this.props
    fetchLocalesMessages(locale)
    restoreSession()
  }
  onIsRouteActive(route) {
    return this.context.router.isActive({pathname: route})
  }
  render() {
    const {
      locale,
      messages,
      hintText,
      user,
      onUserLogin,
      onUserRegister
    } = this.props
    const steps = [{
      name: 'Center',
      isActive: this.onIsRouteActive('center')
    },{
      name: 'Vacation',
      isActive: this.onIsRouteActive('vacation')
    },{
      name: 'Media',
      isActive: this.onIsRouteActive('media')
    },{
      name: 'Pricing',
      isActive: this.onIsRouteActive('pricing')
    }]

    return messages && (
      <IntlProvider locale={locale} messages={messages}>
        <div>
          <Notifications />
          <AppBar
            title={<FormattedMessage id="app" defaultMessage="OptioPay" />}
            iconElementLeft={<span></span>}
            iconElementRight={<Button label="+ Add vacation" onClick={function(){}} primary /> } />
          <div className="match-my-cols">
            <div className="col-md-9">
              <div style={{maxWidth: '960px', margin: '0 auto', padding: '3rem'}}>
                <StepperBar steps={steps} onClick={(name) => this.context.router.push({pathname: name}) }/>
                {this.props.children}
              </div>
            </div>
            <div className="col-md-3" style={{background: 'lightgrey'}}>
              <PromptBox text={hintText} style={{position: 'fixed', width: '23.2%', maxHeight: '50vh', top: '15%', left: '76%', overflow: 'scroll'}} />
            </div>
          </div>
        </div>
      </IntlProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchLocalesMessages: PropTypes.func,
  hintText: PropTypes.string.isRequired,
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
    onUserLogin: (data) => dispatch(getUserToken({
      username: data.email,
      password: data.password
    })),
    onUserLogout: () => dispatch(discardSession()),
    onUserRegister: (data) => dispatch(getUserToken({
      name: data.name,
      username: data.email,
      password: data.password
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
