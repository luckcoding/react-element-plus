import React from 'react';

class SetTimeoutMixin extends React.Component {
  constructor(props) {
    super(props);
    this.timeouts = [];
    this.setTimeout = this.setTimeout.bind(this);
    this.clearTimeouts = this.clearTimeouts.bind(this);
  }

  setTimeout(...args) {
    this.timeouts.push(setTimeout(...args));
  }

  clearTimeouts() {
    this.timeouts.forEach(clearTimeout);
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }
}

export default SetTimeoutMixin;
