import t from 'tcomb-form'
import { getToggleTemplate, ReactSelectFactory } from '../formComponents'

export default {
  auto: 'placeholders',
  fields: {
    hasAccommodation: {
      template: getToggleTemplate({})
    },
    centerActivities: {
      factory: ReactSelectFactory,
      options: {selectOptions: ['yoga','surfing','football','table tennis']}
    }
  }
}
