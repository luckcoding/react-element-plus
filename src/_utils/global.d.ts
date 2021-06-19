declare const __DEV__: boolean;

declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T

declare type Indexable<T> = {
  [key: string]: T
}

declare type Hash<T> = Indexable<T>

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>

declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

declare type PartialReturnType<T extends (...args: unknown[]) =>  unknown> = Partial<ReturnType<T>>

declare type ComponentStatus = 'success' | 'info' | 'error' | 'warning'
