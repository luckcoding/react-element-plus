import React from 'react';

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
  React.ComponentPropsWithRef<Inner>,
  P
> &
  P;

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


/**
 * element plus
 */
type OptionalKeys<T extends Record<string, unknown>> = {
  [K in keyof T]: T extends Record<K, T[K]>
    ? never
    : K
}[keyof T]

type RequiredKeys<T extends Record<string, unknown>> = Exclude<keyof T, OptionalKeys<T>>

type MonoArgEmitter<T, Keys extends keyof T> = <K extends Keys>(evt: K, arg?: T[K]) => void

type BiArgEmitter<T, Keys extends keyof T> = <K extends Keys>(evt: K, arg: T[K]) => void

export type EventEmitter<T extends Record<string, unknown>> =
  MonoArgEmitter<T, OptionalKeys<T>> & BiArgEmitter<T, RequiredKeys<T>>

export type AnyFunction<T> = (...args: any[]) => T

export type PartialReturnType<T extends (...args: unknown[]) =>  unknown> = Partial<ReturnType<T>>
