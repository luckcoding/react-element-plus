import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Placement = ['top', 'bottom'] as const
const Type = ['primary', 'success', 'warning', 'info', 'danger'] as const
const Size = ['normal', 'large'] as const

export interface TimelineItemProps extends React.HTMLAttributes<HTMLElement> {
  timestamp?: string
  hideTimestamp?: boolean
  placement?: typeof Placement[number]
  type?: typeof Type[number]
  color?: string
  size?: typeof Size[number]
  icon?: string
  dot?: React.ReactNode
}

const defaultProps: Partial<TimelineItemProps> = {
  placement: 'bottom',
  size: 'normal',
};

const TimelineItem: React.FC<TimelineItemProps> = (props) => {
  const { dot, size, type, color, icon, hideTimestamp, placement, timestamp, children } = props
  const dotClasses = classnames(
    'el-timeline-item__node',
    `el-timeline-item__node--${size}`,
    type && `el-timeline-item__node--${type}`
  )
  return (
    <li className="el-timeline-item">
      <div className="el-timeline-item__tail" />
      {dot ? (
        <div className="el-timeline-item__dot">
          {dot}
        </div>
      ) : (
        <div className={dotClasses} style={{ backgroundColor: color }}>
          {icon && <i className={`el-timeline-item__icon ${icon}`} />}
        </div>
      )}

      <div className="el-timeline-item__wrapper">
        {!hideTimestamp && placement === 'top' && (
          <div className="el-timeline-item__timestamp is-top">
            {timestamp}
          </div>
        )}
        <div className="el-timeline-item__content">
          {children}
        </div>
        {!hideTimestamp && placement === 'bottom' && (
          <div className="el-timeline-item__timestamp is-bottom">
            {timestamp}
          </div>
        )}
      </div>
    </li>
  )
}

TimelineItem.displayName = 'ElDivider';
TimelineItem.defaultProps = defaultProps;
TimelineItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  timestamp: PropTypes.string,
  hideTimestamp: PropTypes.bool,
  placement: PropTypes.oneOf(Placement),
  type: PropTypes.oneOf(Type),
  color: PropTypes.string,
  size: PropTypes.oneOf(Size),
  icon: PropTypes.string,
  dot:PropTypes.node,
};

export default TimelineItem;
