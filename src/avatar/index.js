import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['large', 'medium', 'small']),
    PropTypes.number,
  ]),
  shape: PropTypes.oneOf(['circle', 'square']),
  icon: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  srcSet: PropTypes.string,
  error: PropTypes.func,
  fit: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  shape: 'circle',
  fit: 'cover',
};

class Avatar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isImageExist: true,
    };
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    const { error } = this.props;
    const errorFlag = error ? error() : undefined;
    if (errorFlag !== false) {
      this.setState({ isImageExist: false });
    }
  }

  render() {
    const {
      size,
      icon,
      shape,

      src,
      alt,
      srcSet,
      fit,

      style,
      className,
      children,
    } = this.props;

    const { isImageExist } = this.state;

    const classes = classnames(
      'cr-avatar',
      size && typeof size === 'string' && `cr-avatar--${size}`,
      icon && 'cr-avatar--icon',
      `cr-avatar--${shape}`,
      className,
    );

    let defStyle = style || {};

    if (typeof size === 'number') {
      defStyle = {
        ...style,
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`,
      };
    }

    return (
      <span style={defStyle} className={classes}>
        {(isImageExist && src) ? (
          <img
            src={src}
            onError={this.handleError}
            alt={alt}
            srcSet={srcSet}
            style={{ objectFit: fit }}
          />
        ) : (
          <React.Fragment>
            {icon && <i className={icon} />}
            {children}
          </React.Fragment>
        )}
      </span>
    );
  }
}

Avatar.displayName = 'Avatar';
Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
