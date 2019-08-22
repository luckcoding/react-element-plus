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
  showClose: true,
  verticalOffset: 20,
  timer: null,
  position: 'top-right',
};

export function verticalProperty(position) {
  return /^top-/.test(position) ? 'top' : 'bottom';
}

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

  get verticalProperty() {
    return verticalProperty(this.props.position);
  }

  get horizontalClass() {
    return this.props.position.indexOf('right') > -1 ? 'right' : 'left';
  }

  get positionStyle() {
    return {
      [this.verticalProperty]: `${this.props.verticalOffset}px`,
    };
  }

  innerRef(ref) {
    this.props.innerRef(ref);
  }

  render() {
    const {
      type,
      iconClass,
      showClose,
      customClass,
      message,
      onClose,
      title,
    } = this.props;

    const classes = classnames(
      'cr-notification',
      this.horizontalClass,
      customClass,
    );

    return (
      <Transition
        name="hor-pan"
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
          <div className={classnames('cr-notification__group', {
            'is-with-icon': type || iconClass,
          })}
          >
            <h2 className="cr-notification__title">{title}</h2>
            {message && <div className="cr-notification__content">{message}</div>}
          </div>
          {showClose && <i className="cr-notification__closeBtn" onClick={this.close.bind(this)}>&times;</i>}
        </div>
      </Transition>
    );
  }
}

Message.displayName = 'Message';
Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
