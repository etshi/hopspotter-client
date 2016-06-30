import React, { Component, PropTypes } from 'react'
import t from 'tcomb-form'
import Toggle from 'material-ui/Toggle'

class ToggleComponent extends Component {
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
    //console.log(nextProps.value)
    this.setState({
      value: typeof nextProps.value === 'undefined' ? false : nextProps.value
    })
  }
  onChange(e) {
    this.props.onChange(!this.state.value)
    this.setState({ value: !this.state.value })
  }
  render() {
    return (
      <Toggle
        label={this.props.label}
        defaultToggled={this.state.value}
        disabled={this.props.disabled}
        onToggle={ this.onChange }  />
    )
  }
}

// define the template only once
export default function getToggleTemplate(options) {
  function renderCheckbox(locals) {
    return <ToggleComponent {...locals} options={options} />
  }

  return t.form.Form.templates.checkbox.clone({ renderCheckbox })
}
