import React from 'react';
import classnames from 'classnames';
import types, { props as defProps } from './types';

const propTypes = types;
const defaultProps = defProps;

class Line extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPath = this.getPath.bind(this);
  }

  getPath() {
    const { linecap, stroke } = this.props;

    const mIndex = stroke / 2;
    const rIndex = 100 - stroke / 2;

    const startPoint = `${linecap === 'round' ? mIndex : 0},${mIndex}`;
    const endPoint = `${linecap === 'round' ? rIndex : 100},${mIndex}`;

    return `M ${startPoint} L ${endPoint}`;
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
    const path = this.getPath();

    let offset = 0;
    return (
      <svg
        viewBox={`0 0 100 ${stroke}`}
        preserveAspectRatio="none"
        className={classnames('crude-progress-line', className)}
      >
        <path
          d={path}
          strokeLinecap={linecap}
          stroke={trailColor}
          strokeWidth={trailWidth || stroke}
          fillOpacity="0"
        />
        {percents.map((per, k) => {
          const strokeDashoffset = `${-offset}px`;
          if (tail) {
            offset += per;
          }
          return (
            <path
              key={k}
              d={path}
              strokeLinecap={linecap}
              stroke={strokeColors[k] || strokeColors[strokeColors.length - 1]}
              strokeWidth={stroke}
              fillOpacity="0"
              strokeDashoffset={strokeDashoffset}
              style={{
                strokeDasharray: `${per}px, 100px`,
                transition,
              }}
            />
          );
        })}
      </svg>
    );
  }
}

Line.displayName = 'Line';
Line.propTypes = propTypes;
Line.defaultProps = defaultProps;

export default Line;
