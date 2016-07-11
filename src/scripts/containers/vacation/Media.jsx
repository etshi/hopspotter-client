import React, { Component, PropTypes } from 'react'
import { form } from 'tcomb-form'
import assign from 'deep-assign'
import { connect } from 'react-redux'
import { FormattedHTMLMessage } from 'react-intl'
import Button from 'material-ui/RaisedButton'
import { fetchVacation, createVacation, clearVacation, updateVacation } from '../../actions/vacation'
import { ReactDropzoneFactory } from '../../modules/formComponents'

import { mediaForm } from '../../modules/forms'

class media extends Component {
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
    let newVacation = this.refs.mediaForm.getValue()
    console.log(newVacation)
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
        images: {
          label: this.context.intl.formatMessage({id: 'labels.images'}),
          factory: ReactDropzoneFactory
        },
        video: {
          label: this.context.intl.formatMessage({id: 'labels.video'})
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
        <h1>{this.context.intl.formatMessage({id: 'media.title'})}</h1>
        <h3>{this.context.intl.formatMessage({id: 'media.mediaRulesTitle'})}</h3>
        <p style={{border: '1px solid black', padding: '2rem'}}>
          <FormattedHTMLMessage id="media.mediaRulestext" />
        </p>
        <form.Form
          ref='mediaForm'
          type={mediaForm}
          options={this.getOptions()}
          value={vacation} />
        <Button label="Save" onClick={this.onSave} primary />
      </div>
    )
  }
}
media.propTypes = {
  dispatch: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired
}
media.contextTypes = {
  intl: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { vacation } = state
  return {
    vacation: vacation.vacation
  }
}
export default connect(mapStateToProps)(media)
