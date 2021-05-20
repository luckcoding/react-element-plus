import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ElRefForwardingComponent, WithAsProps } from '../_utils/types';

export interface RowProps extends WithAsProps {
  gutter?: number;
  type?: 'flex'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'top' | 'middle' | 'bottom'
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<RowProps> = {
  as: 'div',
  gutter: 0,
  justify: 'start',
  align: 'top',
};

export const RowContext = createContext<{ gutter: number }>({} as any);

const Row: ElRefForwardingComponent<'div', RowProps> = React.forwardRef((props: RowProps, ref) => {
  const {
    as: Component,
    justify,
    align,
    type,
    style = {},
    gutter,
    className,
    children,
  } = props

  if (gutter) {
    style.marginLeft = `-${gutter / 2}px`;
    style.marginRight = style.marginLeft;
  }

  const classes = classnames(
    'el-row',
    justify !== 'start' ? `is-justify-${props.justify}` : '',
    align !== 'top' ? `is-align-${props.align}` : '',
    type === 'flex' ? 'el-row--flex' : '',
    className,
  );

  return (
    <RowContext.Provider value={{ gutter }}>
      <Component ref={ref} className={classes} style={style}>
        {children}
      </Component>
    </RowContext.Provider>
  );
})

Row.displayName = 'Row';
Row.propTypes = {
  gutter: PropTypes.number,
  flex: PropTypes.bool,
  justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Row.defaultProps = defaultProps;

export default Row;
