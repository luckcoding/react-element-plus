import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Transition from '../transition';
import SetTimeoutMixin from '../set-timeout-mixin';

const propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.node,
  duration: PropTypes.number,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),

  onClose: PropTypes.func.isRequired,
  innerRef: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  visible: false,
  message: '',
  duration: 3000,
  type: 'info',
  iconClass: '',
  customClass: '',
  showClose: false,
  verticalOffset: 20,
  timer: null,
  dangerouslyUseHTMLString: false,
  center: false,
};

class Message extends SetTimeoutMixin {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.ref = null;
  }

  componentDidMount() {
    this.setState({ visible: true });
    this.startTimer();
  }

  clearTimer() {
    this.clearTimeouts();
  }

  startTimer() {
    const { duration } = this.props;
    if (duration > 0) {
      this.setTimeout(() => {
        if (this.state.visible) {
          this.close();
        }
      }, duration);
    }
  }

  close() {
    this.setState({ visible: false });
  }

  get positionStyle() {
    return {
      top: `${this.props.verticalOffset}px`,
    };
  }

  innerRef(ref) {
    this.props.innerRef(ref);
  }

  render() {
    const {
      type,
      iconClass,
      center,
      showClose,
      customClass,
      message,
      onClose,
    } = this.props;

    const classes = classnames(
      'cr-message',
      type && !iconClass && `cr-message--${type}`,
      center && 'is-center',
      showClose && 'is-closable',
      customClass,
    );

    return (
      <Transition
        name="down"
        unmountOnExit
        in={this.state.visible}
        onExited={onClose}
      >
        <div
          ref={this.innerRef.bind(this)}
          style={this.positionStyle}
          className={classes}
          onMouseEnter={this.clearTimer.bind(this)}
          onMouseLeave={this.startTimer.bind(this)}
        >
          <i className="icon" />
          <p className="cr-message__content">{message}</p>
          {showClose && <i className="cr-message__closeBtn" onClick={this.close.bind(this)}>&times;</i>}
        </div>
      </Transition>
    );
  }
}

Message.displayName = 'Message';
Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
