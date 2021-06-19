import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { COMPONENT_SIZE } from '../_utils/constants';

export interface AvatarProps {
  size?: ComponentSize
  shape?: 'circle' | 'square'
  icon?: string
  src?: string
  alt?: string
  srcSet?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => any
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(COMPONENT_SIZE),
    PropTypes.number,
  ]),
  shape: PropTypes.oneOf(['circle', 'square']),
  icon: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  srcSet: PropTypes.string,
  onError: PropTypes.func,
  fit: PropTypes.oneOf(['fill', 'contain', 'cover', 'none', 'scale-down']),

  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps: Partial<AvatarProps> = {
  shape: 'circle',
  fit: 'cover',
};

const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    size,
    icon,
    shape,
    src,
    alt,
    srcSet,
    fit,
    onError,

    style,
    className,
    children,
  } = props

  const [isImageExist, setIsImageExist] = useState(true)

  const handleError: React.ReactEventHandler<HTMLImageElement> = useCallback((e) => {

    const errorFlag = onError ? onError(e) : undefined;
    if (errorFlag !== false) {
      setIsImageExist(false);
    }
  }, [])

  const classes = classnames(
    'el-avatar',
    size && typeof size === 'string' && `el-avatar--${size}`,
    icon && 'el-avatar--icon',
    `el-avatar--${shape}`,
    className,
  );

  const outerStyle = style || {};

  if (typeof size === 'number') {
    outerStyle.height = `${size}px`
    outerStyle.width = `${size}px`
    outerStyle.lineHeight = `${size}px`
  }

  return (
    <span style={outerStyle} className={classes}>
      {((src || srcSet) && isImageExist) ? (
        <img
          src={src}
          onError={handleError}
          alt={alt}
          srcSet={srcSet}
          style={{ objectFit: fit }}
        />
      ) : (
        icon ? <i className={icon} /> : children
      )}
    </span>
  )
}

Avatar.displayName = 'Avatar';
Avatar.propTypes = propTypes as any;
Avatar.defaultProps = defaultProps;

export default Avatar;
