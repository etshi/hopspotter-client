import React, { Component, PropTypes } from 'react'
import {
  Step,
  Stepper,
  StepButton
} from 'material-ui/Stepper'

export const StepperBar = ({steps, onClick}) => {
  return (
    <div>
      <Stepper linear={false}>
        {steps.map((step, index) => {
          return (<Step key={index} active={step.isActive}>
            <StepButton onClick={(e) => onClick(step.name)}>
                {step.name}
            </StepButton>
          </Step>
          )
        })}
      </Stepper>

    </div>
  )
}
StepperBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired
}
StepperBar.contextTypes = {
  intl: PropTypes.object.isRequired
}
