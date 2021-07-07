import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useCallback } from 'react';
import { isServer, useWatch } from '../_utils';
import { getScrollContainer, isInContainer, off, on } from '../_utils/dom';
import { throttle } from 'lodash';
import Portal from '../_utils/portal';
import ImageViewer from '../ImageViewer';

const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined
const isHtmlEle = e => e && e.nodeType === 1

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down',
}

let prevOverflow = ''

export interface ImageProps extends Omit<React.HTMLAttributes<HTMLImageElement>, 'placeholder'> {
  appendToBody?: boolean
  hideOnClickModal?: boolean
  src?: string
  fit?: string
  lazy?: boolean
  placeholder?: React.ReactNode
  error?: React.ReactNode
  scrollContainer?: string | React.MutableRefObject<HTMLElement>
  previewSrcList?: string[]
  zIndex?: number
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<ImageProps> = {
  previewSrcList: [],
  zIndex: 2000,
};

const IImage: React.FC<ImageProps> = (props) => {
  const {
    fit,
    previewSrcList,
    src,
    placeholder,
    error,
    scrollContainer,
    lazy,
    zIndex,
    hideOnClickModal,
    className,
    children,
    style = {},
    ...rest
  } = props
  const [hasLoadError, setHasLoadError] = useState(false)
  const [loading, setLoading] = useState(true)
  const state = useMemo(() => ({
    imgWidth: 0,
    imgHeight: 0,
    _scrollContainer: null,
    _lazyLoadHandler: null,
  }), [])
  const [showViewer, setShowViewer] = useState(false)
  const container = useRef<HTMLDivElement>()
  const imgRef = useRef<HTMLImageElement>()

  const imageStyle = useMemo<CSSProperties>(() => {
    if (!isServer && fit) {
      return isSupportObjectFit()
        ? { objectFit: fit } as CSSProperties
        : getImageStyle(fit)
    }
    return {}
  }, [fit])

  const alignCenter = useMemo(() => {
    return !isServer && !isSupportObjectFit() && fit !== ObjectFit.FILL
  }, [fit])

  const preview = useMemo(() => {
    return Array.isArray(previewSrcList) && previewSrcList.length > 0
  }, [previewSrcList.length])

  const imageIndex = useMemo(() => {
    let previewIndex = 0
    const srcIndex = previewSrcList.indexOf(src)
    if (srcIndex >= 0) {
      previewIndex = srcIndex
    }
    return previewIndex
  }, [previewSrcList, src])

  function getImageStyle(fit: string): CSSProperties {
    const imageWidth = state.imgWidth
    const imageHeight = state.imgHeight

    if (!container.current) return {}
    const {
      clientWidth: containerWidth,
      clientHeight: containerHeight,
    } = container.current
    if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {}

    const imageAspectRatio = imageWidth / imageHeight
    const containerAspectRatio = containerWidth / containerHeight

    if (fit === ObjectFit.SCALE_DOWN) {
      const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight
      fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
    }

    switch (fit) {
      case ObjectFit.NONE:
        return { width: 'auto', height: 'auto' }
      case ObjectFit.CONTAIN:
        return (imageAspectRatio < containerAspectRatio) ? { width: 'auto' } : { height: 'auto' }
      case ObjectFit.COVER:
        return (imageAspectRatio < containerAspectRatio) ? { height: 'auto' } : { width: 'auto' }
      default:
        return {}
    }
  }

  const loadImage = () => {
    if (isServer) return

    const attributes = imgRef.current?.attributes || []

    // reset status
    setLoading(true)
    setHasLoadError(false)

    const img = new Image()
    img.onload = e => handleLoad(e, img)
    img.onerror = handleError

    // bind html attrs
    // so it can behave consistently
    Object.keys(attributes)
      .forEach(key => {
        // avoid onload to be overwritten
        if (key.toLowerCase() === 'onload') return
        const value = attributes[key]
        img.setAttribute(key, value)
      })
    img.src = props.src
  }

  const handleLoad = useCallback((_e: Event, img: HTMLImageElement) => {
    state.imgWidth = img.width
    state.imgHeight = img.height
    setLoading(false)
    setHasLoadError(false)
  }, [])

  const handleError = useCallback((_e: Event) => {
    setLoading(false)
    setHasLoadError(true)
    // emit('error', e)
  }, [])

  function handleLazyLoad() {
    if (isInContainer(container.current, state._scrollContainer)) {
      loadImage()
      removeLazyLoadListener()
    }
  }

  function addLazyLoadListener() {
    if (isServer) return

    const { scrollContainer } = props
    if (isHtmlEle(scrollContainer)) {
      state._scrollContainer = scrollContainer
    } else if (typeof scrollContainer === 'string' && scrollContainer !== '') {
      state._scrollContainer = document.querySelector(scrollContainer)
    } else {
      state._scrollContainer = getScrollContainer(container.current)
    }
    if (state._scrollContainer) {
      state._lazyLoadHandler = throttle(handleLazyLoad, 200)
      on(state._scrollContainer, 'scroll', state._lazyLoadHandler)
      setTimeout(() => handleLazyLoad(), 100)
    }
  }

  function removeLazyLoadListener() {
    if (isServer || !state._scrollContainer || !state._lazyLoadHandler) return

    off(state._scrollContainer, 'scroll', state._lazyLoadHandler)
    state._scrollContainer = null
    state._lazyLoadHandler = null
  }

  const clickHandler = useCallback(() => {
    // don't show viewer when preview is false
    if (!preview) {
      return
    }
    // prevent body scroll
    prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setShowViewer(true)
  }, [preview])

  const closeViewer = useCallback(() => {
    document.body.style.overflow = prevOverflow
    setShowViewer(false)
  }, [])

  useWatch(props.src, () => {
    loadImage()
  })

  useEffect(() => {
    if (lazy) {
      setImmediate(addLazyLoadListener)
    } else {
      loadImage()
    }

    return () => {
      lazy && removeLazyLoadListener()
    }
  }, [lazy])

  const classes = classnames('el-image', className)

  const imgClasses = classnames('el-image__inner', {
    'el-image__inner--center': alignCenter,
    'el-image__preview': preview
  })

  const renderMain = () => {
    if (loading) {
      return placeholder || <div className="el-image__placeholder" />
    } else if (hasLoadError) {
      return error || <div className="el-image__error">{'el.image.error'}</div>
    } else {
      return (
        <img
          ref={imgRef}
          className={imgClasses}
          src={src}
          onClick={clickHandler}
          style={imageStyle}
          {...rest}
        />
      )
    }
  }

  return (
    <div
      ref={container}
      className={classes}
      style={style}
    >
      {renderMain()}
      {preview && (
        <Portal>
          {showViewer ? (
            <ImageViewer
              zIndex={zIndex}
              initialIndex={imageIndex}
              urlList={previewSrcList}
              hideOnClickModal={hideOnClickModal}
              onClose={closeViewer}
            />
          ) : null}
        </Portal>
      )}
    </div>
  );
}

IImage.displayName = 'ElImage';
IImage.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
IImage.defaultProps = defaultProps;

export default IImage;
