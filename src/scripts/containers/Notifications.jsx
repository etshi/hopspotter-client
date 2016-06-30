import React from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-addons-css-transition-group'
import Notification from '../components/Notification'

function Notifications(props) {
  const { notifications,
    className,
    componentClassName,
    CustomComponent,
    transitionEnterTimeout,
    transitionLeaveTimeout,
    onActionClick,
    actionLabel } = props

  const items = notifications.map((notif) => (
    <Notification
      key={notif.id}
      message={notif.message}
      kind={notif.kind}
      componentClassName={componentClassName}
      CustomComponent={CustomComponent}
      onActionClick={onActionClick}
      actionLabel={actionLabel} />
  ))

  return (
    <div className={`${componentClassName}__container ${className}`} >
      <TransitionGroup
        transitionName={`${componentClassName}-transition`}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout} >
        {items}
      </TransitionGroup>
    </div>
  )
}

Notifications.defaultProps = {
  componentClassName: 'notification',
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600,
  onActionClick: null,
  action: null
}

Notifications.propTypes = {
  CustomComponent: React.PropTypes.func,
  actionLabel: React.PropTypes.string,
  className: React.PropTypes.string,
  componentClassName: React.PropTypes.string,
  notifications: React.PropTypes.array,
  onActionClick: React.PropTypes.func,
  transitionEnterTimeout: React.PropTypes.number,
  transitionLeaveTimeout: React.PropTypes.number
}

export default connect(
  (state) => ({
    notifications: state.notifications
  }))(Notifications)
