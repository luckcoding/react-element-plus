import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import types, { props as defProps } from './types';

const propTypes = {
  ...types,
  gapDegree: PropTypes.number,
  gapPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

const defaultProps = {
  ...defProps,
  gapDegree: 0,
  gapPosition: 'top',
};

const CircleBase = props => (
  <circle
    cx="55"
    cy="55"
    r="50"
    fill="none"
    {...props}
  />
);

class Circle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getLength = this.getLength.bind(this);
  }

  getLength(percent) {
    const { gapDegree } = this.props;
    return 3.14 * (100 - gapDegree) * (percent / 100);
  }

  getRotate() {
    const { gapPosition, gapDegree } = this.props;

    let base;
    switch (gapPosition) {
      case 'top':
        base = -90;
        break;
      case 'right':
        base = 0;
        break;
      case 'bottom':
        base = 90;
        break;
      default:
        base = 180;
    }

    return `rotate(${gapDegree * 1.8 + base}deg)`;
  }

  render() {
    const {
      percent,
      stroke,
      color,
      linecap,
      trailColor,
      trailWidth,
      transition,
      tail,
      className,
    } = this.props;

    const percents = Array.isArray(percent) ? percent : [percent];
    const strokeColors = Array.isArray(color) ? color : [color];
    const rotate = this.getRotate();

    let offset = 0;
    return (
      <svg
        viewBox="0 0 110 110"
        preserveAspectRatio="none"
        className={classnames('crude-progress-circle', className)}
      >
        <CircleBase
          strokeLinecap={linecap}
          stroke={trailColor}
          strokeWidth={trailWidth || stroke}
          strokeDasharray={`${this.getLength(100)},1000`}
          style={{
            transformOrigin: '55px 55px',
            transform: rotate,
          }}
        />
        {percents.map((per, k) => {
          const length = this.getLength(per);
          const strokeDashoffset = `${-offset}px`;
          if (tail) {
            offset += length;
          }
          return (
            <CircleBase
              key={k}
              strokeLinecap={linecap}
              stroke={strokeColors[k] || strokeColors[strokeColors.length - 1]}
              strokeWidth={stroke}
              fillOpacity="0"
              strokeDasharray={`${length},1000`}
              strokeDashoffset={strokeDashoffset}
              style={{
                transformOrigin: '55px 55px',
                transform: rotate,
                transition,
              }}
            />
          );
        })}
      </svg>
    );
  }
}

Circle.displayName = 'Circle';
Circle.propTypes = propTypes;
Circle.defaultProps = defaultProps;

export default Circle;
