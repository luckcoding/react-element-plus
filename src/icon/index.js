import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const links = {};

function inject(url) {
  if (typeof window !== 'undefined') {
    if (url && !links[url]) {
      links[url] = true;
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
    return true;
  }
  return false;
}

export default (url, fontFamily = 'iconfont', prefix = 'cr-icon') => {
  const injected = inject(url);

  class IconWrapper extends React.PureComponent {
    componentDidMount() {
      if (!injected) {
        inject(url);
      }
    }

    render() {
      const {
        name,
        fontSize,
        className,
        children,
        ...props
      } = this.props;

      const classes = classnames(
        'cr-icon',
        `${prefix}-${name}`,
        className,
      );

      const style = Object.assign({}, {
        fontFamily,
        fontSize,
      }, this.props.style);

      return (
        <i {...props} className={classes} style={style}>
          {children}
        </i>
      );
    }
  }

  IconWrapper.propTypes = {
    name: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
  };

  return IconWrapper;
};
