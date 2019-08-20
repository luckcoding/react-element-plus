import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { throttle } from '@crude/extras';
import { addEvent, delEvent } from '@crude/events';
import Fade from '../fade';

const propTypes = {
  visibilityHeight: PropTypes.number,
  target: PropTypes.string,
  right: PropTypes.number,
  bottom: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  visibilityHeight: 200,
  right: 40,
  bottom: 40,
  style: {},
};

class Alert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.el = null;
    this.container = null;
    this.throttledScrollHandler = null;

    this.init = this.init.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    this.init();
    this.throttledScrollHandler = throttle(this.onScroll, 300);
    addEvent(this.container, 'scroll', this.throttledScrollHandler);
  }

  componentWillUnmount() {
    delEvent(this.container, 'scroll', this.throttledScrollHandler);
  }

  init() {
    this.container = document;
    this.el = document.documentElement;
    const { target } = this.props;
    if (target) {
      this.el = document.querySelector(target);
      if (!this.el) {
        throw new Error(`target is not existed: ${target}`);
      }
      this.container = this.el;
    }
  }

  onScroll() {
    const { scrollTop } = this.el;
    const toggle = (visible) => {
      if (visible !== this.state.visible) {
        this.setState({ visible });
      }
    };

    toggle(scrollTop >= this.props.visibilityHeight);
  }

  handleClick(e) {
    this.scrollToTop();
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick(e);
    }
  }

  scrollToTop() {
    const { el } = this;
    let step = 0;
    const interval = setInterval(() => {
      if (el.scrollTop <= 0) {
        clearInterval(interval);
        return;
      }
      step += 10;
      el.scrollTop -= step;
    }, 20);
  }

  render() {
    const {
      right,
      bottom,
      style,
      className,
      children,
    } = this.props;

    const classes = classnames(
      'cr-backtop',
      className,
    );

    const styles = {
      ...style,
      right: `${right}px`,
      bottom: `${bottom}px`,
    };

    return (
      <Fade
        unmountOnExit
        in={this.state.visible}
      >
        <div
          className={classes}
          style={styles}
          onClick={this.handleClick}
        >
          {children}
        </div>
      </Fade>
    );
  }
}

Alert.displayName = 'Alert';
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
