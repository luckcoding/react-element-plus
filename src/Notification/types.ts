import React from "react"

export type Type = 'success' | 'warning' | 'info' | 'error'
export type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export interface INotificationHandle {
  close: () => void
}

export type INotification = (options?: INotificationOptions) => INotificationHandle

export type INotificationOptions = {
  customClass?: string
  dangerouslyUseHTMLString?: boolean // default false
  duration?: number // default 4500
  iconClass?: string
  id?: string
  message?: React.ReactNode
  zIndex?: number
  onClose?: () => void
  onClick?: () => void
  offset?: number // defaults 0
  position?: Position // default top-right
  showClose?: boolean
  type?: Type
  title?: string
}

export type CloseAttrs = Required<Pick<INotificationOptions, 'id' | 'position'>> & {
  userOnClose?: () => void
}

type NotificationQueueItem = {
  el: HTMLElement
  closeAttrs: CloseAttrs
}

export type NotificationQueue = Array<NotificationQueueItem>
