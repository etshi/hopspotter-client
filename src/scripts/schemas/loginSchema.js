import t from 'tcomb-form'

export const loginSchema = t.struct({
  email: t.Str,
  password: t.Str,
  stayLoggedIn: t.Boolean
})

export const registerSchema = t.struct({
  name: t.Str,
  email: t.Str,
  password: t.Str,
  confirmPassword: t.Str
})
