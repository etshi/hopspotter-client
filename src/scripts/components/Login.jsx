import React, { Component, PropTypes } from 'react' //eslint-disable-line no-unused-vars
import { form } from 'tcomb-form'
import { getUserToken } from '../actions/user'
import { loginSchema, registerSchema } from '../schemas'
import { loginOptions } from '../modules/formOptions'
// material-ui components
import Button from 'material-ui/RaisedButton'

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
  render() {
    return (
      <div>
        <form.Form
          ref='loginForm'
          type={loginSchema}
          options={loginOptions} />
        <Button label="Login" onClick={this.onLogin} primary />
        <form.Form
          ref='registerForm'
          type={registerSchema} />
        <Button label="Register" onClick={this.onRegister} primary />
      </div>
    )
  }
}
Login.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onUserLogin: PropTypes.func
}
