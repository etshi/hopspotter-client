import React, { Component, PropTypes } from 'react'
import t from 'tcomb-form'
import DropzoneComponent from 'react-dropzone-component'

class ImageDropezone extends Component {
  constructor(props) {
    super(props)
    this.onAddfile = this.onAddfile.bind(this)
    this.onRemovefile = this.onRemovefile.bind(this)

    this.state = {
      files: typeof props.value === 'undefined' ? [] : props.value
    }
  }
  componentWillReceiveProps(nextProps) {
    // if the component is rendered with undefined value set to empty
    // to clear the input value
    //console.log(nextProps.value)
    this.setState({
      files: typeof nextProps.value === 'undefined' ? [] : nextProps.value
    })
  }
  onAddfile(file) {
    let stateValue = this.state.files
    stateValue.push(file)
    this.props.onChange(stateValue)
    this.setState({ files: stateValue })
  }
  onRemovefile(file) {
    let stateValue = this.state.files
    stateValue.splice(stateValue.indexOf(file), 1)
    this.props.onChange(stateValue)
    this.setState({ files: stateValue })
  }
  render() {
    const styles = {

    }
    return (
      <div>
        <DropzoneComponent
          config={{
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true
          }}
          eventHandlers={{addedfile: this.onAddfile, removedfile: this.onRemovefile}}
          djsConfig={{
            addRemoveLinks: true,
            acceptedFiles: 'image/jpeg,image/png,image/gif',
            dictDefaultMessage: this.context.intl.formatMessage({id: 'dropzone.text'})
          }}
          action="#" />
      </div>
    )
  }
}
ImageDropezone.contextTypes = {
  intl: PropTypes.object.isRequired
}

function imageDropezone(options) {return t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    return <ImageDropezone {...locals} options={options} />
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

class ReactDropzoneFactory extends t.form.Component {
  getTemplate() {
    return imageDropezone(this.props.options.options)
  }
}

ReactDropzoneFactory.transformer = t.form.List.transformer
export default ReactDropzoneFactory
