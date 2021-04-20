import React, { useEffect } from 'react';
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

  const Icon = ({
    name,
    fontSize,
    className,
    children,
    style = {},
    ...props
  }) => {
    const classes = classnames(
      'cr-icon',
      `${prefix}-${name}`,
      className,
    );

    style.fontFamily = fontFamily;
    style.fontSize = fontSize;

    useEffect(() => {
      if (!injected) inject(url);
    }, []);

    return (
      <i {...props} className={classes} style={style}>
        {children}
      </i>
    );
  };

  Icon.propTypes = {
    name: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
  };

  return Icon;
};
