import React, { Component, PropTypes } from 'react'
import t from 'tcomb-form'
import DateTimeField from "react-bootstrap-datetimepicker"

class MaterialDatePicker extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      date: typeof props.value === 'undefined' ? new Date() : props.value
    }
  }
  componentWillReceiveProps(nextProps) {
    // if the component is rendered with undefined value set to empty
    // to clear the input value
    //console.log(nextProps.value)
    this.setState({
      date: typeof nextProps.value === 'undefined' ? new Date() : nextProps.value
    })
  }
  onChange(date) {
    this.setState({ date: new Date(parseInt(date)) })
    this.props.onChange(new Date(parseInt(date)))
  }
  render() {
    const styles = {

    }

    return (
      <div style={{position: 'relative'}}>
        <DateTimeField
          dateTime={this.state.date}
          inputFormat="MMMM Do YYYY"
          onChange={this.onChange}  />
      </div>
    )
  }
}
MaterialDatePicker.contextTypes = {
  intl: PropTypes.object.isRequired
}

function getMaterialDatePickerTemplate(options) {return t.form.Form.templates.date.clone({
  renderDate: (locals) => {
    return <MaterialDatePicker {...locals} options={options} />
  }
})}
// // define the template only once
// function getButtonsListTemplate(options) {
//   function renderList(locals) {
//     return <ButtonsList {...locals} options={options} />
//   }
//
//   return t.form.Form.templates.list.clone({ renderList })
// }

class ReactDatePickerFactory extends t.form.Component {
  getTemplate() {
    return getMaterialDatePickerTemplate(this.props.options.options)
  }
}

// ReactDatePickerFactory.transformer = t.form.Date.transformer

export default ReactDatePickerFactory
