import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IRefForwardingComponent, WithAsProps } from '../@types/common';

export interface ButtonGroupProps extends WithAsProps {
  role?: string;
  size?: 'sm' | 'lg';
  toggle?: boolean;
  vertical?: boolean;
}

const defaultProps: Partial<ButtonGroupProps> = {};

const ButtonGroup: IRefForwardingComponent<'div', ButtonGroupProps> = React.forwardRef((props: ButtonGroupProps, ref) => {
  const {
    as: Component,
    role,
    size,
    toggle,
    vertical,
    className,
    children,
    ...rest
  } = props

  const classes = classnames('el-button-group', className);

  return (
    <Component {...rest} role={role} ref={ref} className={classes}>
      {children}
    </Component>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.defaultProps = defaultProps;
ButtonGroup.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  role: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'sm']),
  toggle: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default ButtonGroup;
