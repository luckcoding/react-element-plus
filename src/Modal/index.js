import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isNull } from '@crude/extras';
import Button from '../button';

const defaultProps = {
  maskClosable: true,
  closable: true,

  onMaskClick() {},
  onClose() {},

  title: '',
  close: 'X',

  width: 300,

  okText: 'Ok',
  okProps: {},
  cancelText: 'Cancel',
  cancelProps: {},

  visible: false,
};

const propTypes = {
  maskClosable: PropTypes.bool,
  closable: PropTypes.bool,

  footer: PropTypes.any,

  onMaskClick: PropTypes.func,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  onClose: PropTypes.func,

  title: PropTypes.node,
  close: PropTypes.node,

  okText: PropTypes.string,
  okProps: PropTypes.object,
  cancelText: PropTypes.string,
  cancelProps: PropTypes.object,

  visible: PropTypes.bool,
  width: PropTypes.number,

  // self
  className: PropTypes.string,
  children: PropTypes.node,
};

function stopPropagation(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
}

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onMaskClick = this._onMaskClick.bind(this);
    this._handleOk = this._handleOk.bind(this);
  }

  _onMaskClick(e) {
    const {
      maskClosable,
      onMaskClick,
      visible,
      onClose,
    } = this.props;

    if (maskClosable && visible) {
      onClose(e);
    } else {
      onMaskClick(e);
    }
  }

  _handleOk() {
    this.props.onOk(this.props.onClose);
  }

  render() {
    const {
      closable,

      footer,

      onClose,

      title,
      close,

      okText,
      cancelText,
      okProps,
      cancelProps,

      visible,
      width,
      className,
      children,
    } = this.props;

    const classes = classnames(
      'crude-modal',
      {
        _visible: visible,
      },
    );

    return (
      <div
        className={classes}
        onClick={this._onMaskClick}
      >
        {visible ? (
          <div
            className={classnames('_box', className)}
            onClick={stopPropagation}
            style={{ maxWidth: width }}
          >
            <div className="_hd">
              {title}
              {closable && <span className="_close" onClick={onClose}>{close}</span>}
            </div>
            <div className="_bd">
              {children}
            </div>
            {isNull(footer)
              ? null
              : (footer || (
                <div className="_ft">
                  <Button
                    clear
                    small
                    type="button"
                    color="medium"
                    {...cancelProps}
                    onClick={onClose}
                  >
                    {cancelText}
                  </Button>
                  <Button
                    clear
                    small
                    type="button"
                    {...okProps}
                    onClick={this._handleOk}
                  >
                    {okText}
                  </Button>
                </div>
              ))
            }
          </div>
        ) : null}
      </div>
    );
  }
}

Modal.displayName = 'Modal';
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
