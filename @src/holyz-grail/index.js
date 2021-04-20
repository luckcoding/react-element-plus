import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

let refCounter = 0;

const propTypes = {
  // spacing each part
  spacing: PropTypes.number,

  // css media
  dismiss: PropTypes.number,
  dismissOrders: PropTypes.array,

  // node
  leftNode: PropTypes.node,
  leftWidth: PropTypes.number,
  rightNode: PropTypes.node,
  rightWidth: PropTypes.number,

  // self
  className: PropTypes.string,
  children: PropTypes.node, // main node
};

const defaultProps = {
  spacing: 0,
  dismiss: 800,
  leftWidth: 0,
  rightWidth: 0,
  dismissOrders: ['left', 'main', 'right'],
};

const HolyzGrail = React.forwardRef(({
  spacing,

  dismiss,
  dismissOrders,

  leftNode,
  leftWidth,
  rightNode,
  rightWidth,
  children,

  className,
  ...props
}, ref) => {
  const rootName = `cr-holy-grail-ref${refCounter++}`;
  const classes = classnames(rootName, '_fix', className);

  // sort
  const leftOrder = dismissOrders.indexOf('left');
  const mainOrder = dismissOrders.indexOf('main');
  const rightOrder = dismissOrders.indexOf('right');

  // has node count
  const nodesCount = (children ? 1 : 0)
    + (leftNode ? 1 : 0)
    + (rightNode ? 1 : 0);

  function hasSpacing(order) {
    return order !== -1 && (order < nodesCount - 1);
  }

  // ref
  if (ref) props.ref = ref;

  return (
    <div className={classes} {...props}>
      <style jxs="true">
        {`
        .${rootName} .cr-holy-grail__main,
        .${rootName} .cr-holy-grail__left,
        .${rootName} .cr-holy-grail__right {
          float: left;
        }

        .${rootName} .cr-holy-grail__left {
          margin-left: -100%;
        }

        .${rootName} .cr-holy-grail__main {
          width: 100%;
        }

        .${rootName} .cr-holy-grail__left {
          width: ${leftWidth || 0}px;
        }
        .${rootName} .cr-holy-grail__main {
          padding-left: ${leftWidth ? leftWidth + spacing : 0}px;
          padding-right: ${rightWidth ? rightWidth + spacing : 0}px;
        }
        .${rootName} .cr-holy-grail__right {
          width: ${rightWidth}px;
          margin-left: -${rightWidth}px;
        }

        @media (max-width: ${dismiss}px) {
          .${rootName} {
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          .${rootName} .cr-holy-grail__main,
          .${rootName} .cr-holy-grail__left,
          .${rootName} .cr-holy-grail__right {
            float: none;
          }

          .${rootName} .cr-holy-grail__left {
            width: 100%;
            margin-left: 0;
            order: ${leftOrder};
            margin-bottom: ${hasSpacing(leftOrder) ? spacing : 0}px;
          }

          .${rootName} .cr-holy-grail__main {
            padding-left: 0;
            padding-right: 0;
            order: ${mainOrder};
            margin-bottom: ${hasSpacing(mainOrder) ? spacing : 0}px;
          }

          .${rootName} .cr-holy-grail__right {
            width: 100%;
            margin-left: 0;
            order: ${rightOrder};
            margin-bottom: ${hasSpacing(rightOrder) ? spacing : 0}px;
          }
        }
      `}
      </style>
      <div className="cr-holy-grail__main">{children}</div>
      {leftNode && (
        <div className="cr-holy-grail__left">{leftNode}</div>
      )}
      {rightNode && (
        <div className="cr-holy-grail__right">{rightNode}</div>
      )}
    </div>
  );
});

HolyzGrail.displayName = 'HolyzGrail';
HolyzGrail.propTypes = propTypes;
HolyzGrail.defaultProps = defaultProps;

export default HolyzGrail;
