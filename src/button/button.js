import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { debounce } from '@crude/extras';
import SafeAnchor from '../safe-anchor';
import Loading from '../loading';

const propTypes = {
  tag: PropTypes.elementType,
  href: PropTypes.string,

  type: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
  plain: PropTypes.bool,

  // size
  size: PropTypes.oneOf(['small', 'medium', 'mini']),

  // shape
  round: PropTypes.bool,
  circle: PropTypes.bool,

  // child nodes
  startSlot: PropTypes.node,
  endSlot: PropTypes.node,

  // status
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  loadingType: PropTypes.string,

  // handle
  debounce: PropTypes.number,

  // native
  nativeType: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

const defaultProps = {
  type: 'default',
  tag: 'button',
  nativeType: 'button',
  debounce: 100,
};

const Button = React.forwardRef(({
  tag: Tag,

  type,
  plain,

  size,

  round,
  circle,

  startSlot,
  endSlot,

  // disabled,
  loading,
  loadingType,

  debounce: wait,

  nativeType,
  className,
  children,
  ...props
}, ref) => {
  const classes = classnames(
    'cr-button',
    `cr-button--${type}`,
    size && `cr-button--${size}`,
    {
      'is-disabled': props.disabled,
      'is-loading': loading,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-sloted': startSlot || endSlot || loading,
    },
    className,
  );


  // debounce
  if (typeof props.onClick === 'function') {
    props.onClick = debounce(props.onClick, wait, false);
  }

  // child
  const child = (
    <React.Fragment>
      {loading && <div className="cr-button__loading"><Loading type={loadingType} /></div>}
      {startSlot && <div className="cr-button__start">startSlot</div>}
      {children}
      {endSlot && <div className="cr-button__end">endSlot</div>}
    </React.Fragment>
  );

  if (props.href) {
    return (
      <SafeAnchor
        {...props}
        tag={Tag}
        innerRef={ref}
        className={classes}
      >
        {child}
      </SafeAnchor>
    );
  }

  // ref
  if (ref) props.ref = ref;

  return (
    <Tag className={classes} {...props} type={nativeType}>
      {child}
    </Tag>
  );
});

Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
