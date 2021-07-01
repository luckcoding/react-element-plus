import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ElRefForwardingComponent, WithAsProps } from '../_utils/types';
import { IBreadcrumbContext, IBreadcrumbProps } from './types';
import { BreadcrumbContext } from './hooks';

export interface BreadcrumbProps extends IBreadcrumbProps, WithAsProps, React.HTMLAttributes<HTMLElement> {
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const defaultProps: Partial<BreadcrumbProps> = {
  as: 'div',
  separator: '/'
};

const Breadcrumb: ElRefForwardingComponent<'div', BreadcrumbProps> = React.forwardRef((props: BreadcrumbProps, ref) => {
  const {
    as: Component,
    separator,
    separatorClass,
    className,
    children,
    ...rest
  } = props

  const contextValue: IBreadcrumbContext = {
    separator,
    separatorClass,
  }

  const classes = classnames(
    'el-breadcrumb',
    className,
  );

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <Component
        className={classes}
        aria-label="Breadcrumb"
        role="navigation"
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    </BreadcrumbContext.Provider>
  );
})

Breadcrumb.displayName = 'ElBreadcrumb';
Breadcrumb.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
