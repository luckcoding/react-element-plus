import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { debounce } from '@crude/extras';
import colors from './colors';
import Loading from '../Loading';

const propTypes = {
  tag: PropTypes.elementType,

  // colors
  color: PropTypes.oneOf(colors),

  // expand
  full: PropTypes.bool,
  block: PropTypes.bool,

  // fill
  clear: PropTypes.bool,
  outline: PropTypes.bool,

  // size
  small: PropTypes.bool,
  large: PropTypes.bool,

  // shape
  round: PropTypes.bool,

  // child nodes
  startSlot: PropTypes.node,
  endSlot: PropTypes.node,

  // status
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  loadingType: PropTypes.string,

  // handle
  debounce: PropTypes.number,

  // self
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

const defaultProps = {
  tag: 'button',
  color: colors[0],
  debounce: 100,
};

const Button = React.forwardRef(({
  tag: Tag,

  color,
  full,
  block,
  clear,
  outline,
  small,
  large,
  round,

  startSlot,
  endSlot,

  disabled,
  loading,
  loadingType,

  debounce: wait,

  className,
  children,
  ...props
}, ref) => {
  const classes = classnames(
    'crude-button',
    {
      _full: full,
      _block: block,
      _clear: clear,
      _outline: outline,
      _small: small,
      _large: large,
      _round: round,
      _disabled: disabled,
    },
    `_${color}`,
    className,
  );

  // debounce
  if (typeof props.onClick === 'function') {
    props.onClick = debounce(props.onClick, wait, false);
  }

  // ref
  if (ref) props.ref = ref;

  return (
    <Tag className={classes} {...props}>
      {startSlot && <div className="_start">startSlot</div>}
      {children}
      {endSlot && <div className="_end">endSlot</div>}
      {loading && <div className="_loading"><Loading type={loadingType} /></div>}
    </Tag>
  );
});

Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
