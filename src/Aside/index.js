import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  width: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  width: '300px',
  style: {},
};

const Aside = ({
  width,
  style,
  className,
  children,
  ...props
}) => (
  <aside
    {...props}
    style={{
      ...style,
      width,
    }}
    className={classnames('cr-aside', className)}
  >
    {children}
  </aside>
);

Aside.displayName = 'Aside';
Aside.propTypes = propTypes;
Aside.defaultProps = defaultProps;

export default Aside;
