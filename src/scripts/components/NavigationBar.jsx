import React, { Component, PropTypes } from 'react'
import {
  Toolbar,
  ToolbarGroup
} from 'material-ui/Toolbar'

export const NavigationBar = ({steps, onClick}) => {
  const styles = {
    toolbar: {
      padding: 0
    },
    toolbarGroup: {
      width: '100%',
      marginLeft: 0
    },
    isActive: {
      padding: '1.6rem 4rem',
      backgroundColor: '#E0E0E0',
      borderRight: '1px solid #BDBDBD',
      borderleft: '1px solid #BDBDBD',
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      color: '#9E9E9E'
    },
    notActive: {
      padding: '1.6rem 4rem',
      borderRight: '1px solid #BDBDBD',
      borderleft: '1px solid #BDBDBD',
      width: '100%',
      textAlign: 'center',
      cursor: 'pointer',
      color: '#9E9E9E'
    }
  }

  return (
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup style={styles.toolbarGroup} firstChild={true}>
        {steps.map((step, index) => {
          return (<div key={index} onClick={(e) => onClick(step.name)}
            style={(step.isActive) ? styles.isActive : styles.notActive}>
              {step.name}
          </div>
          )
        })}
      </ToolbarGroup>

    </Toolbar>
  )
}
NavigationBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired
}
NavigationBar.contextTypes = {
  intl: PropTypes.object.isRequired
}
