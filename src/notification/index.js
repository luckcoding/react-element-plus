import React from 'react';
import ReactDOM from 'react-dom';
import Component, { verticalProperty } from './component';

const instances = [];
let seed = 1;

function Message(options = {}, type) {
  options = options || {};
  if (typeof options === 'string' || React.isValidElement(options)) {
    options = {
      message: options,
    };
  }
  options.type = type || options.type;

  const position = options.position || 'top-right';
  const userOnClose = options.onClose;
  const id = seed;

  const div = document.createElement('div');
  document.body.appendChild(div);

  options.onClose = () => {
    ReactDOM.unmountComponentAtNode(div);
    Message.close(id, userOnClose);
    document.body.removeChild(div);
  };

  let innerRef = 0;
  let verticalOffset = options.offset || 16;

  instances.filter(instance => instance.position === position).forEach(({ ref }) => {
    verticalOffset = verticalOffset + ref.offsetHeight + 16;
  });

  const component = React.createElement(Component, Object.assign({}, options, {
    innerRef(ref) { innerRef = ref; },
    verticalOffset,
  }));

  ReactDOM.render(component, div);

  instances.push({ id, ref: innerRef, position });

  seed += 1;
}

['success', 'warning', 'info', 'error'].forEach((type) => {
  Message[type] = options => Message(options, type);
});

Message.close = (id, userOnClose) => {
  const len = instances.length;
  let index = -1;

  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose();
      }
      instances.splice(i, 1);
      break;
    }
  }

  if (len <= 1 || index === -1 || index > instances.length - 1) {
    return;
  }

  const instance = instances[index];
  const { position } = instance;
  const removedHeight = instance.ref.offsetHeight;

  for (let i = index; i < len - 1; i++) {
    const item = instances[i];
    if (item.position === position) {
      const dom = instances[i].ref;
      const itemVerticalProperty = verticalProperty(instance.position);

      dom.style[itemVerticalProperty] = `${parseInt(dom.style[itemVerticalProperty], 10) - removedHeight - 16}px`;
    }
  }
};

Message.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
