import t from 'tcomb-form'
// Hack add * for required and remove (optional) from optional fields
t.form.Form.i18n.required = ' *'
t.form.Form.i18n.optional = ''

export default t.struct({
  vacationTitle: t.maybe(t.Str),
  vacationSummary: t.maybe(t.Str),
  vacationExperience: t.maybe(t.list(t.String)),
  vacationSuitability: t.maybe(t.list(t.String)),
  vacationSeasonStartDate: t.maybe(t.Date),
  vacationSeasonEndDate: t.maybe(t.Date),
  vacationDuration: t.maybe(t.Number),
  vacationPeopleAmount: t.maybe(t.Number),
  vacationFeatures: t.maybe(t.list(t.String))
})
