import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { types } from '../button/button';

const propTypes = {
  type: PropTypes.oneOf(types),
  disabled: PropTypes.bool,
  underline: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  type: 'default',
  underline: true,
  style: {},
};

const Footer = ({
  type,
  disabled,
  underline,

  style,
  className,
  children,
  ...props
}) => {
  const classes = classnames(
    'cr-link',
    type && `cr-link--${type}`,
    disabled && 'is-disabled',
    underline && !disabled && 'is-underline',
  );
  return (
    <a
      {...props}
      style={style}
      className={classes}
    >
      <span className="cr-link--inner">
        {children}
      </span>
    </a>
  );
};

Footer.displayName = 'Footer';
Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
