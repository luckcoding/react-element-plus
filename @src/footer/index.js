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

const Footer = ({
  height,
  style,
  className,
  children,
  ...props
}) => (
  <footer
    {...props}
    style={{
      ...style,
      height,
    }}
    className={classnames('cr-footer', className)}
  >
    {children}
  </footer>
);

Footer.displayName = 'Footer';
Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
