import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RowContext } from '../row';

const types = PropTypes.oneOfType([PropTypes.number, PropTypes.object]);

const propTypes = {
  tag: PropTypes.elementType,
  span: PropTypes.number,
  offset: PropTypes.number,
  pull: PropTypes.number,
  push: PropTypes.number,
  xs: types,
  sm: types,
  md: types,
  lg: types,
  xl: types,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  tag: 'div',
  span: 24,
};

function getSizeClass(size, value) {
  if (typeof value === 'number') {
    return `cr-col-${size}-${value}`;
  } if (size instanceof Object) {
    const classes = [];
    Object.keys(size).forEach((key) => {
      classes.push(
        key === 'span'
          ? `cr-col-${size}-${size[key]}`
          : `cr-col-${size}-${key}-${size[key]}`,
      );
    });
    return classes;
  }
  return undefined;
}

class Col extends React.PureComponent {
  render() {
    const {
      tag: Tag,
      span,
      offset,
      pull,
      push,
      xs,
      sm,
      md,
      lg,
      xl,
      style = {},
      className,
      children,
      ...props
    } = this.props;

    const classes = classnames(
      'cr-col',
      span && `cr-col-${span}`,
      offset && `cr-col-offset-${offset}`,
      pull && `cr-col-pull-${pull}`,
      push && `cr-col-push-${push}`,
      getSizeClass(xs),
      getSizeClass(sm),
      getSizeClass(md),
      getSizeClass(lg),
      getSizeClass(xl),
      className,
    );

    const { gutter = 0 } = this.context;

    if (gutter) {
      style.paddingLeft = `${gutter / 2}px`;
      style.paddingRight = style.paddingLeft;
    }

    return (
      <Tag {...props} className={classes} style={style}>
        {children}
      </Tag>
    );
  }
}


Col.displayName = 'Col';
Col.contextType = RowContext;
Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
