import React, { useEffect, useMemo, useRef, useState, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useCallback } from 'react';
import Fade from '../Fade';
import { isFirefox, rafThrottle } from '../_utils/util';
import { EVENT_CODE } from '../_utils/aria';
import { off, on } from '../_utils/dom';
import { useMultipleRef, useStyle, useWatch } from '../_utils';

export interface ImageViewerProps extends React.HTMLAttributes<HTMLElement> {
  urlList?: string[]
  zIndex?: number
  initialIndex?: number
  infinite?: boolean
  hideOnClickModal?: boolean
  onClose?: () => void
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<ImageViewerProps> = {
  urlList: [],
  zIndex: 2000,
  initialIndex: 0,
  infinite: true,
};

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen',
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original',
  },
}

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'
// const CLOSE_EVENT = 'close'
// const SWITCH_EVENT = 'switch'
export type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clocelise' | 'anticlocelise'

const ImageViewer: React.FC<ImageViewerProps> = (props) => {
  const {
    urlList,
    zIndex,
    initialIndex,
    infinite,
    hideOnClickModal,
    onClose: onCloseProp,
    style = {},
    className,
    children,
    ...rest
  } = props

  const [display, setDisplay] = useState(true)

  const onClose = useCallback(() => {
    setDisplay(false)
  }, [])

  const state = useMemo(() => ({
    loading: true,
    _keyDownHandler: null,
    _mouseWheelHandler: null,
    _dragHandler: null,
  }), [])
  const [index, setIndex] = useState(initialIndex)
  const wrapper = useRef<HTMLDivElement>()
  // const img = useRef<HTMLImageElement>()
  const imgRefs = useMultipleRef<HTMLImageElement>(urlList.length)
  const [mode, setMode] = useState(Mode.CONTAIN)

  const isSingle = useMemo(() => urlList.length <= 1, [urlList.length])

  const isFirst = useMemo(() => index === 0, [index])

  const isLast = useMemo(() => index === urlList.length - 1, [index, urlList.length])

  const currentImg = useMemo(() => urlList[index], [urlList, index])

  const [transform, imgStyle, updateStyle] = useStyle(imgRefs[index], {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  }, ({ scale, deg, offsetX, offsetY, enableTransition }) => {
    const style = {
      transform: `scale(${scale}) rotate(${deg}deg)`,
      transition: enableTransition ? 'transform .3s' : '',
      marginLeft: `${offsetX}px`,
      marginTop: `${offsetY}px`,
    } as CSSProperties
    if (mode.name === Mode.CONTAIN.name) {
      style.maxWidth = style.maxHeight = '100%'
    }
    return style
  }, [])

  // const imgStyle = useMemo<CSSProperties>(() => {
  //   const { scale, deg, offsetX, offsetY, enableTransition } = transform
  //   const style = {
  //     transform: `scale(${scale}) rotate(${deg}deg)`,
  //     transition: enableTransition ? 'transform .3s' : '',
  //     marginLeft: `${offsetX}px`,
  //     marginTop: `${offsetY}px`,
  //   } as CSSProperties
  //   if (mode.name === Mode.CONTAIN.name) {
  //     style.maxWidth = style.maxHeight = '100%'
  //   }
  //   return style
  // }, [transform, mode.name])

  function hide() {
    deviceSupportUninstall()
    onClose()
    // emit(CLOSE_EVENT)
  }

  const reset = useCallback(() => {
    transform.scale = 1
    transform.deg = 0
    transform.offsetX = 0
    transform.offsetY = 0
    transform.enableTransition = false
    updateStyle()
  }, [])

  const toggleMode = useCallback(() => {
    if (state.loading) return

    const modeNames = Object.keys(Mode)
    const modeValues = Object.values(Mode)
    const currentMode = mode.name
    const index = modeValues.findIndex(i => i.name === currentMode)
    const nextIndex = (index + 1) % modeNames.length
    setMode(Mode[modeNames[nextIndex]])
    reset()
  }, [state.loading, mode])

  const prev = useCallback(() => {
    if (isFirst && !infinite) return
    const len = props.urlList.length
    setIndex((index - 1 + len) % len)
  }, [isFirst, infinite, index])

  const next = useCallback(() => {
    if (isLast && !infinite) return
    const len = props.urlList.length
    setIndex((index + 1) % len)
  }, [isLast, infinite, index])

  const handleActions = useCallback((action: ImageViewerAction, options = {}) => {
    if (state.loading) return
    const opts = {
      zoomRate: 0.2,
      rotateDeg: 90,
      enableTransition: true,
      ...options,
    }
    const { zoomRate, rotateDeg, enableTransition } = opts
    switch (action) {
      case 'zoomOut':
        if (transform.scale > 0.2) {
          transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
        }
        break
      case 'zoomIn':
        transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
        break
      case 'clocelise':
        transform.deg += rotateDeg
        break
      case 'anticlocelise':
        transform.deg -= rotateDeg
        break
    }
    transform.enableTransition = enableTransition
    updateStyle()
  }, [state.loading, transform, imgRefs[index]])

  const deviceSupportInstall = () => {
    state._keyDownHandler = rafThrottle((e: KeyboardEvent) => {
      switch (e.code) {
        // ESC
        case EVENT_CODE.esc:
          hide()
          break
        // SPACE
        case EVENT_CODE.space:
          toggleMode()
          break
        // LEFT_ARROW
        case EVENT_CODE.left:
          prev()
          break
        // UP_ARROW
        case EVENT_CODE.up:
          handleActions('zoomIn')
          break
        // RIGHT_ARROW
        case EVENT_CODE.right:
          next()
          break
        // DOWN_ARROW
        case EVENT_CODE.down:
          handleActions('zoomOut')
          break
      }
    })

    state._mouseWheelHandler = rafThrottle(e => {
      const delta = e.wheelDelta ? e.wheelDelta : -e.detail
      if (delta > 0) {
        handleActions('zoomIn', {
          zoomRate: 0.015,
          enableTransition: false,
        })
      } else {
        handleActions('zoomOut', {
          zoomRate: 0.015,
          enableTransition: false,
        })
      }
    })

    on(document, 'keydown', state._keyDownHandler)
    on(document, mousewheelEventName, state._mouseWheelHandler)
  }

  function deviceSupportUninstall() {
    off(document, 'keydown', state._keyDownHandler)
    off(document, mousewheelEventName, state._mouseWheelHandler)
    state._keyDownHandler = null
    state._mouseWheelHandler = null
  }

  const handleImgLoad = useCallback(() => {
    state.loading = false
  }, [])

  const handleImgError: React.ReactEventHandler<HTMLImageElement> = useCallback((e) => {
    state.loading = false;
    (e.target as any).alt = 'el.image.error'
  }, [])

  const handleMouseDown: React.MouseEventHandler<HTMLImageElement> = useCallback((e) => {
    if (state.loading || e.button !== 0) return

    const { offsetX, offsetY } = transform
    const startX = e.pageX
    const startY = e.pageY
    state._dragHandler = rafThrottle(ev => {
      transform.offsetX = offsetX + ev.pageX - startX
      transform.offsetY = offsetY + ev.pageY - startY
      updateStyle()
    })
    on(document, 'mousemove', state._dragHandler)
    on(document, 'mouseup', () => {
      off(document, 'mousemove', state._dragHandler)
    })

    e.preventDefault()
  }, [updateStyle])

  useWatch(currentImg, () => {
    setImmediate(() => {
      if (!imgRefs[index].current.complete) {
        state.loading = true
      }
    })
  })

  useWatch(index, (val) => {
    reset()
    // emit(SWITCH_EVENT, val)
  })

  useEffect(() => {
    deviceSupportInstall()
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    wrapper.current?.focus()
  }, [])

  return (
    <Fade
      unmountOnExit
      in={display}
      onExited={onCloseProp}
      transitionClass={{
        exiting: 'el-viewer-fade-leave-active',
        exited: 'el-viewer-fade-enter-from'
      }}
    >
      <div
        ref={wrapper}
        tabIndex={-1}
        className="el-image-viewer__wrapper"
        style={{ zIndex, ...style }}
        {...rest}
      >
        <div
          className="el-image-viewer__mask"
          onClick={() => hideOnClickModal && hide()}
        >
        </div>
        {/* CLOSE */}
        <span className="el-image-viewer__btn el-image-viewer__close" onClick={hide}>
          <i className="el-icon-close" />
        </span>
        {/* ARROW */}
        {!isSingle && (
          <React.Fragment>
            <span
              className={classnames('el-image-viewer__btn el-image-viewer__prev', {
                'is-disabled': !infinite && isFirst
              })}
              onClick={prev}
            >
              <i className="el-icon-arrow-left" />
            </span>
            <span
              className={classnames('el-image-viewer__btn el-image-viewer__next', {
                'is-disabled': !infinite && isLast
              })}
              onClick={next}
            >
              <i className="el-icon-arrow-right" />
            </span>
          </React.Fragment>
        )}
        {/* ACTIONS */}
        <div className="el-image-viewer__btn el-image-viewer__actions">
          <div className="el-image-viewer__actions__inner">
            <i className="el-icon-zoom-out" onClick={() => handleActions('zoomOut')} />
            <i className="el-icon-zoom-in" onClick={() => handleActions('zoomIn')} />
            <i className="el-image-viewer__actions__divider" />
            <i className={mode.icon} onClick={toggleMode} />
            <i className="el-image-viewer__actions__divider" />
            <i className="el-icon-refresh-left" onClick={() => handleActions('anticlocelise')} />
            <i className="el-icon-refresh-right" onClick={() => handleActions('clocelise')} />
          </div>
        </div>
        {/* CANVAS */}
        <div className="el-image-viewer__canvas">
          {urlList.map((url, i) => (
            <img
              ref={imgRefs[i]}
              key={url}
              src={url}
              style={{
                ...imgStyle,
                display: i === index ? 'block' : 'none'
              }}
              className="el-image-viewer__img"
              onLoad={handleImgLoad}
              onError={handleImgError}
              onMouseDown={handleMouseDown}
            />
          ))}
        </div>
      </div>
    </Fade>
  );
}

ImageViewer.displayName = 'ElImageViewer';
ImageViewer.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
ImageViewer.defaultProps = defaultProps;

export default ImageViewer;
