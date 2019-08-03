import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import types from './types';
import './loading.scss';

const propTypes = {
  type: PropTypes.oneOf(types),
  className: PropTypes.string,
};

const defaultProps = {
  type: types[0],
};

const Loading = React.forwardRef(({
  type,
  className,
  ...props
}, ref) => {
  const classes = classnames(
    'pure-loading',
    `_${type}`,
    className,
  );

  // ref
  if (ref) props.ref = ref;

  return (
    <div className={classes} {...props} />
  );
});

Loading.displayName = 'Loading';
Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
