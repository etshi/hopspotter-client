import t from 'tcomb-form'

export default t.struct({
  centerName: t.Str,
  centerLocation: t.Str,
  centerGettingThere: t.Str,
  centerActivities: t.list(t.String),
  centerEnvironment: t.list(t.String),
  hasAccommodation: t.Boolean
})
