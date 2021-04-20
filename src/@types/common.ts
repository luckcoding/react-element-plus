import React from 'react';

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export interface StandardProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Additional style */
  style?: React.CSSProperties;
}

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
  React.ComponentPropsWithRef<Inner>,
  P
> &
  P;

export interface WithAsProps<As extends React.ElementType | string = React.ElementType>
  extends StandardProps {
  /** You can use a custom element for this component */
  as?: As;
}

export interface IRefForwardingComponent<T extends React.ElementType, P = unknown> {
  <As extends React.ElementType = T>(
    props: React.PropsWithChildren<ReplaceProps<As, WithAsProps<As> & P>>,
    context?: any
  ): React.ReactElement | null;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export declare namespace TypeAttributes {
  type Size = 'large' | 'medium' | 'small' | 'mini';
}
