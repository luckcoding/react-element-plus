import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function Toggle({
  children,
  append,
  className,
  ...props
}) {
  return (
    <div className={classnames('crude-toggle', className)} {...props}>
      <div className="_fix">{children}</div>
      <div className="_append">{append}</div>
    </div>
  );
}

Toggle.propTypes = {
  append: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Toggle;
