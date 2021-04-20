import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Arrow = ({ href, disabled, children }) => (
  <a className={`${disabled ? '_disabled' : ''}`} href={href}>{children}</a>
);

const Item = ({ page, href, active }) => (
  <a className={classnames('_item', { _active: active })} href={href}>
    {page}
  </a>
);

const Ellipsis = () => (
  <div className="link">...</div>
);

Arrow.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
Item.propTypes = {
  page: PropTypes.number,
  href: PropTypes.string,
  active: PropTypes.bool,
};

export { Arrow };
export { Item };
export { Ellipsis };
