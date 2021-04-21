import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { IRefForwardingComponent, WithAsProps } from '../@types/common';

export interface SafeAnchorProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  href?: string;
  disabled?: boolean;
}

/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */
export const SafeAnchor: IRefForwardingComponent<'a', SafeAnchorProps> = React.forwardRef(
  (props: SafeAnchorProps, ref) => {
    const { as: Component = 'a', href, disabled, onClick, ...rest } = props;

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onClick?.(event);
      },
      [onClick, disabled]
    );

    if (disabled) {
      rest.tabIndex = -1;
      rest['aria-disabled'] = true;
    }

    if (!href || href !== '#') {
      rest.role = rest.role || 'button';
    }

    return <Component {...rest} href={href} ref={ref} onClick={handleClick} />;
  }
);

SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
  disabled: PropTypes.bool,
  as: PropTypes.elementType
};

export default SafeAnchor;
