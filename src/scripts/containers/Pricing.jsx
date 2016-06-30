import React, { Component, PropTypes } from 'react'
import { form } from 'tcomb-form'
import assign from 'deep-assign'
import { connect } from 'react-redux'
import Button from 'material-ui/RaisedButton'
import { fetchVacation, createVacation, updateVacation } from '../actions/vacation'

import { pricingForm } from '../modules/forms'

class pricing extends Component {
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
    let newVacation = this.refs.pricingForm.getValue()
    if (newVacation) {
      newVacation = assign(vacation, newVacation)
      dispatch(updateVacation(newVacation))
      dispatch(createVacation(newVacation))
    }
  }
  render() {
    const {
      vacation
    } = this.props

    return (
      <div>
        <h1>Pricing</h1>
        <form.Form
          ref='pricingForm'
          type={pricingForm}
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
