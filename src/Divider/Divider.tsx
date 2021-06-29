import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Direction = ['horizontal', 'vertical'] as const
const ContentPosition = ['left', 'center', 'right'] as const

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  direction?: typeof Direction[number]
  contentPosition?: typeof ContentPosition[number]
}

const defaultProps: Partial<DividerProps> = {
  direction: 'horizontal',
  contentPosition: 'center'
};

const Divider: React.FC<DividerProps> = (props) => {
  const { direction, contentPosition, className, children, ...rest } = props
  const classes = classnames(
    'el-divider',
    `el-divider--${direction}`,
    className,
  )
  return (
    <div className={classes} {...rest}>
      {children && (direction !== 'vertical' && (
        <div className={`el-divider__text is-${contentPosition}`}>{children}</div>
      ))}
    </div>
  )
}

Divider.displayName = 'ElDivider';
Divider.defaultProps = defaultProps;
Divider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  direction: PropTypes.oneOf(Direction),
  contentPosition: PropTypes.oneOf(ContentPosition),
};

export default Divider;
