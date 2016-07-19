import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { VacationCard } from '../components/VacationCard'
import { fetchVacations, selectVacationID } from '../actions/vacation'
import RaisedButton from 'material-ui/RaisedButton'

class vacationList extends Component {
  constructor(props) {
    super(props)
    this.onEditVacation = this.onEditVacation.bind(this)
    this.onAddVacation = this.onAddVacation.bind(this)
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchVacations())
  }
  onEditVacation(id) {
    const { dispatch } = this.props
    dispatch(selectVacationID(id))
    this.context.router.push({pathname: `vacation/center/${id}`})
  }
  onAddVacation() {
    this.context.router.push({pathname: 'vacation'})
  }
  render() {
    const {
      vacations,
      name
    } = this.props
    const styles = {
      list: {
        border: '1px solid lightgrey',
        width: '600px',
        margin: '4rem 0'
      },
      listItem: {
        cursor: 'pointer'
      },
      divider: {
        marginLeft: '2rem',
        marginRight: '2rem'
      },
      button: {
        margin: 12,
        marginBottom: 0,
        marginLeft: 0,
        color: '#fff',
        backgroundColor: '#FF6565',
        borderRadius: '3px',
        padding: '0.3rem'
      }
    }
    return (
      <div className="container">
        <h1>{this.context.intl.formatMessage({id: 'myVacations.title'})}</h1>
        { (vacations && vacations.length > 0) ? (
          <List style={styles.list}>
              {vacations.map( (vacation, index) =>{
                return (<div>
                  <ListItem style={styles.listItem} disabled>
                    <VacationCard
                      image={vacation.images[0]}
                      title={vacation.vacationTitle}
                      center={vacation.centerName}
                      status={"In Progress"}
                      centerLabel={this.context.intl.formatMessage({id: 'myVacations.center'})}
                      statusLabel={this.context.intl.formatMessage({id: 'myVacations.status'})}
                      onEdit={this.onEditVacation.bind(this, vacation.id)}
                      editLabel={this.context.intl.formatMessage({id: 'myVacations.edit'})} />
                  </ListItem>
                  { vacations.length!== index+1 && <Divider style={styles.divider} /> }
                </div> )
              } )}
            </List> )
          : (<div>
            <h4>{`${this.context.intl.formatMessage({id: 'myVacations.welcomeText'})} ${name},`}</h4>
            <p>{this.context.intl.formatMessage({id: 'myVacations.noVacationsText'})}</p>
          </div>)
        }
        <RaisedButton label={this.context.intl.formatMessage({id: 'myVacations.add'})}
          onClick={this.onAddVacation}
          backgroundColor={styles.button.backgroundColor}
          labelColor={styles.button.color}
          style={styles.button} />
      </div>
    )
  }
}
vacationList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  vacations: PropTypes.object.isRequired
}
vacationList.contextTypes = {
  intl: PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { vacation, user } = state
  return {
    vacations: vacation.vacations,
    name: user.name
  }
}
export default connect(mapStateToProps)(vacationList)
