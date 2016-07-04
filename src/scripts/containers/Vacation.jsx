import React, { Component, PropTypes } from 'react'
import { form } from 'tcomb-form'
import assign from 'deep-assign'
import { connect } from 'react-redux'
import Button from 'material-ui/RaisedButton'
import { fetchVacation, createVacation, updateVacation } from '../actions/vacation'

import { vacationForm } from '../modules/forms'
import { ReactSelectFactory } from '../modules/formComponents'

class vacation extends Component {
  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchVacation())
  }
  onSave() {
    const { dispatch, vacation } = this.props
    let newVacation = this.refs.validationForm.getValue()
    if (newVacation) {
      newVacation = assign(vacation, newVacation)
      dispatch(updateVacation(newVacation))
      dispatch(createVacation(newVacation))
    }
  }
  getOptions() {
    const { dispatch } = this.props
    return {
      fields: {
        vacationTitle: {
          label: this.context.intl.formatMessage({id: 'labels.vacationTitle'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.vacationTitle'})
          }
        },
        vacationSummary: {
          label: this.context.intl.formatMessage({id: 'labels.vacationSummary'}),
          type: 'textarea'
        },
        vacationExperience: {
          label: this.context.intl.formatMessage({id: 'labels.vacationExperience'}),
          factory: ReactSelectFactory,
          options: {selectOptions: [
            this.context.intl.formatMessage({id: 'vacation.vacationExperience.beginner'}),
            this.context.intl.formatMessage({id: 'vacation.vacationExperience.intermediate'}),
            this.context.intl.formatMessage({id: 'vacation.vacationExperience.advanced'})
          ]}
        },
        vacationSuitability: {
          label: this.context.intl.formatMessage({id: 'labels.vacationSuitability'}),
          factory: ReactSelectFactory,
          options: {selectOptions: [
            this.context.intl.formatMessage({id: 'vacation.vacationSuitability.friends'}),
            this.context.intl.formatMessage({id: 'vacation.vacationSuitability.singles'}),
            this.context.intl.formatMessage({id: 'vacation.vacationSuitability.couples'}),
            this.context.intl.formatMessage({id: 'vacation.vacationSuitability.family'})
          ]}
        },
        vacationSeasonStartDate: {
          label: this.context.intl.formatMessage({id: 'labels.vacationSeasonStartDate'})
        },
        vacationSeasonEndDate: {
          label: this.context.intl.formatMessage({id: 'labels.vacationSeasonEndDate'})
        },
        vacationDuration: {
          label: this.context.intl.formatMessage({id: 'labels.vacationDuration'})
        },
        vacationPeopleAmount: {
          label: this.context.intl.formatMessage({id: 'labels.vacationPeopleAmount'})
        },
        vacationFeatures: {
          label: this.context.intl.formatMessage({id: 'labels.vacationFeatures'}),
          disableOrder: true
        }
      }
    }
  }
  render() {
    const {
      vacation
    } = this.props

    return (
      <div>
        <h1>{this.context.intl.formatMessage({id: 'vacation.title'})}</h1>
        <form.Form
          ref='validationForm'
          type={vacationForm}
          options={this.getOptions()}
          value={vacation} />
        <Button label="Save" onClick={this.onSave} primary />
      </div>
    )
  }
}
vacation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired
}
vacation.contextTypes = {
  intl: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { vacation } = state
  return {
    vacation: vacation.vacation
  }
}
export default connect(mapStateToProps)(vacation)
