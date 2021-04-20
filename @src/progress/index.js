import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  type: PropTypes.oneOf(['line', 'circle', 'dashboard']),
  percentage: PropTypes.number,
  status: PropTypes.oneOf(['success', 'exception', 'warning']),
  strokeWidth: PropTypes.number,
  strokeLinecap: PropTypes.string,
  textInside: PropTypes.bool,
  width: PropTypes.number,
  showText: PropTypes.bool,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  format: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
};

const defaultProps = {
  type: 'line',
  percentage: 1,
  strokeWidth: 6,
  strokeLinecap: 'round',
  textInside: false,
  width: 126,
  showText: true,
  color: '',
};

export const RowContext = createContext('Row');

const Progress = ({
  type,
  percentage,
  status,
  strokeWidth,
  strokeLinecap,
  textInside,
  width,
  showText,
  color,
  format,
  style,
  className,
}) => {
  const getColorArray = () => {
    const span = 100 / color.length;
    return color.map((seriesColor, index) => {
      if (typeof seriesColor === 'string') {
        return {
          color: seriesColor,
          progress: (index + 1) * span,
        };
      }
      return seriesColor;
    });
  };

  const getLevelColor = (percent) => {
    const colorArray = getColorArray().sort((a, b) => a.percentage - b.percentage);

    for (let i = 0; i < colorArray.length; i++) {
      if (colorArray[i].percentage > percent) {
        return colorArray[i].color;
      }
    }
    return colorArray[colorArray.length - 1].color;
  };

  const getCurrentColor = (percent) => {
    if (typeof color === 'function') {
      return color(percent);
    }
    if (typeof color === 'string') {
      return color;
    }
    return getLevelColor(percent);
  };

  const barStyle = {
    width: `${percentage}%`,
    backgroundColor: getCurrentColor(percentage),
  };

  const relativeStrokeWidth = (strokeWidth / width * 100).toFixed(1);

  const radius = (type === 'circle' || type === 'dashboard')
    ? parseInt(50 - parseFloat(relativeStrokeWidth) / 2, 10)
    : 0;

  const isDashboard = type === 'dashboard';

  const trackPath = `
    M 50 50
    m 0 ${isDashboard ? '' : '-'}${radius}
    a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
    a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
    `;

  const perimeter = 2 * Math.PI * radius;

  const rate = isDashboard ? 0.75 : 1;

  const strokeDashoffset = `${-1 * perimeter * (1 - rate) / 2}px`;

  const trailPathStyle = {
    strokeDasharray: `${(perimeter * rate)}px, ${perimeter}px`,
    strokeDashoffset,
  };

  const circlePathStyle = {
    strokeDasharray: `${perimeter * rate * (percentage / 100)}px, ${perimeter}px`,
    strokeDashoffset,
    transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
  };

  let stroke;
  if (color) {
    stroke = getCurrentColor(percentage);
  } else {
    switch (status) {
      case 'success':
        stroke = '#13ce66';
        break;
      case 'exception':
        stroke = '#ff4949';
        break;
      case 'warning':
        stroke = '#e6a23c';
        break;
      default:
        stroke = '#20a0ff';
    }
  }

  const progressTextSize = type === 'line'
    ? 12 + strokeWidth * 0.4
    : width * 0.111111 + 2;

  const content = typeof format === 'function'
    ? (format(percentage) || '')
    : `${percentage}%`;

  const classes = classnames(
    'cr-progress',
    `cr-progress--${type}`,
    status && `is-${status}`,
    !showText && 'cr-progress--without-text',
    textInside && 'cr-progress--text-inside',
    className,
  );

  return (
    <div
      className={classes}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      style={style}
    >
      {type === 'line' ? (
        <div className="cr-progress-bar">
          <div className="cr-progress-bar__outer" style={{ height: `${strokeWidth}px` }}>
            <div className="cr-progress-bar__inner" style={barStyle}>
              {showText && textInside && (
                <div className="cr-progress-bar__innerText">{content}</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="cr-progress-circle" style={{ height: `${width}px`, width: `${width}px` }}>
          <svg viewBox="0 0 100 100">
            <path
              className="cr-progress-circle__track"
              d={trackPath}
              stroke="#e5e9f2"
              strokeWidth={relativeStrokeWidth}
              fill="none"
              style={trailPathStyle}
            />
            <path
              className="cr-progress-circle__path"
              d={trackPath}
              stroke={stroke}
              fill="none"
              strokeLinecap={strokeLinecap}
              strokeWidth={percentage ? relativeStrokeWidth : 0}
              style={circlePathStyle}
            />
          </svg>
        </div>
      )}
      {showText && !textInside && (
        <div className="cr-progress__text" style={{ fontSize: `${progressTextSize}px` }}>
          {content}
        </div>
      )}
    </div>
  );
};

Progress.displayName = 'Progress';
Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
