import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { addEvent, delEvent } from '@crude/events';

const propTypes = {
  width: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
  onValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
  offValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
  onIconClass: PropTypes.string,
  offIconClass: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  name: PropTypes.string,

  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  width: 40,
  value: false,
  onIconClass: '',
  offIconClass: '',
  onColor: '',
  offColor: '',
  onValue: true,
  offValue: false,
  name: '',
};

class Switch extends React.PureComponent {
  handleChange(e) {
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      const { onValue, offValue  } = this.props
      const checked = this.refs.input.checked
      onChange(checked ? offValue : onValue)
    }
  }

  switchValue() {
    if (!this.props.disabled) {
      this.handleChange();
    }
  }

  render() {
    const {
      value,
      disabled,
      onIconClass,
      onText,
      offIconClass,
      offText,
      onColor,
      offColor,
      onValue,
      offValue,
      width,

      className,
      children,
    } = this.props;

    const checked = value === onValue

    const classes = classnames(
      'cr-switch',
      disabled && 'is-disabled',
      checked && 'is-checked',
      className,
    );

    let coreStyle = { width: `${width}px` };
    if (onColor && checked) {
      Object.assign(coreStyle, {
        backgroundColor: onColor,
        borderColor: onColor,
      })
    } else if (offColor && !checked) {
      Object.assign(coreStyle, {
        backgroundColor: offColor,
        borderColor: offColor,
      })
    }

    return (
      <div className={classes} onClick={this.switchValue.bind(this)}>
        <input
          ref="input"
          className="cr-switch__input"
          type="checkbox"
          checked={checked}
          onChange={this.handleChange.bind(this)}
          name={name}
          disabled={disabled}
        />
        {onIconClass || onText && (
          <span className={classnames('cr-switch__label', 'cr-switch__label--left', !checked && 'is-active')}>
            {onIconClass && <i className={onIconClass} />}
            {!onIconClass && onText && <span>{onText}</span>}
          </span>
        )}
        <span className="cr-switch__core" style={coreStyle} />
        {offIconClass || offText && (
          <span className={classnames('cr-switch__label', 'cr-switch__label--right', checked && 'is-active')}>
            {offIconClass && <i className={offIconClass} />}
            {!offIconClass && offText && <span>{offText}</span>}
          </span>
        )}
      </div>
    );
  }
}

Switch.displayName = 'Switch';
Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
