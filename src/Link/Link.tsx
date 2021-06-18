import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon, { IconName, IconList } from '../Icon/Icon';
import { useCallback } from 'react';

const LinkType = ['primary', 'success', 'warning', 'info', 'danger', 'default'] as const

type ILinkType = typeof LinkType[number]

export interface LinkProps extends React.HTMLAttributes<HTMLElement> {
  type?: ILinkType
  underline?: boolean
  disabled?: boolean
  href?: string
  icon?: IconName
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<LinkProps> = {
  type: 'default',
  underline: true,
};

const Link: React.FC<LinkProps> = (props) => {
  const {
    type,
    disabled,
    underline,
    icon,
    className,
    children,
    ...rest
  } = props

  const classes = classnames(
    'el-link',
    `el-link--${type}`,
    disabled && 'is-disabled',
    underline && !disabled && 'is-underline',
    className,
  );

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    !disabled && props.onClick?.(e)
  }, [disabled, props.onClick])

  return (
    <a className={classes} {...rest} onClick={handleClick}>
      {icon && <Icon name={icon} />}
      {children && (
        <span className="el-link--inner">
          {children}
        </span>
      )}
    </a>
  );
}

Link.displayName = 'Link';
Link.propTypes = {
  type: PropTypes.oneOf(LinkType),
  underline: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.oneOf(IconList),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Link.defaultProps = defaultProps;

export default Link;
