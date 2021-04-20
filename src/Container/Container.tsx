import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  direction?: 'vertical' | 'horizontal'
}

const Container: React.FC<ContainerProps> = ({
  direction,
  className,
  children,
  ...props
}) => {
  const isVertical = useMemo(() => {
    if (direction === 'vertical') {
      return true;
    } if (direction === 'horizontal') {
      return false;
    }

    return React.Children.toArray(children).some((vnode) => {
      const tag = (vnode as any)?.type?.displayName
      return tag === 'Header' || tag === 'Footer';
    });
  }, [direction]);

  const classes = classnames(
    'el-container',
    isVertical && 'is-vertical',
    className,
  );

  return (
    <section
      {...props}
      className={classes}
    >
      {children}
    </section>
  );
};

Container.displayName = 'Container';
Container.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Container;
