import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationBar } from '../../components/NavigationBar'
import { PromptBox } from '../../components/PromptBox'

class Vacation extends Component {
  constructor(props) {
    super(props)
    this.onIsRouteActive = this.onIsRouteActive.bind(this)
  }
  onIsRouteActive(route) {
    return this.context.router.isActive({pathname: route})
  }
  render() {
    const { hintText } = this.props
    const steps = [{
      name: 'Center',
      isActive: this.onIsRouteActive(`vacation/center/${this.props.params.id}`)
    },{
      name: 'Vacation',
      isActive: this.onIsRouteActive(`vacation/vacation/${this.props.params.id}`)
    },{
      name: 'Media',
      isActive: this.onIsRouteActive(`vacation/media/${this.props.params.id}`)
    },{
      name: 'Pricing',
      isActive: this.onIsRouteActive(`vacation/pricing/${this.props.params.id}`)
    }]
    return (
      <div>
        <NavigationBar steps={steps} onClick={(name) => this.context.router.push({pathname: `vacation/${name.toLowerCase()}/${this.props.params.id}`}) }/>
        <div className="match-my-cols">
          <div className="col-md-9">
            <div style={{maxWidth: '960px', margin: '0 auto', padding: '3rem'}}>
              {this.props.children}
            </div>
          </div>
          <div className="col-md-3 hidden-sm hidden-xs" style={{background: 'lightgrey'}}>
            <PromptBox text={hintText} style={{position: 'fixed', width: '23.2%', maxHeight: '50vh', top: '25%', left: '76%', overflow: 'scroll'}} />
          </div>
        </div>
      </div>
    )
  }
}
Vacation.propTypes = {
  children: PropTypes.element.isRequired,
  hintText: PropTypes.string.isRequired
}

Vacation.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    hintText: state.vacation.hintText
  }
}

const VacationContainer= connect(mapStateToProps)(Vacation)
export { VacationContainer as index }
export { default as CenterDetails } from './Center'
export { default as MediaDetails } from './Media'
export { default as PricingDetails } from './Pricing'
export { default as VacationDetails } from './Vacation'
