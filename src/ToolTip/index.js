import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tooltipScss } from '../styles';

const ToolTip = ({ title, children, ...props }) => {
  const child = Children.only(children);

  const classes = classnames(
    tooltipScss(),
    child.props.className,
  );
  return (
    <React.Fragment>
      {React.cloneElement(child, {
        ...props,
        className: classes,
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
