import React, { Component, PropTypes } from 'react'
import { form } from 'tcomb-form'
import assign from 'deep-assign'
import { connect } from 'react-redux'
import Button from 'material-ui/RaisedButton'
import { fetchVacation, createVacation, clearVacation, updateVacation } from '../../actions/vacation'

import { pricingForm } from '../../modules/forms'
import { getmaterialCheckboxTemplate } from '../../modules/formComponents'

class pricing extends Component {
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
    let newVacation = this.refs.pricingForm.getValue()
    if (newVacation) {
      newVacation = assign(vacation, newVacation)
      dispatch(updateVacation(newVacation))
      dispatch(createVacation(newVacation))
    }
  }
  getOptions() {
    return {
      auto: 'placeholders',
      fields: {
        price: {
          label: this.context.intl.formatMessage({id: 'labels.price'})
        },
        newsletter: {
          label: this.context.intl.formatMessage({id: 'labels.newsletter'}),
          template: getmaterialCheckboxTemplate({})
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
        <h1>{this.context.intl.formatMessage({id: 'pricing.title'})}</h1>
        <form.Form
          ref='pricingForm'
          type={pricingForm}
          options={this.getOptions()}
          value={vacation} />
        <Button label="Save" onClick={this.onSave} primary />
      </div>
    )
  }
}
pricing.propTypes = {
  dispatch: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired
}
pricing.contextTypes = {
  intl: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { vacation } = state
  return {
    vacation: vacation.vacation
  }
}
export default connect(mapStateToProps)(pricing)
