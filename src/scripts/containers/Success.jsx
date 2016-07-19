import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedHTMLMessage } from 'react-intl'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import {lightBlue200} from 'material-ui/styles/colors'

class success extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const styles= {
      title: {
        
      },
      text: {

      },
      avatar:{
        marginRight: '1rem'
      },
      wrapper: {
        marginTop: '5rem',
        maxWidth: '760px'
      }
    }
    return (
      <div className="bg-image-success">
        <div className="container" style={styles.wrapper}>
          <h3 style={styles.title}>
            <Avatar backgroundColor={lightBlue200} style={styles.avatar}
              icon={<FontIcon className="material-icons" color={'#fff'}>check</FontIcon>} />
            {this.context.intl.formatMessage({id: 'success.title'})}
          </h3>
          <p style={styles.text}>
            <FormattedHTMLMessage id="success.text" />
          </p>
        </div>
      </div>
    )
  }
}
success.contextTypes = {
  intl: PropTypes.object.isRequired
}

export default connect()(success)
