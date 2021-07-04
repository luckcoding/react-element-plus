import React, { CSSProperties, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IStatus, IStepsProps } from './types';

export type StepsProps = IStepsProps & React.HTMLAttributes<HTMLElement>

const defaultProps: StepsProps = {
  active: 0,
  direction: 'horizontal',
  finishStatus: 'finish',
  processStatus: 'process',
}

const Steps: React.FC<StepsProps> = (props) => {
  const {
    space,
    active,
    direction,
    alignCenter,
    simple,
    processStatus,
    finishStatus,
    className,
    children,
    ...rest
  } = props

  const isVertical = useMemo(() => direction === 'vertical', [direction])

  const calcProgress = useCallback((status: IStatus, index: number) => {
    let step = 100
    const style: CSSProperties = {}

    style.transitionDelay = 150 * index + 'ms'
    if (status === processStatus) {
      step = 0
    } else if (status === 'wait') {
      step = 0
      style.transitionDelay = (-150 * index) + 'ms'
    }
    style.borderWidth = step && !simple ? '1px' : 0
    style[direction === 'vertical' ? 'height' : 'width'] = `${step}%`
    return style
  }, [simple])

  const calcStatus = useCallback((index: number): IStatus => {
    const activeIndex = active
    if (activeIndex > index) {
      return finishStatus
    } else if (activeIndex === index && calcStatus(index + 1) !== 'error') {
      return processStatus
    } else {
      return 'wait'
    }
  }, [active])

  const classes = classnames(
    'el-steps',
    simple ? 'el-steps--simple' : `el-steps--${direction}`,
    className,
  )

  const stepsCount = React.Children.count(children);
  console.log(active)
  const items = React.Children.map(children, (child, index) => {
    if (React.isValidElement(children)) {
      return children
    }
    const isLast = index === stepsCount - 1
    const style: CSSProperties = {
      flexBasis: (typeof space === 'number'
        ? `${space}px`
        : space
          ? space
          : 100 / (stepsCount - (alignCenter ? 0 : 1)) + '%'),
    }
    if (!isVertical && isLast) {
      style.maxWidth = 100 / stepsCount + '%'
    }

    const status = calcStatus(index)
    const lineStyle = calcProgress(status, index)
    return React.cloneElement(child as React.DetailedReactHTMLElement<any, HTMLElement>, {
      itemstyle: style,
      lineStyle,
      direction,
      isLast,
      isCenter: alignCenter,
      status,
      space,
      isSimple: simple,
      stepIndex: index + 1
    })
  })

  return (
    <div className={classes} {...rest}>
      {items}
    </div>
  )
}

Steps.displayName = 'ElSteps';
Steps.defaultProps = defaultProps;
Steps.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Steps;
