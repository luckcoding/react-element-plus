import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { splitLineScss } from '../styles';

const propTypes = {
  color: PropTypes.string,
  lineColor: PropTypes.string,
  spacing: PropTypes.number,

  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  color: '#989aa2',
  lineColor: '#f4f5f8',
  spacing: 20,
};

function SplitLine({
  color,
  lineColor,
  spacing,
  className,
  children,
  ...props
}) {
  return (
    <React.Fragment>
      <style>
        {`
        .pure-split-line {
          color: ${color};
        }
        .pure-split-line:after {
          margin-left: ${spacing}px;
        }
        .pure-split-line:before {
          margin-right: ${spacing}px;
        }
        .pure-split-line:after,
        .pure-split-line:before {
          background: ${lineColor};
        }
      `}
      </style>
      <div className={classnames(splitLineScss(), className)} {...props}>
        {children}
      </div>
    </React.Fragment>
  );
}

SplitLine.displayName = 'SplitLine';
SplitLine.propTypes = propTypes;
SplitLine.defaultProps = defaultProps;

export default SplitLine;
