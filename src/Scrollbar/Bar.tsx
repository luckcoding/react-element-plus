import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import Fade from '../Fade'
import { off, on } from '../_utils/dom'
import { BAR_MAP, renderThumbStyle } from './util'

interface BarProps extends React.HTMLAttributes<HTMLElement> {
  scrollbar: React.MutableRefObject<HTMLDivElement>
  wrap: React.MutableRefObject<HTMLDivElement>
  vertical?: boolean
  size: string
  move: number
}

const Bar: React.FC<BarProps> = ({ scrollbar, wrap, ...props }) => {
  const instance = useRef<HTMLDivElement>()
  const thumb = useRef<HTMLDivElement>()
  const bar = useMemo(() => BAR_MAP[props.vertical ? 'vertical': 'horizontal'], [props.vertical])
  const [visible, setVisible] = useState(false)
  const state = useMemo(() => ({
    barStore: {},
    cursorDown: null,
    cursorLeave: null,
    onselectstartStore: null,
  }), [])

  const clickThumbHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    if (e.ctrlKey || [1, 2].includes(e.button)) {
      return
    }
    window.getSelection().removeAllRanges()
    startDrag(e)
    state.barStore[bar.axis] = (e.currentTarget[bar.offset] - (e[bar.client] - e.currentTarget.getBoundingClientRect()[bar.direction]))
  }

  const clickTrackHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const offset = Math.abs((e.target as HTMLDivElement).getBoundingClientRect()[bar.direction] - e[bar.client])
    const thumbHalf = (thumb.current[bar.offset] / 2)
    const thumbPositionPercentage = ((offset - thumbHalf) * 100 / instance.current[bar.offset])

    wrap.current[bar.scroll] = (thumbPositionPercentage * wrap.current[bar.scrollSize] / 100)
  }

  const startDrag: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.nativeEvent.stopImmediatePropagation()
    state.cursorDown = true
    on(document, 'mousemove', mouseMoveDocumentHandler)
    on(document, 'mouseup', mouseUpDocumentHandler)
    state.onselectstartStore = document.onselectstart
    document.onselectstart = () => false
  }

  const mouseMoveDocumentHandler = e => {
    if (state.cursorDown === false) return
    const prevPage = state.barStore[bar.axis]

    if (!prevPage) return

    const offset = ((instance.current.getBoundingClientRect()[bar.direction] - e[bar.client]) * -1)
    const thumbClickPosition = (thumb.current[bar.offset] - prevPage)
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / instance.current[bar.offset])
    wrap.current[bar.scroll] = (thumbPositionPercentage * wrap.current[bar.scrollSize] / 100)
  }

  const mouseUpDocumentHandler = () => {
    state.cursorDown = false
    state.barStore[bar.axis] = 0
    off(document, 'mousemove', mouseMoveDocumentHandler)
    document.onselectstart = state.onselectstartStore
    if (state.cursorLeave) {
      setVisible(false)
    }
  }

  const thumbStyle = useMemo<React.CSSProperties>(() => renderThumbStyle({
    size: props.size,
    move: props.move,
    bar
  }), [props.size, props.move, bar])

  const mouseMoveScrollbarHandler = () => {
    state.cursorLeave = false
    setVisible(!!props.size)
  }

  const mouseLeaveScrollbarHandler = () => {
    state.cursorLeave = true
    setVisible(state.cursorDown)
  }

  useEffect(() => {
    on(scrollbar.current, 'mousemove', mouseMoveScrollbarHandler)
    on(scrollbar.current, 'mouseleave', mouseLeaveScrollbarHandler)

    return () => {
      off(document, 'mouseup', mouseUpDocumentHandler)
      off(scrollbar.current, 'mousemove', mouseMoveScrollbarHandler)
      off(scrollbar.current, 'mouseleave', mouseLeaveScrollbarHandler)
    }
  }, [])

  return (
    <Fade
      transitionClass={{
        exiting: 'el-scrollbar-fade-leave-active',
        exited: 'el-scrollbar-fade-enter-from'
      }}
      unmountOnExit
      in={visible}
    >
      <div ref={instance} className={`el-scrollbar__bar is-${bar.key}`} onMouseDown={clickTrackHandler}>
        <div ref={thumb} className="el-scrollbar__thumb" style={thumbStyle} onMouseDown={clickThumbHandler} />
      </div>
    </Fade>
  )
}

Bar.displayName = 'ElBar';
Bar.propTypes = {
  children: PropTypes.node,
  scrollbar: PropTypes.any,
  wrap: PropTypes.any,
  vertical: PropTypes.bool,
  size: PropTypes.string,
  move: PropTypes.number
};

export default Bar;
