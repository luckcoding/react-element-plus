import React from 'react';
import PropTypes from 'prop-types';
import isNumber from '@crude/extras/es/isNumber';
import Button from '../Button';
import SetTimeoutMixin from '../SetTimeoutMixin';

const downCache = {
  set(name, value) {
    window.localStorage[`@@CountDown-${name}`] = value;
  },
  get(name) {
    return window.localStorage[`@@CountDown-${name}`];
  },
};

const propTypes = {
  text: PropTypes.string,
  nextText: PropTypes.string,
  duration: PropTypes.number,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  cache: PropTypes.string, // cache id
};

const defaultProps = {
  text: 'Get Code',
  nextText: null,
  duration: 60,
  onClick: () => {},
  disabled: false,
  cache: '',
};

class CountDown extends SetTimeoutMixin {
  constructor(props) {
    super(props);
    this.state = {
      duration: null,
    };
    this._handleHistory = this._handleHistory.bind(this);
    this.run = this.run.bind(this);
    this._onClick = this._onClick.bind(this);
    this._start = this._start.bind(this);
  }

  componentDidMount() {
    this._handleHistory();
  }

  _handleHistory() {
    const { cache, duration } = this.props;
    if (!cache) return;
    const lastTime = downCache.get(cache);
    if (!lastTime) return;
    const timeLeft = Math.floor(duration - (Date.now() - lastTime) / 1000);

    if (timeLeft > 0) {
      this._start(timeLeft);
    }
  }

  run() {
    if (!this.state.duration && !this.props.disabled) {
      this.clearTimeouts();
      this._start(this.props.duration);
    }
  }

  _onClick() {
    const { disabled, onClick, cache } = this.props;
    if (!this.state.duration && !disabled) {
      onClick(this.run);
      if (cache) {
        downCache.set(cache, Date.now());
      }
    }
  }

  _start(duration) {
    this.setState({ duration });
    if (duration) {
      this.setTimeout(() => {
        this._start(--duration);
      }, 1000);
    } else {
      this.clearTimeouts();
    }
  }

  render() {
    const {
      text, nextText, disabled, ...props
    } = this.props;
    const { duration } = this.state;
    return (
      <Button
        small
        clear
        type="button"
        {...props}
        disabled={!!duration || disabled}
        onClick={this._onClick}
      >
        {duration || (isNumber(duration) && nextText) || text}
        {' '}
        {duration ? 's' : ''}
      </Button>
    );
  }
}

CountDown.displayName = 'CountDown';
CountDown.propTypes = propTypes;
CountDown.defaultProps = defaultProps;

export default CountDown;
