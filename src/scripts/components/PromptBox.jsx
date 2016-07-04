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
  return (
    <div className="element-to-center" style={style}>
      {text &&
        <Card style={{border: `1px solid ${lightBlue200}`}}>
          <CardHeader avatar={<Avatar
            icon={<ImageWbIncandescent />}
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
