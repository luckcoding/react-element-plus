import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Transition from '../transition';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.number,
  isDot: PropTypes.bool,
  hidden: PropTypes.bool,
  type: PropTypes.oneOf(['primary', 'success', 'warning', 'info', 'danger']),

  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
};

const Badge = React.forwardRef(({
  value,
  max,
  isDot,
  hidden,
  type,

  style,
  className,
  children,
}, ref) => {
  const classes = classnames(
    'cr-badge__content',
    `cr-badge__content--${type}`,
    children && 'is-fixed',
    isDot && 'is-dot',
  );

  const getContent = () => {
    if (isDot) return undefined;

    if (typeof value === 'number' && typeof max === 'number') {
      return max < value ? `${max}+` : value;
    }

    return value;
  };

  const content = getContent();

  const isShow = !hidden && (content || content === 0 || isDot);

  return (
    <div
      ref={ref}
      style={style}
      className={classnames('cr-badge', className)}
    >
      {children}
      <Transition
        name="zoom-in"
        unmountOnExit
        in={!!isShow}
      >
        <sup className={classes}>{content}</sup>
      </Transition>
    </div>
  );
});

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
