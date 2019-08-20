import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isNumber, isJson } from '@crude/extras';
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
  if (isNumber(value)) {
    return `cr-col-${size}-${value}`;
  } if (isJson(size)) {
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
      isNumber(span) && `cr-col-${span}`,
      isNumber(offset) && `cr-col-offset-${span}`,
      isNumber(pull) && `cr-col-pull-${span}`,
      isNumber(push) && `cr-col-push-${span}`,
      getSizeClass(xs),
      getSizeClass(sm),
      getSizeClass(md),
      getSizeClass(lg),
      getSizeClass(xl),
      className,
    );

    const { gutter } = this.context;

    if (gutter) {
      const paddingLeft = `${gutter / 2}px`;
      Object.assign(style, {
        paddingLeft,
        paddingRight: paddingLeft,
      });
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
