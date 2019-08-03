import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { addEvent, delEvent } from '@crude/events';
import './toast.scss';

const defaultProps = {
  duration: 3000,
};

const propTypes = {
  duration: PropTypes.number,
  className: PropTypes.string,
};

const Toast = {
  show() {},
  info(message) {
    this.show(message, 'info');
  },
  success(message) {
    this.show(message, 'success');
  },
  warning(message) {
    this.show(message, 'warning');
  },
  error(message) {
    this.show(message, 'error');
  },
};

function stopPropagation(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
}

class ToastContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      message: '',
      status: '',
    };
    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
    this._ending = this._ending.bind(this);
  }

  _ending(duration = 0) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ message: '' });
    }, duration);
  }

  _show(message = '', status = 'info') {
    this.setState({ message, status }, () => this._ending(this.props.duration));
  }

  _hide() {
    this._ending(0);
  }

  componentDidMount() {
    addEvent(document, 'click', this._hide);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    delEvent(document, 'click', this._hide);
  }

  render() {
    const { message, status } = this.state;
    Toast.show = this._show;
    return message ? (
      <div className={classnames('pure-toast', this.props.className)}>
        <div className={`_${status}`} onClick={stopPropagation}>{message}</div>
      </div>
    ) : null;
  }
}

ToastContainer.displayName = 'Toast';
ToastContainer.propTypes = propTypes;
ToastContainer.defaultProps = defaultProps;

export { ToastContainer };
export default Toast;
