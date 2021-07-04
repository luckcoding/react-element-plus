import React, { CSSProperties, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IStatus } from '../Steps/types';

export interface StepProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode
  icon?: string
  description?: string
  // parent props
  itemstyle?: CSSProperties
  status?: IStatus
  lineStyle?: CSSProperties
  isSimple?: boolean
  direction?: any
  stepIndex?: number
  isLast?: boolean
  isCenter?: boolean
  space?: string
}

const Step: React.FC<StepProps> = (props) => {
  const {
    title,
    icon,
    description,
    className,
    children,
    status,
    lineStyle,
    itemstyle,
    direction,
    isSimple,
    stepIndex = 0,
    isLast,
    isCenter,
    space,
    style,
    ...rest
  } = props

  const isVertical = useMemo(() => direction === 'vertical', [direction])

  const classes = classnames(
    'el-step',
    isSimple ? 'is-simple' : `is-${direction}`,
    isLast && !space && !isCenter && 'is-flex',
    isCenter && !isVertical && !isSimple && 'is-center',
    className,
  )

  return (
    <div className={classes} style={{ ...itemstyle, ...style }} {...rest}>
      <div className={`el-step__head is-${status}`}>
        <div className="el-step__line">
          <i className="el-step__line-inner" style={lineStyle} />
        </div>
        <div className={`el-step__icon is-${icon ? 'icon' : 'text'}`}>
          {status !== 'success' && status !== 'error' ? (
            <>
              {icon && <i className={`el-step__icon-inner ${icon}`} />}
              {!icon && !isSimple && (<div v-if="!icon && !isSimple" className="el-step__icon-inner">{stepIndex}</div>)}
            </>
          ) : (
            <i className={`el-step__icon-inner is-status el-icon-${status === 'success' ? 'check' : 'close'}`} />
          )}
        </div>
      </div>
      {/* title & description */}
      <div className="el-step__main">
        <div className={`el-step__title is-${status}`}>
          {title}
        </div>
        {isSimple ? (
          <div className="el-step__arrow"></div>
        ) : (
          <div className={`el-step__description is-${status}`}>
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

Step.displayName = 'ElStep';
Step.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Step;
