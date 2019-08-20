import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  height: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  height: '60px',
  style: {},
};

const Header = ({
  height,
  style,
  className,
  children,
  ...props
}) => (
  <header
    {...props}
    style={{
      ...style,
      height,
    }}
    className={classnames('cr-header', className)}
  >
    {children}
  </header>
);

Header.displayName = 'Header';
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
