import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ElRefForwardingComponent, WithAsProps } from '../_utils/types';
import { COMPONENT_SIZE, COMPONENT_STATUS } from '../_utils/constants';
import { useGlobalConfig } from '../_utils/util';
import { useMemo } from 'react';

const Effect = ['dark', 'light', 'plain'] as const

export interface TagProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  closable?: boolean
  type?: ComponentStatus
  hit?: boolean
  disableTransitions?: boolean
  color?: string
  size: ComponentSize
  effect?: typeof Effect[number]
  onClose?: React.MouseEventHandler
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<TagProps> = {
  as: 'span',
  effect: 'light',
};

const Tag: ElRefForwardingComponent<'span', TagProps> = React.forwardRef((props: TagProps, ref) => {
  const {
    as: Component,
    closable,
    size,
    type,
    effect,
    hit,
    disableTransitions,
    color,
    onClose,
    className,
    children,
    style = {},
    ...rest
  } = props

  const globalConfig = useGlobalConfig()

  const tagSize = useMemo(() => (size || globalConfig.size), [size, globalConfig.size])

  const classes = classnames(
    'el-tag',
    type ? `el-tag--${type}` : '',
    tagSize ? `el-tag--${tagSize}` : '',
    effect ? `el-tag--${effect}` : '',
    hit && 'is-hit',
    className,
  );

  const handleClose: React.MouseEventHandler = (event) => {
    event.stopPropagation()
    onClose?.(event)
  }

  return disableTransitions ? (
    null
  ) : (
    <Component ref={ref} className={classes} style={{ backgroundColor: color, ...style }} {...rest}>
      {children}
      {closable && <i className="el-tag__close el-icon-close" onClick={handleClose} />}
    </Component>
  );
})

Tag.displayName = 'Tag';
Tag.propTypes = {
  closable: PropTypes.bool,
  type: PropTypes.oneOf(COMPONENT_STATUS),
  hit: PropTypes.bool,
  disableTransitions: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOf(COMPONENT_SIZE),
  effect: PropTypes.oneOf(Effect),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Tag.defaultProps = defaultProps;

export default Tag;
