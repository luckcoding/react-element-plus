import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  direction: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

const Container = ({
  direction,
  className,
  children,
  ...props
}) => {
  const isVertical = () => {
    if (direction === 'vertical') {
      return true;
    } if (direction === 'horizontal') {
      return false;
    }

    return React.Children.toArray(children).some((vnode) => {
      const tag = vnode.type && vnode.type.displayName;
      return tag === 'Header' || tag === 'Footer';
    });
  };

  const classes = classnames(
    'cr-container',
    isVertical() && 'is-vertical',
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
Container.propTypes = propTypes;

export default Container;
