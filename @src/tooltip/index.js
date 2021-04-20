import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { Manager, Reference, Popper } from 'react-popper';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SetTimeoutMixin from '../set-timeout-mixin';
import Transition from '../transition';

const propTypes = {
  openDelay: PropTypes.number,
  disabled: PropTypes.bool,
  manual: PropTypes.bool,
  effect: PropTypes.oneOf(['dark', 'light']),
  placement: PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  popperClass: PropTypes.string,
  content: PropTypes.node,
  visibleArrow: PropTypes.bool,
  hideAfter: PropTypes.number,
  visible: PropTypes.bool,
};

const defaultProps = {
  openDelay: 0,
  effect: 'dark',
  visibleArrow: true,
  hideAfter: 0,
};

class Tooltip extends SetTimeoutMixin {
  constructor(props) {
    super(props);
    this.state = {
      showPopper: false,
      focusing: false,
    };
  }

  static getDerivedStateFromProps({ visible }, { showPopper }) {
    if ((typeof visible === 'boolean')
      && (visible !== showPopper)) {
      return { showPopper: visible };
    }
    return null;
  }

  showPopper() {
    const { manual } = this.props;
    if (!manual) {
      const { hideAfter, openDelay } = this.props;
      this.setTimeout(() => {
        this.setState({ showPopper: true });

        if (hideAfter > 0) {
          this.setTimeout(() => {
            if (this.state.showPopper) {
              this.setState({ showPopper: false });
            }
          }, hideAfter);
        }
      }, openDelay);
    }
  }

  hidePopper() {
    if (!this.props.manual) {
      this.clearTimeouts();
      this.setState({ showPopper: false });
    }
  }

  handleFocus() {
    this.setState({ focusing: true });
    this.showPopper();
  }

  handleBlur() {
    this.setState({ focusing: false });
    this.hidePopper();
  }

  render() {
    const {
      placement,
      disabled,
      effect,
      popperClass,
      content,
      visibleArrow,
      children,
    } = this.props;

    const { focusing } = this.state;

    const child = Children.only(children);

    return (
      <Manager>
        <Reference>
          {({ ref }) => React.cloneElement(child, {
            ref,
            className: classnames(child.props.className, focusing && 'focusing'),
            onMouseEnter: this.showPopper.bind(this),
            onMouseLeave: this.hidePopper.bind(this),
            onFocus: this.handleFocus.bind(this),
            onBlur: this.handleBlur.bind(this),
          })}
        </Reference>
        {typeof document !== 'undefined' ? ReactDOM.createPortal(
          <Popper
            placement={placement}
            modifiers={{
              computeStyle: {
                gpuAcceleration: false,
              },
            }}
          >
            {({
              ref, style, placement: dataPlacement, arrowProps,
            }) => (
              <Transition
                name="fade"
                unmountOnExit
                in={this.state.showPopper && !disabled}
              >
                <div
                  ref={ref}
                  style={style}
                  data-placement={dataPlacement}
                  className={classnames('cr-tooltip__popper', `is-${effect}`, popperClass)}
                >
                  <div>{content}</div>
                  {visibleArrow && <div ref={arrowProps.ref} style={arrowProps.style} className="popper__arrow" />}
                </div>
              </Transition>
            )}
          </Popper>,
          document.getElementsByTagName('body')[0],
        ) : null}
      </Manager>
    );
  }
}

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
