import React, { Component, PropTypes } from 'react'
import t from 'tcomb-form'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import SvgIconFace from 'material-ui/svg-icons/action/face'
import {blue300, grey300} from 'material-ui/styles/colors'

class ButtonsList extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.isActive = this.isActive.bind(this)

    this.state = {
      value: typeof props.value === 'undefined' ? [''] : props.value
    }
  }
  componentWillReceiveProps(nextProps) {
    // if the component is rendered with undefined value set to empty
    // to clear the input value
    //console.log(nextProps.value)
    this.setState({
      value: typeof nextProps.value === 'undefined' ? [''] : nextProps.value
    })
  }
  isActive(value) {
    return (this.state.value.indexOf(value) !== -1) ? true : false
  }
  onChange(index) {
    let value = this.props.options.selectOptions[index]
    let stateValue = this.state.value
    // if value in array remove it else add it and return the full array
    if (stateValue.indexOf(value) !== -1) {
      stateValue.splice(stateValue.indexOf(value), 1)
    } else {
      stateValue = stateValue.concat([value])
    }
    this.props.onChange(stateValue)
    this.setState({ value: stateValue })
  }
  render() {
    const styles = {
      chip: {
        margin: 4,
        padding: '1rem',
        minWidth: '19%',
        borderRadius: '3px',
        justifyContent: 'center'
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
    return (
      <div style={styles.wrapper}>
        {this.props.options.selectOptions &&
          this.props.options.selectOptions.map((option, index) => {
            return (
              <Chip
                key={index}
                style={styles.chip}
                backgroundColor={(this.isActive(option))? blue300 : grey300 }
                onTouchTap={() => this.onChange(index)} >
                {this.props.options.selectIcons && <Avatar backgroundColor={(this.isActive(option))? blue300 : grey300 }
                  icon={this.props.options.selectIcons[index]} />}
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
