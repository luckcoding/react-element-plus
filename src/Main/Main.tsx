import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export interface MainProps extends React.HTMLAttributes<HTMLElement> {}

const Main: React.FC<MainProps> = ({
  className,
  children,
  ...props
}) => (
  <main
    {...props}
    className={classnames('el-main', className)}
  >
    {children}
  </main>
);

Main.displayName = 'Main';
Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Main;
