import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import Fade from '../Fade';
import { ElRefForwardingComponent, WithAsProps } from '../_utils/types';

const Type = ['primary', 'success', 'warning', 'info', 'danger'] as const
export interface BadgeProps extends WithAsProps {
  value?: string | number
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: typeof Type[number];
}

const defaultProps: Partial<BadgeProps> = {
  as: 'div',
  value: '',
  max: 99,
  type: 'primary',
};

const Badge: ElRefForwardingComponent<'div', BadgeProps> = React.forwardRef(({
  as: Component,
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
    'el-badge__content',
    `el-badge__content--${type}`,
    children && 'is-fixed',
    isDot && 'is-dot',
  );

  const content = useMemo(() => {
    if (isDot) {
      return
    }
    if (typeof value === 'number' && typeof max === 'number') {
      return max < value ? `${max}+` : value
    }
    return value
  }, [isDot, value, max])

  const isShow = !!(!hidden && (content || content === 0 || isDot));

  return (
    <Component
      ref={ref}
      style={style}
      className={classnames('el-badge', className)}
    >
      {children}
      <Fade
        unmountOnExit
        in={isShow}
        transitionClass={{
          exiting: 'el-zoom-in-center-leave-active',
          exited: 'el-zoom-in-center-enter-from'
        }}
      >
        <sup className={classes}>{content}</sup>
      </Fade>
    </Component>
  );
});

Badge.displayName = 'Badge';
Badge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.number,
  isDot: PropTypes.bool,
  hidden: PropTypes.bool,
  type: PropTypes.oneOf(Type),

  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Badge.defaultProps = defaultProps;

export default Badge;
