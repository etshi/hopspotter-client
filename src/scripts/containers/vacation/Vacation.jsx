import React, { Component, PropTypes } from 'react'
import { form } from 'tcomb-form'
import assign from 'deep-assign'
import { connect } from 'react-redux'
import Button from 'material-ui/RaisedButton'
import { fetchVacation, createVacation, clearVacation, updateVacation } from '../../actions/vacation'

import { vacationForm } from '../../modules/forms'
import { ReactSelectFactory, getInputIconTemplate, listTemplate, ReactDatePickerFactory } from '../../modules/formComponents'

class vacation extends Component {
  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
  }
  componentWillMount() {
    const { vacation } = this.props
    const { dispatch } = this.props

    if (vacation.id) {
      dispatch(fetchVacation(vacation.id))
    } else {
      dispatch(clearVacation())
    }
  }
  onSave() {
    const { dispatch, vacation } = this.props
    let newVacation = this.refs.validationForm.getValue()
    if (newVacation) {
      newVacation.vacationSeasonStartDate = '' + newVacation.vacationSeasonStartDate
      newVacation = assign({}, vacation, newVacation)
      dispatch(createVacation(newVacation))
      dispatch(updateVacation(newVacation))
    }
  }
  getOptions() {
    const { dispatch } = this.props
    const styles = {
      icon: {
        width: '30px',
        height: 'auto'
      }
    }

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
          label: this.context.intl.formatMessage({id: 'labels.vacationSeasonStartDate'}),
          factory: ReactDatePickerFactory
        },
        vacationSeasonEndDate: {
          label: this.context.intl.formatMessage({id: 'labels.vacationSeasonEndDate'}),
          factory: ReactDatePickerFactory
        },
        vacationDuration: {
          label: this.context.intl.formatMessage({id: 'labels.vacationDuration'})
        },
        vacationPeopleAmount: {
          label: this.context.intl.formatMessage({id: 'labels.vacationPeopleAmount'}),
          template: getInputIconTemplate({icon: <img src="/assets/svgs/people.svg" style={styles.icon} />})
        },
        vacationFeatures: {
          label: this.context.intl.formatMessage({id: 'labels.vacationFeatures'}),
          template: listTemplate,
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
