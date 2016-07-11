import React, { Component, PropTypes } from 'react'
import t, { form } from 'tcomb-form'
import assign from 'deep-assign'
import { connect } from 'react-redux'
import Button from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import {
  fetchVacation,
  createVacation,
  updateVacation,
  clearVacation,
  updateHintText,
  clearHintText
} from '../../actions/vacation'

import { centerForm } from '../../modules/forms'
import {
  ReactSelectFactory,
  getbooleanCheckboxTemplate,
  getInputIconTemplate
} from '../../modules/formComponents'

class center extends Component {
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
    let newVacation = this.refs.centerForm.getValue()
    console.log('onSave',newVacation)
    if (newVacation) {
      newVacation = assign(vacation, newVacation)
      dispatch(updateVacation(newVacation))
      dispatch(createVacation(newVacation))
    }
  }
  getOptions() {
    const { dispatch } = this.props
    const styles = {
      icon: {
        fontSize: '18px'
      }
    }

    return {
      fields: {
        centerName: {
          label: this.context.intl.formatMessage({id: 'labels.centerName'}),
          attrs: {
            placeholder: this.context.intl.formatMessage({id: 'placeholders.centerName'}),
            onFocus: (e) => {
              dispatch(updateHintText(this.context.intl.formatMessage({id: `promptBox.${e.currentTarget.name}`})))
            },
            onMouseEnter: (e) => {
              dispatch(updateHintText(this.context.intl.formatMessage({id: `promptBox.${e.currentTarget.name}`})))
            }
            // onMouseOut: () => {
            //   dispatch(clearHintText())
            // }
          }
        },
        centerLocation: {
          label: this.context.intl.formatMessage({id: 'labels.centerLocation'}),
          template: getInputIconTemplate({icon: <FontIcon className="material-icons" style={styles.icon}>place</FontIcon>})
        },
        centerGettingThere: {
          label: this.context.intl.formatMessage({id: 'labels.centerGettingThere'}),
          type: 'textarea',
          attrs: {
            onFocus: (e) => {
              dispatch(updateHintText(this.context.intl.formatMessage({id: `promptBox.${e.currentTarget.name}`})))
            },
            onMouseEnter: (e) => {
              dispatch(updateHintText(this.context.intl.formatMessage({id: `promptBox.${e.currentTarget.name}`})))
            },
            onMouseOut: () => {
              dispatch(clearHintText())
            }
          }
        },
        centerEnvironment: {
          label: this.context.intl.formatMessage({id: 'labels.centerEnvironment'}),
          factory: ReactSelectFactory,
          options: {selectOptions: [
            this.context.intl.formatMessage({id: 'center.centerEnvironment.mountain'}),
            this.context.intl.formatMessage({id: 'center.centerEnvironment.desert'}),
            this.context.intl.formatMessage({id: 'center.centerEnvironment.island'}),
            this.context.intl.formatMessage({id: 'center.centerEnvironment.forest'}),
          ]}
        },
        centerActivities: {
          label: this.context.intl.formatMessage({id: 'labels.centerActivities'}),
          factory: ReactSelectFactory,
          options: {selectOptions: [
            this.context.intl.formatMessage({id: 'center.centerActivities.surfing'}),
            this.context.intl.formatMessage({id: 'center.centerActivities.skiing'}),
            this.context.intl.formatMessage({id: 'center.centerActivities.yoga'}),
            this.context.intl.formatMessage({id: 'center.centerActivities.cycling'}),
            this.context.intl.formatMessage({id: 'center.centerActivities.scuba'}),
            this.context.intl.formatMessage({id: 'center.centerActivities.fitness'}),
            this.context.intl.formatMessage({id: 'center.centerActivities.climbing'})
          ]}
        },
        hasAccommodation: {
          label: this.context.intl.formatMessage({id: 'labels.hasAccommodation'}),
          template: getbooleanCheckboxTemplate({})
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
        <h1>{this.context.intl.formatMessage({id: 'center.title'})}</h1>
        <form.Form
          ref='centerForm'
          type={centerForm}
          value={vacation}
          options={this.getOptions()} />
        <Button label="Save" onClick={this.onSave} primary />
      </div>
    )
  }
}
center.propTypes = {
  dispatch: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired
}
center.contextTypes = {
  intl: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { vacation } = state
  return {
    vacation: vacation.vacation
  }
}
export default connect(mapStateToProps)(center)
