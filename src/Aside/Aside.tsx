import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export interface AsideProps extends React.HTMLAttributes<HTMLElement> {
  width?: string;
}

const defaultProps: Partial<AsideProps> = {
  width: '300px'
};

const Aside: React.FC<AsideProps> = ({ width, style, className, children, ...props }) => (
  <aside
    {...props}
    style={{
      ...style,
      width
    }}
    className={classnames('el-aside', className)}
  >
    {children}
  </aside>
);

Aside.displayName = 'Aside';
Aside.defaultProps = defaultProps;
Aside.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.string
};
export default Aside;
