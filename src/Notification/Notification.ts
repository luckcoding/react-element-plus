import React from 'react';
import ReactDOM from 'react-dom';
import { isServer, PopupManager } from '../_utils';
import { INotificationOptions, Position, NotificationQueue, INotification, CloseAttrs } from './types';
import NotificationBox, { verticalProperty } from './NotificationBox';
import { COMPONENT_STATUS } from '../_utils/constants';

const notifications: Record<Position, NotificationQueue> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
}

let seed = 1;

const Notification: INotification = (options) => {
  if (isServer) return

  const position = options.position || 'top-right'

  let verticalOffset = options.offset || 0
  notifications[position].forEach(({ el }) => {
    verticalOffset += (el.offsetHeight || 0) + 16
  })
  verticalOffset += 16

  const id = 'notification_' + seed++
  const userOnClose = options.onClose

  const closeAttrs: CloseAttrs = { id, position, userOnClose }

  options = {
    // default options end
    ...options,
    offset: verticalOffset,
    id,
    zIndex: PopupManager.nextZIndex(),
  }

  const container = document.createElement('div')
  document.body.appendChild(container)

  options.onClose = () => {
    close(closeAttrs)
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  };

  let el: HTMLElement;
  const vm = React.createElement(NotificationBox, {
    ...options,
    ref(ref: any) { el = ref }
  });

  ReactDOM.render(vm, container);
  notifications[position].push({ closeAttrs, el })

  return {
    close: () => close(closeAttrs),
  }
}

COMPONENT_STATUS.forEach(type => {
  Object.assign(Notification, {
    [type]: (options: React.ReactElement | INotificationOptions | string = {}) => {
      if (typeof options === 'string' || React.isValidElement(options)) {
        options = {
          message: options,
        }
      }
      options.type = type
      return Notification(options)
    },
  })
})

/**
 * This function gets called when user click `x` button or press `esc` or the time reached its limitation.
 * Emitted by transition@before-leave event so that we can fetch the current notification.offsetHeight, if this was called
 * by @after-leave the DOM element will be removed from the page thus we can no longer fetch the offsetHeight.
 * @param {String} id notification id to be closed
 * @param {Position} position the positioning strategy
 * @param {Function} userOnClose the callback called when close passed by user
 */
 export function close(params: CloseAttrs): void {
   const { id, position, userOnClose } = params
  // maybe we can store the index when inserting the vm to notification list.
  const orientedNotifications = notifications[position]
  const idx = orientedNotifications.findIndex(({ closeAttrs }) => {
    return id === closeAttrs.id
  })

  if (idx === -1) {
    return
  }

  const { el } = orientedNotifications[idx]
  // calling user's on close function before notification gets removed from DOM.
  userOnClose?.()

  // note that this is called @before-leave, that's why we were able to fetch this property.
  const removedHeight = el.offsetHeight
  orientedNotifications.splice(idx, 1)
  const len = orientedNotifications.length
  if (len < 1) return
  // starting from the removing item.
  for (let i = idx; i < len; i++) {
    const verticalPos = position.split('-')[0]
    // new position equals the current offsetTop minus removed height plus 16px(the gap size between each item)
    const pos = parseInt(orientedNotifications[i].el.style[verticalPos], 10) - removedHeight - 16
    // orientedNotifications[i].vm.props.offset = pos
    const itemVerticalProperty = verticalProperty(position);
    orientedNotifications[i].el.style[itemVerticalProperty] = `${pos}px`;
  }
}

export function closeAll(): void {
  // loop through all directions, close them at once.
  for (const key in notifications) {
    const orientedNotifications = notifications[key as Position]
    orientedNotifications.forEach(({ closeAttrs }) => {
      close(closeAttrs)
      // same as the previous close method, we'd like to make sure lifecycle gets handle properly.
      // (vm.component.proxy as ComponentPublicInstance<{ visible: boolean; }>).visible = false
    })
  }
}

export default Notification;
