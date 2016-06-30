import t from 'tcomb-form'

export default t.struct({
  price: t.Str,
  newsletter: t.Boolean
})
