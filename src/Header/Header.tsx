import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  height?: string;
}

const defaultProps: Partial<HeaderProps> = {
  height: '60px'
};

const Header: React.FC<HeaderProps> = ({ height, style, className, children, ...props }) => (
  <header
    {...props}
    style={{
      ...style,
      height
    }}
    className={classnames('el-header', className)}
  >
    {children}
  </header>
);

Header.displayName = 'Header';
Header.defaultProps = defaultProps;
Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string
};

export default Header;
