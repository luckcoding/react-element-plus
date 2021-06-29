import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export type TimelineProps = React.HTMLAttributes<HTMLElement>

const Timeline: React.FC<TimelineProps> = ({ className, children, ...props }) => {
  const classes = classnames(
    'el-timeline',
    className,
  )
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

Timeline.displayName = 'ElTimeline';
Timeline.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Timeline;
