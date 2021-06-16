import React, { useRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { shadowReactive } from '../_utils';
import { getScrollContainer, off, on } from '../_utils/dom';
import { addResizeListener, removeResizeListener } from '../_utils/resize-event';

type Position = 'top' | 'bottom'

export interface AffixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onScroll'> {
  zIndex?: number
  target?: string
  offset?: number
  position?: Position
  onChange?: (fixed: boolean) => void
  onScroll?: (e: { scrollTop: number; fixed: boolean }) => void
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<AffixProps> = {
  zIndex: 100,
  target: '',
  offset: 0,
  position: 'top',
};

const Affix: React.FC<AffixProps> = ({
  className,
  children,
  ...props
}) => {
  const target = useRef<HTMLElement>()
  const root = useRef<HTMLDivElement>()
  const scrollContainer = useRef<HTMLElement>()

  const state = shadowReactive({
    fixed: false,
    height: 0,  // height of root
    width: 0,  // width of root
    scrollTop: 0, // scrollTop of documentElement
    clientHeight: 0,  // clientHeight of documentElement
    transform: 0,
  })

  const rootStyle = useMemo<React.CSSProperties>(() => {
    return {
      height: state.fixed ? `${state.height}px` : '',
      width: state.fixed ? `${state.width}px` : '',
    }
  }, [state.fixed, state.height, state.width])

  const affixStyle = useMemo<React.CSSProperties>(() => {
    if (!state.fixed) {
      return
    }
    const offset = props.offset ? `${props.offset}px` : 0
    const transform = state.transform ? `translateY(${state.transform}px)` : ''

    return {
      height: `${state.height}px`,
      width: `${state.width}px`,
      top: props.position === 'top' ? offset : '',
      bottom: props.position === 'bottom' ? offset : '',
      transform: transform,
      zIndex: props.zIndex,
    }
  }, [state.fixed, state.transform, state.height, state.width, props.position, props.offset])

  const updateState = () => {
    const rootRect = root.current.getBoundingClientRect()
    const targetRect = target.current.getBoundingClientRect()
    state.height = rootRect.height
    state.width = rootRect.width
    state.scrollTop = scrollContainer.current as any === window ? document.documentElement.scrollTop : scrollContainer.current.scrollTop
    state.clientHeight = document.documentElement.clientHeight

    if (props.position === 'top') {
      if (props.target) {
        const difference = targetRect.bottom - props.offset - state.height
        state.fixed = props.offset > rootRect.top && targetRect.bottom > 0
        state.transform = difference < 0 ? difference : 0
      } else {
        state.fixed = props.offset > rootRect.top
      }
    } else {
      if (props.target) {
        const difference = state.clientHeight - targetRect.top - props.offset - state.height
        state.fixed = state.clientHeight - props.offset < rootRect.bottom && state.clientHeight > targetRect.top
        state.transform = difference < 0 ? -difference : 0
      } else {
        state.fixed = state.clientHeight - props.offset < rootRect.bottom
      }
    }
  }

  const onScroll = () => {
    updateState()
    props.onScroll?.({ scrollTop: state.scrollTop, fixed: state.fixed })
  }

  useEffect(() => {
    props.onChange?.(state.fixed)
  }, [state.fixed])

  useEffect(() => {
    if (props.target) {
      target.current = document.querySelector(props.target)
      if (!target.current) {
        throw new Error(`target is not existed: ${props.target}`)
      }
    } else {
      target.current = document.documentElement
    }
    scrollContainer.current = getScrollContainer(root.current) as any
    on(scrollContainer.current, 'scroll', onScroll)
    addResizeListener(root.current as any, updateState)

    return () => {
      off(scrollContainer.current, 'scroll', onScroll)
      removeResizeListener(root.current as any, updateState)
    }
  }, [props.target, state])

  const classes = classnames('el-affix', className);

  return (
    <div ref={root} className={classes} style={rootStyle}>
      <div className={state.fixed ? 'el-affix--fixed' : undefined} style={affixStyle}>
        {children}
      </div>
    </div>
  );
};

Affix.displayName = 'Affix';
Affix.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
Affix.defaultProps = defaultProps;

export default Affix;
