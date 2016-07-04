import t from 'tcomb-form'

export default t.struct({
  centerName: t.maybe(t.Str),
  centerLocation: t.maybe(t.Str),
  centerGettingThere: t.maybe(t.Str),
  centerActivities: t.maybe(t.list(t.String)),
  centerEnvironment: t.maybe(t.list(t.String)),
  hasAccommodation: t.maybe(t.Boolean)
})
