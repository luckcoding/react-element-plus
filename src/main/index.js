import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const Main = ({
  className,
  children,
  ...props
}) => (
  <main
    {...props}
    className={classnames('cr-main', className)}
  >
    {children}
  </main>
);

Main.displayName = 'Main';
Main.propTypes = propTypes;

export default Main;
