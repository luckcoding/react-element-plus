import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useMemo } from 'react';

const Type = ['line', 'circle', 'dashboard'] as const
const Status = ['success', 'exception', 'warning'] as const
const StrokeLinecap = ['inherit', 'butt', 'round', 'square'] as const

type ProgressFuncType = (percentage: number) => string;

export interface ProgressProps {
  type?: typeof Type[number]
  percentage?: number
  status?: typeof Status[number]
  indeterminate?: boolean
  duration?: number
  strokeWidth?: number
  strokeLinecap?: typeof StrokeLinecap[number]
  textInside?: boolean
  width?: number
  showText?: boolean
  color?: string | Array<string | { color: string; percentage: number; }> | ProgressFuncType
  format?: ProgressFuncType
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<ProgressProps> = {
  type: 'line',
  percentage: 0,
  indeterminate: false,
  duration: 3,
  strokeWidth: 6,
  strokeLinecap: 'round',
  textInside: false,
  width: 126,
  showText: true,
  format: (percentage: number) => `${percentage}%`
};

const Progress: React.FC<ProgressProps> = (props) => {
  const getCurrentColor = useCallback((percentage: number) => {
    const { color } = props
    if (typeof color === 'function') {
      return color(percentage)
    } else if (Array.isArray(color)) {
      const span = 100 / color.length
      const seriesColors = color.map((seriesColor, index) => {
        if (typeof seriesColor === 'string') {
          return {
            color: seriesColor,
            percentage: (index + 1) * span,
          }
        }
        return seriesColor
      })
      const colorArray = seriesColors.sort((a, b) => a.percentage - b.percentage)

      for (let i = 0; i < colorArray.length; i++) {
        if (colorArray[i].percentage > percentage) {
          return colorArray[i].color
        }
      }
      return colorArray[colorArray.length - 1]?.color
    } else {
      return props.color as string
    }
  }, [props.color])

  const barStyle = useMemo<React.CSSProperties>(() => ({
    width: `${props.percentage}%`,
    animationDuration: `${props.duration}s`,
    backgroundColor: getCurrentColor(props.percentage),
  }), [props.percentage, props.duration])

  const relativeStrokeWidth = useMemo(() => {
    return (props.strokeWidth / props.width * 100).toFixed(1)
  }, [props.strokeWidth, props.width])

  const radius = useMemo(() => {
    if (props.type === 'circle' || props.type === 'dashboard') {
      return parseInt(`${50 - parseFloat(relativeStrokeWidth) / 2}`, 10)
    } else {
      return 0
    }
  }, [props.type, relativeStrokeWidth])

  const trackPath = useMemo(() => {
    const r = radius
    const isDashboard = props.type === 'dashboard'
    return `
        M 50 50
        m 0 ${isDashboard ? '' : '-'}${r}
        a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
        a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
        `
  }, [radius])

  const perimeter = useMemo(() => {
    return 2 * Math.PI * radius
  }, [radius])

  const rate = useMemo(() => {
    return props.type === 'dashboard' ? 0.75 : 1
  }, [props.type])

  const strokeDashoffset = useMemo(() => {
    const offset = -1 * perimeter * (1 - rate) / 2
    return `${offset}px`
  }, [perimeter, rate])

  const trailPathStyle = useMemo(() => {
    return {
      strokeDasharray: `${(perimeter * rate)}px, ${perimeter}px`,
      strokeDashoffset: strokeDashoffset,
    }
  }, [perimeter, rate, strokeDashoffset])

  const circlePathStyle = useMemo(() => {
    return {
      strokeDasharray: `${perimeter * rate * (props.percentage / 100)}px, ${perimeter}px`,
      strokeDashoffset: strokeDashoffset,
      transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
    }
  }, [perimeter, rate, strokeDashoffset, props.percentage])

  const stroke = useMemo(() => {
    let ret: string
    if (props.color) {
      ret = getCurrentColor(props.percentage)
    } else {
      switch (props.status) {
        case 'success':
          ret = '#13ce66'
          break
        case 'exception':
          ret = '#ff4949'
          break
        case 'warning':
          ret = '#e6a23c'
          break
        default:
          ret = '#20a0ff'
      }
    }
    return ret
  }, [])

  const iconClass = useMemo(() => {
    if (props.status === 'warning') {
      return 'el-icon-warning'
    }
    if (props.type === 'line') {
      return props.status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-close'
    } else {
      return props.status === 'success' ? 'el-icon-check' : 'el-icon-close'
    }
  }, [props.status, props.type])

  const progressTextSize = useMemo(() => {
    return props.type === 'line'
      ? 12 + props.strokeWidth * 0.4
      : props.width * 0.111111 + 2
  }, [props.type, props.strokeWidth, props.width])

  const content = useMemo(() => {
    return props.format(props.percentage)
  }, [props.percentage, props.format])

  const classes = classnames(
    'el-progress',
    `el-progress--${props.type}`,
    props.status && `is-${props.status}`,
    !props.showText && 'el-progress--without-text',
    props.textInside && 'el-progress--text-inside'
  )

  const barClasses = classnames(
    'el-progress-bar__inner',
    props.indeterminate && 'el-progress-bar__inner--indeterminate'
  )

  return (
    <div
      className={classes}
      role="progressbar"
      aria-valuenow={props.percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {props.type === 'line' ? (
        <div className="el-progress-bar">
          <div className="el-progress-bar__outer" style={{ height: `${props.strokeWidth}px` }}>
            <div className={barClasses} style={barStyle}>
              {(props.showText || props.children) && props.textInside && (
                <div className="el-progress-bar__innerText">
                  {props.children || <span>{content}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="el-progress-circle" style={{ height: `${props.width}px`, width: `${props.width}px` }}>
          <svg viewBox="0 0 100 100">
            <path
              className="el-progress-circle__track"
              d={trackPath}
              stroke="#e5e9f2"
              strokeWidth={relativeStrokeWidth}
              fill="none"
              style={trailPathStyle}
            />
            <path
              className="el-progress-circle__path"
              d={trackPath}
              stroke={stroke}
              fill="none"
              strokeLinecap={props.strokeLinecap}
              strokeWidth={props.percentage ? relativeStrokeWidth : 0}
              style={circlePathStyle}
            />
          </svg>
        </div>
      )}
      {(props.showText || props.children) && !props.textInside && (
        <div
          className="el-progress__text"
          style={{ fontSize: `${progressTextSize}px`}}
        >
          {props.children || (props.status ? <i className={iconClass} /> : <span>{content}</span>)}
        </div>
      )}
    </div>
  )
}

Progress.displayName = 'ElProgress';
Progress.propTypes = {
  type: PropTypes.oneOf(Type),
  percentage: PropTypes.number,
  status: PropTypes.oneOf(Status),
  indeterminate: PropTypes.bool,
  duration: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeLinecap: PropTypes.oneOf(StrokeLinecap),
  textInside: PropTypes.bool,
  width: PropTypes.number,
  showText: PropTypes.bool,
  color: PropTypes.any,
  format: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Progress.defaultProps = defaultProps;
export default Progress;
