import t from 'tcomb-form'

export default t.struct({
  price: t.maybe(t.Str),
  newsletter: t.maybe(t.Boolean)
})
