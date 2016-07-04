import t from 'tcomb-form'

export default t.struct({
  images: t.maybe(t.list(t.form.File)),
  video: t.maybe(t.Str)
})
