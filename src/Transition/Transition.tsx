import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTransition, { TransitionStatus } from 'react-transition-group/Transition';
import { transitionEndListener, triggerBrowserReflow } from '../_utils';
import { TransitionCallbacks } from '../_utils/types'

export interface TransitionProps extends TransitionCallbacks {
  in?: boolean
  mountOnEnter?: boolean
  unmountOnExit?: boolean
  appear?: boolean
  className?: string
  timeout?: number
  children: React.ReactElement
  transitionClass: {
    [K in TransitionStatus]?: string;
  }
}

const defaultProps: Partial<TransitionProps> = {
  in: false,
  timeout: 3000,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: true,
};

const Transition = React.forwardRef<ReactTransition<any>, TransitionProps>((props, ref) => {
  const { transitionClass, onEnter, className, children, ...rest } = props

  const handleEnter = useCallback(
    (node) => {
      triggerBrowserReflow(node);
      onEnter?.(node);
    },
    [props],
  );

  return (
    <ReactTransition
      ref={ref}
      addEndListener={transitionEndListener}
      {...rest}
      onEnter={handleEnter}
    >
      {(state) => {
        return React.cloneElement(children, {
          // ...innerProps,
          className: classNames(
            className,
            children.props.className,
            transitionClass[state],
          ),
        })
      }}
    </ReactTransition>
  )
})

Transition.propTypes = {
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
};
Transition.defaultProps = defaultProps;

export default Transition;

