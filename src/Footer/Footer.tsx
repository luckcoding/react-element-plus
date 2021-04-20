import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  height?: string
}

const defaultProps: Partial<FooterProps> = {
  height: '60px',
};

const Footer: React.FC<FooterProps> = ({
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
    className={classnames('el-footer', className)}
  >
    {children}
  </footer>
);

Footer.displayName = 'Footer';
Footer.defaultProps = defaultProps;
Footer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
}

export default Footer;
