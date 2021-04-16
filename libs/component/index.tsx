import React from 'react';
import classnames from 'classnames';

interface P {
  className?: string
  style: React.CSSProperties
}

export default class Component extends React.Component<P> {
  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    const { className } = this.props;
    return this.classNames.apply(this, args.concat([className]));
  }

  style(args) {
    const { style } = this.props;
    return Object.assign({}, args, style);
  }
}
