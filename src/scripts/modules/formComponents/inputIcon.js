import React, { Component, PropTypes } from 'react'
import t from 'tcomb-form'

class InputIcon extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      value: typeof props.value === 'undefined' ? '' : props.value
    }
  }
  componentWillReceiveProps(nextProps) {
    // if the component is rendered with undefined value set to empty
    // to clear the input value
    this.setState({
      value: typeof nextProps.value === 'undefined' ? '' : nextProps.value
    })
  }
  onChange(e) {
    this.props.onChange(e.currentTarget.value)
    this.setState({ value: e.currentTarget.value })
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
      <div className="input-group">
        <span className="input-group-addon" id="sizing-addon1">{this.props.options.icon}</span>
        <input
          type="text"
          value={this.state.value}
          className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          aria-describedby="sizing-addon2" />
      </div>
    )
  }
}

// define the template only once
export default function getInputIconTemplate(options) {
  function renderInput(locals) {
    return <InputIcon {...locals} options={options} />
  }

  return t.form.Form.templates.textbox.clone({ renderInput })
}
