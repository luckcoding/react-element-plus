import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Item from './Item';
import getRatePoints from './getRatePoints';
import './rate.scss';

const propTypes = {
  value: PropTypes.number,
  maxValue: PropTypes.oneOf([5, 100]),
  size: PropTypes.number,
  color: PropTypes.string,
  trailColor: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  maxValue: 5,
  value: 0,
  onChange: () => {},
  disabled: false,
};

function Rate({
  maxValue,
  value,
  size,
  color,
  trailColor,
  disabled,
  onChange,
  className,
  ...props
}) {
  const classes = classnames(
    'pure-rate',
    !disabled && '_animate',
    'clearfix',
    className,
  );

  const points = getRatePoints(value, maxValue);

  return (
    <div
      className={classes}
      title={value}
      {...props}
    >
      {points.map((itemValue, key) => (
        <Item
          size={size}
          color={color}
          trailColor={trailColor}
          onClick={() => disabled || onChange(maxValue / 5 * (key + 1))}
          key={key}
          percent={itemValue}
        />
      ))}
    </div>
  );
}

Rate.displayName = 'Rate';
Rate.propTypes = propTypes;
Rate.defaultProps = defaultProps;

export { Item as RateItem };
export default Rate;
