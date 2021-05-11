import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSTransition from 'react-transition-group/CSSTransition';
import Transition from '../Transition';

type AlertType = 'success' | 'info' | 'error' | 'warning'

const TYPE_CLASSES_MAP = {
  'success': 'el-icon-success',
  'warning': 'el-icon-warning',
  'error': 'el-icon-error',
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  type?: AlertType
  closable?: boolean
  closeText?: React.ReactNode
  showIcon?: boolean
  center?: boolean
  effect?: 'light' | 'dark'

  onClose?: () => void,
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<AlertProps> = {
  type: 'info',
  effect: 'light',
  center: false,
  showIcon: false,
  closable: true,
  closeText: '',
};

const Alert = React.forwardRef<CSSTransition<any>, AlertProps>(({
  type,
  effect,

  title,
  description,

  showIcon,
  center,

  closable,
  closeText,

  onClose: onCloseProp,
  className,
  children,
  ...props
}, ref) => {
  const [display, setDisplay] = useState(true)

  const onClose = useCallback(() => {
    setDisplay(false)
  }, [])

  const classes = classnames(
    'el-alert',
    `el-alert--${type}`,
    `is-${effect}`,
    {
      'is-center': center,
    },
    className,
  );
  const iconClasses = classnames(
    'el-alert__icon',
    TYPE_CLASSES_MAP[type] || 'el-icon-info',
    {
      'is-big': description
    }
  )
  const titleClasses = classnames(
    'el-alert__title',
    {
      'is-bold': description
    }
  )
  const closeClasses = classnames(
    'el-alert__closebtn',
    closeText !== '' ? 'is-customed' : 'el-icon-close',
  );

  return (
    <Transition
      name="el-alert-fade"
      unmountOnExit
      ref={ref}
      in={display}
      onExited={onCloseProp}
    >
      <div
        role="alert"
        {...props}
        className={classes}
      >
        {showIcon && <i className={iconClasses} />}
        <div className="el-alert__content">
          {title && <span className={titleClasses}>{title}</span>}
          {description && <p className="el-alert__description">{description}</p>}
          {closable && <i className={closeClasses} onClick={onClose}>{closeText}</i>}
        </div>
      </div>
    </Transition>
  );
});

Alert.displayName = 'Alert';
Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  effect: PropTypes.oneOf(['light', 'dark']),

  title: PropTypes.node,
  description: PropTypes.node,

  center: PropTypes.bool,
  showIcon: PropTypes.bool,

  closable: PropTypes.bool,
  closeText: PropTypes.node,

  onClose: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
Alert.defaultProps = defaultProps;

export default Alert;
