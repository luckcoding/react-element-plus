import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import throttle from 'lodash/throttle'
import Fade from '../Fade';
import { easeInOutCubic } from '../_utils/animation';
import { off, on } from '../_utils/dom';

export interface BacktopProps {
  visibilityHeight?: number
  target?: string
  right?: number
  bottom?: number
  onClick?: (e: React.MouseEvent) => void
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<BacktopProps> = {
  visibilityHeight: 200,
  right: 40,
  bottom: 40,
};

const Backtop: React.FC<BacktopProps> = (props) => {
  const {
    right,
    bottom,
    onClick,
    style = {},
    visibilityHeight,
    target,
    className,
    children,
  } = props;

  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLElement | Document>()
  const el = useRef<HTMLElement>()

  const scrollToTop = () => {
    const beginTime = Date.now()
    const beginValue = el.current.scrollTop
    const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / 500
      if (progress < 1) {
        el.current.scrollTop = beginValue * (1 - easeInOutCubic(progress))
        rAF(frameFunc)
      } else {
        el.current.scrollTop = 0
      }
    }
    rAF(frameFunc)
  }
  const onScroll = () => {
    setVisible(el.current.scrollTop >= visibilityHeight)
  }
  const handleClick = useCallback((event: React.MouseEvent) => {
    scrollToTop()
    onClick?.(event)
  }, [onClick])

  useEffect(() => {
    container.current = document;
    el.current = document.documentElement;
    if (target) {
      el.current = document.querySelector(target);
      if (!el.current) {
        throw new Error(`target is not existed: ${target}`);
      }
      container.current = el.current;
      onScroll(); // first trigger
    }

    const throttledScrollHandler = throttle(onScroll, 300)
    on(container.current, 'scroll', throttledScrollHandler)
    return () => {
      off(container.current, 'scroll', throttledScrollHandler)
    }
  }, [])

  const classes = classnames(
    'el-backtop',
    className,
  )

  style.right = `${right}px`
  style.bottom = `${bottom}px`

  return (
    <Fade
      transitionClass={{
        exiting: 'el-fade-in-leave-active',
        exited: 'el-fade-in-enter-from'
      }}
      unmountOnExit
      in={visible}
    >
      <div
        className={classes}
        style={style}
        onClick={handleClick}
      >
        {children || <i className="el-icon-caret-top" />}
      </div>
    </Fade>
  )
}

Backtop.displayName = 'Backtop';
Backtop.propTypes = {
  visibilityHeight: PropTypes.number,
  target: PropTypes.string,
  right: PropTypes.number,
  bottom: PropTypes.number,

  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Backtop.defaultProps = defaultProps;

export default Backtop;
