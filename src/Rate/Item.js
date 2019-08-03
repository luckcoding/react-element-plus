import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './item.scss';

const propTypes = {
  size: PropTypes.number,
  percent: PropTypes.number,
  color: PropTypes.string,
  trailColor: PropTypes.string,

  className: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  size: 16,
  percent: 50,
  color: '#FF9800',
  trailColor: '#e5e5e5',
};

function Item({
  size,
  percent,
  color,
  trailColor,
  className,
  style = {},
  ...props
}) {
  return (
    <div
      className={classnames('pure-rate-item', className)}
      style={{
        ...style,
        fontSize: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        width: `${size}px`,
      }}
      {...props}
    >
      <div style={{ color: trailColor }}>★</div>
      <div style={{ color, width: `${percent || 0}%` }}>★</div>
    </div>
  );
}

Item.displayName = 'RateItem';
Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
