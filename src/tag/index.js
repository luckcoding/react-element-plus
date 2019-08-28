import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Transition from '../transition';

const propTypes = {
  effect: PropTypes.oneOf(['dark', 'light', 'plain']),
  disableTransitions: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  closable: PropTypes.bool,
  hit: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

const defaultProps = {
  effect: 'light',
  visible: true,
};

const Tag = ({
  visible,
  type,
  size,
  effect,
  hit,
  color,
  className,
  onClick,
  onClose,
  disableTransitions,
  closable,
  children,
}) => {
  const classes = classnames(
    'cr-tag',
    type && `cr-tag--${type}`,
    size && `cr-tag--${size}`,
    `cr-tag--${effect}`,
    hit && 'is-hit',
    className,
  );

  const child = (
    <span
      className={classes}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {children}
      {closable && <i className="cr-tag__close" onClick={onClose}>&times;</i>}
    </span>
  );

  return disableTransitions ? child : (
    <Transition
      name="zoom-in"
      unmountOnExit
      in={visible}
    >
      {child}
    </Transition>
  );
};

Tag.displayName = 'Tag';
Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
