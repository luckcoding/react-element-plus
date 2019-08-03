import React, { Children } from 'react';
import PropTypes from 'prop-types';
import './tooltip.scss';

const ToolTip = ({ title, children, ...props }) => {
  const child = Children.only(children);
  const className = `${child.props.className || ''} pure-tooltip`.trim();
  return (
    <React.Fragment>
      {React.cloneElement(child, {
        ...props,
        className,
        children: [
          ...child.props.children,
          <div className="_tip" key="tip">{title}</div>,
        ],
      })}
    </React.Fragment>
  );
};

ToolTip.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default ToolTip;
