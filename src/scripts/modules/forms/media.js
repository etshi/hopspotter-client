import t from 'tcomb-form'

export default t.struct({
  images: t.list(t.String),
  video: t.Str
})
