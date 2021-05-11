import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SafeAnchor from '../SafeAnchor';
import { ElRefForwardingComponent, WithAsProps, TypeAttributes } from '../@types/common';

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default';
type ButtonNativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  type?: ButtonType;
  size?: TypeAttributes.Size;
  icon?: string;
  nativeType?: ButtonNativeType;
  loading?: boolean;
  disabled?: boolean;
  plain?: boolean;
  autofocus?: boolean;
  round?: boolean;
  circle?: boolean;

  href?: string;
}

const defaultProps: Partial<ButtonProps> = {
  type: 'default',
  size: 'medium',
  nativeType: 'button'
};

type Button = ElRefForwardingComponent<'button', ButtonProps>;

const Button: Button = React.forwardRef((props: ButtonProps, ref) => {
  const {
    type,
    size, // todo
    icon,
    nativeType: nativeTypeProp,
    loading,
    disabled, // todo
    plain,
    autofocus,
    round,
    circle,

    as,
    children,
    className,
    ...rest
  } = props;

  const classes = classnames(
    'el-button',
    type && `el-button--${type}`,
    size && `el-button--${size}`,
    {
      'is-disabled': disabled || loading,
      'is-loading': loading,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle
    },
    className
  );

  // child
  const child = (
    <React.Fragment>
      {loading && <i className="el-icon-loading" />}
      {!loading && icon && <i className={icon} />}
      {children}
    </React.Fragment>
  );

  const isInDisabled = disabled || loading;

  if (rest.href) {
    return (
      <SafeAnchor
        {...rest}
        as={as}
        ref={ref}
        disabled={isInDisabled}
        aria-disabled={isInDisabled}
        className={classes}
      >
        {child}
      </SafeAnchor>
    );
  }

  const Component = as || 'button';
  const nativeType = nativeTypeProp || (Component === 'button' ? 'button' : undefined);
  const role = rest.role || (Component !== 'button' ? 'button' : undefined);

  return (
    <Component
      {...rest}
      role={role}
      type={nativeType}
      ref={ref}
      disabled={isInDisabled}
      aria-disabled={isInDisabled}
      className={classes}
    >
      {child}
    </Component>
  );
});

Button.displayName = 'Button';
Button.defaultProps = defaultProps;
Button.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'info', 'text', 'default']),
  size: PropTypes.oneOf(['large', 'medium', 'small', 'mini']),
  icon: PropTypes.string,
  nativeType: PropTypes.oneOf(['button', 'reset', 'submit']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  plain: PropTypes.bool,
  autofocus: PropTypes.bool,
  round: PropTypes.bool,
  circle: PropTypes.bool,
  href: PropTypes.string
};

export default Button;
