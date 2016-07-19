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
    if (newVacation) {
      newVacation = assign(vacation, newVacation)
      if(newVacation.id) {
        dispatch(updateVacation(newVacation))
      } else {
        dispatch(createVacation(newVacation))
      }     }
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
        <Button label={this.context.intl.formatMessage({id: 'labels.save'})} onClick={this.onSave}
          backgroundColor={styles.button.backgroundColor}
          labelColor={styles.button.color}
          style={styles.button} />
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
