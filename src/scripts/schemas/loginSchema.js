import t from 'tcomb-form'

/**
 * Takes an 'Email' String
 * If invalid returns error message else returns null
 *
 * @param  String email
 *
 * @return String or null
 */
function validateEmail(email) {
  let regExp = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
  if (!email) return 'Enter email'
  if (!regExp.test(email)) return 'Enter a valid email "user@example.com"'
  return null
}

const Password = t.refinement(t.String, function (s) {
  return s.length >= 6
})

let Email = t.subtype(t.Str, function (n) {return  validateEmail(n) === null}.bind(this),'EMAIL')


function samePasswords(x) {
  return x.newPassword === x.confirmPassword
}

export const loginSchema = t.struct({
  email: t.Str,
  password: t.Str,
  stayLoggedIn: t.Boolean
})

export const registerSchema = t.subtype(t.struct({
  name: t.Str,
  email: Email,
  password: Password,
  confirmPassword: Password
}), samePasswords)
