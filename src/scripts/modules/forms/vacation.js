import t from 'tcomb-form'

export default t.struct({
  vacationTitle: t.Str,
  vacationSummary: t.Str,
  vacationExperience: t.list(t.String),
  vacationSuitability: t.list(t.String),
  vacationSeasonStartDate: t.Date,
  vacationSeasonEndDate: t.Date,
  vacationDuration: t.Number,
  vacationPeopleAmount: t.Number,
  vacationFeatures: t.list(t.String)
})
