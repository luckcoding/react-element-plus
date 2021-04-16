import React from 'react';
import { createChainedFunction } from '../_utils';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../_utils/helpers';

export interface SafeAnchorProps
  extends React.HTMLAttributes<HTMLElement>,
    BsPrefixProps {
  href?: string;
  disabled?: boolean;
  role?: string;
  tabIndex?: number;
}

type SafeAnchor = BsPrefixRefForwardingComponent<'a', SafeAnchorProps>;

function isTrivialHref(href?: string) {
  return !href || href.trim() === '#';
}

/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */
export const SafeAnchor: SafeAnchor = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'a',
      as,
      disabled,
      onKeyDown,
      ...props
    }: SafeAnchorProps,
    ref,
  ) => {
    const handleClick = (event: any) => {
      const { href, onClick } = props;

      if (disabled || isTrivialHref(href)) {
        event.preventDefault();
      }

      if (disabled) {
        event.stopPropagation();
        return;
      }

      if (onClick) {
        onClick(event);
      }
    };

    const handleKeyDown = (event: any) => {
      if (event.key === ' ') {
        event.preventDefault();
        handleClick(event);
      }
    };

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button';
      // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')
      props.href = props.href || '#';
    }

    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }

    return (
      <Component
        ref={ref}
        {...props}
        onClick={handleClick}
        onKeyDown={createChainedFunction(handleKeyDown, onKeyDown)}
      />
    );
  },
);

SafeAnchor.displayName = 'SafeAnchor';