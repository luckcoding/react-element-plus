import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Transition from '../transition';

const propTypes = {
  top: PropTypes.string,
  showClose: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node,
  customClass: PropTypes.string,
  maskClosable: PropTypes.bool,
  fullscreen: PropTypes.bool,
  title: PropTypes.node,
  width: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  footer: PropTypes.node,
};

const defaultProps = {
  top: '15vh',
  center: false,
  customClass: '',
  showClose: true,
  maskClosable: true,
  fullscreen: false,
};

class Dialog extends React.PureComponent {
  onMaskClick() {
    if (!this.props.maskClosable) return;
    this.hide();
  }

  hide(cancel) {
    if (cancel !== false) {
      this.props.onClose();
    }
  }

  render() {
    const {
      center,
      showClose,
      customClass,
      onClose,
      fullscreen,
      title,
      footer,
      width,
      top,
      visible,
      children,
    } = this.props;

    const classes = classnames(
      'cr-dialog',
      fullscreen && 'is-fullscreen',
      center && 'cr-dialog--center',
      customClass,
    );

    const style = {};
    if (!fullscreen) {
      style.marginTop = top;
      if (width) {
        style.width = width;
      }
    }

    return (
      <React.Fragment>
        <Transition name="fade" unmountOnExit in={visible}>
          <div className="v-modal" />
        </Transition>
        <Transition
          name="fade-down"
          unmountOnExit
          in={visible}
          onExited={onClose}
        >
          <div className="cr-dialog__wrapper" onClick={this.onMaskClick}>
            <div
              style={style}
              className={classes}
            >
              <div className="cr-dialog__header">
                {title && <span className="cr-dialog__title">{title}</span>}
                {showClose && (
                  <button type="button" className="cr-dialog__headerbtn" onClick={this.hide.bind(this)}>
                    <i className="cr-dialog__close">&times;</i>
                  </button>
                )}
              </div>
              <div className="cr-dialog__body">{children}</div>
              {footer && <div className="cr-dialog__footer">{footer}</div>}
            </div>
          </div>
        </Transition>
      </React.Fragment>
    );
  }
}

Dialog.displayName = 'Dialog';
Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;
