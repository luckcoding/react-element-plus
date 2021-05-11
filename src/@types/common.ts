import React from 'react';
import { ReplaceProps } from './utils';

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

export interface WithAsProps<As extends React.ElementType | string = React.ElementType>
  extends StandardProps {
  /** You can use a custom element for this component */
  as?: As;
}

export interface ElRefForwardingComponent<T extends React.ElementType, P = unknown> {
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
  type Size = ComponentSize
}

export interface TransitionCallbacks {
  onEnter?(node: HTMLElement): any;
  onEntered?(node: HTMLElement): any;
  onEntering?(node: HTMLElement): any;
  onExit?(node: HTMLElement): any;
  onExited?(node: HTMLElement): any;
  onExiting?(node: HTMLElement): any;
}

export type TransitionComponent = React.ComponentType<
  {
    in?: boolean;
    appear?: boolean;
    children: React.ReactElement;
  } & TransitionCallbacks
>;

export type TransitionType = boolean | TransitionComponent;
