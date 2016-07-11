import React, { Component, PropTypes } from 'react'
import t from 'tcomb-form'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import {grey500} from 'material-ui/styles/colors'

function myRenderButton(button) {
  return (<span className="input-group-addon" id="sizing-addon2" onClick={button.click}>
    {<FontIcon className="material-icons" color={grey500} style={{fontSize: '18px'}}>close</FontIcon>}
  </span>)
}

function myRenderAddButton(locals) {
  return (<FlatButton
    label={locals.add.label}
    style={{marginBottom: '1rem'}}
    onClick={locals.add.click}
    icon={<FontIcon className="material-icons">add_circle</FontIcon>} />)
}

function myRenderRow(row, locals) {
  return (
    <div className="col-xs-12" style={{marginBottom: '1rem'}}>
      <div className="row">
        <div className="input-group">
          {row.input}
          {row.buttons.map(myRenderButton)}
        </div>
      </div>
    </div>
  )
}

export const listTemplate = t.form.Form.templates.list.clone({
  renderAddButton: myRenderAddButton,
  renderRow: myRenderRow
})
