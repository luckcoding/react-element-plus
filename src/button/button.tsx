import React from 'react'
import classnames from 'classnames';
import { SafeAnchor } from '../safe-anchor';
import { BsPrefixPropsWithChildren, BsPrefixRefForwardingComponent } from '../_utils/helpers';
// import { debounce } from '@crude/extras';
// import Loading from '../loading';

export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text'
export type ButtonSize = 'small' | 'medium' | 'mini'

// const propTypes = {
//   tag: PropTypes.elementType,
//   href: PropTypes.string,

//   type: PropTypes.oneOf(types),
//   plain: PropTypes.bool,

//   // size
//   size: PropTypes.oneOf(['small', 'medium', 'mini']),

//   // shape
//   round: PropTypes.bool,
//   circle: PropTypes.bool,

//   // child nodes
//   startSlot: PropTypes.node,
//   endSlot: PropTypes.node,

//   // status
//   disabled: PropTypes.bool,
//   loading: PropTypes.bool,
//   loadingType: PropTypes.string,

//   // handle
//   debounce: PropTypes.number,

//   // native
//   nativeType: PropTypes.string,
//   className: PropTypes.string,
//   children: PropTypes.node,
//   onClick: PropTypes.func,
// };

export interface ButtonProps extends React.HTMLAttributes<HTMLElement>, BsPrefixPropsWithChildren {
  // tag: PropTypes.elementType,
  href?: string;
  type?: ButtonType
  plain?: boolean
  size?: ButtonSize
  round?: boolean
  circle?: boolean
  startSlot?: React.ReactNode
  endSlot?: React.ReactNode
  disabled?: boolean
  loading?: boolean
  loadingType?: string
  debounce?: number
  nativeType?: string
  // className
}

type Button = BsPrefixRefForwardingComponent<'button', ButtonProps>;

// const defaultProps = {
//   type: 'default',
//   tag: 'button',
//   nativeType: 'button',
//   debounce: 100,
// };

export const Button: Button = React.forwardRef(({
  as,

  type,
  plain,

  size,

  round,
  circle,

  startSlot,
  endSlot,

  // disabled,
  loading,
  loadingType,

  debounce: wait,

  nativeType,
  className,
  children,
  ...props
}, ref) => {
  const classes = classnames(
    'cr-button',
    `cr-button--${type}`,
    size && `cr-button--${size}`,
    {
      'is-disabled': props.disabled,
      'is-loading': loading,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-sloted': startSlot || endSlot || loading,
    },
    className,
  );


  // debounce
  if (typeof props.onClick === 'function') {
    // props.onClick = debounce(props.onClick, wait, false);
  }

  // child
  const child = (
    <React.Fragment>
      {/* {loading && <div className="cr-button__loading"><Loading type={loadingType} /></div>} */}
      {startSlot && <div className="cr-button__start">startSlot</div>}
      {children}
      {endSlot && <div className="cr-button__end">endSlot</div>}
    </React.Fragment>
  );

  if (props.href) {
    return (
      <SafeAnchor
        {...props}
        as={as}
        ref={ref}
        className={classes}
      >
        {child}
      </SafeAnchor>
    );
  }

  // ref
  if (ref) {
    (props as any).ref = ref
  };

  const Component = as || 'button';

  return (
    <Component className={classes} {...props} type={nativeType}>
      {child}
    </Component>
  );
});

Button.displayName = 'Button';
// Button.propTypes = propTypes;
// Button.defaultProps = defaultProps;
