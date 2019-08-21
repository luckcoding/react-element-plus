import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import TransitionNative, {
  ENTERED,
  ENTERING,
} from 'react-transition-group/Transition';
import onEnd from 'dom-helpers/transition/end';
import triggerBrowserReflow from '../_utils/triggerBrowserReflow';

const propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: PropTypes.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: PropTypes.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: PropTypes.func,

  /**
   * transition name
   */
  name: PropTypes.string,

  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  in: false,
  timeout: 3000,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  name: 'fade',
};

const styles = {
  [ENTERING]: 'cr-transition-show',
  [ENTERED]: 'cr-transition-show',
};

class Transition extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(node) {
    triggerBrowserReflow(node);
    if (this.props.onEnter) this.props.onEnter(node);
  }

  render() {
    const {
      name, className, children, ...props
    } = this.props;

    return (
      <TransitionNative
        addEndListener={onEnd}
        {...props}
        onEnter={this.handleEnter}
      >
        {(status, innerProps) => React.cloneElement(children, {
          ...innerProps,
          className: classnames(
            `cr-transition-${name}`,
            className,
            children.props.className,
            styles[status],
          ),
        })
        }
      </TransitionNative>
    );
  }
}

Transition.propTypes = propTypes;
Transition.defaultProps = defaultProps;

export default Transition;
