import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Fade from '../Fade';

const propTypes = {
  visible: PropTypes.bool,
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

const defaultProps = {
  visible: true,
  type: 'info',
  effect: 'light',
  center: false,
  showIcon: false,
  closable: true,
  closeText: <span>&times;</span>,
};

const Alert = React.forwardRef(({
  visible,
  type,
  effect,

  title,
  description,

  showIcon,
  center,

  closable,
  closeText,

  onClose,
  className,
  children,
  ...props
}, ref) => {
  const classes = classnames(
    'cr-alert',
    `cr-alert--${type}`,
    `is-${effect}`,
    {
      'is-center': center,
    },
    className,
  );
  const closeClasses = () => classnames(
    'cr-alert__closebtn',
    closeText ? 'is-customed' : 'cr-icon-close',
  );

  return (
    <Fade
      unmountOnExit
      ref={ref}
      {...props}
      in={visible}
      prefix="cr-alert"
    >
      <div
        role="alert"
        {...props}
        className={classes}
      >
        <i className="icon" />
        <div className="cr-alert__content">
          {title && <span className="cr-alert__title">{title}</span>}
          {description && <p className="cr-alert__description">{description}</p>}
          {closable && <i className={closeClasses()} onClick={onClose}>{closeText}</i>}
        </div>
      </div>
    </Fade>
  );
});

Alert.displayName = 'Alert';
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
