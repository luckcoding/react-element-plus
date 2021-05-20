import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RowContext } from '../Row/Row';
import { ElRefForwardingComponent, WithAsProps } from '../_utils/types';

type SizeObject = {
  span: number
  offset: number
}

export interface ColProps extends WithAsProps {
  span?: number
  offset?: number
  pull?: number
  push?: number
  xs?: number | SizeObject
  sm?: number | SizeObject
  md?: number | SizeObject
  lg?: number | SizeObject
  xl?: number | SizeObject
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<ColProps> = {
  as: 'div',
  span: 24,
  offset: 0,
  pull: 0,
  push: 0,
};

const Col: ElRefForwardingComponent<'div', ColProps> = React.forwardRef((props: ColProps, ref) => {
  const {
    as: Component,
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
    ...rest
  } = props

  const { gutter = 0 } = useContext(RowContext);

  if (gutter) {
    style.paddingLeft = `${gutter / 2}px`;
    style.paddingRight = style.paddingLeft;
  }

  const classList = () => {
    const ret: string[] = []
    const pos = ['span', 'offset', 'pull', 'push'] as const
    pos.forEach(prop => {
      const size = props[prop]
      if (typeof size === 'number' && size > 0) {
        ret.push(prop !== 'span' ? `el-col-${prop}-${props[prop]}` : `el-col-${props[prop]}`)
      }
    })
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    sizes.forEach(size => {
      if (typeof props[size] === 'number') {
        ret.push(`el-col-${size}-${props[size]}`)
      } else if (typeof props[size] === 'object') {
        const sizeProps = props[size]
        Object.keys(sizeProps).forEach(prop => {
          ret.push(
            prop !== 'span' ? `el-col-${size}-${prop}-${sizeProps[prop]}` : `el-col-${size}-${sizeProps[prop]}`,
          )
        })
      }
    })
    // this is for the fix
    if (gutter) {
      ret.push('is-guttered')
    }

    return ret
  }

  const classes = classnames(
    'el-col',
    classList(),
    className,
  );

  return (
    <Component ref={ref} {...rest} className={classes} style={style}>
      {children}
    </Component>
  );
})

const MediaType = PropTypes.oneOfType([PropTypes.number, PropTypes.object]);

Col.displayName = 'Col';
Col.propTypes = {
  tag: PropTypes.elementType,
  span: PropTypes.number,
  offset: PropTypes.number,
  pull: PropTypes.number,
  push: PropTypes.number,
  xs: MediaType,
  sm: MediaType,
  md: MediaType,
  lg: MediaType,
  xl: MediaType,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Col.defaultProps = defaultProps;

export default Col;
