import React, { Component, PropTypes } from 'react' //eslint-disable-line no-unused-vars
import { form } from 'tcomb-form'
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
    let login = this.refs.loginForm.getValue()
    console.log('onLogin', this.refs, login)
    if (login) {
      this.props.onUserLogin(login)
    }
  }
  onRegister() {
    let register = this.refs.registerForm.getValue()
    if (register && register.confirmPassword === register.password) {
      this.props.onRegister(register)
    }
  }
  getLoginOptions() {
    return {
      auto: 'none',
      fields: {
        email: {
          type: 'email',
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.email'})
          }
        },
        password: {
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
      error: this.context.intl.formatMessage({id: 'errors.passwordMatch'}),
      auto: 'none',
      fields: {
        name: {
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.name'})
          }
        },
        email: {
          type: 'email',
          error: this.context.intl.formatMessage({id: 'errors.email'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.email'})
          }
        },
        password: {
          type: 'password',
          error: this.context.intl.formatMessage({id: 'errors.passwordLength'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.password'})
          }
        },
        confirmPassword: {
          type: 'password',
          error: this.context.intl.formatMessage({id: 'errors.passwordLength'}),
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
        padding: '0.5rem',
        marginTop: '1rem'
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
          <Button label={this.context.intl.formatMessage({id: 'labels.logIn'})}
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
          <Button label={this.context.intl.formatMessage({id: 'labels.register'})}
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
