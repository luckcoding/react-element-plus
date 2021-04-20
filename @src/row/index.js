import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  tag: PropTypes.elementType,
  gutter: PropTypes.number,
  flex: PropTypes.bool,
  justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  tag: 'div',
  justify: 'start',
  align: 'top',
  flex: false,
};

export const RowContext = createContext('Row');

const Row = ({
  tag: Tag,
  justify,
  align,
  flex,
  style = {},
  gutter,
  className,
  children,
}) => {
  if (gutter) {
    style.marginLeft = `-${gutter / 2}px`;
    style.marginRight = style.marginLeft;
  }

  const classes = classnames(
    'cr-row',
    flex && [
      'cr-row--flex',
      (justify !== 'start') && `is-justify-${justify}`,
      (align !== 'top') && `is-align-${align}`,
    ],
    className,
  );

  return (
    <RowContext.Provider value={{ gutter }}>
      <Tag className={classes} style={style}>
        {children}
      </Tag>
    </RowContext.Provider>
  );
};

Row.displayName = 'Row';
Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
