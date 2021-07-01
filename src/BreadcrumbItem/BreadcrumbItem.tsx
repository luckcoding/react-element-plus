import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useBreadcrumb } from '../Breadcrumb/hooks';

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLElement> {
  isLink?: boolean
  link?: React.MutableRefObject<HTMLSpanElement>
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (props) => {
  const {
    isLink,
    link,
    className,
    children,
    ...rest
  } = props

  const { separator, separatorClass } = useBreadcrumb()

  const classes = classnames(
    'el-breadcrumb__item',
    className,
  );

  const linkClasses = classnames(
    'el-breadcrumb__inner',
    isLink && 'is-link'
  );

  return (
    <span className={classes} {...rest}>
      <span className={linkClasses} role="link" ref={link}>
        {children}
      </span>
      {separatorClass ? (
        <i className={`el-breadcrumb__separator ${separatorClass}`} />
      ) : (
        <span className="el-breadcrumb__separator" role="presentation">
          {separator}
        </span>
      )}
    </span>
  );
}

BreadcrumbItem.displayName = 'ElBreadcrumbItem';
BreadcrumbItem.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default BreadcrumbItem;
