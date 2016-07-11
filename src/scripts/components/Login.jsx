import React, { Component, PropTypes } from 'react' //eslint-disable-line no-unused-vars
import { form } from 'tcomb-form'
import { getUserToken } from '../actions/user'
import { loginSchema, registerSchema } from '../schemas'
// material-ui components
import Button from 'material-ui/RaisedButton'
import { getmaterialCheckboxTemplate } from '../modules/formComponents'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.onLogin = this.onLogin.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }
  onLogin() {
    console.log(this.refs)
    let login = this.refs.loginForm.getValue()
    console.log('onLogin', this.refs, login)
    if (login) {
      this.props.onLogin(login)
    }
  }
  onRegister() {
    let register = this.refs.registerForm.getValue()
    console.log('onRegister', this.refs, register)
    if (register && register.confirmPassword === register.password) {
      this.props.onRegister(register)
    }
  }
  getLoginOptions() {
    return {
      fields: {
        email: {
          type: 'email',
          label: this.context.intl.formatMessage({id: 'labels.email'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.email'})
          }
        },
        password: {
          label: this.context.intl.formatMessage({id: 'labels.password'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.password'})
          }
        },
        stayLoggedIn: {
          label: this.context.intl.formatMessage({id: 'labels.stayLoggedIn'}),
          template: getmaterialCheckboxTemplate({}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.stayLoggedIn'})
          }
        }
      }
    }
  }
  getRegisterOptions() {
    return {
      fields: {
        name: {
          label: this.context.intl.formatMessage({id: 'labels.name'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.name'})
          }
        },
        email: {
          type: 'email',
          label: this.context.intl.formatMessage({id: 'labels.email'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.email'})
          }
        },
        password: {
          label: this.context.intl.formatMessage({id: 'labels.password'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.password'})
          }
        },
        confirmPassword: {
          label: this.context.intl.formatMessage({id: 'labels.confirmPassword'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.confirmPassword'})
          }
        }
      }
    }
  }
  render() {
    const styles= {
      wrapper: {
        padding: '0 2rem',
        maxWidth: '960px',
        margin: '0 auto'
      },
      login: {
        borderRight: '1px solid #E0E0E0',
        paddingLeft: '4rem',
        paddingRight: '4rem'
      },
      register: {
        paddingLeft: '4rem',
        paddingRight: '4rem'
      },
      button: {
        color: '#fff',
        backgroundColor: '#47B6BF',
        borderRadius: '3px',
        padding: '0.5rem'
      }
    }
    return (
      <div className="match-my-cols" style={styles.wrapper}>
        <div className="col-sm-6" style={styles.login} >
          <h1>{this.context.intl.formatMessage({id: 'logIn.logIn'})}</h1>
          <form.Form
            ref='loginForm'
            type={loginSchema}
            options={this.getLoginOptions()} />
          <Button label={this.context.intl.formatMessage({id: 'label.logIn'})}
            onClick={this.onLogin}
            backgroundColor={styles.button.backgroundColor}
            labelColor={styles.button.color}
            style={styles.button} />
        </div>
        <div className="col-sm-6" style={styles.register}>
        <h1>{this.context.intl.formatMessage({id: 'logIn.register'})}</h1>
          <form.Form
            ref='registerForm'
            options={this.getRegisterOptions()}
            type={registerSchema} />
          <Button label={this.context.intl.formatMessage({id: 'label.register'})}
           onClick={this.onRegister}
           backgroundColor={styles.button.backgroundColor}
           labelColor={styles.button.color}
           style={styles.button} />
        </div>
      </div>
    )
  }
}
Login.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onUserLogin: PropTypes.func
}
Login.contextTypes = {
  intl: PropTypes.object.isRequired
}
