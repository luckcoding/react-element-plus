import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ElRefForwardingComponent, WithAsProps } from '../_utils/types';

const Shadow = ['always', 'hover', 'never'] as const

export interface CardProps extends WithAsProps {
  header?: React.ReactNode
  bodyStyle?: React.CSSProperties
  shadow?: typeof Shadow[number]
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<CardProps> = {
  header: null,
  bodyStyle: {},
  shadow: 'always',
  as: 'div',
};

const Card: ElRefForwardingComponent<'div', CardProps> = React.forwardRef((props: CardProps, ref) => {
  const {
    as: Component,
    header,
    bodyStyle,
    shadow,
    className,
    children,
    ...rest
  } = props

  const classes = classnames(
    'el-card',
    `is-${shadow}-shadow`,
    className,
  );

  return (
    <Component ref={ref} className={classes} {...rest}>
      {header && <div className="el-card__header">{header}</div>}
      <div className="el-card__body" style={bodyStyle}>
        {children}
      </div>
    </Component>
  );
})

Card.displayName = 'Card';
Card.propTypes = {
  tag: PropTypes.elementType,
  header: PropTypes.node,
  bodyStyle: PropTypes.object,
  shadow: PropTypes.oneOf(Shadow),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Card.defaultProps = defaultProps;

export default Card;
