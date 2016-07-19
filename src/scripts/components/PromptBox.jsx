import React, { PropTypes } from 'react'
import {
  Card,
  CardHeader,
  CardText
} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import {lightBlue200} from 'material-ui/styles/colors'
import ImageWbIncandescent from 'material-ui/svg-icons/image/wb-incandescent'

export const PromptBox = ({text, style}) => {
  const styles = {
    icon: {
      fontSize: '16px'
    }
  }
  return (
    <div className="element-to-center hidden-sm hidden-xs" style={style}>
      {text &&
        <Card style={{border: `1px solid ${lightBlue200}`}}>
          <CardHeader avatar={<Avatar
            icon={<img src="/assets/svgs/bulb.svg" style={styles.icon} />}
            backgroundColor={lightBlue200}
            size={40} />} />
          <CardText>
            {text}
          </CardText>
        </Card>
      }
    </div>
  )
}
PromptBox.propTypes = {
  style: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}
