import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WithAsProps } from '../_utils/types';
import Bar from './Bar';
import { addResizeListener, removeResizeListener } from '../_utils/resize-event';
import { useUpdate } from '../_utils';

export interface ScrollbarProps extends WithAsProps {
  height?: string;
  maxHeight?: string
  native?: boolean
  wrapStyle?: React.CSSProperties
  wrapClass?: string
  viewStyle?: React.CSSProperties
  viewClass?: string
  noresize?: boolean
  onScroll?: (e: { scrollLeft: number; scrollTop: number }) => void
}

const defaultProps: Partial<ScrollbarProps> = {
  as: 'div',
};

const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const { as: Component, children } = props
  const scrollbar = useRef<HTMLDivElement>()
  const wrap = useRef<HTMLDivElement>()
  const resize = useRef<HTMLDivElement>()
  const forceUpdate = useUpdate()

  const state = useMemo(() => ({
    sizeWidth: '0',
    sizeHeight: '0',
    moveX: 0,
    moveY: 0,
  }), [])

  const handleScroll = () => {
    if (wrap.current) {
      state.moveY = (wrap.current.scrollTop * 100) / wrap.current.clientHeight
      state.moveX = (wrap.current.scrollLeft * 100) / wrap.current.clientWidth
      props.onScroll?.({
        scrollLeft: state.moveX,
        scrollTop: state.moveY,
      })
    }
    forceUpdate()
  }

  const update = () => {
    if (!wrap.current) return

    const heightPercentage = (wrap.current.clientHeight * 100) / wrap.current.scrollHeight
    const widthPercentage = (wrap.current.clientWidth * 100) / wrap.current.scrollWidth

    state.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
    state.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''

    forceUpdate()
  }

  const style = useMemo<React.CSSProperties>(() => {
    const wrapStyle: React.CSSProperties = {}
    if (props.height) {
      wrapStyle.height = props.height
    }
    if (props.maxHeight) {
      wrapStyle.maxHeight = props.maxHeight
    }
    return wrapStyle
  }, [props.height, props.maxHeight])

  useEffect(() => {
    if (!props.native) {
      setImmediate(update)
    }
    if (!props.noresize) {
      addResizeListener(resize.current as any, update)
      addEventListener('resize', update)
    }
    return () => {
      if (!props.noresize) {
        removeResizeListener(resize.current as any, update)
        removeEventListener('resize', update)
      }
    }
  }, [])

  const wrapClasses = classnames(
    'el-scrollbar__wrap',
    !props.native && 'el-scrollbar__wrap--hidden-default',
    props.viewClass
  )
  const viewClasses = classnames('el-scrollbar__view', props.viewClass)

  return (
    <div ref={scrollbar} className="el-scrollbar">
      <div ref={wrap} className={wrapClasses} style={{ ...style, ...props.style }} onScroll={handleScroll}>
        <Component ref={resize} className={viewClasses} style={props.viewStyle}>{children}</Component>
      </div>
      {!props.native && (
        <React.Fragment>
          <Bar move={state.moveX} size={state.sizeWidth} scrollbar={scrollbar} wrap={wrap} />
          <Bar vertical move={state.moveY} size={state.sizeHeight} scrollbar={scrollbar} wrap={wrap} />
        </React.Fragment>
      )}
    </div>
  )
}

Scrollbar.displayName = 'ElScrollbar';
Scrollbar.defaultProps = defaultProps;
Scrollbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string
};

export default Scrollbar;
