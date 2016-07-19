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
      newVacation = assign({}, vacation, JSON.parse(JSON.stringify(newVacation)))
      if(newVacation.id) {
        dispatch(updateVacation(newVacation))
      } else {
        dispatch(createVacation(newVacation))
      }
    }
  }
  getOptions() {
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
          options: {
            selectOptions: [
              this.context.intl.formatMessage({id: 'vacation.vacationExperience.beginner'}),
              this.context.intl.formatMessage({id: 'vacation.vacationExperience.intermediate'}),
              this.context.intl.formatMessage({id: 'vacation.vacationExperience.advanced'})
            ],
            selectIcons: [
              <img src="/assets/svgs/beginner.svg" style={styles.iconButtonList} />,
              <img src="/assets/svgs/intermediate.svg" style={styles.iconButtonList} />,
              <img src="/assets/svgs/advanced.svg" style={styles.iconButtonList} />
            ]
          }
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
    const styles = {
      button: {
        color: '#fff',
        backgroundColor: '#47B6BF',
        borderRadius: '3px',
        padding: '0.3rem'
      }
    }

    return (
      <div>
        <h1>{this.context.intl.formatMessage({id: 'vacation.title'})}</h1>
        <form.Form
          ref='validationForm'
          type={vacationForm}
          options={this.getOptions()}
          value={vacation} />
        <Button label={this.context.intl.formatMessage({id: 'labels.save'})} onClick={this.onSave}
          backgroundColor={styles.button.backgroundColor}
          labelColor={styles.button.color}
          style={styles.button} />
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
