import React, { Component, PropTypes } from 'react'
import t from 'tcomb-form'
import Chip from 'material-ui/Chip'
import {blue300, grey300} from 'material-ui/styles/colors'

class ButtonsList extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.isActive = this.isActive.bind(this)

    this.state = {
      value: typeof props.value === 'undefined' ? [] : props.value
    }
  }
  componentWillReceiveProps(nextProps) {
    // if the component is rendered with undefined value set to empty
    // to clear the input value
    //console.log(nextProps.value)
    this.setState({
      value: typeof nextProps.value === 'undefined' ? [] : nextProps.value
    })
  }
  isActive(value) {
    return (this.state.value.indexOf(value) !== -1) ? true : false
  }
  onChange(index) {
    let value = this.props.options.selectOptions[index]
    let stateValue = this.state.value
    // if value in array remove it else add it and return the full array
    console.log('ONCHANGE', stateValue.indexOf(value))

    if (stateValue.indexOf(value) !== -1) {
      stateValue.splice(stateValue.indexOf(value), 1)
    } else {
      stateValue.push(value)
    }
    this.props.onChange(stateValue)
    this.setState({ value: stateValue })
  }
  render() {
    return (
      <div>
        {this.props.options.selectOptions &&
          this.props.options.selectOptions.map((option, index) => {
            return (
              <Chip
                key={index}
                backgroundColor={(this.isActive(option))? blue300 : grey300 }
                onTouchTap={() => this.onChange(index)} >
                {option}
              </Chip>
            )
          })
        }
      </div>
    )
  }
}

function buttons(options) {return t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    return <ButtonsList {...locals} options={options} />
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

class ReactSelectFactory extends t.form.Component {
  getTemplate() {
    return buttons(this.props.options.options)
  }
}

ReactSelectFactory.transformer = t.form.List.transformer
export default ReactSelectFactory
