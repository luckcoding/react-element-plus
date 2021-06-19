import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Fade from '../Fade';
import { useTimeout } from '../_utils';
import { ElRefForwardingComponent, WithAsProps } from '../_utils/types';
import { Position } from './types';
import { COMPONENT_STATUS } from '../_utils/constants';

export interface NotificationProps extends WithAsProps {
  duration?: number;
  iconClass?: string
  id?: string
  message?: React.ReactNode
  offset?: number
  onClick?: (event?: any) => void;
  onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  position?: Position
  showClose?: boolean
  title?: React.ReactNode
  type?: ComponentStatus;
  zIndex?: number
}

const defaultProps: Partial<NotificationProps> = {
  as: 'div',
  duration: 4500,
  id: '',
  offset: 0,
  position: 'top-right',
  showClose: true,
  zIndex: 0,
};

export function verticalProperty(position: string) {
  return /^top-/.test(position) ? 'top' : 'bottom';
}

const Notification: ElRefForwardingComponent<'div', NotificationProps> = React.forwardRef((
  props: NotificationProps, ref
) => {
  const {
    as: Component,
    duration,
    className,
    children,
    type,
    iconClass,
    showClose,
    message,
    onClose,
    title,
    id,
    position,
    offset,
    zIndex,
    ...rest
  } = props;

  const [display, setDisplay] = useState(true)

  const autoClose = useCallback(() => {
    display && setDisplay(false)
    onClose?.()
  }, [onClose, display])

  const { clear, reset } = useTimeout(autoClose, duration, duration > 0)

  const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    display && setDisplay(false)
    onClose?.(event)
    clear()
  }, [onClose, display, clear])

  const iconClasses = classnames(
    'el-notification__icon',
    type ? `el-icon-${type}` : '',
    iconClass,
  )

  const classes = classnames(
    'el-notification',
    className,
    position.indexOf('right') > -1 ? 'right' : 'left',
  )

  const positionStyle = useMemo<React.CSSProperties>(() => ({
    [verticalProperty(position)]: `${offset}px`
  }), [position, offset])

  return (
    <Fade
      unmountOnExit
      in={display}
      transitionClass={{
        exiting: 'el-notification-fade-leave-to',
        exited: 'el-notification-fade-enter-from'
      }}
    >
      <Component
        id={id}
        {...rest}
        ref={ref}
        style={{ ...positionStyle, zIndex }}
        className={classes}
        onMouseEnter={clear}
        onMouseLeave={reset}
      >
        {(type || iconClass) && <i className={iconClasses} />}
        <div className={classnames('el-notification__group', {
          'is-with-icon': type || iconClass,
        })}
        >
          <h2 className="el-notification__title">{title}</h2>
          {message && <div className="el-notification__content" style={title ? null : { margin: 0 }}>{message}</div>}
        </div>
        {showClose && <i className="el-notification__closeBtn el-icon-close" onClick={handleClose} />}
      </Component>
    </Fade>
  )
})

Notification.displayName = 'Notification';
Notification.propTypes = {
  message: PropTypes.node,
  duration: PropTypes.number,
  type: PropTypes.oneOf(COMPONENT_STATUS),

  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
Notification.defaultProps = defaultProps;

export default Notification;
