import React, { Component, PropTypes } from 'react'
import t from 'tcomb-form'
import Checkbox from 'material-ui/Checkbox'
import FontIcon from 'material-ui/FontIcon'
import { grey300, lightBlue300} from 'material-ui/styles/colors'

class MaterialCheckbox extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      value: typeof props.value === 'undefined' ? false : props.value
    }
  }
  componentWillReceiveProps(nextProps) {
    // if the component is rendered with undefined value set to empty
    // to clear the input value
    this.setState({
      value: typeof nextProps.value === 'undefined' ? false : nextProps.value
    })
  }
  onChange(e) {
    this.props.onChange(!this.state.value)
    this.setState({ value: !this.state.value })
  }
  render() {
    const styles = {
      block: {
        maxWidth: 250
      },
      checkbox: {
        marginBottom: 2
      }
    }

    return (
      <div>
        <Checkbox
          label={this.props.label}
          checked={this.state.value}
          disabled={this.props.disabled}
          checkedIcon={<FontIcon className="material-icons" color={lightBlue300}>check_box</FontIcon>}
          uncheckedIcon={<FontIcon className="material-icons" color={grey300}>check_box_outline_blank</FontIcon>}
          onCheck={this.onChange}
          style={styles.checkbox} />
      </div>
    )
  }
}

// define the template only once
export default function getmaterialCheckboxTemplate(options) {
  function renderCheckbox(locals) {
    return <MaterialCheckbox {...locals} options={options} />
  }

  return t.form.Form.templates.checkbox.clone({ renderCheckbox })
}
